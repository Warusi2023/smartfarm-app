/**
 * Grain legume IPM — Pests & Protection panel data with maturity windows.
 */

const { CHEMICAL_SAFETY_NOTE } = require('./ipmConstants');

/** @type {Record<string, object>} */
const GRAIN_LEGUME_IPM = {
    soybean: {
        cropName: 'Soybean',
        maturityNotes:
            'Maturity varies strongly by variety group and climate. Warm tropical/subtropical short-duration types: ' +
            'about 75–100 days. Medium and fuller-season types: often 100–140 days. Cooler temperate or ' +
            'high-mountain settings may extend further with daylength and maturity group.',
        damageToLookFor: [
            'Defoliated leaves and ragged foliage → caterpillars from flowering onward',
            'Stippled or bronzed leaves → mites in hot dry conditions',
            'Pod feeding, shriveled seed, or scarred pods → stink bugs and pod feeders',
            'Sticky honeydew or sooty mold → aphids and sap suckers',
            'Delayed maturity or uneven pod fill → late-season pest pressure'
        ],
        pests: [
            {
                name: 'Soybean looper and corn earworm',
                damageDescription: 'Caterpillars defoliate plants — most damaging from flowering through pod fill.'
            },
            {
                name: 'Aphids and stink bugs',
                damageDescription: 'Sap suckers reduce vigour and damage pods and seed quality in temperate and tropical soybean.'
            },
            {
                name: 'Spider mites',
                damageDescription: 'Stippling and bronzing flare in hotter, dry production zones.'
            },
            {
                name: 'Stem borers',
                damageDescription: 'Regional threat that weakens stems and reduces stand in some soybean systems.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybird beetles, lacewings, and minute pirate bugs',
                description: 'Predators of aphids, mites, and small caterpillars — conserve with threshold-based spraying.'
            },
            {
                name: 'Big-eyed bugs and predatory stink bugs',
                description: 'Useful against pest eggs and small larvae in soybean canopies.'
            },
            {
                name: 'Parasitoid wasps, spiders, and Bt',
                description: 'Attack caterpillars and soft-bodied pests when broad sprays are avoided.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective caterpillar products (Bt or similar where labeled)',
                'selective aphid or stink bug materials at economic threshold',
                'mite-targeted products in hot dry seasons when scouting confirms need'
            ],
            mainPestGroups: 'caterpillars, aphids, stink bugs, and mites',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    common_bean: {
        cropName: 'Common bean',
        maturityNotes:
            'Bush beans often mature in about 75–95 days. Larger-seeded or climbing types: 90–120 days. ' +
            'Cooler climates and high-mountain conditions usually lengthen the cycle.',
        damageToLookFor: [
            'Shot-holed seedling leaves → bean fly or cutworms',
            'Curled foliage and sticky leaves → aphids or whiteflies',
            'Flower drop and scarred pods → thrips, borers, or sucking bugs',
            'Seed damage at harvest → pod borers or storage pests'
        ],
        pests: [
            {
                name: 'Bean fly and cutworms',
                damageDescription: 'Attack seedlings and young plants — critical in tropical and temperate common bean.'
            },
            {
                name: 'Aphids, whiteflies, leafhoppers, and thrips',
                damageDescription: 'Sap suckers cause curl, virus risk, flower drop, and pod scarring.'
            },
            {
                name: 'Pod borers',
                damageDescription: 'Feed on pods and seed during flowering and pod set.'
            },
            {
                name: 'Storage pests',
                damageDescription: 'Bruchids and related beetles damage seed after harvest if sanitation is poor.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, and hoverflies',
                description: 'Strong aphid and whitefly predators when flowering margins are maintained.'
            },
            {
                name: 'Parasitoid wasps and predatory bugs',
                description: 'Target caterpillars, leafminers, and soft-bodied pests.'
            },
            {
                name: 'Soil-beneficial microbes',
                description: 'Support root health when combined with rotation and clean seed.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatment or early protection against soil and seedling pests',
                'selective aphid and whitefly products when thresholds are met',
                'caterpillar-targeting products during flowering and pod set'
            ],
            mainPestGroups: 'bean fly, aphids, whiteflies, pod borers, and storage pests',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    pea: {
        cropName: 'Pea',
        maturityNotes:
            'Early garden peas: 55–70 days. Field peas: often 80–110 days. Cooler continental and ' +
            'high-elevation zones may extend maturity slightly.',
        damageToLookFor: [
            'Notched seedling leaves → cutworms or weevils',
            'Aphid clusters on growing points → pea aphid',
            'Wilting seedlings → soil pests or root disease interaction',
            'Pods with internal feeding damage → pod-feeding caterpillars'
        ],
        pests: [
            {
                name: 'Pea aphid',
                damageDescription: 'Colonies on growing points reduce vigour and transmit viruses in cool climates.'
            },
            {
                name: 'Cutworms and weevils',
                damageDescription: 'Damage seedlings and lower stems in field and garden pea.'
            },
            {
                name: 'Thrips and leafminers',
                damageDescription: 'Distort foliage and reduce photosynthetic area in moist temperate pea.'
            },
            {
                name: 'Pod-feeding caterpillars',
                damageDescription: 'Feed inside or on pods near flowering and pod set.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, and hoverflies',
                description: 'Primary aphid predators — early scouting conserves populations.'
            },
            {
                name: 'Parasitoid wasps, ground beetles, and spiders',
                description: 'Suppress caterpillars, leafminers, and soil larvae.'
            },
            {
                name: 'Microbial agents',
                description: 'Bt and fungal biopesticides when thresholds justify intervention.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatment against early soil pests (where labeled)',
                'selective aphid materials at economic threshold',
                'pod-borer products timed around flowering and pod set'
            ],
            mainPestGroups: 'pea aphid, cutworms, leafminers, and pod caterpillars',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    chickpea: {
        cropName: 'Chickpea',
        maturityNotes:
            'Short-duration kabuli or desi lines: 90–110 days. Fuller-season types: 110–140 days, ' +
            'especially in cooler temperate or high-mountain systems.',
        damageToLookFor: [
            'Chewed leaves and flower loss → pod borers or defoliators',
            'Bored pods and shriveled seed → Helicoverpa and pod feeders',
            'Stunted plants under drought → aphid and borer damage amplified by stress'
        ],
        pests: [
            {
                name: 'Pod borers (Helicoverpa)',
                damageDescription: 'Primary threat in dry, semi-arid, and continental chickpea — bore pods and damage seed.'
            },
            {
                name: 'Aphids and cutworms',
                damageDescription: 'Weaken plants and reduce stand in early and mid-season chickpea.'
            },
            {
                name: 'Leafminers and storage beetles',
                damageDescription: 'Reduce leaf area and damage seed after harvest if storage is poor.'
            }
        ],
        beneficials: [
            {
                name: 'Egg and larval parasitoid wasps',
                description: 'Key biocontrol of pod borers — time sprays to protect parasitoids at bloom.'
            },
            {
                name: 'Ladybirds, lacewings, and predatory bugs',
                description: 'Suppress aphids and soft-bodied pests in semi-arid chickpea.'
            },
            {
                name: 'Bt and fungal biopesticides',
                description: 'Microbial tools for caterpillars when thresholds are exceeded.'
            }
        ],
        chemicalActives: {
            actives: [
                'well-timed pod-borer sprays at flowering and pod formation',
                'selective sucking-pest products when scouting confirms risk',
                'resistance management and pollinator protection at bloom'
            ],
            mainPestGroups: 'pod borers, aphids, cutworms, and storage beetles',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    lentil: {
        cropName: 'Lentil',
        maturityNotes:
            'Early varieties: 90–100 days. Medium and later types: 100–125 days. Cold or high-altitude ' +
            'environments may stretch the season.',
        damageToLookFor: [
            'Poor emergence and notched leaves → cutworms or weevils',
            'Flower abortion and aphid colonies → aphid pressure',
            'Reduced pod set → thrips or pod feeders',
            'Weak stressed plants → disease interaction after insect feeding'
        ],
        pests: [
            {
                name: 'Aphids',
                damageDescription: 'Major pest in dry temperate and continental lentil — colonize growing points.'
            },
            {
                name: 'Cutworms and weevils',
                damageDescription: 'Damage seedlings and lower stems in cool-season lentil.'
            },
            {
                name: 'Thrips and pod feeders',
                damageDescription: 'Reduce flower set and scar developing pods.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, and hoverflies',
                description: 'Aphid predators supported by crop rotation and moderate insecticide use.'
            },
            {
                name: 'Parasitic wasps, ground beetles, and spiders',
                description: 'General suppression of caterpillars and soil pests.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatment for early protection (where labeled)',
                'selective foliar sprays against aphids or pod feeders after scouting',
                'apply only when economic risk is confirmed'
            ],
            mainPestGroups: 'aphids, cutworms, weevils, and pod feeders',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    pigeon_pea: {
        cropName: 'Pigeon pea',
        maturityNotes:
            'Wide maturity variation by variety. Extra-early: 100–130 days. Medium-duration: 140–180 days. ' +
            'Traditional long-duration tropical types: 180–280+ days.',
        damageToLookFor: [
            'Chewed foliage and flower drop → pod borers or blister beetles',
            'Bored pods and shriveled seed → pod borers and pod flies',
            'Sticky growth → aphids, whiteflies, or thrips',
            'Extended flowering with pest buildup → long-season tropical pressure'
        ],
        pests: [
            {
                name: 'Pod borers and pod flies',
                damageDescription: 'Primary yield threats in tropical and dry pigeon pea over long flowering periods.'
            },
            {
                name: 'Aphids, whiteflies, and thrips',
                damageDescription: 'Sap suckers cause sticky growth and flower loss in warm regions.'
            },
            {
                name: 'Blister beetles and pod-sucking bugs',
                damageDescription: 'Defoliate and damage pods especially when multiple generations build up.'
            }
        ],
        beneficials: [
            {
                name: 'Trichogramma and other parasitoid wasps',
                description: 'Critical for pod borer egg and larval control — conserve during extended bloom.'
            },
            {
                name: 'Ladybirds, lacewings, and predatory bugs',
                description: 'Suppress aphids and sucking pests over the long pigeon pea season.'
            },
            {
                name: 'Bt-based microbial control',
                description: 'Target caterpillars while reducing harm to pollinators when timed carefully.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective pod-borer sprays timed to bloom and pod set',
                'sucking-pest materials used carefully to protect pollinators and parasitoids',
                'threshold-based use over long flowering windows'
            ],
            mainPestGroups: 'pod borers, pod flies, aphids, and blister beetles',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    cowpea: {
        cropName: 'Cowpea',
        maturityNotes:
            'Highly variable but usually fast. Early varieties: 60–75 days. Medium types: 75–95 days. ' +
            'Dual-purpose or longer-duration varieties: 95–120 days — valuable in dry climates with short rainfall windows.',
        damageToLookFor: [
            'Seedling collapse → soil pests or root stress',
            'Twisted leaves and heavy aphid colonies → cowpea aphid (often with ants)',
            'Flower loss and damaged pods → pod borers or sucking bugs',
            'Storage damage → bruchids after harvest'
        ],
        pests: [
            {
                name: 'Cowpea aphid',
                damageDescription: 'Heavy infestations twist leaves and reduce yield in tropical and dry cowpea.'
            },
            {
                name: 'Thrips and pod borers',
                damageDescription: 'Damage flowers and pods during the short cowpea growing window.'
            },
            {
                name: 'Pod-sucking bugs and leaf beetles',
                damageDescription: 'Scar pods and defoliate plants in marginal environments.'
            },
            {
                name: 'Storage bruchids',
                damageDescription: 'Attack grain after harvest if drying and storage sanitation are poor.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybird beetles, lacewings, and hoverflies',
                description: 'Aphid predators — minimize broad-spectrum sprays to conserve.'
            },
            {
                name: 'Trioxys and other parasitoid wasps',
                description: 'Classic biocontrol of cowpea aphid when ant mutualists are managed.'
            },
            {
                name: 'Spiders and microbial biocontrol agents',
                description: 'Supplement natural control in fast-cycle cowpea systems.'
            }
        ],
        chemicalActives: {
            actives: [
                'soaps, oils, or neem-based materials for soft-bodied pests',
                'selective aphid treatments when ant-protected colonies exceed threshold',
                'caterpillar products for pod borers',
                'ant management where aphids are tended by ants (per local guidance)'
            ],
            mainPestGroups: 'cowpea aphid, thrips, pod borers, and storage bruchids',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    broad_bean: {
        cropName: 'Broad / fava bean',
        maturityNotes:
            'Many grain types: 90–120 days to dry-seed maturity. Fresh green pod harvest can begin earlier. ' +
            'Cooler climates may push full dry-seed maturity later.',
        damageToLookFor: [
            'Black aphid clusters on growing tips → black bean aphid',
            'Chewed leaves and flower loss → weevils or pod feeders',
            'Pod scarring → leaf miners or pod-feeding insects',
            'Weak lush growth with pest flare → excess nitrogen favouring aphids'
        ],
        pests: [
            {
                name: 'Black bean aphid',
                damageDescription: 'Clusters on growing points in cool temperate, moist continental, and high-mountain broad bean.'
            },
            {
                name: 'Leafminers and weevils',
                damageDescription: 'Damage foliage and reduce pod quality in cooler moist conditions.'
            },
            {
                name: 'Cutworms and pod feeders',
                damageDescription: 'Attack seedlings and developing pods.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, hoverflies, and lacewings',
                description: 'Primary aphid predators — pinching infested tips supports biocontrol.'
            },
            {
                name: 'Parasitic wasps, ground beetles, and spiders',
                description: 'Suppress leafminers, caterpillars, and soil pests.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective aphid sprays when thresholds are crossed',
                'products for leaf- or pod-feeding insects as needed',
                'combine with sanitation and moderate nitrogen fertility'
            ],
            mainPestGroups: 'black bean aphid, leafminers, weevils, and pod feeders',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    groundnut: {
        cropName: 'Groundnut / peanut',
        maturityNotes:
            'Spanish and Valencia types: often 90–110 days. Virginia and runner types: commonly 120–150 days. ' +
            'Cooler or high-elevation environments may extend the cycle.',
        damageToLookFor: [
            'Cut or wilted seedlings → termites, white grubs, or cutworms',
            'Folded or chewed leaves → leaf miners or armyworms',
            'Yellowing and poor pegging → thrips, jassids, or leaf spots',
            'Scarred or damaged pods and kernels underground → soil pests and pod borers'
        ],
        pests: [
            {
                name: 'Aphids, thrips, and jassids',
                damageDescription: 'Sap suckers reduce vigour and interact with leaf spot diseases in warm climates.'
            },
            {
                name: 'Leafminers and armyworms',
                damageDescription: 'Damage foliage and reduce photosynthesis during pegging and pod fill.'
            },
            {
                name: 'Termites and white grubs',
                damageDescription: 'Soil pests attack seedlings, pegs, and pods in tropical and dry groundnut.'
            },
            {
                name: 'Pod borers and storage beetles',
                damageDescription: 'Damage pods underground and grain after harvest if drying is inadequate.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, and parasitoid wasps',
                description: 'Suppress aphids, caterpillars, and leafminers when rotation is practiced.'
            },
            {
                name: 'Predatory ants, spiders, and ground beetles',
                description: 'Help control soil pests and foliage feeders.'
            },
            {
                name: 'Microbial agents',
                description: 'Bt and related products for caterpillars when thresholds justify use.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatment (where labeled)',
                'selective sucking-pest products when scouting confirms need',
                'caterpillar-targeting sprays during foliage feeding peaks',
                'soil-pest management only where severe, with rotation and timely planting'
            ],
            mainPestGroups: 'aphids, thrips, armyworms, termites, and pod borers',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    }
};

const GRAIN_LEGUME_ALIASES = {
    soybean: 'soybean',
    soybeans: 'soybean',
    soy: 'soybean',
    soya: 'soybean',
    'soya bean': 'soybean',
    common_bean: 'common_bean',
    'common bean': 'common_bean',
    'common beans': 'common_bean',
    beans: 'common_bean',
    'kidney bean': 'common_bean',
    'black bean': 'common_bean',
    'navy bean': 'common_bean',
    'pinto bean': 'common_bean',
    pea: 'pea',
    peas: 'pea',
    'field pea': 'pea',
    'garden pea': 'pea',
    chickpea: 'chickpea',
    chickpeas: 'chickpea',
    gram: 'chickpea',
    lentil: 'lentil',
    lentils: 'lentil',
    pigeon_pea: 'pigeon_pea',
    'pigeon pea': 'pigeon_pea',
    cowpea: 'cowpea',
    'black-eyed pea': 'cowpea',
    broad_bean: 'broad_bean',
    'broad bean': 'broad_bean',
    'fava bean': 'broad_bean',
    'faba bean': 'broad_bean',
    fava: 'broad_bean',
    groundnut: 'groundnut',
    groundnuts: 'groundnut',
    peanut: 'groundnut',
    peanuts: 'groundnut'
};

const GRAIN_LEGUME_CROP_KEYS = Object.keys(GRAIN_LEGUME_IPM);

module.exports = {
    GRAIN_LEGUME_IPM,
    GRAIN_LEGUME_ALIASES,
    GRAIN_LEGUME_CROP_KEYS
};
