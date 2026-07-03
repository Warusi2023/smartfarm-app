/**
 * Cereal IPM — Pests & Protection panel data (temperate, tropical, dry, high-mountain climates).
 * Merged into cropPestProtection.js for API/JS fallback and DB import.
 */

const { CHEMICAL_SAFETY_NOTE } = require('./ipmConstants');

/** @type {Record<string, { cropName: string, pests: object[], beneficials: object[], chemicalActives: object, damageToLookFor: string[] }>} */
const CEREAL_IPM = {
    wheat: {
        cropName: 'Wheat',
        damageToLookFor: [
            'Stunted patches and uneven stands → soil pests or poor emergence',
            'Chewed leaves and stems → caterpillars or cutworms',
            'White heads that fail to fill grain → stem borers or drought stress',
            'Orange or brown pustules on leaves → rusts; powdery patches → mildews'
        ],
        pests: [
            {
                name: 'Stem borers, cutworms, and armyworms',
                damageDescription: 'Tunnel stems or chew leaves and seedlings; whiteheads and lodging are common in temperate and continental wheat.'
            },
            {
                name: 'Aphids and termites',
                damageDescription: 'Aphids curl leaves and transmit viruses; termites attack roots and lower stems in warmer zones.'
            },
            {
                name: 'Wireworms and root grubs',
                damageDescription: 'Reduce emergence and thin stands in drier soils — scout at planting and early tillering.'
            },
            {
                name: 'Rusts and mildews',
                damageDescription: 'Fungal diseases weaken leaves and reduce grain fill; flare in humid or dew-heavy seasons.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybird beetles, lacewings, and hoverflies',
                description: 'Predators of aphids and soft-bodied pests — conserve with flowering field margins.'
            },
            {
                name: 'Parasitic wasps and ground beetles',
                description: 'Attack caterpillars and soil-dwelling larvae; supported by rotation and residue management.'
            },
            {
                name: 'Spiders, birds, and entomopathogenic fungi',
                description: 'General suppression of aphids, caterpillars, and soil larvae when broad sprays are avoided.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed dressings against soil pests (where labeled)',
                'selective aphid and leafhopper materials',
                'Bt or similar caterpillar-targeting actives',
                'fungicides for rust and mildew when disease thresholds are met'
            ],
            mainPestGroups: 'soil pests, aphids, caterpillars, rusts, and mildews',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    rice: {
        cropName: 'Rice (paddy)',
        damageToLookFor: [
            'Dead hearts in young tillers → stem borers',
            'Whiteheads at flowering → borer or hopper damage',
            'Yellowing, folded, or burned leaves → leaf folders or planthopper burn',
            'Spots and lesions on sheaths → blast or sheath blight'
        ],
        pests: [
            {
                name: 'Stem borers',
                damageDescription: 'Larvae tunnel inside tillers causing dead hearts and whiteheads across tropical and warm temperate rice.'
            },
            {
                name: 'Leaf folders and armyworms',
                damageDescription: 'Roll and eat leaves; defoliation reduces tillering and grain set.'
            },
            {
                name: 'Planthoppers and leafhoppers',
                damageDescription: 'Sap suckers cause hopper burn and transmit virus diseases — scout weekly in humid seasons.'
            },
            {
                name: 'Blast and sheath blight',
                damageDescription: 'Fungal diseases create lesions on leaves and sheaths that can devastate yield in wet weather.'
            }
        ],
        beneficials: [
            {
                name: 'Spiders, dragonflies, and predatory water bugs',
                description: 'Control hoppers and leaf folders in flooded fields — maintain shallow water and field margins.'
            },
            {
                name: 'Trichogramma and other parasitic wasps',
                description: 'Egg and larval parasitoids of borers and caterpillars; release or conserve before pest buildup.'
            },
            {
                name: 'Frogs, fish, and mirid bugs',
                description: 'Aquatic and edge predators that reduce hopper and egg stages in paddy systems.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatments or early sprays against stem borers (where labeled)',
                'selective planthopper and leafhopper insecticides',
                'fungicides for blast and sheath blight',
                'apply to minimize harm to aquatic life and beneficial insects'
            ],
            mainPestGroups: 'stem borers, hoppers, leaf folders, blast, and sheath blight',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    maize: {
        cropName: 'Maize / corn',
        damageToLookFor: [
            'Shot-holed leaves and ragged whorls → fall armyworm or stem borers',
            'Lodging stems and frass in whorl → borers or cutworms',
            'Ears with holes, frass, and mold → ear-feeding caterpillars or beetles',
            'Stunted patches at emergence → wireworms or rootworms'
        ],
        pests: [
            {
                name: 'Fall armyworm and stem borers',
                damageDescription: 'Caterpillars attack whorls, stems, and ears in tropical, dry, temperate, and high-mountain maize.'
            },
            {
                name: 'Cutworms and rootworms',
                damageDescription: 'Soil pests reduce stand and root function — scout at V-stages and after planting.'
            },
            {
                name: 'Aphids and leafhoppers',
                damageDescription: 'Transmit viruses; honeydew leads to sooty mold on leaves and ears.'
            },
            {
                name: 'Ear-feeding beetles and moth larvae',
                damageDescription: 'Bore into ears and open pathways for fungal spoilage of grain.'
            }
        ],
        beneficials: [
            {
                name: 'Trichogramma wasps',
                description: 'Parasitize moth eggs before caterpillars enter whorls and ears.'
            },
            {
                name: 'Braconid and ichneumonid wasps',
                description: 'Attack caterpillars in whorls — avoid broad-spectrum sprays during peak parasitism.'
            },
            {
                name: 'Ladybirds, lacewings, hoverflies, and predatory bugs',
                description: 'Suppress aphids and soft-bodied pests; supported by mixed plantings and residue destruction.'
            },
            {
                name: 'Bacillus thuringiensis (Bt)',
                description: 'Microbial control for caterpillars when applied before heavy whorl damage.'
            }
        ],
        chemicalActives: {
            actives: [
                'Bt and similar caterpillar actives directed to whorls',
                'selective aphid and leafhopper materials',
                'seed treatments against soil pests (where labeled)',
                'timed to avoid wiping out natural enemies'
            ],
            mainPestGroups: 'armyworm, stem borers, rootworms, aphids, and ear feeders',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    barley: {
        cropName: 'Barley',
        damageToLookFor: [
            'Patches of weak plants and thin stands → soil pests or poor nutrition',
            'Chewed flag leaves → armyworms or cutworms',
            'Discolored heads and poor fill → aphid virus or disease pressure',
            'Brown spots and net-like lesions → net blotch or scald; orange pustules → rust'
        ],
        pests: [
            {
                name: 'Armyworms and cutworms',
                damageDescription: 'Chew leaves and stems in temperate and continental barley — damage flag leaves near heading.'
            },
            {
                name: 'Aphids and leafhoppers',
                damageDescription: 'Feed on stems and leaves; major virus vectors in cool-season barley.'
            },
            {
                name: 'Net blotch, scald, and rust',
                damageDescription: 'Fungal diseases reduce photosynthetic area and grain fill — scout from tillering onward.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, and hoverflies',
                description: 'Same aphid predators as wheat — encourage with rotations and threshold-based spraying.'
            },
            {
                name: 'Parasitic wasps, ground beetles, and spiders',
                description: 'Attack caterpillars and soil larvae; birds and beneficial fungi add suppression.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective aphid materials when thresholds exceeded',
                'fungicide programs for net blotch, scald, and rust',
                'growth-stage timing and resistance management per local label'
            ],
            mainPestGroups: 'aphids, caterpillars, net blotch, scald, and rust',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    sorghum: {
        cropName: 'Sorghum',
        damageToLookFor: [
            'Chewed leaves and ragged whorls → fall armyworm or caterpillars',
            'Damaged or empty panicles → midge or shoot fly',
            'Sticky heads with black sooty mold → aphid honeydew'
        ],
        pests: [
            {
                name: 'Fall armyworm and caterpillars',
                damageDescription: 'Attack leaves and panicles in tropical and dryland sorghum — scout at whorl and flowering.'
            },
            {
                name: 'Sorghum midge and shoot fly',
                damageDescription: 'Damage florets and tillers; panicle emergence is the critical monitoring window.'
            },
            {
                name: 'Aphids',
                damageDescription: 'Weaken stems and coat heads with honeydew, encouraging black mold on grain.'
            }
        ],
        beneficials: [
            {
                name: 'Parasitoid wasps of midges and caterpillars',
                description: 'Tiny wasps attack eggs and larvae — conserve with timely planting and field margins.'
            },
            {
                name: 'Ladybirds, lacewings, predatory bugs, and ground beetles',
                description: 'General predators of aphids and soft-bodied pests alongside spiders.'
            },
            {
                name: 'Microbial agents against larvae',
                description: 'Bt and similar products when thresholds are met at panicle stages.'
            }
        ],
        chemicalActives: {
            actives: [
                'targeted sprays at panicle emergence against midge and armyworm',
                'selective aphid materials',
                'avoid routine broad-spectrum applications'
            ],
            mainPestGroups: 'midge, shoot fly, armyworm, and aphids',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    millet: {
        cropName: 'Millet',
        damageToLookFor: [
            'Dead hearts in young tillers → stem borers or shoot flies',
            'Stunted plants in thin stands → drought stress amplifying pest damage',
            'Poorly filled or damaged heads → head bugs, grasshoppers, or aphids'
        ],
        pests: [
            {
                name: 'Stem borers and shoot flies',
                damageDescription: 'Kill young shoots in tropical and high-mountain millets — early season scouting is critical.'
            },
            {
                name: 'Caterpillars and grasshoppers',
                damageDescription: 'Defoliate plants and reduce tillering when populations spike in dry years.'
            },
            {
                name: 'Head bugs and aphids',
                damageDescription: 'Attack developing grain and weaken plants under poor soil and drought stress.'
            }
        ],
        beneficials: [
            {
                name: 'Parasitic wasps, ladybirds, and lacewings',
                description: 'Attack stem borer larvae and aphids — supported by crop diversity and low insecticide pressure.'
            },
            {
                name: 'Predatory bugs, spiders, and ground beetles',
                description: 'Suppress head bugs and grasshopper nymphs when field margins are conserved.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatments or early sprays against stem borers and shoot flies',
                'selective products for aphids and head bugs at threshold',
                'complement with rotations and planting dates that escape peak flights'
            ],
            mainPestGroups: 'stem borers, shoot flies, head bugs, and aphids',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    oats: {
        cropName: 'Oats',
        damageToLookFor: [
            'Orange or brown pustules on leaves → crown rust',
            'Leaf spots and blotches → fungal leaf diseases',
            'Stunted virus-affected patches → aphid transmission',
            'Chewed lower foliage in wet years → slugs or caterpillars'
        ],
        pests: [
            {
                name: 'Crown rust and leaf blotch',
                damageDescription: 'Fungal diseases reduce leaf area in cool temperate and moist continental oats.'
            },
            {
                name: 'Aphids',
                damageDescription: 'Transmit barley yellow dwarf and other viruses; feed on stems and leaves.'
            },
            {
                name: 'Caterpillars and slugs',
                damageDescription: 'Damage lower foliage in wet seasons — scout at tillering and stem elongation.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, hoverflies, and lacewings',
                description: 'Aphid predators — threshold-based decisions keep populations effective.'
            },
            {
                name: 'Parasitoid wasps, ground beetles, and entomopathogenic fungi',
                description: 'Suppress aphids and leaf-feeding pests with healthy rotations and residue management.'
            }
        ],
        chemicalActives: {
            actives: [
                'fungicide programs targeted at rust and blotch',
                'selective aphid control when virus risk is high',
                'avoid broad-spectrum sprays that disrupt biological control'
            ],
            mainPestGroups: 'rust, leaf blotch, aphids, and occasional caterpillars',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    rye: {
        cropName: 'Rye',
        damageToLookFor: [
            'Patchy stands and uneven emergence → wireworms or cutworms',
            'Discolored leaves → rusts, mildews, or virus symptoms',
            'Occasional head damage → aphids or leafhoppers'
        ],
        pests: [
            {
                name: 'Aphids and leafhoppers',
                damageDescription: 'Lower pest pressure than wheat but can reduce stand health and grain quality in cool soils.'
            },
            {
                name: 'Cutworms and wireworms',
                damageDescription: 'Attack seedlings and roots — common in cover-crop and forage rye systems.'
            },
            {
                name: 'Rusts and mildews',
                damageDescription: 'Discolor leaves and reduce quality when humidity is high.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory and parasitic insects, spiders, and ground beetles',
                description: 'Thrive under low chemical input and diverse rotations typical of rye systems.'
            },
            {
                name: 'Birds and beneficial microbes',
                description: 'Support soil health and low-level pest suppression in cover and forage plantings.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatments against soil pests when thresholds warrant',
                'occasional fungicide or aphid control when economic thresholds are clearly exceeded',
                'favor integrated, low-input management for cover and forage rye'
            ],
            mainPestGroups: 'aphids, soil pests, rusts, and mildews',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    triticale: {
        cropName: 'Triticale',
        damageToLookFor: [
            'Chewed leaves and defoliation → cutworms or armyworms',
            'White heads and poor grain fill → borers or virus stress',
            'Streaking and stunting → aphid- or leafhopper-transmitted viruses',
            'Rust pustules and mildew patches → cereal fungal diseases'
        ],
        pests: [
            {
                name: 'Cutworms and armyworms',
                damageDescription: 'Share wheat pest complex — chew leaves and can cause whiteheads.'
            },
            {
                name: 'Aphids and leafhoppers',
                damageDescription: 'Transmit viruses causing streaking and stunting in triticale stands.'
            },
            {
                name: 'Rusts, mildews, and leaf spots',
                damageDescription: 'Fungal diseases mirror wheat — scout from tillering through heading.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, hoverflies, and parasitic wasps',
                description: 'Same community as wheat — supported by rotation and reduced broad-spectrum spraying.'
            },
            {
                name: 'Spiders, ground beetles, birds, and beneficial fungi',
                description: 'General suppression when balanced fertility and residue management are practiced.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective aphid and leafhopper products when thresholds reached',
                'fungicide rotations per local rust and mildew pressure',
                'resistance-aware programs aligned with wheat guidelines'
            ],
            mainPestGroups: 'aphids, caterpillars, rusts, mildews, and leaf spots',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    buckwheat: {
        cropName: 'Buckwheat',
        damageToLookFor: [
            'Chewed leaves and defoliation → caterpillars, beetles, or grasshoppers',
            'Damaged flowers and poor seed set → pest feeding during bloom',
            'Weak stands in cool high-mountain sites → combined pest and weather stress'
        ],
        pests: [
            {
                name: 'Leaf-feeding caterpillars and beetles',
                damageDescription: 'Chew foliage in cooler temperate and high-mountain buckwheat.'
            },
            {
                name: 'Grasshoppers and aphids',
                damageDescription: 'Defoliate plants and interfere with flowering and pollination.'
            }
        ],
        beneficials: [
            {
                name: 'Hoverflies, bees, and wasps',
                description: 'Buckwheat attracts pollinators and aphid predators — central to its IPM strategy.'
            },
            {
                name: 'Ladybirds, lacewings, spiders, and predatory bugs',
                description: 'Provide pest suppression and pollination when habitat is conserved.'
            }
        ],
        chemicalActives: {
            actives: [
                'pollinator-safe, selective products only when unavoidable',
                'apply outside flowering periods',
                'target aphids or caterpillars specifically — minimize pesticide use'
            ],
            mainPestGroups: 'caterpillars, beetles, grasshoppers, and aphids',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    fonio: {
        cropName: 'Fonio / small millets',
        damageToLookFor: [
            'Stunted plants and thin stands → drought and pest stress combined',
            'Dead hearts in tillers → stem borers or shoot flies',
            'Damaged or poorly filled panicles → head bugs, grasshoppers, or aphids'
        ],
        pests: [
            {
                name: 'Stem borers and shoot flies',
                damageDescription: 'Attack tillers in tropical and dry marginal environments where fonio is a staple.'
            },
            {
                name: 'Caterpillars and grasshoppers',
                damageDescription: 'Defoliate plants and reduce panicle development.'
            },
            {
                name: 'Head bugs and aphids',
                damageDescription: 'Damage developing grain — pressure worsens under drought and poor soils.'
            }
        ],
        beneficials: [
            {
                name: 'Parasitic wasps, ladybirds, and lacewings',
                description: 'Benefit from diverse rotations and low pesticide pressure in smallholder systems.'
            },
            {
                name: 'Predatory bugs, spiders, ground beetles, and microbial agents',
                description: 'Attack larvae and sap suckers when soil-health practices are maintained.'
            }
        ],
        chemicalActives: {
            actives: [
                'treated seed or early sprays against stem borers and shoot flies in high-pressure seasons',
                'selective materials for aphids and head bugs at threshold',
                'combine with resistant varieties, timely planting, and soil-health practices'
            ],
            mainPestGroups: 'stem borers, shoot flies, head bugs, and aphids',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    }
};

const CEREAL_ALIASES = {
    wheat: 'wheat',
    rice: 'rice',
    paddy: 'rice',
    'paddy rice': 'rice',
    maize: 'maize',
    corn: 'maize',
    'maize / corn': 'maize',
    barley: 'barley',
    sorghum: 'sorghum',
    millet: 'millet',
    pearl_millet: 'millet',
    'pearl millet': 'millet',
    oats: 'oats',
    oat: 'oats',
    rye: 'rye',
    triticale: 'triticale',
    buckwheat: 'buckwheat',
    fonio: 'fonio',
    'small millets': 'fonio',
    'fonio / small millets': 'fonio'
};

const CEREAL_CROP_KEYS = Object.keys(CEREAL_IPM);

module.exports = {
    CEREAL_IPM,
    CEREAL_ALIASES,
    CEREAL_CROP_KEYS
};
