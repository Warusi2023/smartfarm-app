/**
 * Run backend SQL migrations in a canonical release order.
 *
 * Designed to be safe as a Railway pre-deploy command:
 *   - already-applied migrations are recorded in schema_migrations and skipped
 *   - "already exists" style errors are tolerated so re-runs do not fail
 *   - failures log the exact SQL statement, error code, and migration name
 *   - by default a failure does NOT block the deploy (set MIGRATIONS_STRICT=true to block)
 *
 * Usage:
 *   node scripts/run-migrations.js
 *   MIGRATIONS_STRICT=true node scripts/run-migrations.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Client } = require('pg');
const logger = require('../utils/logger');
const { getPostgresSSLConfig } = require('../utils/ssl-config');

const MIGRATION_ORDER = [
    '001_complete_schema.sql',
    '002_add_missing_features.sql',
    '003_add_weather_alerts.sql',
    'add-email-verification.sql',
    '004_auth_users_columns.sql',
    '005_subscriptions_user_unique.sql',
    '006_soiltests_farmcosts.sql',
    '007_farmrevenue.sql',
    '008_stripe_billing.sql',
    '009_aquaculture_phase1.sql',
    '010_farm_team_tasks.sql',
    '013_ipm_reference_data.sql',
    '014_ipm_maturity_notes.sql',
    '015_ipm_regulatory_products.sql',
    '016_crops_api_persistence.sql',
    '017_livestock_api_persistence.sql',
    '018_livestock_legacy_column_reconcile.sql'
];

/**
 * Columns the API layer depends on. Checked after migrations so a silent schema
 * drift shows up in the pre-deploy logs instead of as runtime 500s.
 */
const REQUIRED_COLUMNS = {
    crops: ['user_id', 'name', 'location'],
    livestock: ['user_id', 'species', 'name', 'photo', 'tag_number', 'health_status']
};

/**
 * Postgres error codes that mean "this migration step was already applied".
 * Tolerating them keeps repeated pre-deploy runs green.
 */
const ALREADY_APPLIED_CODES = new Set([
    '42P07', // duplicate_table (also index)
    '42P06', // duplicate_schema
    '42710', // duplicate_object (trigger, constraint, type)
    '42701', // duplicate_column
    '42723', // duplicate_function
    '42P04', // duplicate_database
    '23505' // unique_violation (re-running idempotent seed rows)
]);

const MIGRATIONS_TABLE_SQL = `
    CREATE TABLE IF NOT EXISTS schema_migrations (
        name TEXT PRIMARY KEY,
        checksum TEXT NOT NULL,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`;

function resolveDatabaseUrl() {
    return (
        process.env.DATABASE_URL ||
        process.env.POSTGRES_URL ||
        process.env.DATABASE_PRIVATE_URL ||
        process.env.DATABASE_PUBLIC_URL ||
        ''
    ).trim();
}

function isStrict() {
    return String(process.env.MIGRATIONS_STRICT || '').toLowerCase() === 'true';
}

function checksumOf(sql) {
    return crypto.createHash('sha256').update(sql).digest('hex');
}

function isAlreadyApplied(error) {
    if (!error) return false;
    if (error.code && ALREADY_APPLIED_CODES.has(error.code)) return true;
    return /already exists/i.test(error.message || '');
}

/**
 * Split a migration file into individual statements.
 * Understands line/block comments, single-quoted strings, and dollar-quoted bodies
 * so plpgsql functions are not cut in half.
 */
function splitSqlStatements(sql) {
    const statements = [];
    let current = '';
    let i = 0;
    let inLineComment = false;
    let inBlockComment = false;
    let inSingleQuote = false;
    let dollarTag = null;

    while (i < sql.length) {
        const char = sql[i];
        const next = sql[i + 1];

        if (inLineComment) {
            current += char;
            if (char === '\n') inLineComment = false;
            i += 1;
            continue;
        }

        if (inBlockComment) {
            current += char;
            if (char === '*' && next === '/') {
                current += next;
                i += 2;
                inBlockComment = false;
                continue;
            }
            i += 1;
            continue;
        }

        if (dollarTag) {
            if (sql.startsWith(dollarTag, i)) {
                current += dollarTag;
                i += dollarTag.length;
                dollarTag = null;
                continue;
            }
            current += char;
            i += 1;
            continue;
        }

        if (inSingleQuote) {
            current += char;
            if (char === "'") {
                if (next === "'") {
                    current += next;
                    i += 2;
                    continue;
                }
                inSingleQuote = false;
            }
            i += 1;
            continue;
        }

        if (char === '-' && next === '-') {
            current += '--';
            i += 2;
            inLineComment = true;
            continue;
        }

        if (char === '/' && next === '*') {
            current += '/*';
            i += 2;
            inBlockComment = true;
            continue;
        }

        if (char === "'") {
            current += char;
            inSingleQuote = true;
            i += 1;
            continue;
        }

        if (char === '$') {
            const match = /^\$[A-Za-z_0-9]*\$/.exec(sql.slice(i));
            if (match) {
                dollarTag = match[0];
                current += dollarTag;
                i += dollarTag.length;
                continue;
            }
        }

        if (char === ';') {
            statements.push(current);
            current = '';
            i += 1;
            continue;
        }

        current += char;
        i += 1;
    }

    statements.push(current);

    return statements
        .map((statement) => statement.trim())
        .filter((statement) => hasExecutableSql(statement));
}

/** True when the chunk contains SQL beyond comments/whitespace. */
function hasExecutableSql(statement) {
    const stripped = statement
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/--[^\n]*/g, '')
        .trim();
    return stripped.length > 0;
}

/** Run all statements individually, skipping ones that were already applied. */
async function applyStatementByStatement(client, migration, sql) {
    const statements = splitSqlStatements(sql);
    let applied = 0;
    let skipped = 0;

    for (const statement of statements) {
        await client.query('SAVEPOINT migration_step');
        try {
            await client.query(statement);
            await client.query('RELEASE SAVEPOINT migration_step');
            applied += 1;
        } catch (error) {
            await client.query('ROLLBACK TO SAVEPOINT migration_step');
            await client.query('RELEASE SAVEPOINT migration_step');

            if (isAlreadyApplied(error)) {
                skipped += 1;
                logger.debug('Migration step already applied, skipping', {
                    migration,
                    code: error.code,
                    detail: error.message,
                    statement: statement.slice(0, 200)
                });
                continue;
            }

            logger.errorWithContext('Migration statement failed', {
                migration,
                code: error.code,
                column: error.column,
                table: error.table,
                constraint: error.constraint,
                detail: error.detail,
                message: error.message,
                statement: statement.slice(0, 500)
            });
            throw error;
        }
    }

    return { applied, skipped, total: statements.length };
}

async function applyMigration(client, migration, sql) {
    // Fast path: whole file atomically. Falls back to per-statement on any error
    // so partially-applied schemas (or already-created objects) do not block.
    await client.query('BEGIN');
    try {
        await client.query(sql);
        await client.query('COMMIT');
        return { mode: 'file' };
    } catch (error) {
        await client.query('ROLLBACK').catch(() => undefined);
        logger.warn('Migration failed as a single batch, retrying statement-by-statement', {
            migration,
            code: error.code,
            message: error.message
        });
    }

    await client.query('BEGIN');
    try {
        const stats = await applyStatementByStatement(client, migration, sql);
        await client.query('COMMIT');
        return { mode: 'statements', ...stats };
    } catch (error) {
        await client.query('ROLLBACK').catch(() => undefined);
        throw error;
    }
}

/** Log any API-critical columns that are still missing after the run. */
async function verifyRequiredColumns(client) {
    const missing = [];

    for (const [table, columns] of Object.entries(REQUIRED_COLUMNS)) {
        const result = await client.query(
            `SELECT column_name FROM information_schema.columns WHERE table_name = $1`,
            [table]
        );
        if (result.rows.length === 0) {
            missing.push(`${table} (table missing)`);
            continue;
        }
        const present = new Set(result.rows.map((row) => row.column_name));
        columns
            .filter((column) => !present.has(column))
            .forEach((column) => missing.push(`${table}.${column}`));
    }

    if (missing.length > 0) {
        logger.error('Schema verification found missing columns', { missing });
    } else {
        logger.info('Schema verification passed', { tables: Object.keys(REQUIRED_COLUMNS) });
    }

    return missing;
}

async function runMigrations() {
    const command = 'node scripts/run-migrations.js';
    const strict = isStrict();
    const databaseUrl = resolveDatabaseUrl();

    logger.info('Starting migration run', {
        command,
        strict,
        migrations: MIGRATION_ORDER.length
    });

    if (!databaseUrl) {
        // Never hard-fail the deploy just because migrations cannot be reached.
        logger.error(
            'DATABASE_URL is not set — skipping migrations. Set DATABASE_URL on the service to apply schema changes.'
        );
        process.exitCode = strict ? 1 : 0;
        return;
    }

    const migrationsDir = path.join(__dirname, '../database/migrations');
    if (!fs.existsSync(migrationsDir)) {
        logger.error('Migrations directory not found', { migrationsDir });
        process.exitCode = strict ? 1 : 0;
        return;
    }

    const client = new Client({
        connectionString: databaseUrl,
        ssl: getPostgresSSLConfig(databaseUrl)
    });

    const summary = { applied: [], skipped: [], failed: [] };

    try {
        await client.connect();
        logger.info('Connected to database, running migrations', { migrationsDir });

        await client.query(MIGRATIONS_TABLE_SQL);
        const ledger = await client.query('SELECT name, checksum FROM schema_migrations');
        const alreadyRun = new Map(ledger.rows.map((row) => [row.name, row.checksum]));

        for (const migration of MIGRATION_ORDER) {
            const migrationPath = path.join(migrationsDir, migration);
            if (!fs.existsSync(migrationPath)) {
                logger.error('Missing migration file — skipping', { migration, migrationPath });
                summary.failed.push({ migration, reason: 'missing file' });
                continue;
            }

            const sql = fs.readFileSync(migrationPath, 'utf8');
            const checksum = checksumOf(sql);

            if (alreadyRun.get(migration) === checksum) {
                logger.info('Migration already applied, skipping', { migration });
                summary.skipped.push(migration);
                continue;
            }

            logger.info('Applying migration', { migration });
            try {
                const result = await applyMigration(client, migration, sql);
                await client.query(
                    `INSERT INTO schema_migrations (name, checksum, applied_at)
                     VALUES ($1, $2, CURRENT_TIMESTAMP)
                     ON CONFLICT (name)
                     DO UPDATE SET checksum = EXCLUDED.checksum, applied_at = CURRENT_TIMESTAMP`,
                    [migration, checksum]
                );
                logger.info('Migration applied', { migration, ...result });
                summary.applied.push(migration);
            } catch (error) {
                logger.errorWithContext('Migration failed', {
                    migration,
                    code: error.code,
                    message: error.message
                });
                summary.failed.push({ migration, code: error.code, reason: error.message });
                if (strict) break;
            }
        }

        const missingColumns = await verifyRequiredColumns(client);
        if (missingColumns.length > 0) {
            summary.failed.push({ migration: '<schema verification>', reason: `missing: ${missingColumns.join(', ')}` });
        }
    } catch (error) {
        logger.errorWithContext('Migration run failed', { error, command });
        summary.failed.push({ migration: '<connection>', reason: error.message });
    } finally {
        await client.end().catch(() => undefined);
    }

    logger.info('Migration run summary', {
        applied: summary.applied,
        skipped: summary.skipped.length,
        failed: summary.failed
    });

    if (summary.failed.length > 0) {
        if (strict) {
            logger.error('Migrations failed and MIGRATIONS_STRICT=true — blocking deploy');
            process.exitCode = 1;
        } else {
            logger.error(
                'Migrations reported failures but the deploy will continue. Re-run manually or set MIGRATIONS_STRICT=true to block.'
            );
            process.exitCode = 0;
        }
        return;
    }

    logger.info('All migrations completed successfully');
    process.exitCode = 0;
}

if (require.main === module) {
    runMigrations();
}

module.exports = {
    runMigrations,
    splitSqlStatements,
    isAlreadyApplied,
    resolveDatabaseUrl,
    verifyRequiredColumns,
    applyStatementByStatement,
    MIGRATION_ORDER,
    REQUIRED_COLUMNS,
    ALREADY_APPLIED_CODES
};
