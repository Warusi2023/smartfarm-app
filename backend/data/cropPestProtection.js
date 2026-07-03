/**
 * Crop IPM — Pests & Protection panel data (extension-guide structure).
 * One record per crop; UI renders the same three sections for all crops.
 */

const CHEMICAL_SAFETY_NOTE = require('./ipmConstants').CHEMICAL_SAFETY_NOTE;
const { CEREAL_IPM, CEREAL_ALIASES } = require('./cerealPestProtection');
const { ROOT_TUBER_IPM, ROOT_TUBER_ALIASES } = require('./rootTuberPestProtection');

/** @type {{ pests: object[], beneficials: object[], chemicalActives: object, damageToLookFor: string[] }} */
const DEFAULT_VEGETABLE_IPM = {
    damageToLookFor: [
        'Sticky leaves or black sooty mold → sap suckers (aphids, whiteflies)',
        'White trails or blotches in leaves → leafminers',
        'Holes in leaves or fruit, especially overnight → caterpillars or beetles',
        'Fine yellow speckling or webbing → mites'
    ],
    pests: [
        {
            name: 'Aphids, whiteflies, thrips, and leafhoppers',
            damageDescription: 'Sap suckers cause leaf curl, yellowing, honeydew, and virus spread — check undersides of young leaves.'
        },
        {
            name: 'Leafminers and stem/fruit borers',
            damageDescription: 'Tunnels in leaves or bore holes in stems and fruit reduce quality and can kill young plants.'
        },
        {
            name: 'Armyworms, loopers, cutworms, and flea beetles',
            damageDescription: 'Chewing pests create holes, defoliation, and seedling damage — scout early morning and evening.'
        },
        {
            name: 'Spider mites and russet mites',
            damageDescription: 'Fine stippling, bronzing, and webbing on leaves; often flare in hot, dry weather.'
        }
    ],
    beneficials: [
        {
            name: 'Ladybird beetles and green lacewings',
            description: 'Predators against aphids, whiteflies, and soft-bodied pests — encourage with flowering borders.'
        },
        {
            name: 'Parasitoid wasps',
            description: 'Attack caterpillars, aphids, and leafminers — release or conserve before pest numbers build.'
        },
        {
            name: 'Predatory mites',
            description: 'Specialized control for spider mites and some thrips species.'
        },
        {
            name: 'Biological products (Bt, neem, oils, insecticidal soaps)',
            description: 'Bt for caterpillars; neem, horticultural oils, or soaps for soft-bodied pests when thresholds are met.'
        }
    ],
    chemicalActives: {
        actives: [
            'insecticidal soaps and horticultural oils',
            'neem and other botanicals',
            'spinosad or Bt for caterpillars',
            'targeted aphid materials (e.g. flonicamid-class actives where labeled)',
            'pyrethroids or neonicotinoids only as a last resort'
        ],
        mainPestGroups: 'sap suckers, caterpillars, leafminers, and mites',
        safetyNote: CHEMICAL_SAFETY_NOTE
    }
};

/** @type {Record<string, { cropName: string, pests: object[], beneficials: object[], chemicalActives: object }>} */
const CROP_IPM = {
    tomato: {
        cropName: 'Tomato',
        damageToLookFor: [
            'Leaf mines and small holes in fruit → Tuta absoluta or fruit borers',
            'Sticky leaves with white flies when disturbed → whiteflies',
            'Bronze speckling on lower leaves → spider mites'
        ],
        pests: [
            {
                name: 'Aphids',
                damageDescription: 'Cluster on new growth and flower stems; cause leaf curl, honeydew, and virus transmission.'
            },
            {
                name: 'Whiteflies',
                damageDescription: 'Feed on leaf undersides; yellowing, sooty mold, and TYLCV risk in many regions.'
            },
            {
                name: 'Tuta absoluta (tomato leafminer)',
                damageDescription: 'Larvae mine leaves and bore into fruit — look for small entry holes and frass.'
            },
            {
                name: 'Fruit borers and armyworms',
                damageDescription: 'Caterpillars bore into fruit or strip foliage; damage appears overnight in warm seasons.'
            },
            {
                name: 'Spider mites',
                damageDescription: 'Bronze stippling and webbing, often on lower leaves in dry conditions.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybird beetles and lacewings',
                description: 'Control aphids and whitefly nymphs when released early or conserved in the field.'
            },
            {
                name: 'Parasitoid wasps',
                description: 'Useful against leafminers and small caterpillars — avoid broad sprays during wasp activity.'
            },
            {
                name: 'Predatory mites',
                description: 'Release when spider mite hotspots are first detected.'
            },
            {
                name: 'Bt and selective biorational products',
                description: 'Bt for caterpillars; neem or oils for soft-bodied pests when IPM thresholds are reached.'
            }
        ],
        chemicalActives: {
            actives: ['spinosad', 'emamectin benzoate / abamectin', 'Bt', 'cyromazine or similar leafminer materials where labeled', 'insecticidal soaps and oils'],
            mainPestGroups: 'aphids, whiteflies, leafminers, caterpillars, and mites',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    capsicum: {
        cropName: 'Capsicum (bell pepper)',
        damageToLookFor: [
            'Silver scars on fruit → thrips',
            'Distorted flower buds → aphids',
            'Bronze lower leaves in dry weather → spider mites'
        ],
        pests: [
            {
                name: 'Aphids',
                damageDescription: 'Distort young leaves and flower buds; honeydew leads to sooty mold on fruit.'
            },
            {
                name: 'Whiteflies',
                damageDescription: 'Cause yellowing and virus pressure; inspect leaf undersides weekly.'
            },
            {
                name: 'Thrips',
                damageDescription: 'Silver scarring on fruit and flowers; major virus vector in many pepper systems.'
            },
            {
                name: 'Fruit borers',
                damageDescription: 'Larvae enter fruit near the calyx — cull damaged fruit to break the cycle.'
            },
            {
                name: 'Spider mites',
                damageDescription: 'Stippling and bronzing under hot, dry conditions; often on lower canopy first.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory mites',
                description: 'Primary biocontrol for thrips and spider mites in protected and field pepper.'
            },
            {
                name: 'Ladybird beetles and lacewings',
                description: 'Help suppress aphids and whitefly nymphs on young plants.'
            },
            {
                name: 'Parasitoid wasps',
                description: 'Target caterpillars and some leaf-feeding larvae.'
            },
            {
                name: 'Neem, oils, and Bt',
                description: 'Softer options when pest thresholds are met and beneficials are present.'
            }
        ],
        chemicalActives: {
            actives: ['spinosad', 'abamectin / emamectin', 'flonicamid or similar aphid/thrips materials', 'Bt', 'horticultural oils and soaps'],
            mainPestGroups: 'aphids, whiteflies, thrips, fruit borers, and mites',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    lettuce: {
        cropName: 'Lettuce',
        damageToLookFor: [
            'Aphids hidden in the heart of the head',
            'Serpentine white mines in outer leaves → leafminers',
            'Shot-hole damage on seedlings → flea beetles'
        ],
        pests: [
            {
                name: 'Aphids',
                damageDescription: 'Hide in hearts and undersides; contaminate heads and spread viruses.'
            },
            {
                name: 'Thrips',
                damageDescription: 'Silver streaks on leaves; damage cosmetic quality in salad mixes.'
            },
            {
                name: 'Leafminers',
                damageDescription: 'White serpentine trails in leaves reduce marketability.'
            },
            {
                name: 'Loopers and armyworms',
                damageDescription: 'Chewing damage on outer leaves — scout at night on young plantings.'
            },
            {
                name: 'Flea beetles',
                damageDescription: 'Small shot-holes in seedlings; can stunt establishment.'
            }
        ],
        beneficials: [
            {
                name: 'Hoverflies and ladybird beetles',
                description: 'Strong aphid predators — plant coriander and alyssum near lettuce blocks.'
            },
            {
                name: 'Parasitoid wasps',
                description: 'Effective against leafminers when released before mines spread.'
            },
            {
                name: 'Lacewings',
                description: 'General predators for aphids, thrips, and small caterpillars.'
            },
            {
                name: 'Bt and insecticidal soap',
                description: 'Bt for caterpillars; soaps for aphids when heads are not near harvest.'
            }
        ],
        chemicalActives: {
            actives: ['spinosad', 'Bt', 'insecticidal soaps', 'azadirachtin (neem)', 'pyrethroids only if no alternatives and PHI allows'],
            mainPestGroups: 'aphids, thrips, leafminers, caterpillars, and flea beetles',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    }
};

Object.assign(CROP_IPM, CEREAL_IPM, ROOT_TUBER_IPM);

/** Normalize user-facing crop names to lookup keys */
const CROP_ALIASES = {
    tomato: 'tomato',
    tomatoes: 'tomato',
    capsicum: 'capsicum',
    'bell pepper': 'capsicum',
    'bell peppers': 'capsicum',
    pepper: 'capsicum',
    peppers: 'capsicum',
    'capsicum (bell pepper)': 'capsicum',
    lettuce: 'lettuce',
    'lettuce & leafy greens': 'lettuce',
    'leafy greens': 'lettuce',
    spinach: 'lettuce',
    kale: 'lettuce',
    ...CEREAL_ALIASES,
    ...ROOT_TUBER_ALIASES
};

function normalizeCropKey(cropName) {
    if (!cropName || typeof cropName !== 'string') {
        return null;
    }
    const key = cropName.trim().toLowerCase();
    if (CROP_ALIASES[key]) {
        return CROP_ALIASES[key];
    }
    if (CROP_IPM[key]) {
        return key;
    }
    return null;
}

/**
 * @param {string} cropName
 * @returns {object} Panel payload for API/UI
 */
function resolveCropPestProtection(cropName) {
    const cropKey = normalizeCropKey(cropName);
    const specific = cropKey ? CROP_IPM[cropKey] : null;
    const source = specific || DEFAULT_VEGETABLE_IPM;
    const displayName = specific
        ? specific.cropName
        : (cropName && String(cropName).trim()) || 'Vegetable crop';

    return {
        cropKey: cropKey || 'vegetable_default',
        cropName: displayName,
        displayTitle: `Pests & protection for ${displayName}`,
        isDefaultTemplate: !specific,
        pests: source.pests,
        beneficials: source.beneficials,
        chemicalActives: source.chemicalActives,
        damageToLookFor: source.damageToLookFor || DEFAULT_VEGETABLE_IPM.damageToLookFor,
        maturityNotes: source.maturityNotes || null
    };
}

function listPestProtectionCrops() {
    return Object.keys(CROP_IPM).map((key) => ({
        cropKey: key,
        cropName: CROP_IPM[key].cropName
    }));
}

module.exports = {
    CHEMICAL_SAFETY_NOTE,
    DEFAULT_VEGETABLE_IPM,
    CROP_IPM,
    normalizeCropKey,
    resolveCropPestProtection,
    listPestProtectionCrops
};
