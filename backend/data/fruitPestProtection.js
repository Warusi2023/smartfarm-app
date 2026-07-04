/**
 * Fruit crop IPM - Pests & Protection panel data with maturity windows.
 */

const { CHEMICAL_SAFETY_NOTE } = require('./ipmConstants');

/** @type {Record<string, object>} */
const FRUIT_IPM = {
    banana_plantain: {
        cropName: 'Bananas and plantains',
        maturityNotes:
            'Tropical dessert bananas and plantains commonly take about 9-14 months from planting to first bunch harvest, with ratoon crops often moving faster after establishment. ' +
            'Humid tropical and irrigated dry climates are the main fit; cool temperate, continental, and high-mountain settings are generally unsuitable without strong protection.',
        damageToLookFor: [
            'Tunneled corms, toppled mats, or weak ratoons -> weevils and nematodes',
            'Yellowing, necrotic leaves, or streaks -> Sigatoka and other foliar disease pressure',
            'Split or deformed pseudostems -> borers, wind damage, or chronic stress',
            'Dirty bunches or slow bunch fill -> sap suckers, poor sanitation, or prolonged water stress'
        ],
        pests: [
            {
                name: 'Banana weevils and corm borers',
                damageDescription: 'Damage corms and pseudostems, reduce ratoon vigor, and increase lodging risk in tropical banana and plantain systems.'
            },
            {
                name: 'Nematodes and root-feeding pests',
                damageDescription: 'Weaken anchorage and nutrient uptake, especially in long-lived mats or poorly rotated ground.'
            },
            {
                name: 'Sigatoka, wilt, and humid-canopy diseases',
                damageDescription: 'Major leaf and vascular threats that reduce bunch fill and long-term stand health under humid conditions.'
            },
            {
                name: 'Sap suckers and bunch-surface pests',
                damageDescription: 'Affect bunch cleanliness and can intensify disease or sooty mold on leaves and fruit.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory beetles, parasitoids, and entomopathogenic fungi',
                description: 'Support suppression of weevils and other concealed pests when mats are kept clean and broad-spectrum sprays are minimized.'
            },
            {
                name: 'Clean planting material, mat sanitation, and residue removal',
                description: 'Core cultural IPM tools for banana and plantain - remove infested pseudostems and maintain only healthy suckers.'
            },
            {
                name: 'Trap cropping and healthy soil biology',
                description: 'Help reduce pest carryover and improve root resilience in perennial or semi-perennial banana systems.'
            }
        ],
        chemicalActives: {
            actives: [
                'targeted corm or pseudostem treatments against weevils where labeled',
                'nematode-management products only where locally approved',
                'fungicides for Sigatoka and major leaf diseases where registered',
                'region-specific register-backed approvals should override example lists whenever available'
            ],
            mainPestGroups: 'weevils, nematodes, foliar diseases, and bunch-quality pests',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    citrus: {
        cropName: 'Citrus',
        maturityNotes:
            'Citrus maturity is often measured in months from flowering to harvest, commonly about 6-12 months depending on fruit type, variety, and climate. ' +
            'Tropical, dry irrigated, and warm temperate orchards are the main fit. Continental and high-mountain climates are usually marginal except in very protected sites.',
        damageToLookFor: [
            'Leaf mines, distorted flush, or weak new growth -> citrus leafminer and sap suckers',
            'Sticky honeydew, black sooty mold, or ant trails -> scales, mealybugs, aphids, or psyllid-type pests',
            'Scarred or bored fruit -> fruit borers, flies, or late-season feeding injury',
            'Canopy dieback or fruit drop -> chronic pest stress, root problems, or disease complexes'
        ],
        pests: [
            {
                name: 'Leafminers, psyllids, aphids, scales, and mealybugs',
                damageDescription: 'Attack new flush and often require region-specific management, especially where ants protect sap-sucking pests.'
            },
            {
                name: 'Thrips, mites, and fruit-surface feeders',
                damageDescription: 'Scar fruit and weaken foliage in hot dry or highly flushed citrus canopies.'
            },
            {
                name: 'Fruit flies, borers, and peel-feeding insects',
                damageDescription: 'Reduce fresh-market quality and increase fruit drop in warm fruiting periods.'
            },
            {
                name: 'Canker, greening-like issues, and root or trunk disease complexes',
                damageDescription: 'Long-term orchard threats that interact with insect pressure and pruning or sanitation practices.'
            }
        ],
        beneficials: [
            {
                name: 'Parasitoid wasps, ladybirds, lacewings, and predatory mites',
                description: 'Important against leafminers, scales, mealybugs, aphids, and mites when selective programs are used.'
            },
            {
                name: 'Ant management, pruning, and canopy ventilation',
                description: 'Reduce sap-sucker protection and improve access for beneficial insects in dense citrus canopies.'
            },
            {
                name: 'Sanitation and fallen-fruit removal',
                description: 'Limit fruit fly and disease carryover while improving orchard hygiene around harvest.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective sap-sucker and leafminer materials where labeled',
                'mite or thrips products only when thresholds justify treatment',
                'fruit-fly or borer programs timed around vulnerable fruit stages where approved',
                'fungicides or bactericides for major citrus disease pressure where locally registered'
            ],
            mainPestGroups: 'flush pests, sap suckers, fruit flies, borers, and chronic orchard diseases',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    apple_pear: {
        cropName: 'Apples and pears',
        maturityNotes:
            'Pome fruit maturity is often tracked from bloom, commonly about 120-180 days depending on variety and climate. ' +
            'Temperate and continental climates are the main production zones, with chilling requirements, frost risk, and late-season weather strongly influencing harvest timing.',
        damageToLookFor: [
            'Bored fruit or frass near the calyx -> codling-moth-type pests',
            'Leaf spots, rusts, or scab lesions -> foliar disease building through the season',
            'Blossom loss or poor fruit set -> spring pest pressure and unfavorable weather',
            'Dropped or scarred fruit -> insects, thinning stress, or late-season disease'
        ],
        pests: [
            {
                name: 'Codling moth-type fruit borers and internal feeders',
                damageDescription: 'Key pests of apples and pears in temperate orchards, directly damaging fruit and storage quality.'
            },
            {
                name: 'Aphids, pear psylla-type pests, mites, and leafrollers',
                damageDescription: 'Reduce foliage function and fruit quality, especially in dense or overly vigorous canopies.'
            },
            {
                name: 'Scab, rust, fire-blight-type issues, and cankers',
                damageDescription: 'Disease pressure differs by climate but can strongly alter practical harvest timing and fruit marketability.'
            },
            {
                name: 'Overwintering orchard pests and sanitation-driven carryover',
                damageDescription: 'Pest survival in bark, leaf litter, and dropped fruit can reset problems for the next season.'
            }
        ],
        beneficials: [
            {
                name: 'Mating disruption, parasitoids, predatory mites, and lacewings',
                description: 'Central biological and semiochemical tools for reducing codling-moth-type and mite pressure.'
            },
            {
                name: 'Orchard-floor sanitation and pruning',
                description: 'Reduce overwintering habitats and improve spray and beneficial penetration through the canopy.'
            },
            {
                name: 'Flowering strips and balanced vigor management',
                description: 'Support beneficial communities while preventing the dense, lush growth that often worsens pest pressure.'
            }
        ],
        chemicalActives: {
            actives: [
                'codling-moth and leafroller materials timed to monitoring and degree-day models where labeled',
                'selective aphid, psylla, or mite products based on thresholds',
                'fungicides or bactericides for scab, rust, and blossom disease pressure where approved',
                'region-filtered register-backed orchard labels should take priority whenever available'
            ],
            mainPestGroups: 'fruit borers, sap suckers, mites, and orchard disease complexes',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    grapes: {
        cropName: 'Grapes',
        maturityNotes:
            'Grapes are often tracked from budbreak to harvest, commonly about 110-180 days depending on cultivar, site, and whether the system targets table or wine grapes. ' +
            'Warm temperate and some continental climates are the core fit, while humid tropical production faces strong disease pressure and high-mountain systems need short-season cultivars.',
        damageToLookFor: [
            'Powdery or downy lesions on leaves and bunches -> canopy disease pressure',
            'Scarred or split berries -> thrips, moth larvae, or bunch-zone stress',
            'Weak shoots or dead spurs -> trunk disease or borer injury',
            'Uneven coloration or sugar accumulation -> excessive canopy density, disease, or water stress'
        ],
        pests: [
            {
                name: 'Berry moth-type larvae, mealybugs, and sap suckers',
                damageDescription: 'Damage bunches and weaken vines, especially where dense canopies and warm conditions persist.'
            },
            {
                name: 'Thrips, mites, and foliage-feeding pests',
                damageDescription: 'Affect leaves and fruit surface quality, particularly in dry or heat-stressed vineyards.'
            },
            {
                name: 'Powdery mildew, downy mildew, bunch rots, and trunk diseases',
                damageDescription: 'Major region-sensitive threats driven by canopy microclimate and pruning quality.'
            },
            {
                name: 'Birds, wasps, and bunch-surface damage near harvest',
                damageDescription: 'Can strongly reduce quality in table grapes and expose berries to secondary rots.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory mites, lacewings, parasitoids, and spiders',
                description: 'Important in integrated vineyards where sulfur, oils, and selective chemistry are used carefully.'
            },
            {
                name: 'Pruning, canopy management, and bunch-zone ventilation',
                description: 'Core cultural IPM measures that reduce disease pressure and improve fruit quality.'
            },
            {
                name: 'Groundcover management and sanitation',
                description: 'Support beneficials while limiting pest carryover and reducing bunch contamination.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective bunch-feeder and sap-sucker products where labeled',
                'mite materials only when scouting confirms threshold pressure',
                'fungicide programs for powdery mildew, downy mildew, bunch rots, and trunk disease pressure where approved',
                'timing should protect beneficials and fit table vs wine grape residue expectations'
            ],
            mainPestGroups: 'bunch feeders, mites, sap suckers, and major grape disease complexes',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    mango: {
        cropName: 'Mangoes',
        maturityNotes:
            'Mango harvest timing is commonly measured in months from flowering, often about 3-5 months depending on variety, heat, and moisture conditions. ' +
            'Tropical and subtropical climates are the main fit, while cooler climates are usually not recommended except under highly protected or exceptional local conditions.',
        damageToLookFor: [
            'Scarred panicles, flower loss, or poor fruit set -> thrips, hoppers, or flowering stress',
            'Fruit punctures, rot, or dropped fruit -> fruit flies and borers',
            'Blackened twigs or lesions -> anthracnose, dieback, or humid-canopy disease pressure',
            'Alternating heavy and light crops -> chronic canopy imbalance and unmanaged pest or disease pressure'
        ],
        pests: [
            {
                name: 'Fruit flies, borers, and fruit-surface pests',
                damageDescription: 'Primary direct threats to mango marketability in warm fruiting seasons.'
            },
            {
                name: 'Mango hoppers, thrips, scales, and mealybugs',
                damageDescription: 'Attack flowering and vegetative flush, reducing fruit set and weakening canopies.'
            },
            {
                name: 'Anthracnose, powdery mildew, and twig or panicle disease complexes',
                damageDescription: 'Strongly affect bloom, fruit retention, and harvest quality under humid or uneven-weather conditions.'
            },
            {
                name: 'Late orchard sanitation problems and fallen-fruit pest buildup',
                damageDescription: 'Can sustain fruit-fly pressure and disease carryover between harvest cycles.'
            }
        ],
        beneficials: [
            {
                name: 'Parasitoids, predators, and fruit-fly trapping',
                description: 'Support suppression of fruit flies and sap suckers when baiting and monitoring are done consistently.'
            },
            {
                name: 'Pruning, fallen-fruit removal, and panicle sanitation',
                description: 'Improve airflow, reduce inoculum, and interrupt key tropical pest cycles.'
            },
            {
                name: 'Balanced flowering management and canopy health',
                description: 'Reduce alternate bearing stress while making biological control more effective.'
            }
        ],
        chemicalActives: {
            actives: [
                'fruit-fly bait or monitoring-linked materials where labeled',
                'selective flowering-stage control for hoppers, thrips, and scales when thresholds justify use',
                'fungicides for anthracnose and powdery mildew where approved',
                'register-backed orchard labels should be preferred whenever available for export-sensitive fruit'
            ],
            mainPestGroups: 'fruit flies, flowering pests, canopy sap suckers, and humid-season diseases',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    papaya: {
        cropName: 'Papaya',
        maturityNotes:
            'Papaya commonly reaches first harvest in about 8-10 months from planting under warm tropical conditions, then continues with repeated or staggered harvests. ' +
            'Tropical and warm subtropical climates are the main fit, while cooler climates are generally unsuitable without strong protection.',
        damageToLookFor: [
            'Distorted leaves, sticky growth, or virus-like mottling -> whiteflies, aphids, or other sap suckers',
            'Scarred or infested fruit -> fruit flies and surface-feeding pests',
            'Stem or root weakness -> waterlogging, root disease, or chronic insect pressure',
            'Poor fruit set or irregular ripening -> weather stress, nutrient imbalance, or unmanaged canopy pests'
        ],
        pests: [
            {
                name: 'Fruit flies and fruit-surface feeders',
                damageDescription: 'Directly lower fresh-market quality in tropical papaya production.'
            },
            {
                name: 'Whiteflies, aphids, mites, and mealybugs',
                damageDescription: 'Weaken foliage and can intensify virus risk or sooty mold under warm conditions.'
            },
            {
                name: 'Stem and root disease complexes',
                damageDescription: 'Common in continuously cropped or poorly drained papaya fields and can shorten orchard life.'
            },
            {
                name: 'Flowering and fruit-set stress under overlapping harvest cycles',
                damageDescription: 'Makes pest and disease management more complex than in a single-season annual crop.'
            }
        ],
        beneficials: [
            {
                name: 'Ladybirds, lacewings, parasitoids, and predatory mites',
                description: 'Help manage sap suckers and small larvae when papaya canopies are kept open and spray programs remain selective.'
            },
            {
                name: 'Fallen-fruit removal, sanitation, and rogueing diseased plants',
                description: 'Key cultural steps for limiting fruit-fly buildup and disease spread in warm papaya systems.'
            },
            {
                name: 'Good drainage and healthy soil biology',
                description: 'Essential for reducing root stress and improving resilience under repeated harvest cycles.'
            }
        ],
        chemicalActives: {
            actives: [
                'fruit-fly and sap-sucker materials where labeled and timed to vulnerable stages',
                'mite products only when hotspots are confirmed',
                'fungicides for serious foliar or fruit disease pressure where registered',
                'use local register-backed approvals where possible because papaya harvest intervals can be frequent'
            ],
            mainPestGroups: 'fruit flies, sap suckers, mites, and root or fruit disease complexes',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    pineapple: {
        cropName: 'Pineapple',
        maturityNotes:
            'Pineapple often takes about 15-18 months from planting to first harvest, with ratoon or ratoon-like follow-up cycles moving faster after the initial crop. ' +
            'Tropical and warm subtropical climates are the main fit, while cool climates are usually not recommended.',
        damageToLookFor: [
            'Stunted rosettes or weak roots -> mealybugs, nematodes, or root stress',
            'Leaf bronzing, spotting, or rot -> dense planting, disease, or chronic moisture problems',
            'Dirty or undersized fruit -> sap suckers or overlapping field hygiene problems',
            'Uneven flowering and harvest -> induction timing, water stress, or disease pressure'
        ],
        pests: [
            {
                name: 'Mealybugs, scales, and ant-associated sap suckers',
                damageDescription: 'Common in overlapping tropical plantings and can weaken both plants and fruit quality.'
            },
            {
                name: 'Nematodes and root-feeding issues',
                damageDescription: 'Reduce stand vigor and delay the long pineapple production cycle.'
            },
            {
                name: 'Heart, fruit, and rosette disease complexes',
                damageDescription: 'Dense plantings and prolonged wetness increase the risk of serious plant and fruit losses.'
            },
            {
                name: 'Field overlap and residue-driven pest carryover',
                damageDescription: 'Continuous or staggered planting systems can sustain pest populations if sanitation is poor.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory beetles, parasitoids, and ant management',
                description: 'Help suppress mealybugs and scales when ant trails are controlled and field hygiene is maintained.'
            },
            {
                name: 'Plant spacing, residue management, and clean suckers',
                description: 'Key cultural controls for reducing disease pressure and overlapping pest cycles.'
            },
            {
                name: 'Healthy soil and water management',
                description: 'Support root resilience in a long-cycle crop where stress quickly compounds fruit-quality loss.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective sap-sucker or ant-linked products where labeled',
                'nematode-management options only where locally approved',
                'fungicides for heart rot, fruit rot, or rosette disease pressure where registered',
                'maintain long pre-harvest planning because pineapple cycles and staggered plantings can overlap'
            ],
            mainPestGroups: 'sap suckers, nematodes, rosette diseases, and long-cycle field carryover issues',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    avocado: {
        cropName: 'Avocado',
        maturityNotes:
            'Avocado maturity is often measured in months from flowering, commonly about 6-12 months depending on variety and climate. ' +
            'Tropical, subtropical, and some warm temperate climates are the main fit; cold continental and high-mountain settings are usually limited or protected only.',
        damageToLookFor: [
            'Root decline, canopy wilt, or weak flush -> root disease or chronic soil stress',
            'Scarred fruit or sap-sucker buildup -> thrips, scales, mites, or mealybugs',
            'Twig dieback or trunk stress -> canker, root issues, or repeated water stress',
            'Uneven fruit sizing or drop -> pollination stress, disease, or unmanaged orchard vigor'
        ],
        pests: [
            {
                name: 'Thrips, scales, mealybugs, mites, and sap suckers',
                damageDescription: 'Affect fruit finish and canopy vigor in tropical and warm temperate avocado systems.'
            },
            {
                name: 'Root-feeding problems and Phytophthora-type root disease',
                damageDescription: 'Major orchard-longevity threats that intensify under poor drainage or weak soil biology.'
            },
            {
                name: 'Stem, trunk, and canopy disease complexes',
                damageDescription: 'Interact with pruning, water stress, and orchard density to lower productivity.'
            },
            {
                name: 'Fruit drop and chronic alternate stress in sensitive orchards',
                damageDescription: 'Long-cycle tree responses can make practical harvest timing differ from calendar maturity.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory mites, ladybirds, lacewings, and parasitoids',
                description: 'Support avocado IPM against sap suckers and surface-feeding pests when chemistry remains selective.'
            },
            {
                name: 'Healthy soil, mulching, and root-zone management',
                description: 'One of the most important avocado biological strategies because root health drives canopy resilience.'
            },
            {
                name: 'Pruning, sanitation, and balanced irrigation',
                description: 'Reduce disease pressure and improve beneficial penetration in dense canopies.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective thrips, scale, or mite products where labeled',
                'root-disease fungicide programs where locally approved',
                'fruit-surface protection timed to vulnerable stages and local residue requirements',
                'register-backed orchard approvals should be prioritized whenever available'
            ],
            mainPestGroups: 'sap suckers, mites, root disease, and long-cycle orchard health threats',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    stone_fruits: {
        cropName: 'Stone fruits',
        maturityNotes:
            'Stone fruits are commonly tracked in days from bloom, often about 90-140 days depending on species, variety, and climate. ' +
            'Temperate and continental climates are the core fit, with chilling requirements and spring frost risk strongly shaping practical harvest timing.',
        damageToLookFor: [
            'Blossom loss or poor fruit set -> spring frost, flower pests, or blossom disease',
            'Scarred or bored fruit -> fruit borers, flies, or surface-feeding pests',
            'Leaf curl, shot-hole, or blight symptoms -> spring disease pressure',
            'Split or soft fruit near harvest -> excess rain, disease, or canopy imbalance'
        ],
        pests: [
            {
                name: 'Fruit borers, moth larvae, and fruit-surface feeders',
                damageDescription: 'Direct fruit damage is the main market-quality risk in peaches, plums, apricots, and cherries.'
            },
            {
                name: 'Aphids, thrips, scales, and mites',
                damageDescription: 'Attack flush, blossom, and foliage, especially under warm spring and early summer conditions.'
            },
            {
                name: 'Leaf curl, shot-hole, brown rot, and blossom diseases',
                damageDescription: 'Early-season weather strongly shapes both disease pressure and practical harvest windows in stone fruits.'
            },
            {
                name: 'Overwintering orchard carryover and post-harvest sanitation issues',
                damageDescription: 'Dropped fruit, diseased twigs, and poor pruning can reset pressure for the next bloom cycle.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory mites, parasitoids, lacewings, and mating disruption tools',
                description: 'Support orchard IPM against fruit borers, aphids, and mites when well integrated with monitoring.'
            },
            {
                name: 'Pruning, orchard-floor sanitation, and bloom-stage hygiene',
                description: 'Reduce overwintering habitats and blossom disease inoculum in temperate orchards.'
            },
            {
                name: 'Balanced vigor and canopy opening',
                description: 'Improve spray coverage, beneficial performance, and fruit drying after rain.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective fruit-borer and aphid materials where labeled',
                'mite and thrips products only when thresholds are exceeded',
                'fungicides or bactericides for blossom and fruit disease pressure where approved',
                'late-season residue and pre-harvest interval planning is especially important near ripening'
            ],
            mainPestGroups: 'fruit borers, sap suckers, mites, and blossom or fruit disease complexes',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    },
    berries: {
        cropName: 'Berries',
        maturityNotes:
            'Berry maturity varies by system: strawberries may begin harvest roughly 45-90 days after establishment or flowering, while blueberries, raspberries, and blackberries often follow variety-specific flowering-to-harvest windows of roughly 60-120 days. ' +
            'Temperate, cool highland, and some continental climates are the main fit, with protected systems extending options elsewhere.',
        damageToLookFor: [
            'Soft or scarred fruit -> thrips, fruit rots, or berry-surface pests',
            'Chewed leaves or weak canes -> caterpillars, beetles, or cane disease',
            'Powdery, gray, or spotted foliage and fruit -> humid-canopy disease pressure',
            'Uneven harvest or weak reflush -> pruning, mulch, or irrigation problems compounded by pest stress'
        ],
        pests: [
            {
                name: 'Thrips, mites, aphids, and sap suckers',
                damageDescription: 'Affect flowers, fruit finish, and young foliage across many berry systems.'
            },
            {
                name: 'Fruit rots, gray mold, powdery mildew, and cane disease',
                damageDescription: 'Often the defining IPM challenge in berries, especially under dense canopy or wet harvest periods.'
            },
            {
                name: 'Caterpillars, beetles, and berry-surface feeders',
                damageDescription: 'Damage flowers and fruit, lowering marketable yield during peak harvest windows.'
            },
            {
                name: 'System-specific pruning and cane carryover issues',
                damageDescription: 'Raspberries, blackberries, and perennial berry systems depend heavily on sanitation and pruning to avoid repeated pest buildup.'
            }
        ],
        beneficials: [
            {
                name: 'Predatory mites, lacewings, hoverflies, and parasitoids',
                description: 'Support soft-bodied pest suppression when berry sprays stay selective and bloom-safe.'
            },
            {
                name: 'Mulching, pruning, and canopy ventilation',
                description: 'Core IPM steps that protect fruit quality and reduce gray mold or mildew pressure.'
            },
            {
                name: 'Sanitation and harvest-hygiene management',
                description: 'Frequent picking, rotted-fruit removal, and clean rows help break disease and insect cycles in berries.'
            }
        ],
        chemicalActives: {
            actives: [
                'selective thrips, mite, and aphid products where labeled',
                'fungicide programs for gray mold, mildew, and cane disease pressure where approved',
                'fruit-stage insect materials only when necessary and compatible with short harvest intervals',
                'register-backed berry labels should override example lists wherever available'
            ],
            mainPestGroups: 'sap suckers, mites, fruit rots, mildew, and harvest-window berry pests',
            safetyNote: CHEMICAL_SAFETY_NOTE
        }
    }
};

const FRUIT_ALIASES = {
    banana_plantain: 'banana_plantain',
    banana: 'banana_plantain',
    bananas: 'banana_plantain',
    plantain: 'banana_plantain',
    plantains: 'banana_plantain',
    'bananas and plantains': 'banana_plantain',
    citrus: 'citrus',
    orange: 'citrus',
    oranges: 'citrus',
    lemon: 'citrus',
    lemons: 'citrus',
    lime: 'citrus',
    limes: 'citrus',
    grapefruit: 'citrus',
    grapefruits: 'citrus',
    apple_pear: 'apple_pear',
    apple: 'apple_pear',
    apples: 'apple_pear',
    pear: 'apple_pear',
    pears: 'apple_pear',
    'apples and pears': 'apple_pear',
    grape: 'grapes',
    grapes: 'grapes',
    'table grapes': 'grapes',
    'wine grapes': 'grapes',
    mango: 'mango',
    mangoes: 'mango',
    papaya: 'papaya',
    papayas: 'papaya',
    pineapple: 'pineapple',
    pineapples: 'pineapple',
    avocado: 'avocado',
    avocados: 'avocado',
    stone_fruits: 'stone_fruits',
    'stone fruits': 'stone_fruits',
    peach: 'stone_fruits',
    peaches: 'stone_fruits',
    plum: 'stone_fruits',
    plums: 'stone_fruits',
    apricot: 'stone_fruits',
    apricots: 'stone_fruits',
    cherry: 'stone_fruits',
    cherries: 'stone_fruits',
    berries: 'berries',
    berry: 'berries',
    strawberry: 'berries',
    strawberries: 'berries',
    blueberry: 'berries',
    blueberries: 'berries',
    raspberry: 'berries',
    raspberries: 'berries',
    blackberry: 'berries',
    blackberries: 'berries'
};

const FRUIT_CROP_KEYS = Object.keys(FRUIT_IPM);

module.exports = {
    FRUIT_IPM,
    FRUIT_ALIASES,
    FRUIT_CROP_KEYS
};
