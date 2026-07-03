/**
 * Build crop_chemical_regulatory_status seed rows from shipped IPM JS content.
 * Keeps active_ingredient strings aligned with crop_chemical_options import.
 */

const { IMPORT_KEYS, sourceForKey } = require('../../scripts/import-ipm-reference-data');

/** Marker source_ref — only rows with this ref are replaced on re-import */
const ILLUSTRATIVE_SEED_SOURCE_REF = 'smartfarm:ipm_illustrative_seed_v1';

const ILLUSTRATIVE_SEED_NOTES =
    'Illustrative display approval for example actives in SmartFarm IPM panels. ' +
    'Does not replace Fiji MAAF Pesticides Register, Biosecurity Authority of Fiji guidance, ' +
    'or on-product label verification. Confirm with a local agronomist before use.';

/** @type {Record<string, { regionCode: string, status: string, sourceRef: string, notes: string }>} */
const REGION_SEED_PROFILES = {
    FJ: {
        regionCode: 'FJ',
        status: 'allowed',
        sourceRef: ILLUSTRATIVE_SEED_SOURCE_REF,
        notes: ILLUSTRATIVE_SEED_NOTES
    }
};

/**
 * @param {string} regionCode
 * @param {{ cropKeys?: string[], status?: string, sourceRef?: string, notes?: string }} [overrides]
 * @returns {Array<{ regionCode: string, cropKey: string, activeIngredient: string, status: string, sourceRef: string, notes: string }>}
 */
function buildRegulatorySeedEntries(regionCode, overrides = {}) {
    const profile = REGION_SEED_PROFILES[String(regionCode || '').toUpperCase()];
    if (!profile) {
        throw new Error(`No regulatory seed profile for region: ${regionCode}`);
    }

    const cropKeys = overrides.cropKeys || IMPORT_KEYS;
    const status = overrides.status || profile.status;
    const sourceRef = overrides.sourceRef || profile.sourceRef;
    const notes = overrides.notes || profile.notes;
    const normalizedRegion = profile.regionCode;
    const entries = [];

    for (const cropKey of cropKeys) {
        const source = sourceForKey(cropKey);
        const actives = source?.chemicalActives?.actives || [];
        for (const activeIngredient of actives) {
            const trimmed = String(activeIngredient || '').trim();
            if (!trimmed) {
                continue;
            }
            entries.push({
                regionCode: normalizedRegion,
                cropKey,
                activeIngredient: trimmed,
                status,
                sourceRef,
                notes
            });
        }
    }

    return entries;
}

function listSupportedSeedRegions() {
    return Object.keys(REGION_SEED_PROFILES);
}

module.exports = {
    ILLUSTRATIVE_SEED_SOURCE_REF,
    ILLUSTRATIVE_SEED_NOTES,
    REGION_SEED_PROFILES,
    buildRegulatorySeedEntries,
    listSupportedSeedRegions
};
