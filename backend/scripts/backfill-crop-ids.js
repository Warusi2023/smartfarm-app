/**
 * Backfill missing crop IDs with UUIDs.
 *
 * Usage:
 *   node backend/scripts/backfill-crop-ids.js
 *
 * Notes:
 * - Uses DATABASE_URL from environment.
 * - Uses the same SSL helper as backend runtime.
 * - Safe to run multiple times; only updates rows with id IS NULL.
 */

require('dotenv').config();
const { randomUUID } = require('crypto');
const { Pool } = require('pg');
const { getPostgresSSLConfig } = require('../utils/ssl-config');

async function main() {
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not set. Aborting.');
        process.exit(1);
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: getPostgresSSLConfig(process.env.DATABASE_URL),
        max: 5,
        min: 1,
        connectionTimeoutMillis: 10000,
        query_timeout: 15000
    });

    let client;
    try {
        client = await pool.connect();
        console.log('Connected to database.');

        const cols = await client.query(
            `SELECT column_name, is_nullable, data_type
             FROM information_schema.columns
             WHERE table_schema = 'public' AND table_name = 'crops'
             ORDER BY ordinal_position`
        );

        if (cols.rows.length === 0) {
            throw new Error('crops table does not exist in public schema.');
        }

        const idCol = cols.rows.find(c => c.column_name === 'id');
        if (!idCol) {
            throw new Error('crops.id column not found.');
        }

        console.log(`crops.id type=${idCol.data_type}, nullable=${idCol.is_nullable}`);

        const total = await client.query('SELECT COUNT(*)::int AS count FROM crops');
        console.log(`Total crops: ${total.rows[0].count}`);

        // Backfill only null IDs.
        const missing = await client.query(
            `SELECT ctid, name
             FROM crops
             WHERE id IS NULL`
        );

        console.log(`Crops with id IS NULL: ${missing.rows.length}`);

        if (missing.rows.length === 0) {
            console.log('No backfill needed.');
            return;
        }

        await client.query('BEGIN');
        for (const row of missing.rows) {
            const newId = randomUUID();
            await client.query(
                `UPDATE crops
                 SET id = $1
                 WHERE ctid = $2`,
                [newId, row.ctid]
            );
            console.log(`Updated crop "${row.name || '(unnamed)'}" -> ${newId}`);
        }
        await client.query('COMMIT');

        const stillMissing = await client.query(
            `SELECT COUNT(*)::int AS count
             FROM crops
             WHERE id IS NULL`
        );
        console.log(`Backfill complete. Remaining NULL ids: ${stillMissing.rows[0].count}`);
    } catch (error) {
        if (client) {
            try {
                await client.query('ROLLBACK');
            } catch (_) {
                // no-op
            }
        }
        console.error('Backfill failed:', error.message);
        process.exitCode = 1;
    } finally {
        if (client) client.release();
        await pool.end();
    }
}

main();

