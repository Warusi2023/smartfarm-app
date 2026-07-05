/**
 * Import IPM reference content from cropPestProtection.js into ipm_crop_catalog tables.
 *
 * Usage:
 *   node backend/scripts/import-ipm-reference-data.js
 *
 * Safe to re-run: clears and re-imports content for all shipped crop keys.
 */

require('dotenv').config();
const { Pool } = require('pg');
const logger = require('../utils/logger');
const { getPostgresSSLConfig } = require('../utils/ssl-config');
const {
    CROP_IPM,
    DEFAULT_VEGETABLE_IPM,
    CHEMICAL_SAFETY_NOTE
} = require('../data/cropPestProtection');
const { CEREAL_CROP_KEYS } = require('../data/cerealPestProtection');
const { ROOT_TUBER_CROP_KEYS } = require('../data/rootTuberPestProtection');
const { GRAIN_LEGUME_CROP_KEYS } = require('../data/grainLegumePestProtection');
const { VEGETABLE_FAMILY_CROP_KEYS } = require('../data/vegetableFamilyPestProtection');
const { FORAGE_FAMILY_CROP_KEYS } = require('../data/forageFamilyPestProtection');
const { normalizeLabel } = require('../services/ipmIntelligence/labelNormalizer');

const VEGETABLE_IMPORT_KEYS = ['vegetable_default', 'tomato', 'capsicum', ...VEGETABLE_FAMILY_CROP_KEYS];
const IMPORT_KEYS = [
    ...VEGETABLE_IMPORT_KEYS,
    ...CEREAL_CROP_KEYS,
    ...ROOT_TUBER_CROP_KEYS,
    ...GRAIN_LEGUME_CROP_KEYS,
    ...FORAGE_FAMILY_CROP_KEYS
];

const CATALOG_META = {
    vegetable_default: {
        displayName: 'Vegetable crop (general template)',
        cropGroup: 'vegetable',
        isDefaultTemplate: true
    },
    tomato: { displayName: 'Tomato', cropGroup: 'vegetable', isDefaultTemplate: false },
    capsicum: { displayName: 'Capsicum (bell pepper)', cropGroup: 'vegetable', isDefaultTemplate: false },
    leafy_greens: { displayName: 'Leafy greens', cropGroup: 'vegetable', isDefaultTemplate: false },
    wheat: { displayName: 'Wheat', cropGroup: 'cereal', isDefaultTemplate: false },
    rice: { displayName: 'Rice (paddy)', cropGroup: 'cereal', isDefaultTemplate: false },
    maize: { displayName: 'Maize / corn', cropGroup: 'cereal', isDefaultTemplate: false },
    barley: { displayName: 'Barley', cropGroup: 'cereal', isDefaultTemplate: false },
    sorghum: { displayName: 'Sorghum', cropGroup: 'cereal', isDefaultTemplate: false },
    millet: { displayName: 'Millet', cropGroup: 'cereal', isDefaultTemplate: false },
    oats: { displayName: 'Oats', cropGroup: 'cereal', isDefaultTemplate: false },
    rye: { displayName: 'Rye', cropGroup: 'cereal', isDefaultTemplate: false },
    triticale: { displayName: 'Triticale', cropGroup: 'cereal', isDefaultTemplate: false },
    buckwheat: { displayName: 'Buckwheat', cropGroup: 'cereal', isDefaultTemplate: false },
    fonio: { displayName: 'Fonio / small millets', cropGroup: 'cereal', isDefaultTemplate: false },
    potato: { displayName: 'Potato', cropGroup: 'root_tuber', isDefaultTemplate: false },
    cassava: { displayName: 'Cassava (manioc)', cropGroup: 'root_tuber', isDefaultTemplate: false },
    sweet_potato: { displayName: 'Sweet potato', cropGroup: 'root_tuber', isDefaultTemplate: false },
    yam: { displayName: 'Yam', cropGroup: 'root_tuber', isDefaultTemplate: false },
    taro: { displayName: 'Taro / cocoyam', cropGroup: 'root_tuber', isDefaultTemplate: false },
    aroid: { displayName: 'Aroid (tannia)', cropGroup: 'root_tuber', isDefaultTemplate: false },
    sago_palm: { displayName: 'Sago palm', cropGroup: 'root_tuber', isDefaultTemplate: false },
    soybean: { displayName: 'Soybean', cropGroup: 'legume', isDefaultTemplate: false },
    common_bean: { displayName: 'Common bean', cropGroup: 'legume', isDefaultTemplate: false },
    pea: { displayName: 'Pea', cropGroup: 'legume', isDefaultTemplate: false },
    chickpea: { displayName: 'Chickpea', cropGroup: 'legume', isDefaultTemplate: false },
    lentil: { displayName: 'Lentil', cropGroup: 'legume', isDefaultTemplate: false },
    pigeon_pea: { displayName: 'Pigeon pea', cropGroup: 'legume', isDefaultTemplate: false },
    cowpea: { displayName: 'Cowpea', cropGroup: 'legume', isDefaultTemplate: false },
    broad_bean: { displayName: 'Broad / fava bean', cropGroup: 'legume', isDefaultTemplate: false },
    groundnut: { displayName: 'Groundnut / peanut', cropGroup: 'legume', isDefaultTemplate: false },
    alfalfa: { displayName: 'Alfalfa / lucerne', cropGroup: 'forage', isDefaultTemplate: false },
    clover_forage: { displayName: 'Clover species (forage)', cropGroup: 'forage', isDefaultTemplate: false },
    silage_maize: { displayName: 'Silage maize', cropGroup: 'forage', isDefaultTemplate: false },
    pasture_grasses: { displayName: 'Pasture grasses', cropGroup: 'forage', isDefaultTemplate: false }
};

function inferPestType(name) {
    const text = normalizeLabel(name);
    if (/\bvirus\b|mosaic virus|\bvirosis\b/.test(text)) {
        return 'virus';
    }
    if (/\bblight\b|\brusts?\b|\brot\b|\brots\b|\bmildew\b|\bsigatoka\b|\bfungus\b|\bfungal\b/.test(text)) {
        return 'fungus';
    }
    if (/\bmites?\b|\bacarid\b/.test(text)) {
        return 'mite';
    }
    if (/\bnematodes?\b/.test(text)) {
        return 'nematode';
    }
    return 'insect';
}

function inferBeneficialType(name) {
    const text = normalizeLabel(name);
    if (/\b(bt|neem)\b|biological product|biorational|insecticidal soap|horticultural oil/.test(text)) {
        return 'biological_product';
    }
    if (/\bparasitoids?\b|\bwasps?\b/.test(text)) {
        return 'parasitoid';
    }
    if (
        /\bladybirds?\b|\blady beetles?\b|\blacewings?\b|\bhoverflies?\b|\bsyrphids?\b|\bpredatory mites?\b|\bground beetles?\b/.test(
            text
        )
    ) {
        return 'predator';
    }
    if (/\bpollinators?\b|\bbutterflies?\b|\bbutterfly\b|\bbees?\b/.test(text)) {
        return 'pollinator';
    }
    return 'predator';
}

function inferProductClass(active) {
    const text = normalizeLabel(active);
    if (/mancozeb|chlorothalonil|azoxystrobin|fungicide/.test(text)) {
        return 'fungicide';
    }
    if (/herbicide|glyphosate/.test(text)) {
        return 'herbicide';
    }
    if (/miticide|acaricide|mite/.test(text)) {
        return 'acaricide';
    }
    return 'insecticide';
}

function sourceForKey(cropKey) {
    if (cropKey === 'vegetable_default') {
        return {
            cropName: CATALOG_META.vegetable_default.displayName,
            ...DEFAULT_VEGETABLE_IPM
        };
    }
    return CROP_IPM[cropKey];
}

async function clearCropContent(client, cropKey) {
    await client.query('DELETE FROM crop_chemical_targets WHERE crop_chemical_id IN (SELECT id FROM crop_chemical_options WHERE crop_key = $1)', [cropKey]);
    await client.query('DELETE FROM crop_chemical_options WHERE crop_key = $1', [cropKey]);
    await client.query('DELETE FROM crop_beneficials WHERE crop_key = $1', [cropKey]);
    await client.query('DELETE FROM crop_pests WHERE crop_key = $1', [cropKey]);
    await client.query('DELETE FROM crop_ipm_field_signs WHERE crop_key = $1', [cropKey]);
}

async function upsertCatalog(client, cropKey) {
    const meta = CATALOG_META[cropKey];
    const source = sourceForKey(cropKey);
    const maturityNotes = source?.maturityNotes || null;
    await client.query(
        `INSERT INTO ipm_crop_catalog (
            crop_key, display_name, crop_group, is_default_template, population_status, notes, maturity_notes
         ) VALUES ($1, $2, $3, $4, 'complete', $5, $6)
         ON CONFLICT (crop_key) DO UPDATE SET
            display_name = EXCLUDED.display_name,
            crop_group = EXCLUDED.crop_group,
            is_default_template = EXCLUDED.is_default_template,
            population_status = 'complete',
            notes = EXCLUDED.notes,
            maturity_notes = EXCLUDED.maturity_notes,
            updated_at = NOW()`,
        [
            cropKey,
            meta.displayName,
            meta.cropGroup,
            meta.isDefaultTemplate,
            `Imported from cropPestProtection.js on ${new Date().toISOString().slice(0, 10)}`,
            maturityNotes
        ]
    );
}

async function importCrop(client, cropKey) {
    const source = sourceForKey(cropKey);
    if (!source) {
        throw new Error(`No source data for crop key: ${cropKey}`);
    }

    await upsertCatalog(client, cropKey);
    await clearCropContent(client, cropKey);

    const signs = source.damageToLookFor || [];
    for (let i = 0; i < signs.length; i += 1) {
        await client.query(
            `INSERT INTO crop_ipm_field_signs (crop_key, sign_text, sort_order)
             VALUES ($1, $2, $3)`,
            [cropKey, signs[i], i + 1]
        );
    }

    for (let i = 0; i < source.pests.length; i += 1) {
        const pest = source.pests[i];
        await client.query(
            `INSERT INTO crop_pests (
                crop_key, pest_name_common, pest_type, damage_description, sort_order
             ) VALUES ($1, $2, $3, $4, $5)`,
            [cropKey, pest.name, inferPestType(pest.name), pest.damageDescription || '', i + 1]
        );
    }

    for (let i = 0; i < source.beneficials.length; i += 1) {
        const beneficial = source.beneficials[i];
        await client.query(
            `INSERT INTO crop_beneficials (
                crop_key, beneficial_name_common, beneficial_type, description, sort_order
             ) VALUES ($1, $2, $3, $4, $5)`,
            [
                cropKey,
                beneficial.name,
                inferBeneficialType(beneficial.name),
                beneficial.description || '',
                i + 1
            ]
        );
    }

    const chemical = source.chemicalActives || {};
    const actives = chemical.actives || [];
    for (let i = 0; i < actives.length; i += 1) {
        await client.query(
            `INSERT INTO crop_chemical_options (
                crop_key, active_ingredient, product_class, is_example_only,
                main_pest_groups, safety_note, sort_order
             ) VALUES ($1, $2, $3, TRUE, $4, $5, $6)`,
            [
                cropKey,
                actives[i],
                inferProductClass(actives[i]),
                chemical.mainPestGroups || '',
                chemical.safetyNote || CHEMICAL_SAFETY_NOTE,
                i + 1
            ]
        );
    }
}

async function main() {
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not set. Aborting.');
        process.exit(1);
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: getPostgresSSLConfig(process.env.DATABASE_URL),
        max: 3
    });

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        for (const cropKey of IMPORT_KEYS) {
            await importCrop(client, cropKey);
            logger.info('Imported IPM reference data', { cropKey });
        }
        await client.query('COMMIT');
        logger.info('IPM reference import complete', { crops: IMPORT_KEYS });
    } catch (error) {
        await client.query('ROLLBACK');
        logger.errorWithContext('IPM reference import failed', { error });
        process.exitCode = 1;
    } finally {
        client.release();
        await pool.end();
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    IMPORT_KEYS,
    sourceForKey,
    inferPestType,
    inferBeneficialType,
    inferProductClass,
    importCrop,
    clearCropContent
};
