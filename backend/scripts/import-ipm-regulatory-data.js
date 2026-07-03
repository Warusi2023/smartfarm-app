/**
 * Import illustrative regional regulatory rows for IPM example actives.
 *
 * Usage:
 *   node backend/scripts/import-ipm-regulatory-data.js
 *   node backend/scripts/import-ipm-regulatory-data.js --region=FJ
 *
 * Safe to re-run: replaces only rows tagged with the illustrative source_ref for that region.
 */

require('dotenv').config();
const { Pool } = require('pg');
const logger = require('../utils/logger');
const { getPostgresSSLConfig } = require('../utils/ssl-config');
const {
    buildRegulatorySeedEntries,
    listSupportedSeedRegions
} = require('../services/ipmIntelligence/regulatorySeedBuilder');
const { ILLUSTRATIVE_SEED_SOURCE_REF } = require('../data/ipmRegulatory/constants');

function parseRegionArg(argv) {
    const flag = argv.find((arg) => arg.startsWith('--region='));
    if (flag) {
        return flag.split('=')[1];
    }
    return 'FJ';
}

async function clearIllustrativeRows(client, regionCode, sourceRef) {
    const res = await client.query(
        `DELETE FROM crop_chemical_regulatory_status
         WHERE region_code = $1 AND source_ref = $2`,
        [regionCode, sourceRef]
    );
    return res.rowCount;
}

async function upsertRegulatoryRow(client, entry) {
    await client.query(
        `INSERT INTO crop_chemical_regulatory_status (
            region_code, active_ingredient, crop_key, status, source_ref, notes
         ) VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (region_code, active_ingredient, crop_key)
         DO UPDATE SET
            status = EXCLUDED.status,
            source_ref = EXCLUDED.source_ref,
            notes = EXCLUDED.notes`,
        [
            entry.regionCode,
            entry.activeIngredient,
            entry.cropKey,
            entry.status,
            entry.sourceRef,
            entry.notes
        ]
    );
}

async function importRegulatorySeed(regionCode) {
    const entries = buildRegulatorySeedEntries(regionCode);
    const normalizedRegion = entries[0]?.regionCode || String(regionCode).toUpperCase();

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: getPostgresSSLConfig(process.env.DATABASE_URL),
        max: 3
    });

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const removed = await clearIllustrativeRows(client, normalizedRegion, ILLUSTRATIVE_SEED_SOURCE_REF);
        for (const entry of entries) {
            await upsertRegulatoryRow(client, entry);
        }
        await client.query('COMMIT');
        logger.info('IPM regulatory seed import complete', {
            region: normalizedRegion,
            removed,
            inserted: entries.length,
            crops: [...new Set(entries.map((entry) => entry.cropKey))].length
        });
        return { region: normalizedRegion, removed, inserted: entries.length };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

async function main() {
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not set. Aborting.');
        process.exit(1);
    }

    const regionCode = parseRegionArg(process.argv.slice(2));
    if (!listSupportedSeedRegions().includes(String(regionCode).toUpperCase())) {
        console.error(`Unsupported region: ${regionCode}. Supported: ${listSupportedSeedRegions().join(', ')}`);
        process.exit(1);
    }

    try {
        await importRegulatorySeed(regionCode);
    } catch (error) {
        logger.errorWithContext('IPM regulatory seed import failed', { error, regionCode });
        process.exitCode = 1;
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    parseRegionArg,
    importRegulatorySeed,
    clearIllustrativeRows,
    upsertRegulatoryRow
};
