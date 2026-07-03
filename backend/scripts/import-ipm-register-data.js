/**
 * Import MAAF register-backed chemical options and regulatory rows for Fiji priority crops.
 *
 * Usage:
 *   node backend/scripts/import-ipm-register-data.js
 *   node backend/scripts/import-ipm-register-data.js --region=FJ
 *
 * Replaces illustrative regulatory rows for imported crops and adds region-specific
 * register-backed crop_chemical_options (is_example_only = false, region_codes = ['FJ']).
 */

require('dotenv').config();
const { Pool } = require('pg');
const logger = require('../utils/logger');
const { getPostgresSSLConfig } = require('../utils/ssl-config');
const { ILLUSTRATIVE_SEED_SOURCE_REF, MAAF_FJ_REGISTER_SOURCE_PREFIX } = require('../data/ipmRegulatory/constants');
const { buildRegisterImportPlan } = require('../services/ipmIntelligence/registerImportBuilder');
const { upsertRegulatoryRow } = require('./import-ipm-regulatory-data');
const { getRegisterModule } = require('../data/ipmRegulatory/regions/index');

function parseRegionArg(argv) {
    const flag = argv.find((arg) => arg.startsWith('--region='));
    if (flag) {
        return flag.split('=')[1];
    }
    return 'FJ';
}

async function clearRegisterChemicals(client, cropKey, regionCode) {
    const res = await client.query(
        `DELETE FROM crop_chemical_targets
         WHERE crop_chemical_id IN (
            SELECT id FROM crop_chemical_options
            WHERE crop_key = $1
              AND is_example_only = FALSE
              AND region_codes = ARRAY[$2]::text[]
         )`,
        [cropKey, regionCode]
    );
    const deleted = await client.query(
        `DELETE FROM crop_chemical_options
         WHERE crop_key = $1
           AND is_example_only = FALSE
           AND region_codes = ARRAY[$2]::text[]`,
        [cropKey, regionCode]
    );
    return { targets: res.rowCount, chemicals: deleted.rowCount };
}

async function clearIllustrativeRegulatoryForCrop(client, regionCode, cropKey) {
    const res = await client.query(
        `DELETE FROM crop_chemical_regulatory_status
         WHERE region_code = $1
           AND crop_key = $2
           AND source_ref = $3`,
        [regionCode, cropKey, ILLUSTRATIVE_SEED_SOURCE_REF]
    );
    return res.rowCount;
}

async function clearRegisterRegulatoryForCrop(client, regionCode, cropKey) {
    const res = await client.query(
        `DELETE FROM crop_chemical_regulatory_status
         WHERE region_code = $1
           AND crop_key = $2
           AND source_ref LIKE $3`,
        [regionCode, cropKey, `${MAAF_FJ_REGISTER_SOURCE_PREFIX}%`]
    );
    const res2 = await client.query(
        `DELETE FROM crop_chemical_regulatory_status
         WHERE region_code = $1
           AND crop_key = $2
           AND source_ref LIKE 'maaf:fj:pesticides_act_1971%'`,
        [regionCode, cropKey]
    );
    return res.rowCount + res2.rowCount;
}

async function insertRegisterChemical(client, chemical) {
    await client.query(
        `INSERT INTO crop_chemical_options (
            crop_key, active_ingredient, product_class, region_codes, is_example_only,
            main_pest_groups, safety_note, sort_order
         ) VALUES ($1, $2, $3, ARRAY[$4]::text[], FALSE, $5, $6, $7)`,
        [
            chemical.cropKey,
            chemical.activeIngredient,
            chemical.productClass,
            chemical.regionCode,
            chemical.mainPestGroups || '',
            chemical.safetyNote || '',
            chemical.sortOrder
        ]
    );
}

async function importRegisterData(regionCode) {
    const plan = buildRegisterImportPlan(regionCode);
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: getPostgresSSLConfig(process.env.DATABASE_URL),
        max: 3
    });

    const client = await pool.connect();
    const stats = {
        region: plan.regionCode,
        crops: plan.cropKeys.length,
        chemicalsInserted: 0,
        regulatoryInserted: 0,
        illustrativeRemoved: 0,
        registerChemicalsCleared: 0
    };

    try {
        await client.query('BEGIN');
        for (const cropKey of plan.cropKeys) {
            const cleared = await clearRegisterChemicals(client, cropKey, plan.regionCode);
            stats.registerChemicalsCleared += cleared.chemicals;
            stats.illustrativeRemoved += await clearIllustrativeRegulatoryForCrop(
                client,
                plan.regionCode,
                cropKey
            );
            await clearRegisterRegulatoryForCrop(client, plan.regionCode, cropKey);
        }

        for (const chemical of plan.chemicals) {
            await insertRegisterChemical(client, chemical);
            stats.chemicalsInserted += 1;
        }
        for (const entry of plan.regulatory) {
            await upsertRegulatoryRow(client, {
                regionCode: entry.regionCode,
                cropKey: entry.cropKey,
                activeIngredient: entry.activeIngredient,
                status: entry.status,
                sourceRef: entry.sourceRef,
                notes: entry.notes
            });
            stats.regulatoryInserted += 1;
        }

        await client.query('COMMIT');
        logger.info('IPM register import complete', stats);
        return stats;
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
    if (!getRegisterModule(regionCode)) {
        console.error(`Unsupported region: ${regionCode}. Supported: ${require('../data/ipmRegulatory/regions/index').listRegisterRegions().join(', ')}`);
        process.exit(1);
    }

    try {
        await importRegisterData(regionCode);
    } catch (error) {
        logger.errorWithContext('IPM register import failed', { error, regionCode });
        process.exitCode = 1;
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    importRegisterData,
    clearRegisterChemicals,
    clearIllustrativeRegulatoryForCrop
};
