/**
 * Load IPM panel data from Postgres with JS fallback.
 */

const logger = require('../../utils/logger');
const {
    resolveCropPestProtection,
    listPestProtectionCrops,
    HIDDEN_LIST_CROP_KEYS,
    CHEMICAL_SAFETY_NOTE
} = require('../../data/cropPestProtection');
const { resolveIpmCropKey, DEFAULT_CROP_KEY } = require('./cropKeyResolver');
const { filterChemicalOptions, normalizeRegionCode, regionMatches, findRegulatoryStatus, hasRegisterBackedRegulatory } = require('./regionFilter');

function mapPestRow(row) {
    return {
        name: row.pest_name_common,
        damageDescription: row.damage_description || row.notes || ''
    };
}

function mapBeneficialRow(row) {
    return {
        name: row.beneficial_name_common,
        description: row.description || row.notes || ''
    };
}

function buildChemicalActives(chemicalRows, filteredChemicals, regionCode, regulatoryRows, cropKey) {
    const summaryRow = chemicalRows.find((row) => row.main_pest_groups) || chemicalRows[0];
    const actives = filteredChemicals.map((row) => row.active_ingredient);
    const payload = {
        actives,
        mainPestGroups: summaryRow?.main_pest_groups || '',
        safetyNote: summaryRow?.safety_note || CHEMICAL_SAFETY_NOTE
    };

    const registerBacked = hasRegisterBackedRegulatory(regulatoryRows, regionCode, cropKey);
    if (registerBacked && actives.length > 0) {
        payload.chemicalTier = 'register_backed';
        payload.regulatorySource =
            'Fiji MAAF Pesticides Register framework — verify registration number on product label';
        payload.activeDetails = filteredChemicals.map((row) => {
            const regulatory = findRegulatoryStatus(
                regulatoryRows,
                row.active_ingredient,
                cropKey,
                regionCode
            );
            return {
                activeIngredient: row.active_ingredient,
                status: regulatory?.status || null,
                sourceRef: regulatory?.source_ref || null,
                productName: regulatory?.product_name || null,
                registrationNumber: regulatory?.registration_number || null
            };
        });
    }

    if (!normalizeRegionCode(regionCode)) {
        payload.regionalNotice =
            'Localized chemical actives require a farm region. Cultural controls and beneficials are shown below.';
    } else if (actives.length === 0) {
        payload.regionalNotice =
            'No registered actives are approved for display in this region. Consult a local agronomist.';
    }

    return payload;
}

async function loadCatalog(pool, cropKey) {
    const res = await pool.query(
        `SELECT crop_key, display_name, crop_group, is_default_template, population_status, maturity_notes
         FROM ipm_crop_catalog
         WHERE crop_key = $1`,
        [cropKey]
    );
    return res.rows[0] || null;
}

async function loadFieldSigns(pool, cropKey, regionCode) {
    const res = await pool.query(
        `SELECT sign_text, region_codes
         FROM crop_ipm_field_signs
         WHERE crop_key = $1
         ORDER BY sort_order ASC, created_at ASC`,
        [cropKey]
    );
    return res.rows
        .filter((row) => regionMatches(row.region_codes, regionCode))
        .map((row) => row.sign_text);
}

async function loadPests(pool, cropKey, regionCode) {
    const res = await pool.query(
        `SELECT pest_name_common, damage_description, notes, region_codes
         FROM crop_pests
         WHERE crop_key = $1
         ORDER BY sort_order ASC, created_at ASC`,
        [cropKey]
    );
    return res.rows
        .filter((row) => regionMatches(row.region_codes, regionCode))
        .map(mapPestRow);
}

async function loadBeneficials(pool, cropKey, regionCode) {
    const res = await pool.query(
        `SELECT beneficial_name_common, description, notes, region_codes
         FROM crop_beneficials
         WHERE crop_key = $1
         ORDER BY sort_order ASC, created_at ASC`,
        [cropKey]
    );
    return res.rows
        .filter((row) => regionMatches(row.region_codes, regionCode))
        .map(mapBeneficialRow);
}

async function loadChemicalOptions(pool, cropKey) {
    const res = await pool.query(
        `SELECT active_ingredient, region_codes, is_example_only, main_pest_groups, safety_note, sort_order
         FROM crop_chemical_options
         WHERE crop_key = $1
         ORDER BY sort_order ASC, created_at ASC`,
        [cropKey]
    );
    return res.rows;
}

async function loadRegulatoryStatuses(pool, cropKey, regionCode) {
    const normalizedRegion = normalizeRegionCode(regionCode);
    if (!normalizedRegion) {
        return [];
    }
    const res = await pool.query(
        `SELECT region_code, active_ingredient, crop_key, status, source_ref, notes,
                product_name, registration_number
         FROM crop_chemical_regulatory_status
         WHERE region_code = $1
           AND (crop_key IS NULL OR crop_key = $2)`,
        [normalizedRegion, cropKey]
    );
    return res.rows;
}

function hasPanelContent({ fieldSigns, pests, beneficials }) {
    return fieldSigns.length > 0 || pests.length > 0 || beneficials.length > 0;
}

async function assemblePanelFromDb(pool, catalog, cropName, regionCode) {
    const cropKey = catalog.crop_key;
    const [fieldSigns, pests, beneficials, chemicalRows, regulatoryRows] = await Promise.all([
        loadFieldSigns(pool, cropKey, regionCode),
        loadPests(pool, cropKey, regionCode),
        loadBeneficials(pool, cropKey, regionCode),
        loadChemicalOptions(pool, cropKey),
        loadRegulatoryStatuses(pool, cropKey, regionCode)
    ]);

    if (!hasPanelContent({ fieldSigns, pests, beneficials })) {
        return null;
    }

    const filteredChemicals = filterChemicalOptions(
        chemicalRows,
        regulatoryRows,
        regionCode,
        cropKey
    );
    const displayName = catalog.is_default_template
        ? ((cropName && String(cropName).trim()) || catalog.display_name)
        : catalog.display_name;

    return {
        cropKey,
        cropName: displayName,
        displayTitle: `Pests & protection for ${displayName}`,
        isDefaultTemplate: catalog.is_default_template,
        dataSource: 'database',
        pests,
        beneficials,
        chemicalActives: buildChemicalActives(chemicalRows, filteredChemicals, regionCode, regulatoryRows, cropKey),
        damageToLookFor: fieldSigns,
        maturityNotes: catalog.maturity_notes || null
    };
}

function jsFallbackPanel(jsPanel, reason, meta = {}) {
    logger.debug('IPM panel using JS fallback', { reason, ...meta });
    return { ...jsPanel, dataSource: 'js_fallback' };
}

/**
 * @param {import('pg').Pool | null} pool
 * @param {string} cropName
 * @param {{ regionCode?: string | null }} [options]
 */
async function getPestProtectionPanel(pool, cropName, options = {}) {
    const { regionCode = null } = options;
    const jsPanel = resolveCropPestProtection(cropName);
    const { cropKey, usedDefault } = resolveIpmCropKey(cropName);
    const lookupKey = cropKey || DEFAULT_CROP_KEY;

    if (!pool) {
        return jsFallbackPanel(jsPanel, 'pool_unavailable', { cropName, lookupKey });
    }

    try {
        const catalog = await loadCatalog(pool, lookupKey);
        if (!catalog || catalog.population_status !== 'complete') {
            return jsFallbackPanel(jsPanel, 'catalog_incomplete', {
                cropName,
                lookupKey,
                populationStatus: catalog?.population_status || null
            });
        }

        const dbPanel = await assemblePanelFromDb(pool, catalog, cropName, regionCode);
        if (!dbPanel) {
            return jsFallbackPanel(jsPanel, 'panel_empty', { cropName, lookupKey });
        }

        if (!normalizeRegionCode(regionCode)) {
            dbPanel.chemicalActives = jsPanel.chemicalActives;
            dbPanel._chemicalSource = 'js_fallback_no_region';
        }
        if (!dbPanel.maturityNotes && jsPanel.maturityNotes) {
            dbPanel.maturityNotes = jsPanel.maturityNotes;
        }

        if (usedDefault && !catalog.is_default_template) {
            dbPanel.isDefaultTemplate = true;
        }

        return dbPanel;
    } catch (error) {
        logger.warnWithContext('IPM repository DB load failed; using JS fallback', {
            cropName,
            lookupKey,
            error: error.message
        });
        return jsFallbackPanel(jsPanel, 'db_error', { cropName, lookupKey });
    }
}

/**
 * @param {import('pg').Pool | null} pool
 */
async function listDedicatedPestProtectionCrops(pool) {
    if (!pool) {
        return listPestProtectionCrops();
    }

    try {
        const res = await pool.query(
            `SELECT crop_key, display_name
             FROM ipm_crop_catalog
             WHERE is_default_template = FALSE
               AND population_status = 'complete'
             ORDER BY display_name ASC`
        );
        if (res.rows.length === 0) {
            return listPestProtectionCrops();
        }
        return res.rows
            .filter((row) => !HIDDEN_LIST_CROP_KEYS.has(row.crop_key))
            .map((row) => ({
                cropKey: row.crop_key,
                cropName: row.display_name
            }));
    } catch (error) {
        logger.warnWithContext('IPM crop list DB load failed; using JS fallback', {
            error: error.message
        });
        return listPestProtectionCrops();
    }
}

module.exports = {
    getPestProtectionPanel,
    listDedicatedPestProtectionCrops,
    assemblePanelFromDb,
    loadCatalog
};
