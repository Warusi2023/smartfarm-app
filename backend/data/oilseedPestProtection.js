/**
 * Oilseed and fiber crop IPM - Pests & Protection panel data with maturity windows.
 */

const { CHEMICAL_SAFETY_NOTE } = require('./ipmConstants');

/** @type {Record<string, object>} */
const OILSEED_IPM = {
    oil_palm: {
        cropName: 'Oil palm',
        maturityNotes:
            'Palms may begin bearing bunches in about 3-4 years after planting. Peak production often sits around ' +
            '7-15 years, with productive stands continuing for decades. Harvest timing depends more on bunch ripeness ' +
            'and estate management intervals than on a single annual maturity date.',
        damageToLookFor: [
            'Yellowing or stunted fronds -> rhinoceros beetles, sap suckers, or chronic stress',
            'Dieback or spear damage in the crown -> young palms attacked by rhinoceros beetles',
            'Frond defoliation and ragged leaflets -> bagworms and leaf-eating caterpillars',
            'Bore holes, trunk rot, or weak crowns -> borers and basal stem disease',
            'Poor bunch set or undersized bunches -> chronic pest pressure, rodents, or trunk decline'
        ],
        pests: [
            {
                name: 'Rhinoceros beetles',
                damageDescription: 'Bore into crowns and young palms in humid tropical systems, causing spear damage and stand setback.'
            },
            {
                name: 'Bagworms and leaf-eating caterpillars',
                damageDescription: 'Defoliate fronds and reduce canopy health when outbreaks build in warm, wet plantations.'
            },
            {
                name: 'Scale insects, mealybugs, and aphids',
                damageDescription: 'Sap suckers weaken palms, create sooty mold, and can worsen disease pressure.'
            },
            {
                name: 'Rodents and basal stem or trunk rots',
                damageDescription: 'Damage bunches, crowns, and trunks, reducing long-term productivity.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory beetles, birds, and bats',
                description: 'Suppress beetles, caterpillars, and rodents when habitat diversity and nesting sites are maintained.'
            },
            {
                name: 'Parasitoid wasps and spiders',
                description: 'Reduce bagworms, caterpillars, and sap-sucking pests when broad-spectrum sprays are minimized.'
            },
            {
                name: 'Microbial agents and sanitation',
                description: 'Bt, entomopathogenic fungi, and removal of dead trunks reduce pest breeding sites and outbreak pressure.'
            }
        ],
        chemicalActives: {
            actives: [
                'localized trunk or crown treatments against borers where labeled',
                'selective caterpillar products for bagworms and leaf feeders',
                'fungicides for serious trunk and basal stem rots under specialist guidance'
            ],
            mainPestGroups: 'rhinoceros beetles, bagworms, sap suckers, borers, and trunk rots',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    canola: {
        cropName: 'Rapeseed / canola',
        maturityNotes:
            'Many spring canola types mature in about 85-120 days. Winter types are sown in autumn, overwinter, ' +
            'and are harvested the following summer, often spending 200+ days in the field. Cooler or high-mountain ' +
            'areas usually lengthen these windows.',
        damageToLookFor: [
            'Shot-holed cotyledons and young leaves -> flea beetles after emergence',
            'Distorted or chewed flower buds -> weevils, caterpillars, or sucking insects',
            'Scarred or split pods -> pod weevils, midges, or caterpillars',
            'Thin stands or weak stems -> seedling pests, blackleg, or chronic stress'
        ],
        pests: [
            {
                name: 'Flea beetles',
                damageDescription: 'Chew cotyledons and young leaves, threatening establishment in cool temperate and continental canola.'
            },
            {
                name: 'Aphids and other sap suckers',
                damageDescription: 'Feed on stems, buds, and pods, reducing vigour and seed fill.'
            },
            {
                name: 'Bud, pod, and stem weevils or midges',
                damageDescription: 'Damage buds and pods at reproductive stages, cutting seed set and quality.'
            },
            {
                name: 'Caterpillars plus blackleg and sclerotinia',
                damageDescription: 'Defoliate or feed in pods while disease pressure compounds crop stress.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, and hoverflies',
                description: 'Help reduce aphids and small larvae when flowering margins and thresholds are respected.'
            },
            {
                name: 'Parasitoid wasps, ground beetles, and spiders',
                description: 'Attack flea beetles, weevils, caterpillars, and other reproductive-stage pests.'
            },
            {
                name: 'Microbial agents and rotation',
                description: 'Bt and strong rotations help limit caterpillars and disease carryover.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatments against flea beetles and early soil pests where labeled',
                'selective aphid and pod-feeding insect products at key growth stages',
                'fungicides for blackleg, sclerotinia, and major foliar diseases where needed'
            ],
            mainPestGroups: 'flea beetles, aphids, weevils, midges, caterpillars, and canola diseases',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    sunflower: {
        cropName: 'Sunflower',
        maturityNotes:
            'Early hybrids may reach physiological maturity in about 70-90 days. Medium and fuller-season types ' +
            'often need 90-120 days, while cooler or high-mountain conditions can extend the crop cycle.',
        damageToLookFor: [
            'Cut or missing seedlings -> cutworms and early caterpillars',
            'Chewed or ragged leaves -> foliage feeders and grasshoppers',
            'Weak or bored stalks -> stem borers causing lodging risk',
            'Damaged heads or shriveled seed -> head-feeding insects and fungal infection'
        ],
        pests: [
            {
                name: 'Cutworms, beetles, and seedling caterpillars',
                damageDescription: 'Reduce plant stands early and chew leaves during establishment.'
            },
            {
                name: 'Stem borers',
                damageDescription: 'Weaken stalks and increase lodging in temperate, dry, and continental sunflower.'
            },
            {
                name: 'Seed weevils and moth larvae',
                damageDescription: 'Attack heads and developing seed, often opening the way for fungal decay.'
            },
            {
                name: 'Aphids and other sap suckers',
                damageDescription: 'Cause honeydew, sooty mold, and additional plant stress during vegetative growth.'
            }
        ],
        beneficials: [
            {
                name: 'Parasitoid wasps, ladybirds, and lacewings',
                description: 'Attack egg and larval stages of caterpillars, aphids, and head-feeding insects.'
            },
            {
                name: 'Predatory bugs, spiders, and ground beetles',
                description: 'Provide broad suppression of foliage and head pests when residues and refuge habitat are managed well.'
            },
            {
                name: 'Bt and microbial agents',
                description: 'Useful for caterpillar outbreaks when timed to early larval stages.'
            }
        ],
        chemicalActives: {
            actives: [
                'targeted stem- and head-borer products timed around vegetative growth and head formation',
                'selective aphid materials when scouting shows threshold pressure',
                'residue and disease-aware programs that protect beneficial insects'
            ],
            mainPestGroups: 'seedling pests, stem borers, head feeders, aphids, and associated head rots',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    cotton: {
        cropName: 'Cotton (fiber and seed)',
        maturityNotes:
            'Many cotton varieties mature for seed and lint in about 150-180 days. Short-season types can finish ' +
            'faster in warm systems, while cooler or cloudy conditions slow boll development and harvest.',
        damageToLookFor: [
            'Chewed leaves or damaged terminals -> bollworms and foliage feeders',
            'Square and boll shed -> bollworms and reproductive stress',
            'Sticky honeydew and black sooty mold -> whiteflies, aphids, or jassids',
            'Bronzed leaves or stained lint -> mites or heavy sucking-pest pressure'
        ],
        pests: [
            {
                name: 'Bollworms and other caterpillars',
                damageDescription: 'Attack squares, flowers, and bolls, reducing lint and seed yield.'
            },
            {
                name: 'Whiteflies, aphids, and jassids',
                damageDescription: 'Cause honeydew, sooty mold, square loss, and contamination of lint and seed.'
            },
            {
                name: 'Thrips and mites',
                damageDescription: 'Damage leaves and terminals, especially in hot dry conditions or stressed cotton.'
            }
        ],
        beneficials: [
            {
                name: 'Parasitoid wasps of bollworms',
                description: 'Reduce egg and larval bollworm pressure when sprays are selective and timed carefully.'
            },
            {
                name: 'Ladybirds, lacewings, predatory bugs, and spiders',
                description: 'Hold aphids, whiteflies, and small larvae below threshold when non-host breaks and refuges are maintained.'
            },
            {
                name: 'Bt and residue destruction',
                description: 'Bt-based suppression plus prompt residue destruction help slow pest carryover and resistance.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective bollworm products timed at early square and boll stages',
                'targeted whitefly or aphid materials under heavy infestations',
                'mite-specific products where dry-season outbreaks are confirmed'
            ],
            mainPestGroups: 'bollworms, whiteflies, aphids, jassids, thrips, and mites',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    sesame: {
        cropName: 'Sesame',
        maturityNotes:
            'Many sesame cultivars reach harvest in about 80-120 days. Hot, dry environments can speed maturity, ' +
            'but shattering risk and harvest losses increase if the crop is left too long after dry-down.',
        damageToLookFor: [
            'Poor emergence or cut seedlings -> soil pests and cutworms',
            'Chewed stems and leaves -> caterpillars or beetles',
            'Flower drop and pod scars -> sucking pests or pod borers',
            'Wilted or spotted plants -> disease complexes compounding insect damage'
        ],
        pests: [
            {
                name: 'Soil insects and cutworms',
                damageDescription: 'Reduce sesame stands during establishment, especially in dry tropical systems.'
            },
            {
                name: 'Caterpillars and beetles',
                damageDescription: 'Defoliate plants and damage stems in vegetative stages.'
            },
            {
                name: 'Pod borers and sucking pests',
                damageDescription: 'Attack flowers and pods, reducing seed set and oil quality.'
            },
            {
                name: 'Wilts and leaf spots',
                damageDescription: 'Disease pressure intensifies crop losses when plants are already weakened by pests.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory beetles, ladybirds, and lacewings',
                description: 'Reduce aphids, soft-bodied pests, and some early caterpillar stages.'
            },
            {
                name: 'Parasitoid wasps and spiders',
                description: 'Suppress pod borers and foliage feeders when flowering is protected from broad-spectrum sprays.'
            },
            {
                name: 'Soil microbes and clean-seed practices',
                description: 'Support emergence and resilience when paired with crop rotation and residue management.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatment or early protection against soil pests where labeled',
                'selective foliar sprays for pod borers at flowering and pod set',
                'targeted sucking-pest materials based on scouting rather than calendar use'
            ],
            mainPestGroups: 'soil pests, cutworms, caterpillars, pod borers, sucking bugs, and disease complexes',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    mustard_seed: {
        cropName: 'Mustard seed',
        maturityNotes:
            'Many mustard oilseed varieties mature in about 80-110 days. Cooler climates and high-elevation fields ' +
            'can stretch the crop cycle, so sowing dates are often adjusted to avoid frost or heat at flowering.',
        damageToLookFor: [
            'Shot-holed cotyledons and leaves -> flea beetles after emergence',
            'Sticky buds and stems -> aphids and other sap suckers',
            'Damaged pods or flower loss -> pod borers and caterpillars',
            'Blighted or mildewed foliage -> diseases worsened by feeding injury'
        ],
        pests: [
            {
                name: 'Flea beetles',
                damageDescription: 'Chew cotyledons and young leaves, threatening establishment in cool-season mustard.'
            },
            {
                name: 'Aphids and other sap-sucking insects',
                damageDescription: 'Colonize stems, buds, and pods, reducing vigour and seed set.'
            },
            {
                name: 'Pod borers and caterpillars',
                damageDescription: 'Damage flowers and pods during reproductive stages.'
            },
            {
                name: 'Blights and mildews',
                damageDescription: 'Disease pressure compounds insect injury and weakens pod fill.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, and hoverflies',
                description: 'Strong aphid predators that help keep mustard colonies below threshold.'
            },
            {
                name: 'Parasitoid wasps, ground beetles, and spiders',
                description: 'Suppress flea beetles, pod borers, and other canopy pests.'
            },
            {
                name: 'Microbial agents and crop rotation',
                description: 'Support targeted pest suppression while reducing disease carryover.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatments for flea beetles and early soil pests where labeled',
                'selective aphid and sucking-pest sprays at threshold',
                'pod-borer products plus fungicides for key disease pressure where needed'
            ],
            mainPestGroups: 'flea beetles, aphids, pod borers, caterpillars, blights, and mildews',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    linseed: {
        cropName: 'Linseed / flaxseed',
        maturityNotes:
            'Many linseed and flaxseed varieties reach harvestable seed in about 90-130 days, depending on sowing ' +
            'date, temperature, and moisture. Cooler or high-mountain conditions can slow maturity but still fit a ' +
            'relatively short growing season.',
        damageToLookFor: [
            'Poor stand establishment -> soil insects or cutworms',
            'Chewed or distorted leaves -> seedling pests, aphids, or thrips',
            'Damaged flowers or capsules -> capsule feeders and sap suckers',
            'Rust, wilt, or blight symptoms -> disease complexes interacting with feeding injury'
        ],
        pests: [
            {
                name: 'Cutworms and soil insects',
                damageDescription: 'Thin stands and injure seedlings soon after emergence.'
            },
            {
                name: 'Aphids and thrips',
                damageDescription: 'Feed on foliage and flowers, reducing plant vigour and seed set.'
            },
            {
                name: 'Capsule-feeding insects',
                damageDescription: 'Scar or feed inside developing seed capsules, lowering yield and quality.'
            },
            {
                name: 'Rusts, wilts, and blights',
                damageDescription: 'Disease pressure worsens yield loss when insect injury already stresses the crop.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, and hoverflies',
                description: 'Help regulate aphids and other soft-bodied pests in cool-season flax systems.'
            },
            {
                name: 'Parasitoid wasps, ground beetles, and spiders',
                description: 'Suppress thrips, capsule feeders, and soil-surface pests.'
            },
            {
                name: 'Microbial agents and sanitation',
                description: 'Complement crop rotation, balanced fertility, and residue management to reduce pest and disease carryover.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatment for early protection where labeled',
                'selective aphid and thrips materials after scouting confirms economic risk',
                'fungicides for rust, wilt, or blight pressure where needed'
            ],
            mainPestGroups: 'soil pests, aphids, thrips, capsule feeders, and flax diseases',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    }
};

const OILSEED_ALIASES = {
    oil_palm: 'oil_palm',
    'oil palm': 'oil_palm',
    'oil palms': 'oil_palm',
    canola: 'canola',
    rapeseed: 'canola',
    'rape seed': 'canola',
    'rapeseed / canola': 'canola',
    sunflower: 'sunflower',
    sunflowers: 'sunflower',
    cotton: 'cotton',
    cottonseed: 'cotton',
    'cotton seed': 'cotton',
    sesame: 'sesame',
    'sesame seed': 'sesame',
    'sesame seeds': 'sesame',
    mustard: 'mustard_seed',
    'mustard seed': 'mustard_seed',
    mustard_seed: 'mustard_seed',
    linseed: 'linseed',
    flaxseed: 'linseed',
    flax: 'linseed',
    'linseed / flaxseed': 'linseed'
};

const OILSEED_CROP_KEYS = Object.keys(OILSEED_IPM);

module.exports = {
    OILSEED_IPM,
    OILSEED_ALIASES,
    OILSEED_CROP_KEYS
};
