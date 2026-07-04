/**
 * Sugar and sweetener crop IPM - Pests & Protection panel data with maturity windows.
 */

const { CHEMICAL_SAFETY_NOTE } = require('./ipmConstants');

/** @type {Record<string, object>} */
const SUGAR_SWEETENER_IPM = {
    sugarcane: {
        cropName: 'Sugarcane',
        maturityNotes:
            'Tropical plant cane commonly reaches harvest in about 10-18 months, while ratoon crops often finish in 8-14 months. ' +
            'Dry irrigated systems depend heavily on water timing to finish stalk filling and sugar accumulation. ' +
            'Temperate or continental production is usually limited to experimental or protected situations, and polar or high-mountain climates are not normally recommended.',
        damageToLookFor: [
            'Dead hearts, bored shoots, or broken stalks -> early shoot borers and stem borers',
            'Sticky honeydew, black sooty mold, or ant activity -> aphids, scales, mealybugs, or whiteflies',
            'Poor ratoon regrowth or patchy stools -> termites, white grubs, or root stress',
            'Red internal stalk discoloration or whip-like growth -> red rot, smut, or chronic ratoon disease pressure'
        ],
        pests: [
            {
                name: 'Early shoot borers and stem borers',
                damageDescription: 'Primary cane insects in tropical and dry irrigated sugarcane; they tunnel shoots and stalks, causing dead hearts, weak canes, and lower sugar recovery.'
            },
            {
                name: 'Aphids, scales, mealybugs, and whiteflies',
                damageDescription: 'Sap suckers build in warm, humid, or heavily fertilized cane, producing honeydew and stressing ratoon fields.'
            },
            {
                name: 'White grubs, termites, and root-feeding pests',
                damageDescription: 'Damage setts, roots, and stool establishment, especially in dryland or trash-heavy systems where ratoons are under stress.'
            },
            {
                name: 'Red rot, smut, and ratoon disease complexes',
                damageDescription: 'Non-insect threats that move with infected planting material or poor sanitation and can sharply reduce cane tonnage and sugar quality.'
            }
        ],
        beneficials: [
            {
                name: 'Trichogramma, Cotesia, and other parasitoid wasps',
                description: 'Key natural enemies of borer eggs and larvae - conserve and release early where programs exist.'
            },
            {
                name: 'Ladybirds, lacewings, spiders, and predatory bugs',
                description: 'Help suppress aphids, scales, and other soft-bodied pests when broad-spectrum sprays are minimized.'
            },
            {
                name: 'Entomopathogenic fungi plus sanitation',
                description: 'Beauveria, Metarhizium, rogueing infected stools, and removal of heavily infested stalks support integrated ratoon management.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective borer materials at sett establishment or early whorl stages where labeled',
                'targeted sucking-pest products only when scouting confirms hotspots',
                'sett treatments or disease-management fungicide programs for smut and red rot where locally registered',
                'regional register-backed actives should override these example classes when available'
            ],
            mainPestGroups: 'borers, sap suckers, root pests, and ratoon disease complexes',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    sugar_beet: {
        cropName: 'Sugar beet',
        maturityNotes:
            'Temperate and continental sugar beet commonly matures in about 140-200 days depending on variety, sowing date, and thermal time. ' +
            'Early types often finish in 140-170 days, while standard factory beet programs may run longer for sugar accumulation. ' +
            'Dry irrigated regions can shorten or stretch the effective season depending on heat and water stress, while tropical production is usually not preferred.',
        damageToLookFor: [
            'Curled leaves, sticky growth, or virus-like yellowing -> aphids and leafhoppers',
            'Shot holes, cut seedlings, or patchy emergence -> flea beetles, cutworms, or wireworms',
            'Stunted patches and forked roots -> beet cyst nematodes or soil-borne stress',
            'Brown leaf spots and premature leaf loss -> Cercospora and other foliar disease pressure'
        ],
        pests: [
            {
                name: 'Aphids and leafhoppers',
                damageDescription: 'Important in temperate, continental, and dry beet systems because they weaken foliage and can spread virus yellows.'
            },
            {
                name: 'Flea beetles, cutworms, and wireworms',
                damageDescription: 'Threaten seedling establishment and stand uniformity, especially in cool springs or dry seedbeds.'
            },
            {
                name: 'Beet cyst nematodes and soil-borne root rots',
                damageDescription: 'Reduce root size, sugar accumulation, and field longevity when rotation is tight or soils stay stressed.'
            },
            {
                name: 'Cercospora leaf spot and other foliar diseases',
                damageDescription: 'Strip leaf area during canopy bulking and force extra regrowth instead of sugar storage.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, hoverflies, lacewings, and parasitoid wasps',
                description: 'Strong biological support against aphids and other sap suckers in open-field beet.'
            },
            {
                name: 'Ground beetles, rove beetles, and beneficial soil biology',
                description: 'Help suppress cutworms, wireworms, and other surface-active pests while rotations reduce carryover.'
            },
            {
                name: 'Crop rotation, clean residue management, and soil-health biocontrols',
                description: 'Long rotations, balanced fertility, and disease-suppressive soils are central to beet IPM against nematodes and root rots.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed or in-furrow protection against early seedling pests where labeled',
                'selective aphid and leafhopper materials when thresholds or virus risk justify use',
                'fungicides for Cercospora and key foliar diseases in factory beet programs where registered',
                'nematode or soil-pest products only where local registration explicitly covers sugar beet'
            ],
            mainPestGroups: 'aphids, seedling pests, nematodes, and foliar diseases',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    stevia: {
        cropName: 'Stevia / minor sweetener crops',
        maturityNotes:
            'In tropical and warm temperate climates, stevia often reaches a first commercial leaf harvest in about 90-140 days, with later cuts every 45-70 days where the stand is kept productive. ' +
            'Cooler or high-mountain climates usually extend maturity to about 110-160+ days and may require protected cultivation for consistent leaf quality. ' +
            'Minor sweetener crops such as monk fruit may run longer but generally share the same need for careful harvest timing around sweetness, leaf or fruit quality, and frost avoidance.',
        damageToLookFor: [
            'Curled or sticky young leaves -> aphids, whiteflies, or thrips',
            'Bronzing, stippling, or webbing -> spider mites in hot dry conditions',
            'Cut seedlings or missing stems -> cutworms and other chewing pests',
            'Stem-base collapse or leaf spots -> crown rots, damping off, or humid-weather foliar disease'
        ],
        pests: [
            {
                name: 'Aphids, whiteflies, and thrips',
                damageDescription: 'Common in diversified tropical and temperate herb systems; they reduce clean leaf yield and can stress regrowth after cutting.'
            },
            {
                name: 'Spider mites and small leaf-feeding caterpillars',
                damageDescription: 'Flare in hot, dry fields or protected systems and can quickly reduce leaf quality for sweetener markets.'
            },
            {
                name: 'Cutworms and seedling-stage chewing pests',
                damageDescription: 'Damage young transplants and direct-seeded stands before canopy closure.'
            },
            {
                name: 'Crown rots, damping off, powdery mildew, and leaf spots',
                damageDescription: 'Disease complexes become important in wet soils or dense protected-culture plantings where airflow is poor.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, hoverflies, and minute pirate bugs',
                description: 'Generalist predators that protect soft new growth from aphids, whiteflies, and thrips.'
            },
            {
                name: 'Predatory mites and parasitoid wasps',
                description: 'Important where spider mites or whiteflies build in warm fields, tunnels, or nursery systems.'
            },
            {
                name: 'Flowering field borders, microbial biopesticides, and gentle spray programs',
                description: 'Habitat management plus Bt, oils, soaps, or fungal biocontrols help protect beneficial populations in niche sweetener crops.'
            }
        ],
        chemicalActives: {
            actives: [
                'insecticidal soaps, horticultural oils, and neem or azadirachtin products where labeled',
                'Bt or selective caterpillar materials when chewing pests threaten leaf quality',
                'selective miticides or whitefly materials only when locally registered for the crop',
                'fungicides for damping off, powdery mildew, or crown rot should follow local sweetener-crop labels'
            ],
            mainPestGroups: 'aphids, whiteflies, thrips, mites, chewing pests, and humid-weather diseases',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    }
};

const SUGAR_SWEETENER_ALIASES = {
    sugarcane: 'sugarcane',
    'sugar cane': 'sugarcane',
    cane: 'sugarcane',
    sugar_beet: 'sugar_beet',
    'sugar beet': 'sugar_beet',
    'sugar-beet': 'sugar_beet',
    stevia: 'stevia',
    'stevia rebaudiana': 'stevia',
    sweetleaf: 'stevia',
    'sweet leaf': 'stevia',
    'minor sweetener crops': 'stevia',
    'stevia / minor sweetener crops': 'stevia',
    'sweetener crops': 'stevia',
    'sweetener plants': 'stevia',
    'monk fruit': 'stevia',
    monkfruit: 'stevia',
    'luo han guo': 'stevia'
};

const SUGAR_SWEETENER_CROP_KEYS = Object.keys(SUGAR_SWEETENER_IPM);

module.exports = {
    SUGAR_SWEETENER_IPM,
    SUGAR_SWEETENER_ALIASES,
    SUGAR_SWEETENER_CROP_KEYS
};
