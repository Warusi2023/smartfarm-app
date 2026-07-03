/**
 * Fiji MAAF register-backed IPM actives — priority legumes and root/tubers first.
 *
 * Provenance: Fiji Pesticides Act 1971; MOA Plant Protection register (338 trade names, APPPC 2015).
 * MOA publicly promoted Bacillus thuringiensis for IPM-compatible caterpillar control (2015).
 *
 * Does NOT embed specific registration numbers — those vary by trade product and must be read from the label.
 */

const {
    MAAF_FJ_APPPC_2015_PROVENANCE,
    MAAF_FJ_PESTICIDES_ACT,
    REGISTER_VERIFY_NOTE
} = require('./constants');
const { GRAIN_LEGUME_CROP_KEYS } = require('../grainLegumePestProtection');
const { ROOT_TUBER_CROP_KEYS } = require('../rootTuberPestProtection');

/**
 * @typedef {object} RegisterActiveEntry
 * @property {string} activeIngredient
 * @property {string} productClass
 * @property {'allowed'|'restricted'|'requires_license'} status
 * @property {string} sourceRef
 * @property {string} notes
 * @property {string} [targetDescription]
 */

/** @type {Record<string, RegisterActiveEntry>} */
const FIJI_ACTIVES = {
    bt: {
        activeIngredient: 'Bacillus thuringiensis (Bt)',
        productClass: 'insecticide',
        status: 'allowed',
        sourceRef: `${MAAF_FJ_APPPC_2015_PROVENANCE};active:bacillus_thuringiensis;evidence:moa_bt_launch_2015`,
        notes: `MOA-promoted biological insecticide for caterpillar and pod-borer IPM. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'caterpillars, pod borers, loopers'
    },
    neem: {
        activeIngredient: 'Azadirachtin (neem extract)',
        productClass: 'insecticide',
        status: 'allowed',
        sourceRef: `${MAAF_FJ_APPPC_2015_PROVENANCE};active:azadirachtin`,
        notes: `Botanical biorational for aphids, whiteflies, and thrips. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'aphids, whiteflies, thrips'
    },
    soap: {
        activeIngredient: 'Potassium salts of fatty acids (insecticidal soap)',
        productClass: 'insecticide',
        status: 'allowed',
        sourceRef: `${MAAF_FJ_APPPC_2015_PROVENANCE};active:potassium_soap`,
        notes: `Soft-bodied pest control with lower impact on beneficials when used carefully. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'aphids, whiteflies, mites'
    },
    horticultural_oil: {
        activeIngredient: 'Horticultural mineral oil',
        productClass: 'insecticide',
        status: 'allowed',
        sourceRef: `${MAAF_FJ_APPPC_2015_PROVENANCE};active:horticultural_oil`,
        notes: `Suffocates eggs and soft-bodied pests; avoid high temperatures. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'aphids, mites, scales'
    },
    cypermethrin: {
        activeIngredient: 'Cypermethrin',
        productClass: 'insecticide',
        status: 'requires_license',
        sourceRef: `${MAAF_FJ_PESTICIDES_ACT};active:cypermethrin`,
        notes: `Synthetic pyrethroid for labeled chewing and sucking pests. Use only after scouting thresholds; protect beneficials. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'caterpillars, beetles, pod borers'
    },
    lambda_cyhalothrin: {
        activeIngredient: 'Lambda-cyhalothrin',
        productClass: 'insecticide',
        status: 'requires_license',
        sourceRef: `${MAAF_FJ_PESTICIDES_ACT};active:lambda_cyhalothrin`,
        notes: `Pyrethroid for pod feeders and leaf-chewing pests when thresholds are exceeded. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'pod borers, caterpillars, beetles'
    },
    imidacloprid: {
        activeIngredient: 'Imidacloprid',
        productClass: 'insecticide',
        status: 'requires_license',
        sourceRef: `${MAAF_FJ_PESTICIDES_ACT};active:imidacloprid`,
        notes: `Systemic neonicotinoid for aphids and jassids — use selectively; protect pollinators. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'aphids, jassids, thrips'
    },
    abamectin: {
        activeIngredient: 'Abamectin',
        productClass: 'acaricide',
        status: 'requires_license',
        sourceRef: `${MAAF_FJ_PESTICIDES_ACT};active:abamectin`,
        notes: `Mite and leafminer control in hot dry seasons. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'mites, leafminers'
    },
    mancozeb: {
        activeIngredient: 'Mancozeb',
        productClass: 'fungicide',
        status: 'requires_license',
        sourceRef: `${MAAF_FJ_PESTICIDES_ACT};active:mancozeb`,
        notes: `Protectant fungicide for blight and leaf-spot complexes when disease thresholds are met. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'late blight, leaf spots, rusts'
    },
    metalaxyl_mancozeb: {
        activeIngredient: 'Metalaxyl-M + mancozeb',
        productClass: 'fungicide',
        status: 'requires_license',
        sourceRef: `${MAAF_FJ_PESTICIDES_ACT};active:metalaxyl_m_mancozeb`,
        notes: `Late-blight and downy-mildew programs where labeled for the crop. Rotate modes of action. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'late blight, downy mildew'
    },
    chlorothalonil: {
        activeIngredient: 'Chlorothalonil',
        productClass: 'fungicide',
        status: 'requires_license',
        sourceRef: `${MAAF_FJ_PESTICIDES_ACT};active:chlorothalonil`,
        notes: `Broad-spectrum protectant fungicide for foliar disease pressure. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'leaf spots, blights'
    },
    chlorpyrifos: {
        activeIngredient: 'Chlorpyrifos',
        productClass: 'insecticide',
        status: 'restricted',
        sourceRef: `${MAAF_FJ_PESTICIDES_ACT};active:chlorpyrifos`,
        notes: `Restricted organophosphate — soil and early-season pests only where still labeled; follow MOA guidance and re-entry intervals. ${REGISTER_VERIFY_NOTE}`,
        targetDescription: 'soil pests, cutworms, early borers'
    }
};

/** Legume defaults — pod borers, aphids, sucking bugs */
const LEGUME_ACTIVE_KEYS = ['bt', 'neem', 'soap', 'lambda_cyhalothrin'];

/** Root/tuber defaults */
const ROOT_TUBER_ACTIVE_KEYS = {
    potato: ['mancozeb', 'metalaxyl_mancozeb', 'cypermethrin', 'bt'],
    cassava: ['neem', 'soap', 'imidacloprid', 'abamectin'],
    sweet_potato: ['chlorpyrifos', 'neem', 'lambda_cyhalothrin'],
    yam: ['neem', 'horticultural_oil', 'lambda_cyhalothrin'],
    taro: ['mancozeb', 'chlorothalonil', 'neem'],
    aroid: ['neem', 'horticultural_oil', 'mancozeb'],
    sago_palm: ['neem', 'horticultural_oil', 'lambda_cyhalothrin']
};

/** @type {Record<string, string[]>} */
const FJ_REGISTER_ACTIVE_KEYS_BY_CROP = {};

for (const cropKey of GRAIN_LEGUME_CROP_KEYS) {
    if (cropKey === 'groundnut') {
        FJ_REGISTER_ACTIVE_KEYS_BY_CROP[cropKey] = ['chlorpyrifos', 'imidacloprid', 'bt', 'abamectin'];
    } else if (cropKey === 'soybean') {
        FJ_REGISTER_ACTIVE_KEYS_BY_CROP[cropKey] = ['bt', 'imidacloprid', 'abamectin', 'lambda_cyhalothrin'];
    } else if (cropKey === 'pigeon_pea') {
        FJ_REGISTER_ACTIVE_KEYS_BY_CROP[cropKey] = ['bt', 'neem', 'lambda_cyhalothrin', 'horticultural_oil'];
    } else {
        FJ_REGISTER_ACTIVE_KEYS_BY_CROP[cropKey] = [...LEGUME_ACTIVE_KEYS];
    }
}

for (const cropKey of ROOT_TUBER_CROP_KEYS) {
    FJ_REGISTER_ACTIVE_KEYS_BY_CROP[cropKey] =
        ROOT_TUBER_ACTIVE_KEYS[cropKey] || ['neem', 'mancozeb', 'cypermethrin'];
}

const FJ_PRIORITY_CROP_KEYS = [...GRAIN_LEGUME_CROP_KEYS, ...ROOT_TUBER_CROP_KEYS];

/**
 * @param {string} cropKey
 * @returns {RegisterActiveEntry[]}
 */
function getFijiRegisterActivesForCrop(cropKey) {
    const keys = FJ_REGISTER_ACTIVE_KEYS_BY_CROP[cropKey];
    if (!keys) {
        return [];
    }
    return keys.map((key) => FIJI_ACTIVES[key]).filter(Boolean);
}

module.exports = {
    FIJI_ACTIVES,
    FJ_PRIORITY_CROP_KEYS,
    FJ_REGISTER_ACTIVE_KEYS_BY_CROP,
    getFijiRegisterActivesForCrop
};
