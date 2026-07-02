/**
 * Region matching and chemical display constraints for IPM reference data.
 */

const ALLOWED_REGULATORY_STATUSES = new Set(['allowed', 'restricted', 'requires_license']);

function normalizeRegionCode(regionCode) {
    if (!regionCode || typeof regionCode !== 'string') {
        return null;
    }
    const trimmed = regionCode.trim().toUpperCase();
    return trimmed || null;
}

/**
 * @param {string[] | null | undefined} regionCodes
 * @param {string | null | undefined} regionCode
 */
function regionMatches(regionCodes, regionCode) {
    const codes = Array.isArray(regionCodes) ? regionCodes : ['*'];
    if (codes.includes('*')) {
        return true;
    }
    const normalized = normalizeRegionCode(regionCode);
    if (!normalized) {
        return false;
    }
    return codes.some((code) => String(code).trim().toUpperCase() === normalized);
}

/**
 * @param {object[]} regulatoryRows
 * @param {string} activeIngredient
 * @param {string | null} cropKey
 * @param {string | null} regionCode
 */
function findRegulatoryStatus(regulatoryRows, activeIngredient, cropKey, regionCode) {
    const normalizedRegion = normalizeRegionCode(regionCode);
    if (!normalizedRegion) {
        return null;
    }
    const ingredient = String(activeIngredient || '').trim().toLowerCase();
    const matches = regulatoryRows.filter((row) => {
        if (String(row.active_ingredient || '').trim().toLowerCase() !== ingredient) {
            return false;
        }
        if (String(row.region_code || '').trim().toUpperCase() !== normalizedRegion) {
            return false;
        }
        if (row.crop_key && cropKey && row.crop_key !== cropKey) {
            return false;
        }
        return true;
    });

    const cropSpecific = matches.find((row) => row.crop_key === cropKey);
    if (cropSpecific) {
        return cropSpecific;
    }
    return matches.find((row) => !row.crop_key) || matches[0] || null;
}

/**
 * Example-only actives require an explicit regulatory row for the farm region.
 *
 * @param {object} chemical
 * @param {object | null} regulatoryStatus
 * @param {string | null | undefined} regionCode
 */
function isChemicallyDisplayable(chemical, regulatoryStatus, regionCode) {
    if (!normalizeRegionCode(regionCode)) {
        return false;
    }
    if (!regionMatches(chemical.region_codes, regionCode)) {
        return false;
    }
    if (regulatoryStatus?.status === 'banned') {
        return false;
    }
    if (chemical.is_example_only) {
        if (!regulatoryStatus) {
            return false;
        }
        return ALLOWED_REGULATORY_STATUSES.has(regulatoryStatus.status);
    }
    if (!regulatoryStatus) {
        return false;
    }
    return ALLOWED_REGULATORY_STATUSES.has(regulatoryStatus.status);
}

/**
 * @param {object[]} chemicals
 * @param {object[]} regulatoryRows
 * @param {string | null | undefined} regionCode
 * @param {string} cropKey
 */
function filterChemicalOptions(chemicals, regulatoryRows, regionCode, cropKey) {
    return chemicals.filter((chemical) => {
        const regulatoryStatus = findRegulatoryStatus(
            regulatoryRows,
            chemical.active_ingredient,
            cropKey,
            regionCode
        );
        return isChemicallyDisplayable(chemical, regulatoryStatus, regionCode);
    });
}

module.exports = {
    ALLOWED_REGULATORY_STATUSES,
    normalizeRegionCode,
    regionMatches,
    findRegulatoryStatus,
    isChemicallyDisplayable,
    filterChemicalOptions
};
