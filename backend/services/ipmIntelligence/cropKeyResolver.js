/**
 * Resolve planting crop names to ipm_crop_catalog.crop_key slugs.
 */

const { normalizeCropKey } = require('../../data/cropPestProtection');

const DEFAULT_CROP_KEY = 'vegetable_default';

function slugify(name) {
    return String(name || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '');
}

/**
 * @param {string} cropName
 * @returns {{ cropKey: string | null, usedDefault: boolean }}
 */
function resolveIpmCropKey(cropName) {
    const specific = normalizeCropKey(cropName);
    if (specific) {
        return { cropKey: specific, usedDefault: false };
    }
    const slug = slugify(cropName);
    if (slug && slug !== DEFAULT_CROP_KEY) {
        return { cropKey: null, usedDefault: true };
    }
    return { cropKey: DEFAULT_CROP_KEY, usedDefault: true };
}

module.exports = {
    DEFAULT_CROP_KEY,
    slugify,
    resolveIpmCropKey
};
