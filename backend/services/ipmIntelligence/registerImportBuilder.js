/**
 * Build DB rows for register-backed IPM chemical + regulatory imports.
 */

const { ILLUSTRATIVE_SEED_SOURCE_REF } = require('../../data/ipmRegulatory/constants');
const { CHEMICAL_SAFETY_NOTE } = require('../../data/ipmConstants');
const {
    FJ_PRIORITY_CROP_KEYS,
    getFijiRegisterActivesForCrop
} = require('../../data/ipmRegulatory/fijiMaafRegister');

/**
 * @param {string} regionCode
 * @param {string[]} [cropKeys]
 */
function buildRegisterImportPlan(regionCode, cropKeys = FJ_PRIORITY_CROP_KEYS) {
    const normalizedRegion = String(regionCode || '').toUpperCase();
    const chemicals = [];
    const regulatory = [];

    for (const cropKey of cropKeys) {
        const actives = getFijiRegisterActivesForCrop(cropKey);
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
                notes: active.notes
            });
        }
    }

    return {
        regionCode: normalizedRegion,
        cropKeys,
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
