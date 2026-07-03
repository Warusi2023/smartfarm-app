/**
 * Root and tuber IPM — Pests & Protection panel data with maturity windows.
 */

const { CHEMICAL_SAFETY_NOTE } = require('./ipmConstants');

/** @type {Record<string, object>} */
const ROOT_TUBER_IPM = {
    potato: {
        cropName: 'Potato',
        maturityNotes:
            'Early varieties in temperate regions: about 80–100 days. Mid-season: 100–120 days. ' +
            'Late varieties: 120–150+ days; cooler climates often extend these windows. ' +
            'Adjust planting and harvest to local frost and rainfall patterns.',
        damageToLookFor: [
            'Chewed leaves and skeletonized foliage → Colorado potato beetle, flea beetles, or caterpillars',
            'Wilting plants and blackened stems → bacterial wilt or late blight',
            'Dark lesions on leaves and tubers → late blight',
            'Tunnels in tubers and stems → tuber moth or wireworms',
            'Misshapen or rotten tubers → soil pests or storage rots'
        ],
        pests: [
            {
                name: 'Colorado potato beetle and flea beetles',
                damageDescription: 'Chew leaves and cause defoliation in temperate, continental, and high-mountain potato.'
            },
            {
                name: 'Tuber moth and wireworms',
                damageDescription: 'Tunnel into tubers and stems — scout at hilling and before harvest.'
            },
            {
                name: 'Late blight and bacterial wilt',
                damageDescription: 'Wilting, blackened stems, and dark lesions on leaves and tubers; flare in humid weather.'
            },
            {
                name: 'Caterpillars',
                damageDescription: 'Defoliate plants and reduce tuber bulking when populations build mid-season.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybird beetles, lacewings, and predatory bugs',
                description: 'Reduce beetles, caterpillars, and soft-bodied pests — conserve with flowering margins.'
            },
            {
                name: 'Ground beetles, spiders, and entomopathogenic fungi',
                description: 'Attack soil larvae and foliage pests when broad sprays are avoided.'
            },
            {
                name: 'Bacillus thuringiensis (Bt)',
                description: 'Microbial control for caterpillars when thresholds are met.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective insecticides for beetles and tuber moth (where labeled)',
                'fungicides for late blight and key potato diseases',
                'program timing that avoids wiping out beneficials'
            ],
            mainPestGroups: 'Colorado potato beetle, tuber moth, wireworms, and late blight',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    cassava: {
        cropName: 'Cassava (manioc)',
        maturityNotes:
            'Many tropical varieties: harvestable at 6–12 months. Long-cycle types in drier or marginal areas: ' +
            '8–24 months in ground as a living food reserve. Early harvest gives smaller roots; late harvest ' +
            'develops larger storage roots and higher starch.',
        damageToLookFor: [
            'Curled or distorted leaves and stunting → cassava mealybug',
            'Bronzed, smaller leaves → green mites',
            'Sticky leaves → whiteflies or scale insects',
            'Tunneling or rot in roots → borers or root rot complexes'
        ],
        pests: [
            {
                name: 'Cassava mealybug',
                damageDescription: 'Causes leaf curl and stunting — historically a major tropical cassava threat.'
            },
            {
                name: 'Cassava green mites',
                damageDescription: 'Bronze leaves and reduce leaf area in dry tropical cassava systems.'
            },
            {
                name: 'Whiteflies, scale insects, and stem borers',
                damageDescription: 'Damage stems and roots; whiteflies vector virus diseases.'
            },
            {
                name: 'Root rot and bacterial blight',
                damageDescription: 'Non-insect threats that reduce storage root quality and stand health.'
            }
        ],
        beneficials: [
            {
                name: 'Anagyrus lopezi and other parasitic wasps',
                description: 'Classic biocontrol of cassava mealybug — conserve by avoiding unnecessary broad-spectrum sprays.'
            },
            {
                name: 'Native predators, parasitoids, and microbial agents',
                description: 'Help control mites and soft-bodied pests when field diversity is maintained.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective insecticides against mites and whiteflies (where labeled)',
                'fungicides or bactericides for root and stem diseases',
                'always follow local labels and safety guidance'
            ],
            mainPestGroups: 'mealybug, green mites, whiteflies, and root/stem diseases',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    sweet_potato: {
        cropName: 'Sweet potato',
        maturityNotes:
            'Many tropical cultivars: 3–5 months to harvestable size. Cooler or high-mountain conditions: ' +
            'often 4–6+ months. Early harvest gives tender roots; longer in soil allows bulking but increases pest and disease risk.',
        damageToLookFor: [
            'Yellowing or mottled leaves → viruses or nutrient stress',
            'Wilting or dying-back vines → weevil or root damage',
            'Holes, tunnels, or surface scars on roots → weevils or wireworms',
            'Distorted foliage → aphid- or mite-transmitted viruses'
        ],
        pests: [
            {
                name: 'Sweet potato weevil and root-feeding beetles',
                damageDescription: 'Tunnel into roots causing bitter, deformed tubers — critical in tropical and warm temperate zones.'
            },
            {
                name: 'Whiteflies, aphids, and mites',
                damageDescription: 'Feed on foliage and transmit viruses that stunt vines and distort leaves.'
            },
            {
                name: 'Wireworms and nematodes',
                damageDescription: 'Soil pests that scar roots and reduce yield — scout with clean planting material.'
            }
        ],
        beneficials: [
            {
                name: 'Parasitic wasps and predatory beetles',
                description: 'Target weevils and beetles — supported by crop rotation and clean slips.'
            },
            {
                name: 'Spiders, lacewings, and microbial agents',
                description: 'Suppress soft-bodied insects when residues are destroyed and resistant varieties are used.'
            }
        ],
        chemicalActives: {
            actives: [
                'targeted insecticides against weevils and soil pests at or after planting',
                'selective materials for whiteflies and aphids when thresholds are met',
                'apply early in the cycle to prevent heavy root damage'
            ],
            mainPestGroups: 'sweet potato weevil, wireworms, whiteflies, and nematodes',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    yam: {
        cropName: 'Yam',
        maturityNotes:
            'Humid tropics: many varieties reach harvestable size in 8–10 months; 10–12 months for maximum tuber development. ' +
            'Some early types from 6–8 months. Cooler or high-mountain climates may shorten the season but slow tuber filling.',
        damageToLookFor: [
            'Chewed vines and foliage → beetles, caterpillars, or grasshoppers',
            'Yellowing or necrotic leaf spots → disease or mite pressure',
            'Tunneling, cracks, or rot in tubers → yam beetles, nematodes, or grubs'
        ],
        pests: [
            {
                name: 'Yam beetles and soil grubs',
                damageDescription: 'Attack tubers in humid tropical and high-rainfall yam systems.'
            },
            {
                name: 'Foliage feeders (beetles, caterpillars, grasshoppers)',
                damageDescription: 'Chew vines and reduce photosynthetic area during the long growing cycle.'
            },
            {
                name: 'Nematodes',
                damageDescription: 'Damage tubers and weaken plants — often enter through skin wounds.'
            },
            {
                name: 'Fungal and bacterial rots',
                damageDescription: 'Spread through damaged skin; critical during harvest, curing, and storage.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory beetles, parasitic wasps, and spiders',
                description: 'Attack leaf-feeding insects and soil larvae when stakes and sanitation are used.'
            },
            {
                name: 'Microbial agents against larvae',
                description: 'Supplement natural control when diseased plants are removed promptly.'
            }
        ],
        chemicalActives: {
            actives: [
                'targeted soil insecticides or nematicides at or before planting (where labeled)',
                'selective foliar sprays when heavy leaf-feeding threatens yields',
                'fungicides or bactericides for serious tuber rot diseases'
            ],
            mainPestGroups: 'yam beetles, nematodes, foliage feeders, and tuber rots',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    taro: {
        cropName: 'Taro / cocoyam',
        maturityNotes:
            'Most varieties: 9–11 months to full maturity; many guides recommend harvest at 10–12 months when leaves ' +
            'yellow and dry and corms reach optimal size. Cooler or higher-altitude sites may delay maturity slightly.',
        damageToLookFor: [
            'Chewed or shredded leaves → hawk moths, armyworms, or beetles',
            'Holes in petioles → taro beetles or borers',
            'Yellowing, spots, or collapse → Phytophthora blight or mosaic viruses',
            'Tunneling or rot in corms → beetles, grubs, or root-rot complexes'
        ],
        pests: [
            {
                name: 'Taro beetles and armyworms',
                damageDescription: 'Feed on leaves and petioles in humid tropical and warm subtropical taro/cocoyam.'
            },
            {
                name: 'Silver-striped hawk moth caterpillars',
                damageDescription: 'Defoliate plants — scout in wet-season plantings.'
            },
            {
                name: 'Phytophthora leaf blight and mosaic viruses',
                damageDescription: 'Cause yellowing, spots, and plant collapse in poorly drained fields.'
            },
            {
                name: 'Corm borers and root-rot complexes',
                damageDescription: 'Tunnel into corms and reduce marketable yield after prolonged wet conditions.'
            }
        ],
        beneficials: [
            {
                name: 'Parasitic wasps, predatory bugs, and birds',
                description: 'Natural enemies of caterpillars and beetles — support with weed control and clean setts.'
            },
            {
                name: 'Entomopathogenic fungi and bacteria',
                description: 'Infect larvae in humid taro systems when sanitation removes infected plants.'
            }
        ],
        chemicalActives: {
            actives: [
                'targeted insecticides against taro beetles and caterpillars (where labeled)',
                'fungicides for leaf blight and root-rot diseases',
                'choose products that minimize harm to beneficials in wet soils'
            ],
            mainPestGroups: 'taro beetles, caterpillars, Phytophthora blight, and corm rots',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    aroid: {
        cropName: 'Aroid (tannia)',
        maturityNotes:
            'Tannia and related aroids: commonly 8–12 months depending on variety, soil fertility, and climate. ' +
            'Judge readiness by corm size, leaf senescence, and market demand.',
        damageToLookFor: [
            'Leaf chewing and petiole tunneling → caterpillars, beetles, or grubs',
            'Leaf spots and blights → fungal pathogens',
            'Corm or root rot → pathogens entering through pest damage'
        ],
        pests: [
            {
                name: 'Caterpillars, beetles, and grubs',
                damageDescription: 'Feed on foliage and underground parts in humid tropical and warm temperate aroids.'
            },
            {
                name: 'Leaf spots, blights, and complex rots',
                damageDescription: 'Reduce yields and storage quality when water management is poor.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory beetles, parasitic wasps, spiders, and birds',
                description: 'Suppress leaf-feeding pests and soil larvae with sanitation and water control.'
            },
            {
                name: 'Microbial agents',
                description: 'Support long-term stability when chemical use is minimal and well-timed.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective insecticides against beetles and larvae at threshold',
                'fungicides or bactericides for leaf and root diseases',
                'integrate with water control and healthy planting material'
            ],
            mainPestGroups: 'beetles, caterpillars, leaf blights, and corm rots',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    sago_palm: {
        cropName: 'Sago palm',
        maturityNotes:
            'Very long cycle: often 7–15+ years to full trunk size and starch content, depending on variety, site, and management. ' +
            'Harvest when trunk diameter and height are suitable and before natural senescence reduces starch quality.',
        damageToLookFor: [
            'Yellowing fronds and stunted crowns → borers, beetles, or chronic stress',
            'Sap-sucking insect damage on fronds → weakened palms',
            'Internal trunk decay → fungal or bacterial rot reducing starch yield'
        ],
        pests: [
            {
                name: 'Trunk borers and beetles',
                damageDescription: 'Weaken palms in wet tropical and swampy sago stands.'
            },
            {
                name: 'Sap-sucking insects',
                damageDescription: 'Reduce vigour of fronds and crowns over long growth cycles.'
            },
            {
                name: 'Fungal and bacterial trunk rots',
                damageDescription: 'Cause decline especially in poorly drained stands.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory insects, birds, and bats',
                description: 'Reduce borer and beetle populations when diverse vegetation is maintained.'
            },
            {
                name: 'Microbial agents',
                description: 'Help suppress pests when unnecessary insecticide use is avoided and water levels are managed.'
            }
        ],
        chemicalActives: {
            actives: [
                'targeted insecticides against trunk borers (trunk treatment where locally recommended)',
                'fungicides for serious trunk rots',
                'follow specialist guidance for long-cycle sago stands'
            ],
            mainPestGroups: 'trunk borers, sap suckers, and trunk rots',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    }
};

const ROOT_TUBER_ALIASES = {
    potato: 'potato',
    potatoes: 'potato',
    cassava: 'cassava',
    manioc: 'cassava',
    'sweet potato': 'sweet_potato',
    sweet_potato: 'sweet_potato',
    'sweet potatoes': 'sweet_potato',
    yam: 'yam',
    yams: 'yam',
    taro: 'taro',
    cocoyam: 'taro',
    'taro / cocoyam': 'taro',
    aroid: 'aroid',
    tannia: 'aroid',
    aroids: 'aroid',
    sago: 'sago_palm',
    'sago palm': 'sago_palm',
    sago_palm: 'sago_palm'
};

const ROOT_TUBER_CROP_KEYS = Object.keys(ROOT_TUBER_IPM);

module.exports = {
    ROOT_TUBER_IPM,
    ROOT_TUBER_ALIASES,
    ROOT_TUBER_CROP_KEYS
};
