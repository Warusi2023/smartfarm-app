/**
 * Major vegetable family IPM - shared Pests & Protection panel data with maturity windows.
 */

const { CHEMICAL_SAFETY_NOTE } = require('./ipmConstants');

/** @type {Record<string, object>} */
const VEGETABLE_FAMILY_IPM = {
    leafy_greens: {
        cropName: 'Leafy greens',
        maturityNotes:
            'Best fit is temperate and continental production, with short-season or protected opportunities in polar / high-mountain areas. ' +
            'Hot tropical and dry-season plantings need extra attention to bolting, tipburn, bitter flavor, and irrigation timing. ' +
            'Representative windows: lettuce about 35-75 days depending on looseleaf, romaine, or heading type; cabbage about 70-140 days from early to late storage types; ' +
            'spinach about 25-55 days for baby leaf versus bunching harvest; kale about 30-75 days for baby leaf versus repeated full-leaf harvest; ' +
            'Chinese cabbage about 45-80 days, with faster Napa-style crops ahead of fuller heading types.',
        damageToLookFor: [
            'Aphids hidden in hearts or folds, plus sticky leaves and sooty mold -> sap suckers building in dense canopies',
            'Silvering, bronzing, or white serpentine trails -> thrips and leafminers reducing marketable leaf area',
            'Shot-hole chewing, ragged leaf edges, or overnight feeding -> flea beetles, caterpillars, slugs, and snails',
            'Water-soaked lesions, leaf spots, or collapsing heads after humid weather -> foliar and crown disease pressure'
        ],
        pests: [
            {
                name: 'Aphids and thrips',
                damageDescription: 'Build quickly in lettuce hearts, cabbage folds, spinach, and kale canopies, causing distortion, contamination, and virus risk.'
            },
            {
                name: 'Leafminers',
                damageDescription: 'Create serpentine mines and blotches that sharply reduce marketable quality in salad and bunching greens.'
            },
            {
                name: 'Flea beetles plus caterpillars',
                damageDescription: 'Shot-holes, ragged chewing, and seedling setback are common in brassica leafy crops and young greens.'
            },
            {
                name: 'Slugs, snails, and humid-canopy foliar diseases',
                damageDescription: 'Moist, weedy, or tightly spaced beds favor slug feeding and diseases such as downy mildew, leaf spots, and head rots.'
            }
        ],
        beneficials: [
            {
                name: 'Hoverflies, ladybirds, and lacewings',
                description: 'Conserve flowering borders and avoid broad sprays so predators can keep aphids and other soft-bodied pests below threshold.'
            },
            {
                name: 'Parasitoid wasps',
                description: 'Important against aphids, leafminers, and some caterpillars, especially when releases or habitat support start early.'
            },
            {
                name: 'Ground beetles, rove beetles, and spiders',
                description: 'Residue moderation and refuge strips help these predators reduce caterpillars, flea beetles, slugs, and other surface-active pests.'
            },
            {
                name: 'Row covers, sanitation, and balanced fertility',
                description: 'Use nets or covers early, manage weeds and residues, avoid excess nitrogen, and improve spacing and airflow to limit pest and foliar disease flareups.'
            }
        ],
        chemicalActives: {
            actives: [
                'insecticidal soaps and horticultural oils for aphids and soft-bodied pests',
                'azadirachtin (neem) or similar botanicals where labeled',
                'spinosad and Bt for caterpillars, thrips, and some leafminer pressure where allowed',
                'selective leafminer materials such as cyromazine where labeled',
                'molluscicide baits only where slug or snail pressure is confirmed and labels allow use'
            ],
            mainPestGroups: 'aphids, thrips, leafminers, flea beetles, caterpillars, slugs/snails, and humid-canopy foliar diseases',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    }
};

const VEGETABLE_FAMILY_ALIASES = {
    'leafy greens': 'leafy_greens',
    'leafy green': 'leafy_greens',
    greens: 'leafy_greens',
    lettuce: 'leafy_greens',
    'head lettuce': 'leafy_greens',
    'romaine lettuce': 'leafy_greens',
    'looseleaf lettuce': 'leafy_greens',
    'loose leaf lettuce': 'leafy_greens',
    cabbage: 'leafy_greens',
    cabbages: 'leafy_greens',
    spinach: 'leafy_greens',
    kale: 'leafy_greens',
    'chinese cabbage': 'leafy_greens',
    'napa cabbage': 'leafy_greens',
    napa: 'leafy_greens'
};

const VEGETABLE_FAMILY_CROP_KEYS = Object.keys(VEGETABLE_FAMILY_IPM);

module.exports = {
    VEGETABLE_FAMILY_IPM,
    VEGETABLE_FAMILY_ALIASES,
    VEGETABLE_FAMILY_CROP_KEYS
};
