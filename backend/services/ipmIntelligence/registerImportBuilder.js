/**
 * Build DB rows for register-backed IPM chemical + regulatory imports.
 */

const { ILLUSTRATIVE_SEED_SOURCE_REF } = require('../../data/ipmRegulatory/constants');
const { CHEMICAL_SAFETY_NOTE } = require('../../data/ipmConstants');
const { getRegisterModule } = require('../../data/ipmRegulatory/regions/index');

/**
 * @param {string} regionCode
 * @param {string[]} [cropKeys]
 */
function buildRegisterImportPlan(regionCode, cropKeys) {
    const module = getRegisterModule(regionCode);
    if (!module) {
        throw new Error(`No register module for region: ${regionCode}`);
    }

    const normalizedRegion = module.regionCode;
    const keys = cropKeys || module.cropKeys;
    const chemicals = [];
    const regulatory = [];

    for (const cropKey of keys) {
        const actives = module.getRegisterActivesForCrop(cropKey);
        let sortOrder = 1;
        for (const active of actives) {
            chemicals.push({
                regionCode: normalizedRegion,
                cropKey,
                activeIngredient: active.activeIngredient,
                productClass: active.productClass,
                isExampleOnly: false,
                mainPestGroups: active.targetDescription || '',
                safetyNote: CHEMICAL_SAFETY_NOTE,
                sortOrder: sortOrder++
            });
            regulatory.push({
                regionCode: normalizedRegion,
                cropKey,
                activeIngredient: active.activeIngredient,
                status: active.status,
                sourceRef: active.sourceRef,
                notes: active.notes,
                productName: active.productName || null,
                registrationNumber: active.registrationNumber || null
            });
        }
    }

    return {
        regionCode: normalizedRegion,
        cropKeys: keys,
        chemicals,
        regulatory,
        illustrativeSourceRef: ILLUSTRATIVE_SEED_SOURCE_REF
    };
}

function isIllustrativeSourceRef(sourceRef) {
    return String(sourceRef || '').startsWith(ILLUSTRATIVE_SEED_SOURCE_REF);
}

function isRegisterBackedSourceRef(sourceRef) {
    return Boolean(sourceRef) && !isIllustrativeSourceRef(sourceRef);
}

module.exports = {
    buildRegisterImportPlan,
    isIllustrativeSourceRef,
    isRegisterBackedSourceRef
};
