/**
 * ISO region → register data module registry.
 * Add new countries by creating a register file and registering it here.
 */

const fiji = require('../fijiMaafRegister');

/** @type {Record<string, { regionCode: string, cropKeys: string[], getRegisterActivesForCrop: (cropKey: string) => object[] }>} */
const REGION_REGISTER_MODULES = {
    FJ: {
        regionCode: 'FJ',
        cropKeys: fiji.FJ_REGISTER_CROP_KEYS,
        getRegisterActivesForCrop: fiji.getFijiRegisterActivesForCrop
    }
};

function listRegisterRegions() {
    return Object.keys(REGION_REGISTER_MODULES);
}

function getRegisterModule(regionCode) {
    return REGION_REGISTER_MODULES[String(regionCode || '').toUpperCase()] || null;
}

module.exports = {
    REGION_REGISTER_MODULES,
    listRegisterRegions,
    getRegisterModule
};
