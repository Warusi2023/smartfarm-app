/**
 * Fiber crop IPM - Pests & Protection panel data with maturity windows.
 */

const { CHEMICAL_SAFETY_NOTE } = require('./ipmConstants');

/** @type {Record<string, object>} */
const FIBER_IPM = {
    cotton: {
        cropName: 'Cotton',
        maturityNotes:
            'Tropical and dry irrigated cotton commonly reaches first pick in about 150-190 days, with the full picking window extending another 20-45 days. ' +
            'Warm temperate systems depend on a reliable frost-free period, while continental and high-mountain settings are usually marginal or not normally recommended.',
        damageToLookFor: [
            'Chewed squares, flowers, or young bolls -> bollworms and bud feeders',
            'Sticky honeydew and black sooty mold -> whiteflies, aphids, or jassids',
            'Bronzed or curled leaves -> mites, thrips, or heavy sucking-pest pressure',
            'Square shed, weak boll set, or stained lint -> pest stress compounded by heat or drought'
        ],
        pests: [
            {
                name: 'Bollworms and reproductive-stage caterpillars',
                damageDescription: 'Major tropical, dry, and warm temperate cotton pests that attack squares, flowers, and bolls, cutting lint and seed yield.'
            },
            {
                name: 'Whiteflies, aphids, jassids, and leafhoppers',
                damageDescription: 'Sap suckers contaminate lint with honeydew, spread disease risk, and weaken canopies under warm conditions.'
            },
            {
                name: 'Thrips, mites, and early-season seedling pests',
                damageDescription: 'Damage young stands and stressed fields, especially in hot dry climates or late-planted cotton.'
            },
            {
                name: 'Defoliators, boll rots, and late-season bug pressure',
                damageDescription: 'Secondary outbreaks reduce boll fill and lint quality if the crop stays in the field too long.'
            }
        ],
        beneficials: [
            {
                name: 'Trichogramma, braconid wasps, and other parasitoids',
                description: 'Attack bollworm eggs and larvae - conserve them with selective chemistry and refuge planning.'
            },
            {
                name: 'Ladybirds, lacewings, minute pirate bugs, and spiders',
                description: 'Hold aphids, whiteflies, and small larvae below threshold when field margins and non-host breaks are maintained.'
            },
            {
                name: 'Bt, refuge planting, and residue destruction',
                description: 'Biological and cultural tools help delay resistance, reduce volunteer cotton, and keep lint pests manageable.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective bollworm products timed at early square and boll stages where labeled',
                'targeted whitefly, aphid, and jassid materials only when thresholds justify use',
                'mite-specific products in confirmed dry-season hotspots',
                'register-backed actives should override example lists whenever cotton approvals exist for the farm region'
            ],
            mainPestGroups: 'bollworms, sucking pests, thrips, mites, and late-season lint quality threats',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    jute: {
        cropName: 'Jute',
        maturityNotes:
            'Warm humid tropical jute is often harvested for fiber in about 100-140 days, depending on variety, planting date, and monsoon rainfall. ' +
            'Warm temperate systems can run slightly longer, while dry, continental, and high-mountain climates are generally unsuitable without strong irrigation or protection.',
        damageToLookFor: [
            'Chewed seedling leaves or poor stand -> semiloopers, cutworms, or flea-like seedling pests',
            'Stem lesions, weak bark, or snapped plants -> stem borers, stem rots, or lodging stress',
            'Yellowing, curling, or sticky leaves -> jassids, aphids, or mites in dense humid canopies',
            'Patchy retting quality or coarse fiber -> delayed harvest, disease, or severe canopy stress'
        ],
        pests: [
            {
                name: 'Semiloopers, hairy caterpillars, and seedling defoliators',
                damageDescription: 'Attack jute leaves and reduce early vigor in tropical and monsoon-influenced systems.'
            },
            {
                name: 'Stem weevils, borers, and bark feeders',
                damageDescription: 'Damage stems and fiber-producing tissues, especially in dense warm-season stands.'
            },
            {
                name: 'Aphids, jassids, whiteflies, and mites',
                damageDescription: 'Sap suckers curl foliage and intensify plant stress under humid, fast-growing canopies.'
            },
            {
                name: 'Stem rot, wilt, and foliar disease complexes',
                damageDescription: 'Humid weather and poor rotation encourage disease that lowers bast fiber quality and harvest uniformity.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, spiders, and parasitoid wasps',
                description: 'Support suppression of sucking pests and caterpillars when field-edge habitat is conserved.'
            },
            {
                name: 'Rotation, sanitation, and tolerant varieties',
                description: 'Clean seed, residue removal, and non-host breaks reduce carryover of stem and foliar problems.'
            },
            {
                name: 'Microbial agents and careful canopy management',
                description: 'Bt and fungal biocontrols can supplement IPM where warm, wet conditions favor repeated pest generations.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective seedling and leaf-feeder products where labeled for jute',
                'threshold-based sucking-pest control in dense humid canopies',
                'fungicides or seed treatments for serious stem and foliar disease pressure where approved',
                'use local register-backed approvals where available and avoid broad-spectrum sprays during retting-sensitive stages'
            ],
            mainPestGroups: 'seedling pests, stem borers, sucking pests, and humid-weather disease complexes',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    kenaf: {
        cropName: 'Kenaf',
        maturityNotes:
            'Kenaf usually reaches fiber harvest in about 110-150 days in tropical and warm temperate climates, with planting date and rainfall strongly affecting stem height and bast quality. ' +
            'Dry systems need irrigation for reliable fiber yield, while cool continental or high-mountain regions are often marginal.',
        damageToLookFor: [
            'Missing seedlings or cut stems -> cutworms and early soil pests',
            'Chewed foliage and slowed vertical growth -> caterpillars and foliage feeders',
            'Stem scars or weak bast quality -> stem borers or prolonged disease pressure',
            'Sticky leaves or distorted tops -> aphids, jassids, or whiteflies'
        ],
        pests: [
            {
                name: 'Cutworms and early seedling pests',
                damageDescription: 'Reduce stand establishment and delay canopy closure in kenaf planted into warm soils.'
            },
            {
                name: 'Leaf-feeding caterpillars and beetles',
                damageDescription: 'Defoliate the fast-growing canopy and reduce stem biomass in humid tropical and temperate summer systems.'
            },
            {
                name: 'Stem borers and bark-feeding insects',
                damageDescription: 'Directly reduce bast fiber quality and weaken stems before harvest.'
            },
            {
                name: 'Aphids, jassids, whiteflies, and wilt diseases',
                damageDescription: 'Sap suckers and disease stress distort tops and reduce clean fiber formation in dense stands.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, parasitic wasps, and spiders',
                description: 'Provide broad control of caterpillars and sucking pests when sprays remain selective.'
            },
            {
                name: 'Rotation, field sanitation, and tolerant cultivars',
                description: 'Lower the carryover of wilt, stem disease, and heavy insect pressure between seasons.'
            },
            {
                name: 'Microbial products for caterpillars',
                description: 'Bt and related biologicals fit kenaf systems that need to protect bast fiber quality and beneficial populations.'
            }
        ],
        chemicalActives: {
            actives: [
                'seedling protection against cutworms and soil pests where labeled',
                'selective foliar products for caterpillars and sucking pests at threshold',
                'fungicides for wilt or serious stem disease where approved',
                'favor materials that preserve beneficials in fast-growing kenaf canopies'
            ],
            mainPestGroups: 'seedling pests, foliage feeders, stem borers, sucking pests, and wilt complexes',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    flax_linen: {
        cropName: 'Flax (linen)',
        maturityNotes:
            'Fiber flax in temperate and continental climates is commonly harvested in about 85-115 days, often earlier than linseed grown for seed. ' +
            'Heat stress, drought, or lodging can force earlier harvest at the expense of fiber quality, while high-mountain short seasons may still work if the crop avoids frost.',
        damageToLookFor: [
            'Shot-holed or thinned seedlings -> flea beetles, cutworms, or seedling pests',
            'Twisted or yellowing tops -> aphids, thrips, or root stress',
            'Rust pustules, blights, or weak stems -> foliar disease and lodging pressure',
            'Uneven stem color or coarse fiber -> delayed harvest, heat stress, or heavy disease pressure'
        ],
        pests: [
            {
                name: 'Flea beetles, cutworms, and seedling insects',
                damageDescription: 'Threaten establishment in cool-season fiber flax, especially during slow early growth.'
            },
            {
                name: 'Aphids and thrips',
                damageDescription: 'Reduce stem vigor and interfere with uniform bast development in temperate and continental flax.'
            },
            {
                name: 'Rust, pasmo, wilt, and seedling blights',
                damageDescription: 'Disease pressure weakens stems, increases lodging, and lowers linen quality.'
            },
            {
                name: 'Lodging-related stress and secondary stem damage',
                damageDescription: 'Rain, wind, and disease can force practical harvest before ideal fiber maturity is reached.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, hoverflies, lacewings, and ground beetles',
                description: 'Help manage aphids and other small pests in cool-season flax when rotations and margins are maintained.'
            },
            {
                name: 'Rotation, residue management, and balanced fertility',
                description: 'Core IPM tools against flax diseases, lodging, and carryover of seedling pests.'
            },
            {
                name: 'Microbial and low-residue biocontrol options',
                description: 'Useful where compatible with linen quality goals and cool-season beneficial activity.'
            }
        ],
        chemicalActives: {
            actives: [
                'seed treatment or early protection where labeled for fiber flax',
                'selective aphid and thrips control after scouting confirms economic risk',
                'fungicides for rust, pasmo, wilt, or blight where registered',
                'prioritize programs that protect stem quality and avoid unnecessary lodging stress'
            ],
            mainPestGroups: 'seedling pests, aphids, thrips, flax diseases, and lodging-related quality loss',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    hemp: {
        cropName: 'Hemp',
        maturityNotes:
            'Fiber hemp often reaches cut stage in about 90-120 days, while dual-purpose fiber-plus-seed systems commonly run about 120-150 days depending on daylength and variety. ' +
            'Temperate and continental zones are the main production regions. High-mountain systems need short-season cultivars, and all hemp harvest timing must remain consistent with local legal and market requirements.',
        damageToLookFor: [
            'Cut seedlings or missing rows -> cutworms and early soil pests',
            'Curled leaves, sticky growth, or patchy vigor -> aphids, leafhoppers, or whiteflies',
            'Bud or stem feeding -> caterpillars, borers, or late-season disease pressure',
            'Gray mold or powdery canopy -> dense stands, excess humidity, or delayed harvest'
        ],
        pests: [
            {
                name: 'Cutworms, flea beetles, and early stand pests',
                damageDescription: 'Can thin young hemp stands before the crop reaches its competitive growth phase.'
            },
            {
                name: 'Aphids, leafhoppers, and mites',
                damageDescription: 'Sap suckers reduce vigor and can complicate low-residue management expectations in hemp markets.'
            },
            {
                name: 'Caterpillars, stem borers, and bud feeders',
                damageDescription: 'Damage stems or reproductive tissues in fiber and dual-purpose hemp, especially where surrounding broadleaf hosts are abundant.'
            },
            {
                name: 'Gray mold, powdery mildew, and humid-canopy diseases',
                damageDescription: 'Dense canopies and delayed harvests can sharply lower fiber or seed quality.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, parasitoid wasps, and predatory mites',
                description: 'Support minimal-pesticide hemp systems by suppressing sap suckers and small larvae.'
            },
            {
                name: 'Rotation, diversified cropping, and open-canopy management',
                description: 'Reduce the need for chemical input while helping manage disease and legal-quality thresholds.'
            },
            {
                name: 'Biologicals and market-compliant IPM programs',
                description: 'Bt, microbial agents, and selective products fit hemp systems that must align with regulation and buyer residue expectations.'
            }
        ],
        chemicalActives: {
            actives: [
                'only locally permitted and explicitly registered hemp actives should be used',
                'selective sucking-pest or caterpillar materials where legal frameworks allow',
                'fungicides for serious humid-canopy disease pressure only where approved',
                'region-aware register-backed filtering is especially important for hemp because legal status varies widely'
            ],
            mainPestGroups: 'seedling pests, sap suckers, caterpillars, and humid-canopy diseases',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    sisal_agave: {
        cropName: 'Sisal / agave fibers',
        maturityNotes:
            'Sisal and related agave fiber crops are perennial and often take about 2-4 years to first commercial leaf harvest, with repeated cutting cycles afterward. ' +
            'Dry and tropical semi-arid climates are the main production zones. Cooler temperate, continental, and high-mountain settings are generally not recommended except in highly protected situations.',
        damageToLookFor: [
            'Bored crowns, weakened rosettes, or collapsed leaves -> agave weevils and rosette borers',
            'Sticky leaves, sooty growth, or scale patches -> mealybugs, scales, and stressed plants',
            'Leaf spots, crown rot, or soft tissue -> waterlogging or disease entering through injury',
            'Irregular leaf size or poor fiber yield -> drought stress, neglected sanitation, or aging stands'
        ],
        pests: [
            {
                name: 'Agave weevils, borers, and crown-feeding insects',
                damageDescription: 'Exploit stressed rosettes and directly weaken perennial fiber stands in dry and tropical systems.'
            },
            {
                name: 'Scales, mealybugs, and sap-sucking pests',
                damageDescription: 'Build on weakened leaves and reduce plant vigor under drought or poor field sanitation.'
            },
            {
                name: 'Leaf spot, crown rot, and wound-entry disease complexes',
                damageDescription: 'Increase where harvest cuts, poor drainage, or neglected residue create entry points.'
            },
            {
                name: 'Rodents and chronic stand decline',
                damageDescription: 'Secondary but important long-cycle threats in low-input perennial plantations.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory beetles, parasitoids, spiders, and birds',
                description: 'Help suppress borers and sap suckers when perennial habitat is not disrupted by unnecessary spraying.'
            },
            {
                name: 'Sanitation and removal of heavily infested plants',
                description: 'Critical cultural IPM practice for perennial rosettes, especially after crown injury or drought stress.'
            },
            {
                name: 'Entomopathogenic fungi and careful plantation staggering',
                description: 'Support long-term fiber productivity while keeping pest outbreaks from spreading across the whole planting.'
            }
        ],
        chemicalActives: {
            actives: [
                'targeted crown or rosette treatments against borers where labeled',
                'selective sucking-pest control for chronic scale or mealybug pressure',
                'fungicides for crown or leaf rot only where locally approved',
                'focus on low-input, sanitation-led management because perennial agave systems often have limited registered chemistry'
            ],
            mainPestGroups: 'borers, sap suckers, crown rots, and long-cycle stand decline',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    }
};

const FIBER_ALIASES = {
    cotton: 'cotton',
    'cotton fiber': 'cotton',
    'lint cotton': 'cotton',
    'upland cotton': 'cotton',
    jute: 'jute',
    'tossa jute': 'jute',
    'white jute': 'jute',
    kenaf: 'kenaf',
    'bast kenaf': 'kenaf',
    flax_linen: 'flax_linen',
    'flax (linen)': 'flax_linen',
    'linen flax': 'flax_linen',
    linen: 'flax_linen',
    flax: 'flax_linen',
    hemp: 'hemp',
    'industrial hemp': 'hemp',
    'fiber hemp': 'hemp',
    'dual-purpose hemp': 'hemp',
    sisal_agave: 'sisal_agave',
    'sisal / agave fibers': 'sisal_agave',
    sisal: 'sisal_agave',
    henequen: 'sisal_agave',
    'agave fiber': 'sisal_agave',
    'agave fibers': 'sisal_agave',
    agave: 'sisal_agave'
};

const FIBER_CROP_KEYS = Object.keys(FIBER_IPM);

module.exports = {
    FIBER_IPM,
    FIBER_ALIASES,
    FIBER_CROP_KEYS
};
