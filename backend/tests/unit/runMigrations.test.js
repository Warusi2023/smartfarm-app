/**
 * Migration runner safety: repeated Railway pre-deploy runs must stay green.
 */

const fs = require('fs');
const path = require('path');

const {
    splitSqlStatements,
    isAlreadyApplied,
    resolveDatabaseUrl,
    applyStatementByStatement,
    verifyRequiredColumns,
    MIGRATION_ORDER,
    REQUIRED_COLUMNS
} = require('../../scripts/run-migrations');

const MIGRATIONS_DIR = path.join(__dirname, '../../database/migrations');

function pgError(code, message = 'boom') {
    const error = new Error(message);
    error.code = code;
    return error;
}

describe('splitSqlStatements', () => {
    it('splits on statement boundaries and drops comment-only chunks', () => {
        const sql = `
            -- a comment
            CREATE TABLE a (id int);
            /* block */
            ALTER TABLE a ADD COLUMN b text;
        `;
        const statements = splitSqlStatements(sql);
        expect(statements).toHaveLength(2);
        expect(statements[0]).toContain('CREATE TABLE a');
        expect(statements[1]).toContain('ADD COLUMN b');
    });

    it('keeps dollar-quoted function bodies intact', () => {
        const sql = `
            CREATE OR REPLACE FUNCTION f() RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
            SELECT 1;
        `;
        const statements = splitSqlStatements(sql);
        expect(statements).toHaveLength(2);
        expect(statements[0]).toContain('RETURN NEW;');
    });

    it('ignores semicolons inside string literals', () => {
        const statements = splitSqlStatements("INSERT INTO t (v) VALUES ('a;b'); SELECT 1;");
        expect(statements).toHaveLength(2);
        expect(statements[0]).toContain("'a;b'");
    });

    it('produces balanced dollar quotes for every shipped migration', () => {
        for (const migration of MIGRATION_ORDER) {
            const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, migration), 'utf8');
            for (const statement of splitSqlStatements(sql)) {
                const dollarCount = (statement.match(/\$\$/g) || []).length;
                expect(dollarCount % 2).toBe(0);
            }
        }
    });
});

describe('MIGRATION_ORDER', () => {
    it('references files that exist', () => {
        for (const migration of MIGRATION_ORDER) {
            expect(fs.existsSync(path.join(MIGRATIONS_DIR, migration))).toBe(true);
        }
    });

    it('includes the livestock persistence and reconcile migrations', () => {
        expect(MIGRATION_ORDER).toContain('017_livestock_api_persistence.sql');
        expect(MIGRATION_ORDER).toContain('018_livestock_legacy_column_reconcile.sql');
    });
});

describe('isAlreadyApplied', () => {
    it.each(['42P07', '42710', '42701', '42723', '23505'])('tolerates duplicate code %s', (code) => {
        expect(isAlreadyApplied(pgError(code))).toBe(true);
    });

    it('tolerates "already exists" messages without a code', () => {
        expect(isAlreadyApplied(new Error('trigger "x" for relation "y" already exists'))).toBe(true);
    });

    it('does not tolerate real errors', () => {
        expect(isAlreadyApplied(pgError('42703', 'column "species" does not exist'))).toBe(false);
        expect(isAlreadyApplied(pgError('23502', 'null value in column "animal_type"'))).toBe(false);
        expect(isAlreadyApplied(null)).toBe(false);
    });
});

describe('resolveDatabaseUrl', () => {
    const original = { ...process.env };

    afterEach(() => {
        process.env = { ...original };
    });

    it('prefers DATABASE_URL and falls back to Railway aliases', () => {
        process.env.DATABASE_URL = ' postgres://primary ';
        expect(resolveDatabaseUrl()).toBe('postgres://primary');

        delete process.env.DATABASE_URL;
        process.env.DATABASE_PRIVATE_URL = 'postgres://private';
        expect(resolveDatabaseUrl()).toBe('postgres://private');
    });

    it('returns an empty string when nothing is configured', () => {
        delete process.env.DATABASE_URL;
        delete process.env.POSTGRES_URL;
        delete process.env.DATABASE_PRIVATE_URL;
        delete process.env.DATABASE_PUBLIC_URL;
        expect(resolveDatabaseUrl()).toBe('');
    });
});

describe('applyStatementByStatement', () => {
    function fakeClient(handler) {
        const executed = [];
        return {
            executed,
            query: jest.fn(async (sql, params) => {
                executed.push(sql);
                if (/^(SAVEPOINT|RELEASE|ROLLBACK|BEGIN|COMMIT)/i.test(sql)) {
                    return { rows: [] };
                }
                return handler(sql, params);
            })
        };
    }

    it('skips statements that were already applied and keeps going', async () => {
        const client = fakeClient((sql) => {
            if (sql.includes('CREATE TRIGGER')) throw pgError('42710', 'trigger already exists');
            return { rows: [] };
        });

        const stats = await applyStatementByStatement(
            client,
            '001_complete_schema.sql',
            'CREATE TABLE IF NOT EXISTS a (id int); CREATE TRIGGER t BEFORE UPDATE ON a EXECUTE FUNCTION f(); SELECT 1;'
        );

        expect(stats).toEqual({ applied: 2, skipped: 1, total: 3 });
        expect(client.executed).toContain('ROLLBACK TO SAVEPOINT migration_step');
    });

    it('rethrows genuine failures so the migration is reported', async () => {
        const client = fakeClient(() => {
            throw pgError('42703', 'column "species" does not exist');
        });

        await expect(
            applyStatementByStatement(client, '018_livestock_legacy_column_reconcile.sql', 'SELECT species FROM livestock;')
        ).rejects.toThrow('column "species" does not exist');
    });
});

describe('verifyRequiredColumns', () => {
    it('reports missing livestock columns', async () => {
        const client = {
            query: jest.fn(async (_sql, [table]) => {
                if (table === 'crops') {
                    return { rows: REQUIRED_COLUMNS.crops.map((column_name) => ({ column_name })) };
                }
                return { rows: [{ column_name: 'user_id' }, { column_name: 'tag_number' }] };
            })
        };

        const missing = await verifyRequiredColumns(client);
        expect(missing).toContain('livestock.species');
        expect(missing).toContain('livestock.photo');
        expect(missing).not.toContain('crops.location');
    });

    it('passes when every column is present', async () => {
        const client = {
            query: jest.fn(async (_sql, [table]) => ({
                rows: REQUIRED_COLUMNS[table].map((column_name) => ({ column_name }))
            }))
        };

        await expect(verifyRequiredColumns(client)).resolves.toEqual([]);
    });

    it('flags a missing table', async () => {
        const client = { query: jest.fn(async () => ({ rows: [] })) };
        const missing = await verifyRequiredColumns(client);
        expect(missing).toContain('livestock (table missing)');
        expect(missing).toContain('crops (table missing)');
    });
});
