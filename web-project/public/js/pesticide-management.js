/**
 * SmartFarm Pesticide Management System
 * Comprehensive pesticide database with detailed chemical information,
 * knapsack sprayer mixtures, and safety guidelines
 */

class PesticideManagement {
    constructor() {
        this.pesticideDatabase = this.initializePesticideDatabase();
        this.pestPesticideMatching = this.initializePestPesticideMatching();
        this.safetyGuidelines = this.initializeSafetyGuidelines();
        this.applicationRecords = this.loadApplicationRecords();
    }

    initializePesticideDatabase() {
        return [
            // INSECTICIDES
            {
                name: 'Malathion',
                category: 'Insecticide',
                type: 'Organophosphate',
                effectiveness: 85,
                safetyLevel: 'Moderate',
                applicationRate: '1-2 L/ha',
                costPerLiter: 35.00,
                environmentalImpact: 'Medium',
                description: 'Broad-spectrum insecticide for various pests',
                preHarvestInterval: 3,
                weatherRestrictions: ['No rain for 6 hours', 'Temperature below 30°C'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.1%',
                        chemicalAmount: 16,
                        waterAmount: 15984,
                        coverageArea: 0.1,
                        sprayTime: 30,
                        instructions: [
                            'Fill sprayer with 15.98L clean water',
                            'Add 16ml Malathion concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 160L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.1%',
                        chemicalAmount: 20,
                        waterAmount: 19980,
                        coverageArea: 0.125,
                        sprayTime: 35,
                        instructions: [
                            'Fill sprayer with 19.98L clean water',
                            'Add 20ml Malathion concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 160L/ha rate',
                            'Cover 0.125 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing (overalls, gloves, boots)',
                    'Use respirator with organic vapor cartridge',
                    'Avoid skin and eye contact',
                    'Do not eat, drink or smoke during application',
                    'Wash hands thoroughly after use',
                    'Keep away from children and animals'
                ],
                chemicalDetails: {
                    chemicalName: 'S-1,2-bis(ethoxycarbonyl)ethyl O,O-dimethyl phosphorodithioate',
                    molecularFormula: 'C10H19O6PS2',
                    molecularWeight: '330.36 g/mol',
                    casNumber: '121-75-5',
                    physicalState: 'Liquid',
                    color: 'Colorless to amber',
                    odor: 'Garlic-like odor',
                    solubility: 'Slightly soluble in water (145 mg/L at 20°C)',
                    phLevel: '6.5-7.5',
                    density: '1.23 g/cm³',
                    boilingPoint: '156-157°C',
                    meltingPoint: '2.9°C',
                    vaporPressure: '5.3 × 10⁻⁵ mmHg at 25°C',
                    halfLife: 'Soil: 1-17 days, Water: 1-7 days',
                    modeOfAction: 'Acetylcholinesterase inhibitor',
                    targetPests: [
                        'Aphids',
                        'Whiteflies',
                        'Thrips',
                        'Spider mites',
                        'Caterpillars'
                    ],
                    resistantPests: [
                        'Malathion-resistant aphids',
                        'Malathion-resistant whiteflies'
                    ],
                    applicationTiming: [
                        'Early morning application',
                        'Evening application',
                        'When pests first appear',
                        'Before flowering for some crops'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 2800 mg/kg (slightly toxic)',
                        acuteDermal: 'LD50 > 4000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.1 mg/L (slightly toxic)',
                        eyeIrritation: 'Moderate irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 0.1-10 mg/L (highly toxic)',
                        birds: 'LD50 100-1000 mg/kg (moderately toxic)',
                        bees: 'LD50 0.1-1 μg/bee (highly toxic)',
                        earthworms: 'LC50 10-100 mg/kg (moderately toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '12 hours',
                        workerProtectionStandard: 'Category II (Warning)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            },
            {
                name: 'Deltamethrin',
                category: 'Insecticide',
                type: 'Pyrethroid',
                effectiveness: 95,
                safetyLevel: 'Moderate',
                applicationRate: '0.5-1 L/ha',
                costPerLiter: 45.00,
                environmentalImpact: 'High',
                description: 'Synthetic pyrethroid with rapid knockdown',
                preHarvestInterval: 1,
                weatherRestrictions: ['No rain for 4 hours', 'Low wind conditions'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.02%',
                        chemicalAmount: 3.2,
                        waterAmount: 15996.8,
                        coverageArea: 0.15,
                        sprayTime: 40,
                        instructions: [
                            'Fill sprayer with 15.997L clean water',
                            'Add 3.2ml Deltamethrin concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 110L/ha rate',
                            'Cover 0.15 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.02%',
                        chemicalAmount: 4,
                        waterAmount: 19996,
                        coverageArea: 0.18,
                        sprayTime: 45,
                        instructions: [
                            'Fill sprayer with 19.996L clean water',
                            'Add 4ml Deltamethrin concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 110L/ha rate',
                            'Cover 0.18 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing',
                    'Use chemical-resistant gloves',
                    'Avoid contact with skin',
                    'Do not apply in windy conditions',
                    'Clean equipment thoroughly after use'
                ],
                chemicalDetails: {
                    chemicalName: '(S)-α-cyano-3-phenoxybenzyl (1R,3R)-3-(2,2-dibromovinyl)-2,2-dimethylcyclopropanecarboxylate',
                    molecularFormula: 'C22H19Br2NO3',
                    molecularWeight: '505.21 g/mol',
                    casNumber: '52918-63-5',
                    physicalState: 'Solid (crystalline)',
                    color: 'White to cream',
                    odor: 'Odorless',
                    solubility: 'Insoluble in water (<0.2 mg/L at 20°C)',
                    phLevel: '4.0-6.0',
                    density: '1.5 g/cm³',
                    boilingPoint: '300°C (decomposes)',
                    meltingPoint: '98-101°C',
                    vaporPressure: '1.24 × 10⁻⁸ mmHg at 25°C',
                    halfLife: 'Soil: 30-60 days, Water: 30-60 days',
                    modeOfAction: 'Sodium channel modulator',
                    targetPests: [
                        'Caterpillars',
                        'Beetles',
                        'Thrips',
                        'Aphids',
                        'Whiteflies'
                    ],
                    resistantPests: [
                        'Pyrethroid-resistant pests',
                        'Deltamethrin-resistant moths'
                    ],
                    applicationTiming: [
                        'Early morning application',
                        'Evening application',
                        'When pests first appear',
                        'Preventive application'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 135 mg/kg (moderately toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 0.5 mg/L (moderately toxic)',
                        eyeIrritation: 'Severe irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 0.001-0.1 mg/L (highly toxic)',
                        birds: 'LD50 10-100 mg/kg (highly toxic)',
                        bees: 'LD50 0.001-0.01 μg/bee (highly toxic)',
                        earthworms: 'LC50 1-10 mg/kg (highly toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '12 hours',
                        workerProtectionStandard: 'Category II (Warning)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            },
            {
                name: 'Neem Oil',
                category: 'Insecticide',
                type: 'Organic',
                effectiveness: 75,
                safetyLevel: 'High',
                applicationRate: '2-4 L/ha',
                costPerLiter: 15.00,
                environmentalImpact: 'Very Low',
                description: 'Natural organic insecticide from neem tree',
                preHarvestInterval: 0,
                weatherRestrictions: ['Apply in morning or evening', 'Avoid direct sunlight'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.5%',
                        chemicalAmount: 80,
                        waterAmount: 15920,
                        coverageArea: 0.08,
                        sprayTime: 30,
                        instructions: [
                            'Fill sprayer with 15.92L clean water',
                            'Add 80ml Neem Oil',
                            'Mix gently for 1 minute',
                            'Apply at 200L/ha rate',
                            'Cover 0.08 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.5%',
                        chemicalAmount: 100,
                        waterAmount: 19900,
                        coverageArea: 0.1,
                        sprayTime: 35,
                        instructions: [
                            'Fill sprayer with 19.9L clean water',
                            'Add 100ml Neem Oil',
                            'Mix gently for 1 minute',
                            'Apply at 200L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Minimal protective equipment needed',
                    'Wear basic gloves and eye protection',
                    'Safe for beneficial insects',
                    'No pre-harvest interval',
                    'Environmentally friendly'
                ],
                chemicalDetails: {
                    chemicalName: 'Azadirachtin (neem oil extract)',
                    molecularFormula: 'C35H44O16',
                    molecularWeight: '720.71 g/mol',
                    casNumber: '11141-17-6',
                    physicalState: 'Liquid',
                    color: 'Yellow to brown',
                    odor: 'Garlic-like odor',
                    solubility: 'Insoluble in water',
                    phLevel: '6.0-7.0',
                    density: '0.92 g/cm³',
                    boilingPoint: '200°C',
                    meltingPoint: '-10°C',
                    vaporPressure: 'Negligible',
                    halfLife: 'Soil: 1-2 days, Water: 1-2 days',
                    modeOfAction: 'Insect growth regulator and feeding deterrent',
                    targetPests: [
                        'Aphids',
                        'Whiteflies',
                        'Spider mites',
                        'Thrips',
                        'Scale insects'
                    ],
                    resistantPests: [
                        'No resistance development expected'
                    ],
                    applicationTiming: [
                        'Early morning application',
                        'Evening application',
                        'When pests first appear',
                        'Preventive application'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 > 5000 mg/kg (practically non-toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 200 mg/m³ (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 > 100 mg/L (practically non-toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Exempt from registration',
                        reEntryInterval: '0 hours',
                        workerProtectionStandard: 'Category IV (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Generally recognized as safe'
                    }
                }
            },
            {
                name: 'Insecticidal Soap',
                category: 'Insecticide',
                type: 'Organic',
                effectiveness: 70,
                safetyLevel: 'Very High',
                applicationRate: '2-3 L/ha',
                costPerLiter: 8.00,
                environmentalImpact: 'Very Low',
                description: 'Potassium salts of fatty acids for soft-bodied insects',
                preHarvestInterval: 0,
                weatherRestrictions: ['Apply in morning or evening', 'Avoid hot, dry conditions'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '1.0%',
                        chemicalAmount: 160,
                        waterAmount: 15840,
                        coverageArea: 0.08,
                        sprayTime: 25,
                        instructions: [
                            'Fill sprayer with 15.84L clean water',
                            'Add 160ml Insecticidal Soap',
                            'Mix gently for 1 minute',
                            'Apply at 200L/ha rate',
                            'Cover 0.08 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '1.0%',
                        chemicalAmount: 200,
                        waterAmount: 19800,
                        coverageArea: 0.1,
                        sprayTime: 30,
                        instructions: [
                            'Fill sprayer with 19.8L clean water',
                            'Add 200ml Insecticidal Soap',
                            'Mix gently for 1 minute',
                            'Apply at 200L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Minimal protective equipment needed',
                    'Safe for beneficial insects',
                    'No pre-harvest interval',
                    'Environmentally friendly',
                    'Safe for organic farming'
                ],
                chemicalDetails: {
                    chemicalName: 'Potassium salts of fatty acids',
                    molecularFormula: 'Variable (C12-C18 fatty acids)',
                    molecularWeight: 'Variable',
                    casNumber: '67701-08-0',
                    physicalState: 'Liquid',
                    color: 'Colorless to light yellow',
                    odor: 'Soap-like odor',
                    solubility: 'Soluble in water',
                    phLevel: '9.0-10.0 (alkaline)',
                    density: '1.0 g/cm³',
                    boilingPoint: '100°C',
                    meltingPoint: 'Variable',
                    vaporPressure: 'Negligible',
                    halfLife: 'Soil: <1 day, Water: <1 day',
                    modeOfAction: 'Contact insecticide (disrupts cell membranes)',
                    targetPests: [
                        'Aphids',
                        'Whiteflies',
                        'Spider mites',
                        'Mealybugs',
                        'Scale insects'
                    ],
                    resistantPests: [
                        'No resistance development expected'
                    ],
                    applicationTiming: [
                        'Direct contact application',
                        'Early morning or evening',
                        'When pests are actively feeding'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 > 5000 mg/kg (practically non-toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 200 mg/m³ (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 > 100 mg/L (practically non-toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Exempt from registration',
                        reEntryInterval: '0 hours',
                        workerProtectionStandard: 'Category IV (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Generally recognized as safe'
                    }
                }
            },
            // ADDITIONAL INSECTICIDES
            {
                name: 'Imidacloprid',
                category: 'Insecticide',
                type: 'Neonicotinoid',
                effectiveness: 90,
                safetyLevel: 'Moderate',
                applicationRate: '0.5-1 L/ha',
                costPerLiter: 55.00,
                environmentalImpact: 'High',
                description: 'Systemic neonicotinoid with long-lasting residual activity',
                preHarvestInterval: 21,
                weatherRestrictions: ['No rain for 6 hours', 'Temperature below 30°C'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.05%',
                        chemicalAmount: 8,
                        waterAmount: 15992,
                        coverageArea: 0.15,
                        sprayTime: 40,
                        instructions: [
                            'Fill sprayer with 15.992L clean water',
                            'Add 8ml Imidacloprid concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 110L/ha rate',
                            'Cover 0.15 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.05%',
                        chemicalAmount: 10,
                        waterAmount: 19990,
                        coverageArea: 0.18,
                        sprayTime: 45,
                        instructions: [
                            'Fill sprayer with 19.99L clean water',
                            'Add 10ml Imidacloprid concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 110L/ha rate',
                            'Cover 0.18 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing',
                    'Use chemical-resistant gloves',
                    'Avoid contact with beneficial insects',
                    'Do not apply near flowering crops',
                    'Clean equipment thoroughly'
                ],
                chemicalDetails: {
                    chemicalName: 'N-{1-[(6-chloro-3-pyridyl)methyl]-4,5-dihydroimidazol-2-yl}nitramide',
                    molecularFormula: 'C9H10ClN5O2',
                    molecularWeight: '255.66 g/mol',
                    casNumber: '138261-41-3',
                    physicalState: 'Solid (crystalline)',
                    color: 'White to off-white',
                    odor: 'Odorless',
                    solubility: 'Slightly soluble in water (0.51 g/L at 20°C)',
                    phLevel: '6.0-8.0',
                    density: '1.5 g/cm³',
                    boilingPoint: 'Decomposes before boiling',
                    meltingPoint: '144°C',
                    vaporPressure: '1.3 × 10⁻⁹ mmHg at 25°C',
                    halfLife: 'Soil: 40-200 days, Water: 30-60 days',
                    modeOfAction: 'Nicotinic acetylcholine receptor agonist',
                    targetPests: [
                        'Aphids',
                        'Whiteflies',
                        'Thrips',
                        'Leafhoppers',
                        'Beetles'
                    ],
                    resistantPests: [
                        'Imidacloprid-resistant aphids',
                        'Imidacloprid-resistant whiteflies'
                    ],
                    applicationTiming: [
                        'Early morning application',
                        'Evening application',
                        'Systemic application',
                        'Preventive treatment'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 450 mg/kg (moderately toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 0.69 mg/L (moderately toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 0.1-10 mg/L (highly toxic)',
                        birds: 'LD50 10-100 mg/kg (highly toxic)',
                        bees: 'LD50 0.003-0.1 μg/bee (highly toxic)',
                        earthworms: 'LC50 1-10 mg/kg (highly toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '12-24 hours',
                        workerProtectionStandard: 'Category II (Warning)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            },
            {
                name: 'Spinosad',
                category: 'Insecticide',
                type: 'Natural',
                effectiveness: 85,
                safetyLevel: 'High',
                applicationRate: '0.5-1 L/ha',
                costPerLiter: 40.00,
                environmentalImpact: 'Low',
                description: 'Natural insecticide derived from soil bacterium',
                preHarvestInterval: 1,
                weatherRestrictions: ['No rain for 4 hours', 'Low wind conditions'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.1%',
                        chemicalAmount: 16,
                        waterAmount: 15984,
                        coverageArea: 0.12,
                        sprayTime: 35,
                        instructions: [
                            'Fill sprayer with 15.984L clean water',
                            'Add 16ml Spinosad concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 130L/ha rate',
                            'Cover 0.12 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.1%',
                        chemicalAmount: 20,
                        waterAmount: 19980,
                        coverageArea: 0.15,
                        sprayTime: 40,
                        instructions: [
                            'Fill sprayer with 19.98L clean water',
                            'Add 20ml Spinosad concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 130L/ha rate',
                            'Cover 0.15 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing',
                    'Use chemical-resistant gloves',
                    'Safe for beneficial insects',
                    'Do not apply in windy conditions',
                    'Clean equipment thoroughly'
                ],
                chemicalDetails: {
                    chemicalName: 'Mixture of Spinosyn A and Spinosyn D',
                    molecularFormula: 'C41H65NO10 (Spinosyn A), C42H67NO10 (Spinosyn D)',
                    molecularWeight: '731.97 g/mol (Spinosyn A), 746.00 g/mol (Spinosyn D)',
                    casNumber: '131929-60-7',
                    physicalState: 'Solid (powder)',
                    color: 'White to light tan',
                    odor: 'Odorless',
                    solubility: 'Slightly soluble in water (235 mg/L at 20°C)',
                    phLevel: '7.0-8.0',
                    density: '1.2 g/cm³',
                    boilingPoint: 'Decomposes before boiling',
                    meltingPoint: '84-99°C',
                    vaporPressure: '1.3 × 10⁻¹³ mmHg at 25°C',
                    halfLife: 'Soil: 9-17 days, Water: 30-60 days',
                    modeOfAction: 'Nicotinic acetylcholine receptor agonist',
                    targetPests: [
                        'Caterpillars',
                        'Thrips',
                        'Leafminers',
                        'Beetles',
                        'Fruit flies'
                    ],
                    resistantPests: [
                        'Spinosad-resistant thrips'
                    ],
                    applicationTiming: [
                        'Early morning application',
                        'Evening application',
                        'When pests first appear',
                        'Preventive application'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 > 5000 mg/kg (practically non-toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.1 mg/L (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 10-100 mg/L (moderately toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 0.002-0.1 μg/bee (highly toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '4 hours',
                        workerProtectionStandard: 'Category III (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            },
            {
                name: 'Bacillus thuringiensis',
                category: 'Insecticide',
                type: 'Biological',
                effectiveness: 80,
                safetyLevel: 'Very High',
                applicationRate: '1-2 L/ha',
                costPerLiter: 25.00,
                environmentalImpact: 'Very Low',
                description: 'Biological insecticide containing beneficial bacteria',
                preHarvestInterval: 0,
                weatherRestrictions: ['Apply in morning or evening', 'Avoid direct sunlight'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '2.0%',
                        chemicalAmount: 320,
                        waterAmount: 15680,
                        coverageArea: 0.08,
                        sprayTime: 30,
                        instructions: [
                            'Fill sprayer with 15.68L clean water',
                            'Add 320ml Bt concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 200L/ha rate',
                            'Cover 0.08 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '2.0%',
                        chemicalAmount: 400,
                        waterAmount: 19600,
                        coverageArea: 0.1,
                        sprayTime: 35,
                        instructions: [
                            'Fill sprayer with 19.6L clean water',
                            'Add 400ml Bt concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 200L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Minimal protective equipment needed',
                    'Safe for beneficial insects',
                    'No pre-harvest interval',
                    'Environmentally friendly',
                    'Safe for organic farming'
                ],
                chemicalDetails: {
                    chemicalName: 'Bacillus thuringiensis var. kurstaki',
                    molecularFormula: 'Not applicable (biological organism)',
                    molecularWeight: 'Not applicable',
                    casNumber: '68038-71-1',
                    physicalState: 'Liquid or powder',
                    color: 'Light brown to tan',
                    odor: 'Slight fermentation odor',
                    solubility: 'Suspends in water',
                    phLevel: '6.5-7.5',
                    density: '1.0 g/cm³',
                    boilingPoint: 'Not applicable',
                    meltingPoint: 'Not applicable',
                    vaporPressure: 'Negligible',
                    halfLife: 'Soil: 7-14 days, Water: 1-7 days',
                    modeOfAction: 'Bacterial toxin (Cry proteins)',
                    targetPests: [
                        'Caterpillars',
                        'Larvae',
                        'Moth larvae',
                        'Butterfly larvae'
                    ],
                    resistantPests: [
                        'Bt-resistant caterpillars (some populations)'
                    ],
                    applicationTiming: [
                        'Early morning application',
                        'Evening application',
                        'When larvae are young',
                        'Preventive application'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 > 5000 mg/kg (practically non-toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 200 mg/m³ (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 > 100 mg/L (practically non-toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Exempt from registration',
                        reEntryInterval: '0 hours',
                        workerProtectionStandard: 'Category IV (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Generally recognized as safe'
                    }
                }
            },
            // FUNGICIDES
            {
                name: 'Mancozeb',
                category: 'Fungicide',
                type: 'Dithiocarbamate',
                effectiveness: 85,
                safetyLevel: 'Moderate',
                applicationRate: '2-4 L/ha',
                costPerLiter: 30.00,
                environmentalImpact: 'Medium',
                description: 'Protectant fungicide for broad-spectrum disease control',
                preHarvestInterval: 14,
                weatherRestrictions: ['No rain for 6 hours', 'Temperature below 32°C'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.2%',
                        chemicalAmount: 32,
                        waterAmount: 15968,
                        coverageArea: 0.08,
                        sprayTime: 30,
                        instructions: [
                            'Fill sprayer with 15.968L clean water',
                            'Add 32ml Mancozeb concentrate',
                            'Mix thoroughly for 2 minutes',
                            'Apply at 200L/ha rate',
                            'Cover 0.08 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.2%',
                        chemicalAmount: 40,
                        waterAmount: 19960,
                        coverageArea: 0.1,
                        sprayTime: 35,
                        instructions: [
                            'Fill sprayer with 19.96L clean water',
                            'Add 40ml Mancozeb concentrate',
                            'Mix thoroughly for 2 minutes',
                            'Apply at 200L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing',
                    'Use chemical-resistant gloves',
                    'Avoid skin and eye contact',
                    'Do not eat, drink or smoke during application',
                    'Wash hands thoroughly after use'
                ],
                chemicalDetails: {
                    chemicalName: 'Manganese ethylenebis(dithiocarbamate) (polymeric) complex with zinc salt',
                    molecularFormula: '[C4H6MnN2S4]x[C4H6ZnN2S4]y',
                    molecularWeight: 'Variable (polymer)',
                    casNumber: '8018-01-7',
                    physicalState: 'Solid (powder)',
                    color: 'Yellow to orange',
                    odor: 'Slight sulfur odor',
                    solubility: 'Slightly soluble in water (6-10 mg/L at 20°C)',
                    phLevel: '6.0-8.0',
                    density: '1.8 g/cm³',
                    boilingPoint: 'Decomposes before boiling',
                    meltingPoint: 'Decomposes at 150°C',
                    vaporPressure: 'Negligible',
                    halfLife: 'Soil: 1-7 days, Water: 1-3 days',
                    modeOfAction: 'Multi-site inhibitor (disrupts multiple enzyme systems)',
                    targetPests: [
                        'Powdery mildew',
                        'Downy mildew',
                        'Leaf spot',
                        'Rust',
                        'Blight'
                    ],
                    resistantPests: [
                        'Some resistant fungal strains'
                    ],
                    applicationTiming: [
                        'Preventive application',
                        'Early disease stage',
                        'Weather-based timing',
                        'Regular intervals'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 > 5000 mg/kg (practically non-toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.1 mg/L (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 1-10 mg/L (highly toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '24 hours',
                        workerProtectionStandard: 'Category III (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            },
            {
                name: 'Propiconazole',
                category: 'Fungicide',
                type: 'Triazole',
                effectiveness: 90,
                safetyLevel: 'Moderate',
                applicationRate: '0.5-1 L/ha',
                costPerLiter: 50.00,
                environmentalImpact: 'Medium',
                description: 'Systemic fungicide for curative and protective control',
                preHarvestInterval: 21,
                weatherRestrictions: ['No rain for 4 hours', 'Temperature below 30°C'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.1%',
                        chemicalAmount: 16,
                        waterAmount: 15984,
                        coverageArea: 0.15,
                        sprayTime: 40,
                        instructions: [
                            'Fill sprayer with 15.984L clean water',
                            'Add 16ml Propiconazole concentrate',
                            'Mix thoroughly for 2 minutes',
                            'Apply at 110L/ha rate',
                            'Cover 0.15 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.1%',
                        chemicalAmount: 20,
                        waterAmount: 19980,
                        coverageArea: 0.18,
                        sprayTime: 45,
                        instructions: [
                            'Fill sprayer with 19.98L clean water',
                            'Add 20ml Propiconazole concentrate',
                            'Mix thoroughly for 2 minutes',
                            'Apply at 110L/ha rate',
                            'Cover 0.18 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing',
                    'Use chemical-resistant gloves',
                    'Avoid skin and eye contact',
                    'Do not apply near water sources',
                    'Clean equipment thoroughly'
                ],
                chemicalDetails: {
                    chemicalName: '1-[[2-(2,4-dichlorophenyl)-4-propyl-1,3-dioxolan-2-yl]methyl]-1H-1,2,4-triazole',
                    molecularFormula: 'C15H17Cl2N3O2',
                    molecularWeight: '342.22 g/mol',
                    casNumber: '60207-90-1',
                    physicalState: 'Liquid',
                    color: 'Light yellow to brown',
                    odor: 'Slight characteristic odor',
                    solubility: 'Slightly soluble in water (100 mg/L at 20°C)',
                    phLevel: '6.0-8.0',
                    density: '1.27 g/cm³',
                    boilingPoint: '180°C',
                    meltingPoint: 'Below -20°C',
                    vaporPressure: '1.0 × 10⁻⁶ mmHg at 25°C',
                    halfLife: 'Soil: 30-180 days, Water: 30-60 days',
                    modeOfAction: 'Sterol biosynthesis inhibitor (C14-demethylase)',
                    targetPests: [
                        'Powdery mildew',
                        'Rust',
                        'Leaf spot',
                        'Anthracnose',
                        'Fruit rot'
                    ],
                    resistantPests: [
                        'Propiconazole-resistant fungal strains'
                    ],
                    applicationTiming: [
                        'Preventive application',
                        'Early disease stage',
                        'Systemic treatment',
                        'Regular intervals'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 1517 mg/kg (slightly toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.1 mg/L (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 1-10 mg/L (highly toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '12-24 hours',
                        workerProtectionStandard: 'Category III (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            },
            {
                name: 'Chlorothalonil',
                category: 'Fungicide',
                type: 'Chloronitrile',
                effectiveness: 80,
                safetyLevel: 'Moderate',
                applicationRate: '1-2 L/ha',
                costPerLiter: 35.00,
                environmentalImpact: 'High',
                description: 'Protectant fungicide with broad-spectrum activity',
                preHarvestInterval: 7,
                weatherRestrictions: ['No rain for 6 hours', 'Temperature below 32°C'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.15%',
                        chemicalAmount: 24,
                        waterAmount: 15976,
                        coverageArea: 0.1,
                        sprayTime: 35,
                        instructions: [
                            'Fill sprayer with 15.976L clean water',
                            'Add 24ml Chlorothalonil concentrate',
                            'Mix thoroughly for 2 minutes',
                            'Apply at 160L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.15%',
                        chemicalAmount: 30,
                        waterAmount: 19970,
                        coverageArea: 0.125,
                        sprayTime: 40,
                        instructions: [
                            'Fill sprayer with 19.97L clean water',
                            'Add 30ml Chlorothalonil concentrate',
                            'Mix thoroughly for 2 minutes',
                            'Apply at 160L/ha rate',
                            'Cover 0.125 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing',
                    'Use chemical-resistant gloves',
                    'Avoid skin and eye contact',
                    'Do not apply near water sources',
                    'Clean equipment thoroughly'
                ],
                chemicalDetails: {
                    chemicalName: '2,4,5,6-tetrachloro-1,3-benzenedicarbonitrile',
                    molecularFormula: 'C8Cl4N2',
                    molecularWeight: '265.91 g/mol',
                    casNumber: '1897-45-6',
                    physicalState: 'Solid (powder)',
                    color: 'White to gray',
                    odor: 'Odorless',
                    solubility: 'Slightly soluble in water (0.6 mg/L at 20°C)',
                    phLevel: '6.0-8.0',
                    density: '2.0 g/cm³',
                    boilingPoint: '350°C',
                    meltingPoint: '250-251°C',
                    vaporPressure: '1.3 × 10⁻⁸ mmHg at 25°C',
                    halfLife: 'Soil: 30-60 days, Water: 30-60 days',
                    modeOfAction: 'Multi-site inhibitor (disrupts multiple enzyme systems)',
                    targetPests: [
                        'Leaf spot',
                        'Blight',
                        'Anthracnose',
                        'Downy mildew',
                        'Rust'
                    ],
                    resistantPests: [
                        'Some resistant fungal strains'
                    ],
                    applicationTiming: [
                        'Preventive application',
                        'Early disease stage',
                        'Weather-based timing',
                        'Regular intervals'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 > 5000 mg/kg (practically non-toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.1 mg/L (slightly toxic)',
                        eyeIrritation: 'Moderate irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 0.1-1 mg/L (highly toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '12 hours',
                        workerProtectionStandard: 'Category III (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            },
            // ADDITIONAL PESTICIDES FOR COMPREHENSIVE COVERAGE
            {
                name: 'Copper Compounds',
                category: 'Bactericide',
                type: 'Inorganic',
                effectiveness: 75,
                safetyLevel: 'Moderate',
                applicationRate: '2-4 L/ha',
                costPerLiter: 20.00,
                environmentalImpact: 'Low',
                description: 'Broad-spectrum bactericide and fungicide',
                preHarvestInterval: 0,
                weatherRestrictions: ['Avoid high humidity', 'Temperature below 30°C'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.5%',
                        chemicalAmount: 80,
                        waterAmount: 15920,
                        coverageArea: 0.08,
                        sprayTime: 30,
                        instructions: [
                            'Fill sprayer with 15.92L clean water',
                            'Add 80ml Copper compound',
                            'Mix gently for 1 minute',
                            'Apply at 200L/ha rate',
                            'Cover 0.08 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.5%',
                        chemicalAmount: 100,
                        waterAmount: 19900,
                        coverageArea: 0.1,
                        sprayTime: 35,
                        instructions: [
                            'Fill sprayer with 19.9L clean water',
                            'Add 100ml Copper compound',
                            'Mix gently for 1 minute',
                            'Apply at 200L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing',
                    'Use chemical-resistant gloves',
                    'Avoid skin and eye contact',
                    'Safe for organic farming',
                    'No pre-harvest interval'
                ],
                chemicalDetails: {
                    chemicalName: 'Copper hydroxide, copper oxychloride',
                    molecularFormula: 'Cu(OH)2, Cu2Cl(OH)3',
                    molecularWeight: '97.56 g/mol, 213.57 g/mol',
                    casNumber: '20427-59-2, 1332-65-6',
                    physicalState: 'Solid (powder)',
                    color: 'Blue to green',
                    odor: 'Odorless',
                    solubility: 'Slightly soluble in water',
                    phLevel: '6.0-8.0',
                    density: '3.4 g/cm³',
                    boilingPoint: 'Decomposes before boiling',
                    meltingPoint: 'Decomposes at 200°C',
                    vaporPressure: 'Negligible',
                    halfLife: 'Soil: 30-60 days, Water: 30-60 days',
                    modeOfAction: 'Multi-site inhibitor (copper ions)',
                    targetPests: [
                        'Bacterial diseases',
                        'Fungal diseases',
                        'Fire blight',
                        'Bacterial spot',
                        'Powdery mildew'
                    ],
                    resistantPests: [
                        'Copper-resistant bacterial strains'
                    ],
                    applicationTiming: [
                        'Preventive application',
                        'Early disease stage',
                        'Weather-based timing',
                        'Regular intervals'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 > 5000 mg/kg (practically non-toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.1 mg/L (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 1-10 mg/L (highly toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '0 hours',
                        workerProtectionStandard: 'Category III (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Generally recognized as safe'
                    }
                }
            },
            {
                name: 'Streptomycin',
                category: 'Bactericide',
                type: 'Antibiotic',
                effectiveness: 85,
                safetyLevel: 'High',
                applicationRate: '0.5-1 L/ha',
                costPerLiter: 60.00,
                environmentalImpact: 'Low',
                description: 'Antibiotic bactericide for specific bacterial diseases',
                preHarvestInterval: 7,
                weatherRestrictions: ['No rain for 4 hours', 'Temperature below 30°C'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.1%',
                        chemicalAmount: 16,
                        waterAmount: 15984,
                        coverageArea: 0.15,
                        sprayTime: 40,
                        instructions: [
                            'Fill sprayer with 15.984L clean water',
                            'Add 16ml Streptomycin concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 110L/ha rate',
                            'Cover 0.15 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.1%',
                        chemicalAmount: 20,
                        waterAmount: 19980,
                        coverageArea: 0.18,
                        sprayTime: 45,
                        instructions: [
                            'Fill sprayer with 19.98L clean water',
                            'Add 20ml Streptomycin concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 110L/ha rate',
                            'Cover 0.18 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing',
                    'Use chemical-resistant gloves',
                    'Avoid skin and eye contact',
                    'Do not apply near water sources',
                    'Clean equipment thoroughly'
                ],
                chemicalDetails: {
                    chemicalName: 'Streptomycin sulfate',
                    molecularFormula: 'C21H39N7O12·1.5H2SO4',
                    molecularWeight: '728.69 g/mol',
                    casNumber: '3810-74-0',
                    physicalState: 'Solid (powder)',
                    color: 'White to off-white',
                    odor: 'Odorless',
                    solubility: 'Soluble in water (1 g/mL at 20°C)',
                    phLevel: '4.5-7.0',
                    density: '1.8 g/cm³',
                    boilingPoint: 'Decomposes before boiling',
                    meltingPoint: 'Decomposes at 200°C',
                    vaporPressure: 'Negligible',
                    halfLife: 'Soil: 7-14 days, Water: 7-14 days',
                    modeOfAction: 'Protein synthesis inhibitor (30S ribosome)',
                    targetPests: [
                        'Fire blight',
                        'Bacterial spot',
                        'Bacterial canker',
                        'Bacterial wilt'
                    ],
                    resistantPests: [
                        'Streptomycin-resistant bacterial strains'
                    ],
                    applicationTiming: [
                        'Early disease stage',
                        'Preventive application',
                        'Systemic treatment',
                        'Regular intervals'
                    ],
                    toxicity: {
                        acuteOral: 'LD50 > 5000 mg/kg (practically non-toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.1 mg/L (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 > 100 mg/L (practically non-toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '12 hours',
                        workerProtectionStandard: 'Category III (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            }
        ];
    }

    initializePestPesticideMatching() {
        return {
            // INSECT PESTS
            'Aphids': ['Malathion', 'Deltamethrin', 'Imidacloprid', 'Neem Oil', 'Insecticidal Soap'],
            'Whiteflies': ['Malathion', 'Deltamethrin', 'Imidacloprid', 'Neem Oil', 'Insecticidal Soap'],
            'Spider Mites': ['Malathion', 'Neem Oil', 'Insecticidal Soap'],
            'Thrips': ['Malathion', 'Deltamethrin', 'Imidacloprid', 'Spinosad', 'Neem Oil'],
            'Caterpillars': ['Deltamethrin', 'Spinosad', 'Bacillus thuringiensis', 'Neem Oil'],
            'Beetles': ['Deltamethrin', 'Imidacloprid', 'Spinosad', 'Neem Oil'],
            'Scale Insects': ['Neem Oil', 'Insecticidal Soap'],
            'Mealybugs': ['Neem Oil', 'Insecticidal Soap'],
            'Leafhoppers': ['Imidacloprid', 'Deltamethrin'],
            'Leafminers': ['Spinosad'],
            'Fruit Flies': ['Spinosad'],
            'Moth Larvae': ['Bacillus thuringiensis', 'Spinosad'],
            'Butterfly Larvae': ['Bacillus thuringiensis'],
            'Grasshoppers': ['Deltamethrin', 'Malathion'],
            'Locusts': ['Deltamethrin', 'Malathion'],
            'Wireworms': ['Imidacloprid'],
            'Cutworms': ['Deltamethrin', 'Bacillus thuringiensis'],
            'Armyworms': ['Deltamethrin', 'Spinosad', 'Bacillus thuringiensis'],
            'Corn Earworms': ['Deltamethrin', 'Spinosad'],
            'Tomato Hornworms': ['Bacillus thuringiensis', 'Spinosad'],
            'Cabbage Worms': ['Bacillus thuringiensis', 'Spinosad'],
            'Colorado Potato Beetles': ['Deltamethrin', 'Spinosad'],
            'Japanese Beetles': ['Deltamethrin', 'Imidacloprid'],
            'Flea Beetles': ['Deltamethrin', 'Imidacloprid'],
            'Cucumber Beetles': ['Deltamethrin', 'Imidacloprid'],
            'Squash Bugs': ['Deltamethrin', 'Neem Oil'],
            'Stink Bugs': ['Deltamethrin', 'Spinosad'],
            'Leaf-footed Bugs': ['Deltamethrin', 'Spinosad'],
            'Weevils': ['Imidacloprid', 'Deltamethrin'],
            'Borers': ['Imidacloprid', 'Deltamethrin'],
            'Mites': ['Malathion', 'Neem Oil', 'Insecticidal Soap'],
            'Nematodes': ['Imidacloprid'],
            
            // FUNGAL DISEASES
            'Powdery Mildew': ['Mancozeb', 'Propiconazole', 'Chlorothalonil'],
            'Downy Mildew': ['Mancozeb', 'Chlorothalonil'],
            'Leaf Spot': ['Mancozeb', 'Propiconazole', 'Chlorothalonil'],
            'Rust': ['Mancozeb', 'Propiconazole', 'Chlorothalonil'],
            'Blight': ['Mancozeb', 'Chlorothalonil'],
            'Anthracnose': ['Propiconazole', 'Chlorothalonil'],
            'Fruit Rot': ['Propiconazole'],
            'Early Blight': ['Mancozeb', 'Chlorothalonil'],
            'Late Blight': ['Mancozeb', 'Chlorothalonil'],
            'Septoria Leaf Spot': ['Mancozeb', 'Propiconazole'],
            'Alternaria': ['Mancozeb', 'Propiconazole'],
            'Botrytis (Gray Mold)': ['Propiconazole', 'Chlorothalonil'],
            'Fusarium Wilt': ['Propiconazole'],
            'Verticillium Wilt': ['Propiconazole'],
            'Root Rot': ['Propiconazole', 'Chlorothalonil'],
            'Crown Rot': ['Propiconazole', 'Chlorothalonil'],
            'Scab': ['Mancozeb', 'Propiconazole'],
            'Sooty Mold': ['Neem Oil', 'Insecticidal Soap'],
            
            // BACTERIAL DISEASES
            'Bacterial Diseases': ['Copper Compounds', 'Streptomycin'],
            'Fire Blight': ['Copper Compounds', 'Streptomycin'],
            'Bacterial Spot': ['Copper Compounds', 'Streptomycin'],
            'Bacterial Wilt': ['Copper Compounds'],
            'Bacterial Canker': ['Copper Compounds', 'Streptomycin'],
            'Bacterial Leaf Blight': ['Copper Compounds'],
            'Soft Rot': ['Copper Compounds'],
            'Black Rot': ['Copper Compounds'],
            'Halo Blight': ['Copper Compounds'],
            'Angular Leaf Spot': ['Copper Compounds'],
            
            // VIRAL DISEASES
            'Mosaic Virus': ['Insect Control (Vector Management)'],
            'Yellowing Virus': ['Insect Control (Vector Management)'],
            'Curly Top Virus': ['Insect Control (Vector Management)'],
            'Tomato Spotted Wilt': ['Insect Control (Vector Management)'],
            'Cucumber Mosaic': ['Insect Control (Vector Management)'],
            'Potato Virus Y': ['Insect Control (Vector Management)'],
            
            // SOIL-BORNE PESTS
            'Root-knot Nematodes': ['Nematicides'],
            'Cyst Nematodes': ['Nematicides'],
            'Lesion Nematodes': ['Nematicides'],
            'Stem Nematodes': ['Nematicides'],
            'Bulb Nematodes': ['Nematicides'],
            
            // STORAGE PESTS
            'Grain Weevils': ['Fumigants', 'Malathion'],
            'Rice Weevils': ['Fumigants', 'Malathion'],
            'Maize Weevils': ['Fumigants', 'Malathion'],
            'Flour Beetles': ['Fumigants', 'Malathion'],
            'Grain Moths': ['Fumigants', 'Malathion'],
            'Indian Meal Moths': ['Fumigants', 'Malathion'],
            'Mediterranean Flour Moths': ['Fumigants', 'Malathion'],
            
            // WEED CATEGORIES
            'Broadleaf Weeds': ['Herbicides'],
            'Grassy Weeds': ['Herbicides'],
            'Annual Weeds': ['Herbicides'],
            'Perennial Weeds': ['Herbicides'],
            'Sedge Weeds': ['Herbicides']
        };
    }

    initializeSafetyGuidelines() {
        return {
            // INSECTICIDES
            'Malathion': [
                'Full protective suit required',
                'Use chemical-resistant gloves and boots',
                'Respirator with organic vapor cartridge',
                'Avoid application near water sources',
                'Monitor for resistance development'
            ],
            'Deltamethrin': [
                'Wear protective clothing',
                'Use chemical-resistant gloves',
                'Avoid contact with beneficial insects',
                'Do not apply in windy conditions',
                'Clean equipment thoroughly'
            ],
            'Imidacloprid': [
                'Wear protective clothing',
                'Use chemical-resistant gloves',
                'Avoid contact with beneficial insects',
                'Do not apply near flowering crops',
                'Clean equipment thoroughly'
            ],
            'Spinosad': [
                'Wear protective clothing',
                'Use chemical-resistant gloves',
                'Safe for beneficial insects',
                'Do not apply in windy conditions',
                'Clean equipment thoroughly'
            ],
            'Bacillus thuringiensis': [
                'Minimal protective equipment needed',
                'Safe for beneficial insects',
                'No pre-harvest interval',
                'Environmentally friendly',
                'Safe for organic farming'
            ],
            'Neem Oil': [
                'Minimal protective equipment needed',
                'Wear basic gloves and eye protection',
                'Safe for beneficial insects',
                'No pre-harvest interval',
                'Environmentally friendly'
            ],
            'Insecticidal Soap': [
                'Minimal protective equipment needed',
                'Safe for beneficial insects',
                'No pre-harvest interval',
                'Environmentally friendly',
                'Safe for organic farming'
            ],
            
            // FUNGICIDES
            'Mancozeb': [
                'Wear protective clothing',
                'Use chemical-resistant gloves',
                'Avoid skin and eye contact',
                'Do not eat, drink or smoke during application',
                'Wash hands thoroughly after use'
            ],
            'Propiconazole': [
                'Wear protective clothing',
                'Use chemical-resistant gloves',
                'Avoid skin and eye contact',
                'Do not apply near water sources',
                'Clean equipment thoroughly'
            ],
            'Chlorothalonil': [
                'Wear protective clothing',
                'Use chemical-resistant gloves',
                'Avoid skin and eye contact',
                'Do not apply near water sources',
                'Clean equipment thoroughly'
            ],
            
            // BACTERICIDES
            'Copper Compounds': [
                'Wear protective clothing',
                'Use chemical-resistant gloves',
                'Avoid skin and eye contact',
                'Safe for organic farming',
                'No pre-harvest interval'
            ],
            'Streptomycin': [
                'Wear protective clothing',
                'Use chemical-resistant gloves',
                'Avoid skin and eye contact',
                'Do not apply near water sources',
                'Clean equipment thoroughly'
            ]
        };
    }

    showPesticideDetails(pesticideName) {
        const pesticide = this.pesticideDatabase.find(p => p.name === pesticideName);
        if (!pesticide || !pesticide.chemicalDetails) return;

        this.displayPesticideDetailsModal(pesticide);
    }

    displayPesticideDetailsModal(pesticide) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-bug me-2"></i>Pesticide Details - ${pesticide.name}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-primary text-white">
                                        <h6 class="mb-0">Basic Information</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Category:</strong></td><td>${pesticide.category}</td></tr>
                                            <tr><td><strong>Type:</strong></td><td>${pesticide.type}</td></tr>
                                            <tr><td><strong>Chemical Name:</strong></td><td>${pesticide.chemicalDetails.chemicalName}</td></tr>
                                            <tr><td><strong>Molecular Formula:</strong></td><td>${pesticide.chemicalDetails.molecularFormula}</td></tr>
                                            <tr><td><strong>Molecular Weight:</strong></td><td>${pesticide.chemicalDetails.molecularWeight}</td></tr>
                                            <tr><td><strong>CAS Number:</strong></td><td>${pesticide.chemicalDetails.casNumber}</td></tr>
                                            <tr><td><strong>Physical State:</strong></td><td>${pesticide.chemicalDetails.physicalState}</td></tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-success text-white">
                                        <h6 class="mb-0">Physical Properties</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Color:</strong></td><td>${pesticide.chemicalDetails.color}</td></tr>
                                            <tr><td><strong>Odor:</strong></td><td>${pesticide.chemicalDetails.odor}</td></tr>
                                            <tr><td><strong>Solubility:</strong></td><td>${pesticide.chemicalDetails.solubility}</td></tr>
                                            <tr><td><strong>pH Level:</strong></td><td>${pesticide.chemicalDetails.phLevel}</td></tr>
                                            <tr><td><strong>Density:</strong></td><td>${pesticide.chemicalDetails.density}</td></tr>
                                            <tr><td><strong>Half-Life:</strong></td><td>${pesticide.chemicalDetails.halfLife}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-warning text-dark">
                                        <h6 class="mb-0">Mode of Action & Target</h6>
                                    </div>
                                    <div class="card-body">
                                        <p><strong>Mode of Action:</strong> ${pesticide.chemicalDetails.modeOfAction}</p>
                                        
                                        <h6>Target Pests:</h6>
                                        <ul class="list-unstyled">
                                            ${pesticide.chemicalDetails.targetPests.map(pest => `<li>• ${pest}</li>`).join('')}
                                        </ul>

                                        <h6>Resistant Pests:</h6>
                                        <ul class="list-unstyled">
                                            ${pesticide.chemicalDetails.resistantPests.map(pest => `<li>• ${pest}</li>`).join('')}
                                        </ul>

                                        <h6>Application Timing:</h6>
                                        <ul class="list-unstyled">
                                            ${pesticide.chemicalDetails.applicationTiming.map(timing => `<li>• ${timing}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-danger text-white">
                                        <h6 class="mb-0">Toxicity Information</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Acute Oral:</strong></td><td>${pesticide.chemicalDetails.toxicity.acuteOral}</td></tr>
                                            <tr><td><strong>Acute Dermal:</strong></td><td>${pesticide.chemicalDetails.toxicity.acuteDermal}</td></tr>
                                            <tr><td><strong>Acute Inhalation:</strong></td><td>${pesticide.chemicalDetails.toxicity.acuteInhalation}</td></tr>
                                            <tr><td><strong>Eye Irritation:</strong></td><td>${pesticide.chemicalDetails.toxicity.eyeIrritation}</td></tr>
                                            <tr><td><strong>Skin Irritation:</strong></td><td>${pesticide.chemicalDetails.toxicity.skinIrritation}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-info text-white">
                                        <h6 class="mb-0">Ecotoxicity</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Fish:</strong></td><td>${pesticide.chemicalDetails.ecotoxicity.fish}</td></tr>
                                            <tr><td><strong>Birds:</strong></td><td>${pesticide.chemicalDetails.ecotoxicity.birds}</td></tr>
                                            <tr><td><strong>Bees:</strong></td><td>${pesticide.chemicalDetails.ecotoxicity.bees}</td></tr>
                                            <tr><td><strong>Earthworms:</strong></td><td>${pesticide.chemicalDetails.ecotoxicity.earthworms}</td></tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-primary text-white">
                                        <h6 class="mb-0">Regulatory Status</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>EPA Registration:</strong></td><td>${pesticide.chemicalDetails.regulatoryStatus.epaRegistration}</td></tr>
                                            <tr><td><strong>Re-Entry Interval:</strong></td><td>${pesticide.chemicalDetails.regulatoryStatus.reEntryInterval}</td></tr>
                                            <tr><td><strong>Worker Protection:</strong></td><td>${pesticide.chemicalDetails.regulatoryStatus.workerProtectionStandard}</td></tr>
                                            <tr><td><strong>Restricted Use:</strong></td><td>${pesticide.chemicalDetails.regulatoryStatus.restrictedUse}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-warning text-dark">
                                        <h6 class="mb-0">Safety Guidelines</h6>
                                    </div>
                                    <div class="card-body">
                                        <ul class="mb-0">
                                            ${pesticide.safetyGuidelines.map(guideline => `<li>${guideline}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-success text-white">
                                        <h6 class="mb-0">Knapsack Mixture Instructions</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            ${Object.entries(pesticide.knapsackMixtures).map(([size, mixture]) => `
                                                <div class="col-md-6">
                                                    <h6>${size} Sprayer</h6>
                                                    <p><strong>Chemical:</strong> ${mixture.chemicalAmount}ml</p>
                                                    <p><strong>Water:</strong> ${(mixture.waterAmount/1000).toFixed(2)}L</p>
                                                    <p><strong>Coverage:</strong> ${mixture.coverageArea}ha</p>
                                                    <p><strong>Time:</strong> ${mixture.sprayTime}min</p>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-info" onclick="pesticideManagement.printPesticideDetails('${pesticide.name}')">
                            <i class="fas fa-print me-2"></i>Print Details
                        </button>
                        <button type="button" class="btn btn-danger" onclick="pesticideManagement.selectPesticide('${pesticide.name}')">
                            <i class="fas fa-bug me-2"></i>Select Pesticide
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    selectPesticide(pesticideName) {
        const pesticide = this.pesticideDatabase.find(p => p.name === pesticideName);
        if (!pesticide) return;

        alert(`🐛 Selected: ${pesticide.name}\n\nCategory: ${pesticide.category}\nType: ${pesticide.type}\nEffectiveness: ${pesticide.effectiveness}%\nSafety Level: ${pesticide.safetyLevel}\nApplication Rate: ${pesticide.applicationRate}\nCost: $${pesticide.costPerLiter}/L\nEnvironmental Impact: ${pesticide.environmentalImpact}\n\nPre-Harvest Interval: ${pesticide.preHarvestInterval} days\n\nPesticide selected for application!`);
    }

    printPesticideDetails(pesticideName) {
        const pesticide = this.pesticideDatabase.find(p => p.name === pesticideName);
        if (!pesticide) return;

        alert(`🖨️ Print Pesticide Details for ${pesticideName}\n\nComprehensive pesticide information would be printed including:\n\n• Chemical properties and molecular data\n• Toxicity and ecotoxicity information\n• Target pests and resistance data\n• Application instructions and timing\n• Safety guidelines and protective equipment\n• Regulatory compliance information\n\nThis would generate a professional PDF for field use and compliance.`);
    }

    getPesticidesForPest(pestName) {
        return this.pestPesticideMatching[pestName] || [];
    }

    loadApplicationRecords() {
        return JSON.parse(localStorage.getItem('pesticideApplications') || '[]');
    }

    saveApplicationRecord(record) {
        this.applicationRecords.push(record);
        localStorage.setItem('pesticideApplications', JSON.stringify(this.applicationRecords));
    }
}

// Initialize Pesticide Management System
const pesticideManagement = new PesticideManagement();

// Export for global access
window.pesticideManagement = pesticideManagement;
