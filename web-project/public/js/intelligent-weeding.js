// SmartFarm Intelligent Weeding Task Management
// Calculates weather effects on weed growth and provides smart alerts

class IntelligentWeedingSystem {
    constructor() {
        this.weatherData = null;
        this.cropData = [];
        this.weedGrowthFactors = this.initializeWeedGrowthFactors();
        this.weedingTasks = [];
        this.chemicalSuppressionOptions = this.initializeChemicalOptions();
        this.alertThresholds = this.initializeAlertThresholds();
        
        this.initializeIntelligentWeeding();
    }

    initializeWeedGrowthFactors() {
        return {
            // Weather factors that affect weed growth
            temperature: {
                optimal: { min: 20, max: 30 },
                growthRate: {
                    low: { temp: 5, rate: 0.2 },
                    moderate: { temp: 15, rate: 0.6 },
                    high: { temp: 25, rate: 1.0 },
                    veryHigh: { temp: 35, rate: 0.8 }
                }
            },
            humidity: {
                optimal: { min: 60, max: 80 },
                growthRate: {
                    low: { humidity: 30, rate: 0.3 },
                    moderate: { humidity: 50, rate: 0.7 },
                    high: { humidity: 70, rate: 1.0 },
                    veryHigh: { humidity: 90, rate: 1.2 }
                }
            },
            rainfall: {
                optimal: { min: 50, max: 100 }, // mm/month
                growthRate: {
                    low: { rainfall: 20, rate: 0.4 },
                    moderate: { rainfall: 60, rate: 0.8 },
                    high: { rainfall: 100, rate: 1.0 },
                    veryHigh: { rainfall: 150, rate: 1.3 }
                }
            },
            soilMoisture: {
                optimal: { min: 60, max: 80 }, // percentage
                growthRate: {
                    low: { moisture: 30, rate: 0.3 },
                    moderate: { moisture: 50, rate: 0.7 },
                    high: { moisture: 70, rate: 1.0 },
                    veryHigh: { moisture: 90, rate: 1.1 }
                }
            },
            sunlight: {
                optimal: { min: 6, max: 12 }, // hours/day
                growthRate: {
                    low: { sunlight: 4, rate: 0.5 },
                    moderate: { sunlight: 8, rate: 0.8 },
                    high: { sunlight: 10, rate: 1.0 },
                    veryHigh: { sunlight: 14, rate: 1.2 }
                }
            }
        };
    }

    initializeChemicalOptions() {
        return [
            {
                name: 'Glyphosate',
                type: 'Non-selective herbicide',
                effectiveness: 95,
                safetyLevel: 'Moderate',
                applicationRate: '2-4 L/ha',
                costPerLiter: 25.00,
                environmentalImpact: 'Medium',
                description: 'Effective against most weed types, requires careful application',
                preHarvestInterval: 7, // days
                weatherRestrictions: ['No rain for 6 hours', 'Temperature below 32°C'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '1.5%', // 1.5% solution
                        chemicalAmount: 240, // ml of chemical
                        waterAmount: 15760, // ml of water
                        coverageArea: 0.08, // hectares per tank
                        sprayTime: 25, // minutes per tank
                        instructions: [
                            'Fill sprayer with 15.76L clean water',
                            'Add 240ml Glyphosate concentrate',
                            'Mix thoroughly for 2 minutes',
                            'Apply at 200L/ha rate',
                            'Cover 0.08 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '1.5%',
                        chemicalAmount: 300, // ml of chemical
                        waterAmount: 19700, // ml of water
                        coverageArea: 0.1, // hectares per tank
                        sprayTime: 30, // minutes per tank
                        instructions: [
                            'Fill sprayer with 19.7L clean water',
                            'Add 300ml Glyphosate concentrate',
                            'Mix thoroughly for 2 minutes',
                            'Apply at 200L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear protective clothing (overalls, gloves, boots)',
                    'Use respirator or face mask',
                    'Avoid skin and eye contact',
                    'Do not eat, drink or smoke during application',
                    'Wash hands thoroughly after use',
                    'Keep away from children and animals'
                ],
                chemicalDetails: {
                    chemicalName: 'N-(phosphonomethyl)glycine',
                    molecularFormula: 'C3H8NO5P',
                    molecularWeight: '169.07 g/mol',
                    casNumber: '1071-83-6',
                    physicalState: 'Solid (powder)',
                    color: 'White to off-white',
                    odor: 'Odorless',
                    solubility: 'Soluble in water (12 g/L at 20°C)',
                    phLevel: '2.5-3.5 (acidic)',
                    density: '1.7 g/cm³',
                    boilingPoint: 'Decomposes before boiling',
                    meltingPoint: '184-189°C',
                    vaporPressure: 'Negligible at 20°C',
                    halfLife: 'Soil: 3-174 days, Water: 7-14 days',
                    modeOfAction: 'Inhibits EPSP synthase enzyme',
                    targetWeeds: [
                        'Broadleaf weeds',
                        'Grass weeds',
                        'Perennial weeds',
                        'Annual weeds',
                        'Biennial weeds'
                    ],
                    resistantWeeds: [
                        'Glyphosate-resistant ryegrass',
                        'Glyphosate-resistant pigweed',
                        'Glyphosate-resistant horseweed'
                    ],
                    applicationTiming: [
                        'Pre-planting application',
                        'Post-emergence application',
                        'Pre-harvest application',
                        'Spot treatment'
                    ],
                    soilFactors: {
                        phOptimal: '6.0-7.0',
                        organicMatter: 'Less effective in high organic matter',
                        clayContent: 'Better adsorption in clay soils',
                        moisture: 'Requires moist conditions for activation'
                    },
                    environmentalFate: {
                        soilBinding: 'Strongly bound to soil particles',
                        leaching: 'Low leaching potential',
                        runoff: 'Low runoff potential',
                        volatilization: 'Negligible volatilization'
                    },
                    toxicity: {
                        acuteOral: 'LD50 > 5000 mg/kg (slightly toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.1 mg/L (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 > 100 mg/L (practically non-toxic)',
                        birds: 'LD50 > 2250 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    storageRequirements: [
                        'Store in cool, dry place',
                        'Keep container tightly closed',
                        'Store away from food and feed',
                        'Protect from direct sunlight',
                        'Store above freezing point'
                    ],
                    compatibility: {
                        compatible: [
                            'Most herbicides',
                            'Fertilizers',
                            'Insecticides (check labels)',
                            'Fungicides (check labels)'
                        ],
                        incompatible: [
                            'Strong oxidizing agents',
                            'Strong bases',
                            'Metal salts',
                            'Hard water (high calcium/magnesium)'
                        ]
                    },
                    resistanceManagement: [
                        'Rotate with different herbicide modes of action',
                        'Use tank mixes with other herbicides',
                        'Apply at recommended rates',
                        'Use integrated weed management',
                        'Monitor for resistance development'
                    ],
                    regulatoryStatus: {
                        epaRegistration: 'Approved for agricultural use',
                        reEntryInterval: '12 hours',
                        workerProtectionStandard: 'Category III (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Varies by country'
                    }
                }
            },
            {
                name: '2,4-D',
                type: 'Selective herbicide',
                effectiveness: 85,
                safetyLevel: 'Moderate',
                applicationRate: '1-2 L/ha',
                costPerLiter: 18.00,
                environmentalImpact: 'Low',
                description: 'Selective herbicide, safe for most crops',
                preHarvestInterval: 14,
                weatherRestrictions: ['No rain for 4 hours', 'Low wind conditions'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '0.8%',
                        chemicalAmount: 128, // ml of chemical
                        waterAmount: 15872, // ml of water
                        coverageArea: 0.1, // hectares per tank
                        sprayTime: 30, // minutes per tank
                        instructions: [
                            'Fill sprayer with 15.87L clean water',
                            'Add 128ml 2,4-D concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 160L/ha rate',
                            'Cover 0.1 hectares per tank'
                        ]
                    },
                    '20L': {
                        concentration: '0.8%',
                        chemicalAmount: 160, // ml of chemical
                        waterAmount: 19840, // ml of water
                        coverageArea: 0.125, // hectares per tank
                        sprayTime: 35, // minutes per tank
                        instructions: [
                            'Fill sprayer with 19.84L clean water',
                            'Add 160ml 2,4-D concentrate',
                            'Mix gently for 1 minute',
                            'Apply at 160L/ha rate',
                            'Cover 0.125 hectares per tank'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Wear long sleeves and pants',
                    'Use chemical-resistant gloves',
                    'Avoid contact with skin',
                    'Do not apply in windy conditions',
                    'Clean equipment thoroughly after use'
                ],
                chemicalDetails: {
                    chemicalName: '2,4-dichlorophenoxyacetic acid',
                    molecularFormula: 'C8H6Cl2O3',
                    molecularWeight: '221.04 g/mol',
                    casNumber: '94-75-7',
                    physicalState: 'Solid (crystalline)',
                    color: 'White to light tan',
                    odor: 'Slight phenolic odor',
                    solubility: 'Slightly soluble in water (0.9 g/L at 20°C)',
                    phLevel: '2.5-4.0 (acidic)',
                    density: '1.4 g/cm³',
                    boilingPoint: '160°C (decomposes)',
                    meltingPoint: '140-142°C',
                    vaporPressure: '1.4 × 10⁻⁵ mmHg at 25°C',
                    halfLife: 'Soil: 7-28 days, Water: 10-20 days',
                    modeOfAction: 'Synthetic auxin (plant growth regulator)',
                    targetWeeds: [
                        'Broadleaf weeds',
                        'Annual weeds',
                        'Biennial weeds',
                        'Perennial weeds (with repeated applications)'
                    ],
                    resistantWeeds: [
                        '2,4-D resistant wild mustard',
                        '2,4-D resistant kochia',
                        '2,4-D resistant waterhemp'
                    ],
                    applicationTiming: [
                        'Pre-emergence application',
                        'Post-emergence application',
                        'Fall application for perennials',
                        'Spot treatment'
                    ],
                    soilFactors: {
                        phOptimal: '6.0-7.5',
                        organicMatter: 'Moderately adsorbed to organic matter',
                        clayContent: 'Well adsorbed in clay soils',
                        moisture: 'Works best in moist conditions'
                    },
                    environmentalFate: {
                        soilBinding: 'Moderately bound to soil particles',
                        leaching: 'Moderate leaching potential',
                        runoff: 'Moderate runoff potential',
                        volatilization: 'Low volatilization potential'
                    },
                    toxicity: {
                        acuteOral: 'LD50 300-800 mg/kg (moderately toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 200 mg/m³ (slightly toxic)',
                        eyeIrritation: 'Moderate irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 100-1000 mg/L (moderately toxic)',
                        birds: 'LD50 100-1000 mg/kg (moderately toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    storageRequirements: [
                        'Store in cool, dry place',
                        'Keep container tightly closed',
                        'Store away from food and feed',
                        'Protect from direct sunlight',
                        'Avoid storage near heat sources'
                    ],
                    compatibility: {
                        compatible: [
                            'Most herbicides',
                            'Fertilizers',
                            'Insecticides',
                            'Fungicides'
                        ],
                        incompatible: [
                            'Strong oxidizing agents',
                            'Strong bases',
                            'Metal salts',
                            'Hard water'
                        ]
                    },
                    resistanceManagement: [
                        'Rotate with different herbicide modes of action',
                        'Use tank mixes with other herbicides',
                        'Apply at recommended rates',
                        'Use integrated weed management',
                        'Monitor for resistance development'
                    ],
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
                name: 'Atrazine',
                type: 'Pre-emergence herbicide',
                effectiveness: 90,
                safetyLevel: 'Low',
                applicationRate: '2-3 L/ha',
                costPerLiter: 22.00,
                environmentalImpact: 'High',
                description: 'Pre-emergence application, long-lasting effect',
                preHarvestInterval: 21,
                weatherRestrictions: ['Applied before crop emergence', 'Moist soil conditions'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '2.0%',
                        chemicalAmount: 320, // ml of chemical
                        waterAmount: 15680, // ml of water
                        coverageArea: 0.07, // hectares per tank
                        sprayTime: 20, // minutes per tank
                        instructions: [
                            'Fill sprayer with 15.68L clean water',
                            'Add 320ml Atrazine concentrate',
                            'Mix thoroughly for 3 minutes',
                            'Apply at 230L/ha rate',
                            'Cover 0.07 hectares per tank',
                            'Apply to soil surface only'
                        ]
                    },
                    '20L': {
                        concentration: '2.0%',
                        chemicalAmount: 400, // ml of chemical
                        waterAmount: 19600, // ml of water
                        coverageArea: 0.087, // hectares per tank
                        sprayTime: 25, // minutes per tank
                        instructions: [
                            'Fill sprayer with 19.6L clean water',
                            'Add 400ml Atrazine concentrate',
                            'Mix thoroughly for 3 minutes',
                            'Apply at 230L/ha rate',
                            'Cover 0.087 hectares per tank',
                            'Apply to soil surface only'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Full protective suit required',
                    'Use chemical-resistant gloves and boots',
                    'Respirator with organic vapor cartridge',
                    'Do not apply near water sources',
                    'Avoid soil contamination',
                    'Long pre-harvest interval required'
                ],
                chemicalDetails: {
                    chemicalName: '6-chloro-N-ethyl-N\'-(1-methylethyl)-1,3,5-triazine-2,4-diamine',
                    molecularFormula: 'C8H14ClN5',
                    molecularWeight: '215.68 g/mol',
                    casNumber: '1912-24-9',
                    physicalState: 'Solid (crystalline)',
                    color: 'White to off-white',
                    odor: 'Odorless',
                    solubility: 'Slightly soluble in water (33 mg/L at 20°C)',
                    phLevel: '5.0-6.0 (slightly acidic)',
                    density: '1.2 g/cm³',
                    boilingPoint: '200°C (decomposes)',
                    meltingPoint: '173-175°C',
                    vaporPressure: '3.0 × 10⁻⁶ mmHg at 20°C',
                    halfLife: 'Soil: 60-120 days, Water: 30-60 days',
                    modeOfAction: 'Photosystem II inhibitor (blocks electron transport)',
                    targetWeeds: [
                        'Broadleaf weeds',
                        'Grass weeds',
                        'Annual weeds',
                        'Some perennial weeds'
                    ],
                    resistantWeeds: [
                        'Atrazine-resistant pigweed',
                        'Atrazine-resistant waterhemp',
                        'Atrazine-resistant kochia'
                    ],
                    applicationTiming: [
                        'Pre-emergence application',
                        'Early post-emergence application',
                        'Fall application for perennials'
                    ],
                    soilFactors: {
                        phOptimal: '6.0-7.5',
                        organicMatter: 'Strongly adsorbed to organic matter',
                        clayContent: 'Well adsorbed in clay soils',
                        moisture: 'Requires moisture for activation'
                    },
                    environmentalFate: {
                        soilBinding: 'Strongly bound to soil particles',
                        leaching: 'High leaching potential in sandy soils',
                        runoff: 'Moderate runoff potential',
                        volatilization: 'Low volatilization potential'
                    },
                    toxicity: {
                        acuteOral: 'LD50 2000-3000 mg/kg (slightly toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 5.8 mg/L (slightly toxic)',
                        eyeIrritation: 'Mild irritant',
                        skinIrritation: 'Mild irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 4-100 mg/L (moderately toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    storageRequirements: [
                        'Store in cool, dry place',
                        'Keep container tightly closed',
                        'Store away from food and feed',
                        'Protect from direct sunlight',
                        'Store above freezing point'
                    ],
                    compatibility: {
                        compatible: [
                            'Most herbicides',
                            'Fertilizers',
                            'Insecticides',
                            'Fungicides'
                        ],
                        incompatible: [
                            'Strong oxidizing agents',
                            'Strong bases',
                            'Metal salts',
                            'Hard water'
                        ]
                    },
                    resistanceManagement: [
                        'Rotate with different herbicide modes of action',
                        'Use tank mixes with other herbicides',
                        'Apply at recommended rates',
                        'Use integrated weed management',
                        'Monitor for resistance development'
                    ],
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
                name: 'Organic Vinegar Solution',
                type: 'Organic herbicide',
                effectiveness: 70,
                safetyLevel: 'High',
                applicationRate: '10-15 L/ha',
                costPerLiter: 8.00,
                environmentalImpact: 'Very Low',
                description: 'Eco-friendly option, requires frequent application',
                preHarvestInterval: 0,
                weatherRestrictions: ['Direct sunlight application', 'No rain for 2 hours'],
                knapsackMixtures: {
                    '16L': {
                        concentration: '10%',
                        chemicalAmount: 1600, // ml of vinegar
                        waterAmount: 14400, // ml of water
                        coverageArea: 0.13, // hectares per tank
                        sprayTime: 40, // minutes per tank
                        instructions: [
                            'Fill sprayer with 14.4L clean water',
                            'Add 1.6L organic vinegar (10% acidity)',
                            'Mix gently for 1 minute',
                            'Apply at 120L/ha rate',
                            'Cover 0.13 hectares per tank',
                            'Apply in direct sunlight for best effect'
                        ]
                    },
                    '20L': {
                        concentration: '10%',
                        chemicalAmount: 2000, // ml of vinegar
                        waterAmount: 18000, // ml of water
                        coverageArea: 0.16, // hectares per tank
                        sprayTime: 50, // minutes per tank
                        instructions: [
                            'Fill sprayer with 18L clean water',
                            'Add 2L organic vinegar (10% acidity)',
                            'Mix gently for 1 minute',
                            'Apply at 120L/ha rate',
                            'Cover 0.16 hectares per tank',
                            'Apply in direct sunlight for best effect'
                        ]
                    }
                },
                safetyGuidelines: [
                    'Minimal protective equipment needed',
                    'Wear basic gloves and eye protection',
                    'Safe for organic farming',
                    'No pre-harvest interval',
                    'Environmentally friendly',
                    'Can be applied near water sources'
                ],
                chemicalDetails: {
                    chemicalName: 'Acetic acid (vinegar)',
                    molecularFormula: 'C2H4O2',
                    molecularWeight: '60.05 g/mol',
                    casNumber: '64-19-7',
                    physicalState: 'Liquid',
                    color: 'Colorless to light yellow',
                    odor: 'Characteristic vinegar odor',
                    solubility: 'Miscible with water',
                    phLevel: '2.4-3.4 (acidic)',
                    density: '1.05 g/cm³',
                    boilingPoint: '118°C',
                    meltingPoint: '16.6°C',
                    vaporPressure: '11.4 mmHg at 20°C',
                    halfLife: 'Soil: 1-7 days, Water: 1-3 days',
                    modeOfAction: 'Contact herbicide (desiccant)',
                    targetWeeds: [
                        'Young broadleaf weeds',
                        'Annual weeds',
                        'Grass weeds (young)',
                        'Seedling weeds'
                    ],
                    resistantWeeds: [
                        'Mature perennial weeds',
                        'Established weeds',
                        'Deep-rooted weeds',
                        'Waxy-leaved weeds'
                    ],
                    applicationTiming: [
                        'Post-emergence application',
                        'Spot treatment',
                        'Pre-planting application',
                        'Inter-row application'
                    ],
                    soilFactors: {
                        phOptimal: '6.0-8.0',
                        organicMatter: 'No effect on organic matter',
                        clayContent: 'No soil binding',
                        moisture: 'Works best in dry conditions'
                    },
                    environmentalFate: {
                        soilBinding: 'No soil binding',
                        leaching: 'High leaching potential',
                        runoff: 'High runoff potential',
                        volatilization: 'Moderate volatilization potential'
                    },
                    toxicity: {
                        acuteOral: 'LD50 3310 mg/kg (slightly toxic)',
                        acuteDermal: 'LD50 > 2000 mg/kg (slightly toxic)',
                        acuteInhalation: 'LC50 > 200 mg/m³ (slightly toxic)',
                        eyeIrritation: 'Severe irritant',
                        skinIrritation: 'Moderate irritant'
                    },
                    ecotoxicity: {
                        fish: 'LC50 50-100 mg/L (moderately toxic)',
                        birds: 'LD50 > 2000 mg/kg (practically non-toxic)',
                        bees: 'LD50 > 100 μg/bee (practically non-toxic)',
                        earthworms: 'LC50 > 1000 mg/kg (practically non-toxic)'
                    },
                    storageRequirements: [
                        'Store in cool, dry place',
                        'Keep container tightly closed',
                        'Store away from food and feed',
                        'Protect from direct sunlight',
                        'Store at room temperature'
                    ],
                    compatibility: {
                        compatible: [
                            'Most organic products',
                            'Fertilizers',
                            'Insecticides',
                            'Fungicides'
                        ],
                        incompatible: [
                            'Strong oxidizing agents',
                            'Strong bases',
                            'Metal salts',
                            'Hard water'
                        ]
                    },
                    resistanceManagement: [
                        'No resistance development expected',
                        'Use for spot treatment',
                        'Apply to young weeds',
                        'Use integrated weed management',
                        'Monitor effectiveness'
                    ],
                    regulatoryStatus: {
                        epaRegistration: 'Exempt from registration',
                        reEntryInterval: '0 hours',
                        workerProtectionStandard: 'Category III (Caution)',
                        restrictedUse: 'No',
                        exportTolerance: 'Generally recognized as safe'
                    }
                }
            },
            {
                name: 'Manual Weeding',
                type: 'Physical removal',
                effectiveness: 100,
                safetyLevel: 'Very High',
                applicationRate: 'Labor intensive',
                costPerLiter: 15.00, // per hour
                environmentalImpact: 'None',
                description: 'Most environmentally friendly, requires more labor',
                preHarvestInterval: 0,
                weatherRestrictions: ['Dry soil conditions', 'Clear weather']
            }
        ];
    }

    initializeAlertThresholds() {
        return {
            weedGrowthRate: {
                low: 0.3,
                medium: 0.6,
                high: 0.8,
                critical: 1.0
            },
            timeSinceLastWeeding: {
                warning: 14, // days
                urgent: 21,
                critical: 28
            },
            cropCompetition: {
                low: 0.2,
                medium: 0.5,
                high: 0.7,
                critical: 0.8
            }
        };
    }

    async initializeIntelligentWeeding() {
        console.log('🌱 Initializing Intelligent Weeding System...');
        await this.fetchWeatherData();
        await this.loadCropData();
        this.createWeedingTaskWidget();
        this.generateWeedingTasks();
        this.setupWeedingAlerts();
    }

    async fetchWeatherData() {
        // Simulate weather data (in production, this would come from a real weather API)
        this.weatherData = {
            temperature: 28,
            humidity: 75,
            rainfall: 85,
            windSpeed: 12,
            pressure: 1013,
            uvIndex: 8,
            soilMoisture: 70,
            sunlightHours: 10,
            forecast: {
                next7Days: [
                    { day: 0, temp: 28, humidity: 75, rain: 15, wind: 12 },
                    { day: 1, temp: 30, humidity: 80, rain: 5, wind: 8 },
                    { day: 2, temp: 32, humidity: 70, rain: 0, wind: 15 },
                    { day: 3, temp: 29, humidity: 78, rain: 20, wind: 10 },
                    { day: 4, temp: 27, humidity: 82, rain: 25, wind: 6 },
                    { day: 5, temp: 26, humidity: 85, rain: 30, wind: 4 },
                    { day: 6, temp: 24, humidity: 88, rain: 35, wind: 2 }
                ]
            },
            lastUpdate: new Date().toISOString()
        };
    }

    async loadCropData() {
        // Load crop data from localStorage or global variables
        const savedCrops = localStorage.getItem('crops');
        if (savedCrops) {
            this.cropData = JSON.parse(savedCrops);
        } else {
            // Default crop data
            this.cropData = [
                {
                    id: 'crop1',
                    name: 'Tomatoes',
                    plantingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    lastWeeding: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
                    growthStage: 'Flowering',
                    area: 0.5, // hectares
                    weedPressure: 'Medium',
                    location: 'Field A'
                },
                {
                    id: 'crop2',
                    name: 'Peppers',
                    plantingDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
                    lastWeeding: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    growthStage: 'Vegetative',
                    area: 0.3,
                    weedPressure: 'High',
                    location: 'Field B'
                }
            ];
        }
    }

    createWeedingTaskWidget() {
        const dashboardContainer = document.getElementById('dashboardView');
        if (!dashboardContainer) return;

        const weedingCard = document.createElement('div');
        weedingCard.id = 'weedingTaskCard';
        weedingCard.className = 'dashboard-card mt-4';
        weedingCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>🌱 Intelligent Weeding Management</h5>
                <div class="weed-growth-indicator">
                    <span class="badge bg-${this.getWeedGrowthBadgeColor()} me-2">
                        <i class="fas fa-seedling me-1"></i>
                        Weed Growth: ${this.getWeedGrowthLevel()}
                    </span>
                    <button class="btn btn-sm btn-outline-primary" onclick="intelligentWeeding.generateWeedingTasks()">
                        <i class="fas fa-sync me-1"></i>Refresh
                    </button>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="weeding-tasks" id="weedingTasksContainer">
                        <!-- Weeding tasks will be populated here -->
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="weather-impact">
                        <h6 class="mb-3">Weather Impact on Weeds</h6>
                        <div id="weatherImpactContainer">
                            <!-- Weather impact analysis will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-3">
                <button class="btn btn-success me-2" onclick="intelligentWeeding.showWeedingSchedule()">
                    <i class="fas fa-calendar-alt me-1"></i>View Schedule
                </button>
                <button class="btn btn-warning me-2" onclick="intelligentWeeding.showChemicalOptions()">
                    <i class="fas fa-flask me-1"></i>Chemical Options
                </button>
                <button class="btn btn-info" onclick="intelligentWeeding.showWeedingAnalytics()">
                    <i class="fas fa-chart-line me-1"></i>Analytics
                </button>
            </div>
        `;

        dashboardContainer.appendChild(weedingCard);
        this.populateWeatherImpact();
    }

    generateWeedingTasks() {
        this.weedingTasks = [];
        
        this.cropData.forEach(crop => {
            const weedGrowthRate = this.calculateWeedGrowthRate(crop);
            const daysSinceLastWeeding = this.calculateDaysSinceLastWeeding(crop);
            const urgency = this.calculateWeedingUrgency(crop, weedGrowthRate, daysSinceLastWeeding);
            
            if (urgency.level !== 'none') {
                const task = {
                    id: `weeding_${crop.id}_${Date.now()}`,
                    cropId: crop.id,
                    cropName: crop.name,
                    location: crop.location,
                    urgency: urgency,
                    weedGrowthRate: weedGrowthRate,
                    daysSinceLastWeeding: daysSinceLastWeeding,
                    recommendedAction: this.getRecommendedAction(urgency, weedGrowthRate),
                    estimatedCost: this.estimateWeedingCost(crop, urgency.recommendedMethod),
                    weatherSuitability: this.checkWeatherSuitability(),
                    scheduledDate: this.getOptimalWeedingDate(),
                    status: 'pending'
                };
                
                this.weedingTasks.push(task);
            }
        });

        // Sort by urgency
        this.weedingTasks.sort((a, b) => {
            const urgencyOrder = { critical: 4, urgent: 3, medium: 2, low: 1, none: 0 };
            return urgencyOrder[b.urgency.level] - urgencyOrder[a.urgency.level];
        });

        this.displayWeedingTasks();
    }

    calculateWeedGrowthRate(crop) {
        const factors = this.weedGrowthFactors;
        let growthRate = 1.0;

        // Temperature factor
        const tempRate = this.getFactorRate(factors.temperature.growthRate, this.weatherData.temperature);
        growthRate *= tempRate;

        // Humidity factor
        const humidityRate = this.getFactorRate(factors.humidity.growthRate, this.weatherData.humidity);
        growthRate *= humidityRate;

        // Rainfall factor
        const rainfallRate = this.getFactorRate(factors.rainfall.growthRate, this.weatherData.rainfall);
        growthRate *= rainfallRate;

        // Soil moisture factor
        const soilMoistureRate = this.getFactorRate(factors.soilMoisture.growthRate, this.weatherData.soilMoisture);
        growthRate *= soilMoistureRate;

        // Sunlight factor
        const sunlightRate = this.getFactorRate(factors.sunlight.growthRate, this.weatherData.sunlightHours);
        growthRate *= sunlightRate;

        // Crop-specific weed pressure
        const weedPressureMultiplier = {
            'Low': 0.7,
            'Medium': 1.0,
            'High': 1.3,
            'Very High': 1.6
        };
        growthRate *= (weedPressureMultiplier[crop.weedPressure] || 1.0);

        return Math.round(growthRate * 100) / 100;
    }

    getFactorRate(factorRates, value) {
        if (value <= 10) return factorRates.low.rate;
        if (value <= 20) return factorRates.moderate.rate;
        if (value <= 30) return factorRates.high.rate;
        return factorRates.veryHigh.rate;
    }

    calculateDaysSinceLastWeeding(crop) {
        const lastWeeding = new Date(crop.lastWeeding);
        const now = new Date();
        return Math.floor((now - lastWeeding) / (1000 * 60 * 60 * 24));
    }

    calculateWeedingUrgency(crop, weedGrowthRate, daysSinceLastWeeding) {
        const thresholds = this.alertThresholds;
        
        let urgencyLevel = 'none';
        let recommendedMethod = 'manual';
        
        // High weed growth rate
        if (weedGrowthRate >= thresholds.weedGrowthRate.critical) {
            urgencyLevel = 'critical';
            recommendedMethod = 'chemical';
        } else if (weedGrowthRate >= thresholds.weedGrowthRate.high) {
            urgencyLevel = 'urgent';
            recommendedMethod = 'chemical';
        } else if (weedGrowthRate >= thresholds.weedGrowthRate.medium) {
            urgencyLevel = 'medium';
            recommendedMethod = 'manual';
        } else if (weedGrowthRate >= thresholds.weedGrowthRate.low) {
            urgencyLevel = 'low';
            recommendedMethod = 'manual';
        }
        
        // Days since last weeding
        if (daysSinceLastWeeding >= thresholds.timeSinceLastWeeding.critical) {
            urgencyLevel = 'critical';
        } else if (daysSinceLastWeeding >= thresholds.timeSinceLastWeeding.urgent && urgencyLevel !== 'critical') {
            urgencyLevel = 'urgent';
        } else if (daysSinceLastWeeding >= thresholds.timeSinceLastWeeding.warning && urgencyLevel === 'none') {
            urgencyLevel = 'medium';
        }
        
        return {
            level: urgencyLevel,
            recommendedMethod: recommendedMethod,
            score: this.calculateUrgencyScore(weedGrowthRate, daysSinceLastWeeding)
        };
    }

    calculateUrgencyScore(weedGrowthRate, daysSinceLastWeeding) {
        const growthScore = weedGrowthRate * 40;
        const timeScore = Math.min(daysSinceLastWeeding * 2, 40);
        const weatherScore = this.weatherData.rainfall > 100 ? 20 : 0;
        
        return Math.min(growthScore + timeScore + weatherScore, 100);
    }

    getRecommendedAction(urgency, weedGrowthRate) {
        if (urgency.level === 'critical') {
            return 'Immediate chemical application required';
        } else if (urgency.level === 'urgent') {
            return 'Chemical application recommended within 24 hours';
        } else if (urgency.level === 'medium') {
            return 'Manual weeding or light chemical treatment';
        } else if (urgency.level === 'low') {
            return 'Manual weeding when weather permits';
        }
        return 'No action required at this time';
    }

    estimateWeedingCost(crop, method) {
        const area = crop.area; // hectares
        let cost = 0;
        
        if (method === 'chemical') {
            const chemical = this.chemicalSuppressionOptions[0]; // Glyphosate
            const applicationRate = parseFloat(chemical.applicationRate.split('-')[1]); // L/ha
            cost = applicationRate * chemical.costPerLiter * area;
        } else {
            // Manual weeding cost (labor)
            cost = 15.00 * 8 * area; // $15/hour * 8 hours/ha
        }
        
        return Math.round(cost * 100) / 100;
    }

    checkWeatherSuitability() {
        const weather = this.weatherData;
        
        if (weather.rainfall > 20) {
            return { suitable: false, reason: 'Rain expected - wait for dry conditions' };
        } else if (weather.windSpeed > 15) {
            return { suitable: false, reason: 'High winds - unsafe for chemical application' };
        } else if (weather.temperature > 32) {
            return { suitable: false, reason: 'High temperature - chemical effectiveness reduced' };
        }
        
        return { suitable: true, reason: 'Weather conditions are optimal for weeding' };
    }

    getOptimalWeedingDate() {
        const forecast = this.weatherData.forecast.next7Days;
        
        for (let i = 0; i < forecast.length; i++) {
            const day = forecast[i];
            if (day.rain < 10 && day.wind < 15 && day.temp < 32) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                return date.toLocaleDateString();
            }
        }
        
        // If no optimal day found, suggest today
        return new Date().toLocaleDateString();
    }

    displayWeedingTasks() {
        const container = document.getElementById('weedingTasksContainer');
        if (!container) return;

        container.innerHTML = '';

        if (this.weedingTasks.length === 0) {
            container.innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle me-2"></i>
                    No urgent weeding tasks required. All crops are in good condition!
                </div>
            `;
            return;
        }

        this.weedingTasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'weeding-task-card mb-3';
            taskCard.innerHTML = `
                <div class="card border-${this.getUrgencyColor(task.urgency.level)}">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h6 class="card-title mb-0">
                                        ${task.cropName} - ${task.location}
                                        <span class="badge bg-${this.getUrgencyColor(task.urgency.level)} ms-2">
                                            ${task.urgency.level.toUpperCase()}
                                        </span>
                                    </h6>
                                    <div class="urgency-score">
                                        <span class="badge bg-secondary">${task.urgency.score}% Urgent</span>
                                    </div>
                                </div>
                                <p class="card-text text-muted">${task.recommendedAction}</p>
                                <div class="task-details">
                                    <div class="row">
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-chart-line me-1"></i>
                                                <strong>Weed Growth:</strong> ${task.weedGrowthRate}x
                                            </small>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-calendar-alt me-1"></i>
                                                <strong>Days Since:</strong> ${task.daysSinceLastWeeding} days
                                            </small>
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-dollar-sign me-1"></i>
                                                <strong>Est. Cost:</strong> $${task.estimatedCost}
                                            </small>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-calendar me-1"></i>
                                                <strong>Schedule:</strong> ${task.scheduledDate}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="weather-suitability mb-2">
                                    <small class="text-${task.weatherSuitability.suitable ? 'success' : 'warning'}">
                                        <i class="fas fa-cloud me-1"></i>
                                        ${task.weatherSuitability.suitable ? 'Weather OK' : 'Weather Issue'}
                                    </small>
                                    <br>
                                    <small class="text-muted">${task.weatherSuitability.reason}</small>
                                </div>
                                <div class="task-actions">
                                    <button class="btn btn-${this.getUrgencyColor(task.urgency.level)} btn-sm w-100 mb-1" 
                                            onclick="intelligentWeeding.executeWeedingTask('${task.id}')">
                                        <i class="fas fa-play me-1"></i>Execute Task
                                    </button>
                                    <button class="btn btn-outline-info btn-sm w-100 mb-1" 
                                            onclick="intelligentWeeding.viewTaskDetails('${task.id}')">
                                        <i class="fas fa-info-circle me-1"></i>Details
                                    </button>
                                    <button class="btn btn-outline-secondary btn-sm w-100" 
                                            onclick="intelligentWeeding.rescheduleTask('${task.id}')">
                                        <i class="fas fa-clock me-1"></i>Reschedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(taskCard);
        });
    }

    getUrgencyColor(urgencyLevel) {
        const colors = {
            'critical': 'danger',
            'urgent': 'warning',
            'medium': 'info',
            'low': 'success',
            'none': 'secondary'
        };
        return colors[urgencyLevel] || 'secondary';
    }

    populateWeatherImpact() {
        const container = document.getElementById('weatherImpactContainer');
        if (!container) return;

        const weedGrowthRate = this.calculateOverallWeedGrowthRate();
        
        container.innerHTML = `
            <div class="weather-impact-item">
                <h6 class="text-${this.getWeedGrowthBadgeColor()}">
                    <i class="fas fa-seedling me-2"></i>Overall Weed Growth Rate
                </h6>
                <div class="progress mb-2">
                    <div class="progress-bar bg-${this.getWeedGrowthBadgeColor()}" 
                         style="width: ${Math.min(weedGrowthRate * 50, 100)}%">
                        ${weedGrowthRate.toFixed(2)}x
                    </div>
                </div>
            </div>
            
            <div class="weather-impact-item">
                <h6><i class="fas fa-thermometer-half me-2"></i>Temperature Impact</h6>
                <small class="text-muted">
                    ${this.weatherData.temperature}°C - 
                    ${this.weatherData.temperature >= 25 ? 'High' : 'Moderate'} weed growth
                </small>
            </div>
            
            <div class="weather-impact-item">
                <h6><i class="fas fa-tint me-2"></i>Moisture Impact</h6>
                <small class="text-muted">
                    Humidity: ${this.weatherData.humidity}%<br>
                    Rainfall: ${this.weatherData.rainfall}mm<br>
                    ${this.weatherData.humidity > 70 ? 'High' : 'Moderate'} moisture favors weeds
                </small>
            </div>
            
            <div class="weather-impact-item">
                <h6><i class="fas fa-sun me-2"></i>Sunlight Impact</h6>
                <small class="text-muted">
                    ${this.weatherData.sunlightHours} hours/day - 
                    ${this.weatherData.sunlightHours >= 8 ? 'Optimal' : 'Limited'} growth
                </small>
            </div>
            
            <div class="weather-impact-item">
                <h6><i class="fas fa-wind me-2"></i>Wind Conditions</h6>
                <small class="text-muted">
                    ${this.weatherData.windSpeed} km/h - 
                    ${this.weatherData.windSpeed > 15 ? 'Unsuitable' : 'Suitable'} for chemical application
                </small>
            </div>
        `;
    }

    calculateOverallWeedGrowthRate() {
        let totalGrowthRate = 0;
        let cropCount = 0;
        
        this.cropData.forEach(crop => {
            totalGrowthRate += this.calculateWeedGrowthRate(crop);
            cropCount++;
        });
        
        return cropCount > 0 ? totalGrowthRate / cropCount : 0;
    }

    getWeedGrowthLevel() {
        const rate = this.calculateOverallWeedGrowthRate();
        if (rate >= 1.2) return 'Very High';
        if (rate >= 1.0) return 'High';
        if (rate >= 0.8) return 'Medium';
        if (rate >= 0.5) return 'Low';
        return 'Very Low';
    }

    getWeedGrowthBadgeColor() {
        const level = this.getWeedGrowthLevel();
        const colors = {
            'Very High': 'danger',
            'High': 'warning',
            'Medium': 'info',
            'Low': 'success',
            'Very Low': 'secondary'
        };
        return colors[level] || 'secondary';
    }

    setupWeedingAlerts() {
        // Set up automatic alerts based on weed growth and weather conditions
        const alertInterval = setInterval(() => {
            this.checkForAlerts();
        }, 60000); // Check every minute
        
        // Initial alert check
        this.checkForAlerts();
    }

    checkForAlerts() {
        const urgentTasks = this.weedingTasks.filter(task => task.urgency.level === 'critical' || task.urgency.level === 'urgent');
        
        if (urgentTasks.length > 0) {
            this.showWeedingAlert(urgentTasks);
        }
    }

    showWeedingAlert(tasks) {
        // Create or update alert notification
        let alertElement = document.getElementById('weedingAlert');
        
        if (!alertElement) {
            alertElement = document.createElement('div');
            alertElement.id = 'weedingAlert';
            alertElement.className = 'alert alert-danger alert-dismissible fade show position-fixed';
            alertElement.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
            
            if (document.body) {
                document.body.appendChild(alertElement);
            } else {
                console.warn('Document body not available for weeding alert');
                return;
            }
        }
        
        alertElement.innerHTML = `
            <h6><i class="fas fa-exclamation-triangle me-2"></i>Urgent Weeding Required!</h6>
            <p class="mb-2">${tasks.length} crop${tasks.length > 1 ? 's' : ''} require immediate attention:</p>
            <ul class="mb-2">
                ${tasks.slice(0, 3).map(task => `<li>${task.cropName} - ${task.location}</li>`).join('')}
            </ul>
            <button type="button" class="btn btn-sm btn-danger" onclick="intelligentWeeding.viewUrgentTasks()">
                View Tasks
            </button>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
    }

    // Task execution and management methods
    executeWeedingTask(taskId) {
        const task = this.weedingTasks.find(t => t.id === taskId);
        if (!task) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-play me-2"></i>Execute Weeding Task
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Task: ${task.cropName} - ${task.location}</h6>
                        <p><strong>Action:</strong> ${task.recommendedAction}</p>
                        <p><strong>Estimated Cost:</strong> $${task.estimatedCost}</p>
                        <p><strong>Weather:</strong> ${task.weatherSuitability.reason}</p>
                        
                        <div class="mt-3">
                            <label class="form-label">Select Method:</label>
                            <select class="form-select" id="weedingMethod">
                                <option value="manual">Manual Weeding</option>
                                <option value="chemical">Chemical Application</option>
                            </select>
                        </div>
                        
                        <div class="mt-3" id="chemicalOptions" style="display: none;">
                            <label class="form-label">Select Chemical:</label>
                            <select class="form-select" id="chemicalSelect">
                                ${this.chemicalSuppressionOptions.map(chemical => 
                                    `<option value="${chemical.name}">${chemical.name} - $${chemical.costPerLiter}/L</option>`
                                ).join('')}
                            </select>
                        </div>
                        
                        <div class="mt-3">
                            <label class="form-label">Notes:</label>
                            <textarea class="form-control" id="taskNotes" rows="3" placeholder="Add any notes about this weeding task..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" onclick="intelligentWeeding.confirmTaskExecution('${taskId}')">
                            <i class="fas fa-check me-2"></i>Confirm Execution
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Show chemical options when chemical method is selected
        modal.querySelector('#weedingMethod').addEventListener('change', function() {
            const chemicalOptions = modal.querySelector('#chemicalOptions');
            if (this.value === 'chemical') {
                chemicalOptions.style.display = 'block';
            } else {
                chemicalOptions.style.display = 'none';
            }
        });
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    confirmTaskExecution(taskId) {
        const task = this.weedingTasks.find(t => t.id === taskId);
        const method = document.getElementById('weedingMethod').value;
        const chemical = document.getElementById('chemicalSelect')?.value;
        const notes = document.getElementById('notes').value;

        // Update task status
        task.status = 'completed';
        task.executionMethod = method;
        task.executionChemical = chemical;
        task.executionNotes = notes;
        task.completedDate = new Date().toISOString();

        // Update crop data
        const crop = this.cropData.find(c => c.id === task.cropId);
        if (crop) {
            crop.lastWeeding = new Date().toISOString();
            crop.weedPressure = method === 'chemical' ? 'Low' : 'Medium';
        }

        // Save data
        this.saveData();
        
        // Close modal
        const modal = document.querySelector('.modal');
        if (modal) {
            const bsModal = bootstrap.Modal.getInstance(modal);
            bsModal.hide();
        }

        // Refresh display
        this.generateWeedingTasks();
        
        // Show professional completion notification
        this.showTaskCompletionNotification(task, method);
    }

    showTaskCompletionNotification(task, method) {
        // Create professional completion modal
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-success text-white border-0">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <i class="fas fa-check-circle fa-2x"></i>
                            </div>
                            <div>
                                <h4 class="modal-title mb-0 fw-bold">Task Completed Successfully!</h4>
                                <small class="opacity-75">Weeding task has been completed</small>
                            </div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="completion-summary">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="completion-item mb-3">
                                        <h6 class="text-primary mb-2">
                                            <i class="fas fa-seedling me-2"></i>Task Details
                                        </h6>
                                        <div class="info-item">
                                            <strong>Crop:</strong> ${task.cropName}
                                        </div>
                                        <div class="info-item">
                                            <strong>Location:</strong> ${task.location}
                                        </div>
                                        <div class="info-item">
                                            <strong>Method:</strong> ${method}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="completion-item mb-3">
                                        <h6 class="text-success mb-2">
                                            <i class="fas fa-dollar-sign me-2"></i>Cost Summary
                                        </h6>
                                        <div class="info-item">
                                            <strong>Total Cost:</strong> 
                                            <span class="text-success fw-bold fs-5">$${task.estimatedCost}</span>
                                        </div>
                                        <div class="info-item">
                                            <strong>Status:</strong> 
                                            <span class="badge bg-success">Completed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="completion-actions mt-4 pt-3 border-top">
                                <div class="alert alert-success mb-3">
                                    <i class="fas fa-info-circle me-2"></i>
                                    <strong>Task has been marked as completed and crop data updated.</strong>
                                </div>
                                
                                <div class="d-flex gap-2 flex-wrap justify-content-center">
                                    <button class="btn btn-primary" onclick="intelligentWeeding.showWeedingAnalytics()">
                                        <i class="fas fa-chart-bar me-1"></i>View Analytics
                                    </button>
                                    <button class="btn btn-outline-success" onclick="intelligentWeeding.generateWeedingTasks()">
                                        <i class="fas fa-refresh me-1"></i>Refresh Tasks
                                    </button>
                                    <button class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                        <i class="fas fa-times me-1"></i>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add custom styles
        const style = document.createElement('style');
        style.textContent = `
            .completion-item {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 1rem;
                border-left: 4px solid #28a745;
            }
            .info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.25rem 0;
                border-bottom: 1px solid #e9ecef;
            }
            .info-item:last-child {
                border-bottom: none;
            }
            .completion-actions .btn {
                min-width: 140px;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }

    viewTaskDetails(taskId) {
        const task = this.weedingTasks.find(t => t.id === taskId);
        if (!task) return;

        // Create professional task details modal
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-primary text-white border-0">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <i class="fas fa-clipboard-list fa-2x"></i>
                            </div>
                            <div>
                                <h4 class="modal-title mb-0 fw-bold">Task Details</h4>
                                <small class="opacity-75">${task.cropName} - ${task.location}</small>
                            </div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="info-card mb-3">
                                    <h6 class="text-primary mb-3">
                                        <i class="fas fa-info-circle me-2"></i>Basic Information
                                    </h6>
                                    <div class="info-item mb-2">
                                        <strong>Crop:</strong> ${task.cropName}
                                    </div>
                                    <div class="info-item mb-2">
                                        <strong>Location:</strong> ${task.location}
                                    </div>
                                    <div class="info-item mb-2">
                                        <strong>Scheduled Date:</strong> ${task.scheduledDate}
                                    </div>
                                    <div class="info-item mb-2">
                                        <strong>Days Since Last Weeding:</strong> ${task.daysSinceLastWeeding}
                                    </div>
                                </div>
                                
                                <div class="info-card mb-3">
                                    <h6 class="text-warning mb-3">
                                        <i class="fas fa-exclamation-triangle me-2"></i>Urgency & Priority
                                    </h6>
                                    <div class="d-flex align-items-center mb-2">
                                        <span class="badge bg-${this.getUrgencyColor(task.urgency.level)} px-3 py-2 me-2">
                                            ${task.urgency.level.toUpperCase()}
                                        </span>
                                        <span class="text-muted">Priority Level</span>
                                    </div>
                                    <div class="info-item mb-2">
                                        <strong>Weed Growth Rate:</strong> ${task.weedGrowthRate}x normal
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="info-card mb-3">
                                    <h6 class="text-success mb-3">
                                        <i class="fas fa-tools me-2"></i>Action Required
                                    </h6>
                                    <div class="info-item mb-2">
                                        <strong>Recommended Action:</strong><br>
                                        <span class="text-muted">${task.recommendedAction}</span>
                                    </div>
                                    <div class="info-item mb-2">
                                        <strong>Estimated Cost:</strong> 
                                        <span class="text-success fw-bold">$${task.estimatedCost}</span>
                                    </div>
                                </div>
                                
                                <div class="info-card mb-3">
                                    <h6 class="text-info mb-3">
                                        <i class="fas fa-cloud-sun me-2"></i>Weather Conditions
                                    </h6>
                                    <div class="info-item mb-2">
                                        <strong>Suitability:</strong> 
                                        <span class="badge bg-${task.weatherSuitability.suitable ? 'success' : 'warning'}">
                                            ${task.weatherSuitability.suitable ? 'Suitable' : 'Not Ideal'}
                                        </span>
                                    </div>
                                    <div class="info-item mb-2">
                                        <strong>Reason:</strong><br>
                                        <span class="text-muted small">${task.weatherSuitability.reason}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="action-buttons mt-4 pt-3 border-top">
                            <div class="d-flex gap-2 flex-wrap">
                                <button class="btn btn-success" onclick="intelligentWeeding.executeTask('${task.id}')">
                                    <i class="fas fa-play me-1"></i>Execute Task
                                </button>
                                <button class="btn btn-warning" onclick="intelligentWeeding.rescheduleTask('${task.id}')">
                                    <i class="fas fa-calendar-alt me-1"></i>Reschedule
                                </button>
                                <button class="btn btn-info" onclick="intelligentWeeding.showChemicalOptions()">
                                    <i class="fas fa-flask me-1"></i>Chemical Options
                                </button>
                                <button class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                    <i class="fas fa-times me-1"></i>Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add custom styles
        const style = document.createElement('style');
        style.textContent = `
            .info-card {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 1rem;
                border-left: 4px solid #007bff;
            }
            .info-item {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            .action-buttons .btn {
                min-width: 120px;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }

    rescheduleTask(taskId) {
        const task = this.weedingTasks.find(t => t.id === taskId);
        if (!task) return;

        const newDate = prompt('Enter new date for weeding task (MM/DD/YYYY):', task.scheduledDate);
        if (newDate && new Date(newDate) > new Date()) {
            task.scheduledDate = newDate;
            this.displayWeedingTasks();
            alert('Task rescheduled successfully!');
        }
    }

    viewUrgentTasks() {
        const urgentTasks = this.weedingTasks.filter(task => task.urgency.level === 'critical' || task.urgency.level === 'urgent');
        
        // Create professional modal
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.setAttribute('data-bs-backdrop', 'static');
        modal.setAttribute('data-bs-keyboard', 'false');
        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-gradient-danger text-white border-0">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <i class="fas fa-exclamation-triangle fa-2x"></i>
                            </div>
                            <div>
                                <h4 class="modal-title mb-0 fw-bold">URGENT WEEDING TASKS</h4>
                                <small class="opacity-75">Immediate attention required</small>
                            </div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-0">
                        <div class="urgent-tasks-container" style="max-height: 500px; overflow-y: auto;">
                            ${urgentTasks.map((task, index) => `
                                <div class="urgent-task-item p-4 border-bottom">
                                    <div class="row align-items-center">
                                        <div class="col-md-8">
                                            <div class="d-flex align-items-center mb-2">
                                                <div class="task-number me-3">
                                                    <span class="badge bg-primary rounded-circle">${index + 1}</span>
                                                </div>
                                                <div>
                                                    <h6 class="mb-1 fw-bold text-dark">${task.cropName} - ${task.location}</h6>
                                                    <div class="d-flex align-items-center gap-3">
                                                        <span class="badge bg-${this.getUrgencyColor(task.urgency.level)} px-3 py-2">
                                                            <i class="fas fa-${task.urgency.level === 'critical' ? 'exclamation-triangle' : 'clock'} me-1"></i>
                                                            ${task.urgency.level.toUpperCase()}
                                                        </span>
                                                        <small class="text-muted">
                                                            <i class="fas fa-calendar me-1"></i>
                                                            ${task.scheduledDate}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="task-details">
                                                <p class="mb-2 text-dark">
                                                    <i class="fas fa-tools me-2 text-primary"></i>
                                                    <strong>Action Required:</strong> ${task.recommendedAction}
                                                </p>
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <small class="text-muted">
                                                            <i class="fas fa-dollar-sign me-1"></i>
                                                            <strong>Cost:</strong> $${task.estimatedCost}
                                                        </small>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <small class="text-muted">
                                                            <i class="fas fa-leaf me-1"></i>
                                                            <strong>Weed Growth:</strong> ${task.weedGrowthRate}x
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 text-end">
                                            <div class="d-grid gap-2">
                                                <button class="btn btn-outline-primary btn-sm" onclick="intelligentWeeding.viewTaskDetails('${task.id}')">
                                                    <i class="fas fa-info-circle me-1"></i>Details
                                                </button>
                                                <button class="btn btn-outline-success btn-sm" onclick="intelligentWeeding.executeTask('${task.id}')">
                                                    <i class="fas fa-play me-1"></i>Execute
                                                </button>
                                                <button class="btn btn-outline-warning btn-sm" onclick="intelligentWeeding.rescheduleTask('${task.id}')">
                                                    <i class="fas fa-calendar-alt me-1"></i>Reschedule
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer bg-light border-0">
                        <div class="d-flex justify-content-between w-100">
                            <div>
                                <small class="text-muted">
                                    <i class="fas fa-info-circle me-1"></i>
                                    ${urgentTasks.length} urgent task${urgentTasks.length > 1 ? 's' : ''} requiring immediate attention
                                </small>
                            </div>
                            <div>
                                <button type="button" class="btn btn-outline-secondary me-2" data-bs-dismiss="modal">
                                    <i class="fas fa-times me-1"></i>Close
                                </button>
                                <button type="button" class="btn btn-primary" onclick="intelligentWeeding.showWeedingSchedule()">
                                    <i class="fas fa-calendar me-1"></i>View Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add custom styles
        const style = document.createElement('style');
        style.textContent = `
            .urgent-task-item {
                transition: all 0.3s ease;
            }
            .urgent-task-item:hover {
                background-color: #f8f9fa;
                transform: translateX(5px);
            }
            .task-number .badge {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
            }
            .bg-gradient-danger {
                background: linear-gradient(135deg, #dc3545, #c82333) !important;
            }
            .urgent-tasks-container::-webkit-scrollbar {
                width: 6px;
            }
            .urgent-tasks-container::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            .urgent-tasks-container::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 3px;
            }
            .urgent-tasks-container::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }

    showWeedingSchedule() {
        // Create professional schedule modal
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-info text-white border-0">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <i class="fas fa-calendar-alt fa-2x"></i>
                            </div>
                            <div>
                                <h4 class="modal-title mb-0 fw-bold">Weeding Schedule</h4>
                                <small class="opacity-75">Calendar view of all scheduled tasks</small>
                            </div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="schedule-features">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="feature-card mb-3">
                                        <h6 class="text-primary mb-3">
                                            <i class="fas fa-calendar me-2"></i>Calendar View
                                        </h6>
                                        <p class="text-muted">Interactive calendar showing all scheduled weeding tasks with color-coded urgency levels.</p>
                                    </div>
                                    
                                    <div class="feature-card mb-3">
                                        <h6 class="text-success mb-3">
                                            <i class="fas fa-cloud-sun me-2"></i>Weather Integration
                                        </h6>
                                        <p class="text-muted">Real-time weather data integration to suggest optimal timing windows for weeding activities.</p>
                                    </div>
                                    
                                    <div class="feature-card mb-3">
                                        <h6 class="text-warning mb-3">
                                            <i class="fas fa-clock me-2"></i>Optimal Timing
                                        </h6>
                                        <p class="text-muted">AI-powered suggestions for the best times to perform weeding based on weather and crop conditions.</p>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="feature-card mb-3">
                                        <h6 class="text-info mb-3">
                                            <i class="fas fa-dollar-sign me-2"></i>Cost Tracking
                                        </h6>
                                        <p class="text-muted">Track costs for each weeding method and generate budget reports for better financial planning.</p>
                                    </div>
                                    
                                    <div class="feature-card mb-3">
                                        <h6 class="text-secondary mb-3">
                                            <i class="fas fa-chart-line me-2"></i>Progress Monitoring
                                        </h6>
                                        <p class="text-muted">Monitor weeding progress across all fields with completion status and performance metrics.</p>
                                    </div>
                                    
                                    <div class="feature-card mb-3">
                                        <h6 class="text-danger mb-3">
                                            <i class="fas fa-bell me-2"></i>Smart Notifications
                                        </h6>
                                        <p class="text-muted">Get timely reminders and alerts for upcoming weeding tasks and weather changes.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="coming-soon mt-4 pt-3 border-top text-center">
                                <div class="alert alert-info">
                                    <i class="fas fa-info-circle me-2"></i>
                                    <strong>Coming Soon!</strong> This feature is currently in development and will be available in the next update.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-light border-0">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-1"></i>Close
                        </button>
                        <button type="button" class="btn btn-primary" onclick="intelligentWeeding.showWeedingAnalytics()">
                            <i class="fas fa-chart-bar me-1"></i>View Analytics
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add custom styles
        const style = document.createElement('style');
        style.textContent = `
            .feature-card {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 1.5rem;
                border-left: 4px solid #17a2b8;
                transition: transform 0.2s ease;
            }
            .feature-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }

    showChemicalOptions() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-flask me-2"></i>Chemical Suppression Options
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            ${this.chemicalSuppressionOptions.map(chemical => `
                                <div class="col-md-6 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <h6 class="card-title">${chemical.name}</h6>
                                            <p class="card-text">${chemical.description}</p>
                                            <ul class="list-unstyled">
                                                <li><strong>Type:</strong> ${chemical.type}</li>
                                                <li><strong>Effectiveness:</strong> ${chemical.effectiveness}%</li>
                                                <li><strong>Safety:</strong> ${chemical.safetyLevel}</li>
                                                <li><strong>Cost:</strong> $${chemical.costPerLiter}/L</li>
                                                <li><strong>Rate:</strong> ${chemical.applicationRate}</li>
                                                <li><strong>Environmental:</strong> ${chemical.environmentalImpact}</li>
                                            </ul>
                                            <button class="btn btn-sm btn-outline-primary" onclick="intelligentWeeding.selectChemical('${chemical.name}')">
                                                Select This Chemical
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

    selectChemical(chemicalName) {
        const chemical = this.chemicalSuppressionOptions.find(c => c.name === chemicalName);
        if (!chemical) return;

        this.showChemicalMixtureModal(chemical);
    }

    showChemicalMixtureModal(chemical) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-flask me-2"></i>${chemical.name} - Knapsack Sprayer Mixture
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <h6>Chemical Information</h6>
                                <ul class="list-unstyled">
                                    <li><strong>Type:</strong> ${chemical.type}</li>
                                    <li><strong>Effectiveness:</strong> ${chemical.effectiveness}%</li>
                                    <li><strong>Safety Level:</strong> ${chemical.safetyLevel}</li>
                                    <li><strong>Cost:</strong> $${chemical.costPerLiter}/L</li>
                                    <li><strong>Environmental Impact:</strong> ${chemical.environmentalImpact}</li>
                                    <li><strong>Pre-Harvest Interval:</strong> ${chemical.preHarvestInterval} days</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <h6>Weather Restrictions</h6>
                                <ul>
                                    ${chemical.weatherRestrictions.map(restriction => `<li>${restriction}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="knapsack-mixtures">
                            <h6 class="mb-3">Knapsack Sprayer Mixture Instructions</h6>
                            <div class="row">
                                ${Object.entries(chemical.knapsackMixtures || {}).map(([size, mixture]) => `
                                    <div class="col-md-6 mb-4">
                                        <div class="card">
                                            <div class="card-header bg-primary text-white">
                                                <h6 class="mb-0">
                                                    <i class="fas fa-spray-can me-2"></i>${size} Knapsack Sprayer
                                                </h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="mixture-details mb-3">
                                                    <div class="row text-center">
                                                        <div class="col-6">
                                                            <div class="mixture-value">${mixture.chemicalAmount}ml</div>
                                                            <div class="mixture-label">Chemical</div>
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="mixture-value">${(mixture.waterAmount/1000).toFixed(1)}L</div>
                                                            <div class="mixture-label">Water</div>
                                                        </div>
                                                    </div>
                                                    <div class="text-center mt-2">
                                                        <span class="badge bg-info">${mixture.concentration} Solution</span>
                                                    </div>
                                                </div>
                                                
                                                <h6 class="mt-3">Step-by-Step Instructions:</h6>
                                                <ol class="mixture-instructions">
                                                    ${mixture.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                                                </ol>
                                                
                                                <div class="application-details mt-3">
                                                    <div class="row text-center">
                                                        <div class="col-4">
                                                            <div class="detail-value">${mixture.coverageArea}ha</div>
                                                            <div class="detail-label">Coverage</div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="detail-value">${mixture.sprayTime}min</div>
                                                            <div class="detail-label">Spray Time</div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="detail-value">$${(chemical.costPerLiter * mixture.chemicalAmount / 1000).toFixed(2)}</div>
                                                            <div class="detail-label">Cost/Tank</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        ${chemical.safetyGuidelines ? `
                            <div class="safety-guidelines mt-4">
                                <h6 class="text-danger">
                                    <i class="fas fa-exclamation-triangle me-2"></i>Safety Guidelines
                                </h6>
                                <div class="alert alert-warning">
                                    <ul class="mb-0">
                                        ${chemical.safetyGuidelines.map(guideline => `<li>${guideline}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning" onclick="intelligentWeeding.printMixtureInstructions('${chemical.name}')">
                            <i class="fas fa-print me-2"></i>Print Instructions
                        </button>
                        <button type="button" class="btn btn-primary" onclick="intelligentWeeding.startChemicalApplication('${chemical.name}')">
                            <i class="fas fa-play me-2"></i>Start Application
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

    printMixtureInstructions(chemicalName) {
        const chemical = this.chemicalSuppressionOptions.find(c => c.name === chemicalName);
        if (!chemical) return;

        alert(`🖨️ Print Instructions for ${chemicalName}\n\nDetailed mixture instructions would be printed including:\n\n• Chemical and water quantities for each sprayer size\n• Step-by-step mixing instructions\n• Application rates and coverage areas\n• Safety guidelines\n• Cost calculations per tank\n\nThis would generate a professional PDF for field use.`);
    }

    startChemicalApplication(chemicalName) {
        const chemical = this.chemicalSuppressionOptions.find(c => c.name === chemicalName);
        if (!chemical) return;

        alert(`🚀 Starting Chemical Application\n\nChemical: ${chemical.name}\nType: ${chemical.type}\n\nApplication Guidelines:\n• Ensure weather conditions are suitable\n• Wear appropriate protective equipment\n• Follow mixture instructions exactly\n• Apply at recommended rates\n• Monitor for any adverse effects\n\nPre-Harvest Interval: ${chemical.preHarvestInterval} days\n\nApplication started and logged in the system!`);
    }

    showChemicalDetails(chemicalName) {
        const chemical = this.chemicalSuppressionOptions.find(c => c.name === chemicalName);
        if (!chemical || !chemical.chemicalDetails) return;

        this.displayChemicalDetailsModal(chemical);
    }

    displayChemicalDetailsModal(chemical) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-flask me-2"></i>Chemical Details - ${chemical.name}
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
                                            <tr><td><strong>Chemical Name:</strong></td><td>${chemical.chemicalDetails.chemicalName}</td></tr>
                                            <tr><td><strong>Molecular Formula:</strong></td><td>${chemical.chemicalDetails.molecularFormula}</td></tr>
                                            <tr><td><strong>Molecular Weight:</strong></td><td>${chemical.chemicalDetails.molecularWeight}</td></tr>
                                            <tr><td><strong>CAS Number:</strong></td><td>${chemical.chemicalDetails.casNumber}</td></tr>
                                            <tr><td><strong>Physical State:</strong></td><td>${chemical.chemicalDetails.physicalState}</td></tr>
                                            <tr><td><strong>Color:</strong></td><td>${chemical.chemicalDetails.color}</td></tr>
                                            <tr><td><strong>Odor:</strong></td><td>${chemical.chemicalDetails.odor}</td></tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-success text-white">
                                        <h6 class="mb-0">Physical Properties</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Solubility:</strong></td><td>${chemical.chemicalDetails.solubility}</td></tr>
                                            <tr><td><strong>pH Level:</strong></td><td>${chemical.chemicalDetails.phLevel}</td></tr>
                                            <tr><td><strong>Density:</strong></td><td>${chemical.chemicalDetails.density}</td></tr>
                                            <tr><td><strong>Boiling Point:</strong></td><td>${chemical.chemicalDetails.boilingPoint}</td></tr>
                                            <tr><td><strong>Melting Point:</strong></td><td>${chemical.chemicalDetails.meltingPoint}</td></tr>
                                            <tr><td><strong>Vapor Pressure:</strong></td><td>${chemical.chemicalDetails.vaporPressure}</td></tr>
                                            <tr><td><strong>Half-Life:</strong></td><td>${chemical.chemicalDetails.halfLife}</td></tr>
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
                                        <p><strong>Mode of Action:</strong> ${chemical.chemicalDetails.modeOfAction}</p>
                                        
                                        <h6>Target Weeds:</h6>
                                        <ul class="list-unstyled">
                                            ${chemical.chemicalDetails.targetWeeds.map(weed => `<li>• ${weed}</li>`).join('')}
                                        </ul>

                                        <h6>Resistant Weeds:</h6>
                                        <ul class="list-unstyled">
                                            ${chemical.chemicalDetails.resistantWeeds.map(weed => `<li>• ${weed}</li>`).join('')}
                                        </ul>

                                        <h6>Application Timing:</h6>
                                        <ul class="list-unstyled">
                                            ${chemical.chemicalDetails.applicationTiming.map(timing => `<li>• ${timing}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-danger text-white">
                                        <h6 class="mb-0">Toxicity Information</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Acute Oral:</strong></td><td>${chemical.chemicalDetails.toxicity.acuteOral}</td></tr>
                                            <tr><td><strong>Acute Dermal:</strong></td><td>${chemical.chemicalDetails.toxicity.acuteDermal}</td></tr>
                                            <tr><td><strong>Acute Inhalation:</strong></td><td>${chemical.chemicalDetails.toxicity.acuteInhalation}</td></tr>
                                            <tr><td><strong>Eye Irritation:</strong></td><td>${chemical.chemicalDetails.toxicity.eyeIrritation}</td></tr>
                                            <tr><td><strong>Skin Irritation:</strong></td><td>${chemical.chemicalDetails.toxicity.skinIrritation}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-secondary text-white">
                                        <h6 class="mb-0">Soil Factors</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>pH Optimal:</strong></td><td>${chemical.chemicalDetails.soilFactors.phOptimal}</td></tr>
                                            <tr><td><strong>Organic Matter:</strong></td><td>${chemical.chemicalDetails.soilFactors.organicMatter}</td></tr>
                                            <tr><td><strong>Clay Content:</strong></td><td>${chemical.chemicalDetails.soilFactors.clayContent}</td></tr>
                                            <tr><td><strong>Moisture:</strong></td><td>${chemical.chemicalDetails.soilFactors.moisture}</td></tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-dark text-white">
                                        <h6 class="mb-0">Environmental Fate</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Soil Binding:</strong></td><td>${chemical.chemicalDetails.environmentalFate.soilBinding}</td></tr>
                                            <tr><td><strong>Leaching:</strong></td><td>${chemical.chemicalDetails.environmentalFate.leaching}</td></tr>
                                            <tr><td><strong>Runoff:</strong></td><td>${chemical.chemicalDetails.environmentalFate.runoff}</td></tr>
                                            <tr><td><strong>Volatilization:</strong></td><td>${chemical.chemicalDetails.environmentalFate.volatilization}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-info text-white">
                                        <h6 class="mb-0">Ecotoxicity</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Fish:</strong></td><td>${chemical.chemicalDetails.ecotoxicity.fish}</td></tr>
                                            <tr><td><strong>Birds:</strong></td><td>${chemical.chemicalDetails.ecotoxicity.birds}</td></tr>
                                            <tr><td><strong>Bees:</strong></td><td>${chemical.chemicalDetails.ecotoxicity.bees}</td></tr>
                                            <tr><td><strong>Earthworms:</strong></td><td>${chemical.chemicalDetails.ecotoxicity.earthworms}</td></tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-primary text-white">
                                        <h6 class="mb-0">Regulatory Status</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>EPA Registration:</strong></td><td>${chemical.chemicalDetails.regulatoryStatus.epaRegistration}</td></tr>
                                            <tr><td><strong>Re-Entry Interval:</strong></td><td>${chemical.chemicalDetails.regulatoryStatus.reEntryInterval}</td></tr>
                                            <tr><td><strong>Worker Protection:</strong></td><td>${chemical.chemicalDetails.regulatoryStatus.workerProtectionStandard}</td></tr>
                                            <tr><td><strong>Restricted Use:</strong></td><td>${chemical.chemicalDetails.regulatoryStatus.restrictedUse}</td></tr>
                                            <tr><td><strong>Export Tolerance:</strong></td><td>${chemical.chemicalDetails.regulatoryStatus.exportTolerance}</td></tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-warning text-dark">
                                        <h6 class="mb-0">Storage Requirements</h6>
                                    </div>
                                    <div class="card-body">
                                        <ul class="mb-0">
                                            ${chemical.chemicalDetails.storageRequirements.map(req => `<li>${req}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-success text-white">
                                        <h6 class="mb-0">Resistance Management</h6>
                                    </div>
                                    <div class="card-body">
                                        <ul class="mb-0">
                                            ${chemical.chemicalDetails.resistanceManagement.map(strategy => `<li>${strategy}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-success text-white">
                                        <h6 class="mb-0">Compatible Products</h6>
                                    </div>
                                    <div class="card-body">
                                        <ul class="mb-0">
                                            ${chemical.chemicalDetails.compatibility.compatible.map(product => `<li>• ${product}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-danger text-white">
                                        <h6 class="mb-0">Incompatible Products</h6>
                                    </div>
                                    <div class="card-body">
                                        <ul class="mb-0">
                                            ${chemical.chemicalDetails.compatibility.incompatible.map(product => `<li>• ${product}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Additional Detailed Breakdown Sections -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-info text-white">
                                        <h6 class="mb-0">Application Guidelines</h6>
                                    </div>
                                    <div class="card-body">
                                        <h6>Weather Conditions:</h6>
                                        <ul class="mb-3">
                                            ${chemical.weatherRestrictions.map(restriction => `<li>• ${restriction}</li>`).join('')}
                                        </ul>
                                        
                                        <h6>Application Rate:</h6>
                                        <p class="mb-2"><strong>Standard Rate:</strong> ${chemical.applicationRate}</p>
                                        <p class="mb-2"><strong>Cost per Liter:</strong> $${chemical.costPerLiter}</p>
                                        <p class="mb-2"><strong>Environmental Impact:</strong> ${chemical.environmentalImpact}</p>
                                        
                                        <h6>Pre-Harvest Interval:</h6>
                                        <p class="mb-0"><strong>Days:</strong> ${chemical.preHarvestInterval} days</p>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-warning text-dark">
                                        <h6 class="mb-0">Safety Equipment Required</h6>
                                    </div>
                                    <div class="card-body">
                                        <h6>Personal Protective Equipment:</h6>
                                        <ul class="mb-3">
                                            ${chemical.safetyGuidelines.map(guideline => `<li>• ${guideline}</li>`).join('')}
                                        </ul>
                                        
                                        <h6>Emergency Procedures:</h6>
                                        <ul class="mb-0">
                                            <li>• Eye Contact: Flush with water for 15 minutes</li>
                                            <li>• Skin Contact: Wash with soap and water</li>
                                            <li>• Inhalation: Move to fresh air immediately</li>
                                            <li>• Ingestion: Do not induce vomiting, seek medical help</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card mb-3">
                                    <div class="card-header bg-primary text-white">
                                        <h6 class="mb-0">Knapsack Sprayer Mixtures</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6>16L Sprayer:</h6>
                                                <ul class="small">
                                                    <li><strong>Concentration:</strong> ${chemical.knapsackMixtures['16L'].concentration}</li>
                                                    <li><strong>Chemical Amount:</strong> ${chemical.knapsackMixtures['16L'].chemicalAmount}ml</li>
                                                    <li><strong>Water Amount:</strong> ${chemical.knapsackMixtures['16L'].waterAmount}ml</li>
                                                    <li><strong>Coverage:</strong> ${chemical.knapsackMixtures['16L'].coverageArea}ha</li>
                                                    <li><strong>Spray Time:</strong> ${chemical.knapsackMixtures['16L'].sprayTime} minutes</li>
                                                </ul>
                                            </div>
                                            <div class="col-6">
                                                <h6>20L Sprayer:</h6>
                                                <ul class="small">
                                                    <li><strong>Concentration:</strong> ${chemical.knapsackMixtures['20L'].concentration}</li>
                                                    <li><strong>Chemical Amount:</strong> ${chemical.knapsackMixtures['20L'].chemicalAmount}ml</li>
                                                    <li><strong>Water Amount:</strong> ${chemical.knapsackMixtures['20L'].waterAmount}ml</li>
                                                    <li><strong>Coverage:</strong> ${chemical.knapsackMixtures['20L'].coverageArea}ha</li>
                                                    <li><strong>Spray Time:</strong> ${chemical.knapsackMixtures['20L'].sprayTime} minutes</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card mb-3">
                                    <div class="card-header bg-secondary text-white">
                                        <h6 class="mb-0">Cost Analysis</h6>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-sm">
                                            <tr><td><strong>Chemical Cost per Liter:</strong></td><td>$${chemical.costPerLiter}</td></tr>
                                            <tr><td><strong>Application Rate:</strong></td><td>${chemical.applicationRate}</td></tr>
                                            <tr><td><strong>Cost per Hectare:</strong></td><td>$${(chemical.costPerLiter * parseFloat(chemical.applicationRate.split('-')[1])).toFixed(2)}</td></tr>
                                            <tr><td><strong>Effectiveness:</strong></td><td>${chemical.effectiveness}%</td></tr>
                                            <tr><td><strong>Safety Level:</strong></td><td>${chemical.safetyLevel}</td></tr>
                                        </table>
                                        
                                        <h6>Cost-Benefit Analysis:</h6>
                                        <ul class="small mb-0">
                                            <li>• High effectiveness (${chemical.effectiveness}%)</li>
                                            <li>• ${chemical.safetyLevel} safety level</li>
                                            <li>• ${chemical.environmentalImpact} environmental impact</li>
                                            <li>• ${chemical.preHarvestInterval}-day pre-harvest interval</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="card mb-3">
                                    <div class="card-header bg-dark text-white">
                                        <h6 class="mb-0">Step-by-Step Application Instructions</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h6>16L Sprayer Instructions:</h6>
                                                <ol class="small">
                                                    ${chemical.knapsackMixtures['16L'].instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                                                </ol>
                                            </div>
                                            <div class="col-md-6">
                                                <h6>20L Sprayer Instructions:</h6>
                                                <ol class="small">
                                                    ${chemical.knapsackMixtures['20L'].instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="card mb-3">
                                    <div class="card-header bg-success text-white">
                                        <h6 class="mb-0">Best Practices & Tips</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <h6>Application Tips:</h6>
                                                <ul class="small">
                                                    <li>• Apply during early morning or evening</li>
                                                    <li>• Avoid application in windy conditions</li>
                                                    <li>• Ensure even coverage for maximum effectiveness</li>
                                                    <li>• Monitor weather conditions before application</li>
                                                </ul>
                                            </div>
                                            <div class="col-md-4">
                                                <h6>Storage Tips:</h6>
                                                <ul class="small">
                                                    <li>• Store in original container</li>
                                                    <li>• Keep away from heat and direct sunlight</li>
                                                    <li>• Ensure proper ventilation</li>
                                                    <li>• Keep out of reach of children and animals</li>
                                                </ul>
                                            </div>
                                            <div class="col-md-4">
                                                <h6>Safety Tips:</h6>
                                                <ul class="small">
                                                    <li>• Always wear appropriate PPE</li>
                                                    <li>• Have emergency contact information available</li>
                                                    <li>• Clean equipment thoroughly after use</li>
                                                    <li>• Dispose of containers properly</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-2"></i>Close
                        </button>
                        <button type="button" class="btn btn-info" onclick="intelligentWeeding.printChemicalDetails('${chemical.name}')">
                            <i class="fas fa-print me-2"></i>Print Details
                        </button>
                        <button type="button" class="btn btn-warning" onclick="intelligentWeeding.downloadChemicalData('${chemical.name}')">
                            <i class="fas fa-download me-2"></i>Download Data
                        </button>
                        <button type="button" class="btn btn-success" onclick="intelligentWeeding.selectChemical('${chemical.name}')">
                            <i class="fas fa-check me-2"></i>Select This Chemical
                        </button>
                        <button type="button" class="btn btn-primary" onclick="intelligentWeeding.showChemicalMixtureModal(intelligentWeeding.chemicalSuppressionOptions.find(c => c.name === '${chemical.name}'))">
                            <i class="fas fa-flask me-2"></i>View Mixture Instructions
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

    printChemicalDetails(chemicalName) {
        const chemical = this.chemicalSuppressionOptions.find(c => c.name === chemicalName);
        if (!chemical || !chemical.chemicalDetails) return;

        alert(`🖨️ Print Chemical Details for ${chemicalName}\n\nComprehensive chemical information would be printed including:\n\n• Molecular formula and properties\n• Physical and chemical characteristics\n• Toxicity and ecotoxicity data\n• Environmental fate information\n• Regulatory status and compliance\n• Storage and handling requirements\n• Resistance management strategies\n\nThis would generate a professional PDF for reference and compliance.`);
    }

    downloadChemicalData(chemicalName) {
        const chemical = this.chemicalSuppressionOptions.find(c => c.name === chemicalName);
        if (!chemical) return;

        const data = {
            name: chemical.name,
            type: chemical.type,
            effectiveness: chemical.effectiveness,
            costPerLiter: chemical.costPerLiter,
            applicationRate: chemical.applicationRate,
            preHarvestInterval: chemical.preHarvestInterval,
            environmentalImpact: chemical.environmentalImpact,
            safetyLevel: chemical.safetyLevel,
            weatherRestrictions: chemical.weatherRestrictions,
            safetyGuidelines: chemical.safetyGuidelines,
            knapsackMixtures: chemical.knapsackMixtures,
            chemicalDetails: chemical.chemicalDetails
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${chemicalName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_chemical_data.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        alert(`📥 Downloaded chemical data for ${chemicalName}\n\nFile: ${link.download}\n\nContains comprehensive chemical information in JSON format for offline reference.`);
    }

    showWeedingAnalytics() {
        // Create professional analytics modal
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-purple text-white border-0">
                        <div class="d-flex align-items-center">
                            <div class="me-3">
                                <i class="fas fa-chart-bar fa-2x"></i>
                            </div>
                            <div>
                                <h4 class="modal-title mb-0 fw-bold">Weeding Analytics</h4>
                                <small class="opacity-75">Comprehensive performance insights</small>
                            </div>
                        </div>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-4">
                        <div class="analytics-features">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="analytics-card mb-3">
                                        <h6 class="text-primary mb-3">
                                            <i class="fas fa-chart-line me-2"></i>Growth Trends
                                        </h6>
                                        <p class="text-muted">Track weed growth patterns over time with interactive charts and trend analysis.</p>
                                        <div class="feature-tags">
                                            <span class="badge bg-primary me-1">Time Series</span>
                                            <span class="badge bg-primary me-1">Predictive</span>
                                        </div>
                                    </div>
                                    
                                    <div class="analytics-card mb-3">
                                        <h6 class="text-success mb-3">
                                            <i class="fas fa-dollar-sign me-2"></i>Cost Analysis
                                        </h6>
                                        <p class="text-muted">Compare costs across different weeding methods and identify the most cost-effective approaches.</p>
                                        <div class="feature-tags">
                                            <span class="badge bg-success me-1">ROI Analysis</span>
                                            <span class="badge bg-success me-1">Budget Tracking</span>
                                        </div>
                                    </div>
                                    
                                    <div class="analytics-card mb-3">
                                        <h6 class="text-warning mb-3">
                                            <i class="fas fa-cloud-rain me-2"></i>Weather Correlation
                                        </h6>
                                        <p class="text-muted">Analyze how weather conditions affect weed growth and weeding effectiveness.</p>
                                        <div class="feature-tags">
                                            <span class="badge bg-warning me-1">Weather Data</span>
                                            <span class="badge bg-warning me-1">Correlation</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="analytics-card mb-3">
                                        <h6 class="text-info mb-3">
                                            <i class="fas fa-flask me-2"></i>Chemical Effectiveness
                                        </h6>
                                        <p class="text-muted">Evaluate the effectiveness of different chemicals and treatments across various conditions.</p>
                                        <div class="feature-tags">
                                            <span class="badge bg-info me-1">Effectiveness</span>
                                            <span class="badge bg-info me-1">Comparison</span>
                                        </div>
                                    </div>
                                    
                                    <div class="analytics-card mb-3">
                                        <h6 class="text-secondary mb-3">
                                            <i class="fas fa-users me-2"></i>Labor Tracking
                                        </h6>
                                        <p class="text-muted">Monitor labor costs, efficiency metrics, and resource allocation for weeding operations.</p>
                                        <div class="feature-tags">
                                            <span class="badge bg-secondary me-1">Labor Costs</span>
                                            <span class="badge bg-secondary me-1">Efficiency</span>
                                        </div>
                                    </div>
                                    
                                    <div class="analytics-card mb-3">
                                        <h6 class="text-danger mb-3">
                                            <i class="fas fa-leaf me-2"></i>Environmental Impact
                                        </h6>
                                        <p class="text-muted">Assess environmental impact metrics and sustainability of different weeding approaches.</p>
                                        <div class="feature-tags">
                                            <span class="badge bg-danger me-1">Sustainability</span>
                                            <span class="badge bg-danger me-1">Impact</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="analytics-preview mt-4 pt-3 border-top">
                                <h6 class="text-center mb-3">Sample Analytics Dashboard</h6>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="metric-card text-center p-3">
                                            <i class="fas fa-chart-pie fa-2x text-primary mb-2"></i>
                                            <h5 class="text-primary">85%</h5>
                                            <small class="text-muted">Weed Control Efficiency</small>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="metric-card text-center p-3">
                                            <i class="fas fa-dollar-sign fa-2x text-success mb-2"></i>
                                            <h5 class="text-success">$2,450</h5>
                                            <small class="text-muted">Total Savings This Month</small>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="metric-card text-center p-3">
                                            <i class="fas fa-clock fa-2x text-warning mb-2"></i>
                                            <h5 class="text-warning">12</h5>
                                            <small class="text-muted">Hours Saved</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="coming-soon mt-4 pt-3 border-top text-center">
                                <div class="alert alert-info">
                                    <i class="fas fa-info-circle me-2"></i>
                                    <strong>Coming Soon!</strong> Advanced analytics dashboard with real-time data visualization and insights.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-light border-0">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-1"></i>Close
                        </button>
                        <button type="button" class="btn btn-primary" onclick="intelligentWeeding.showWeedingSchedule()">
                            <i class="fas fa-calendar me-1"></i>View Schedule
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add custom styles
        const style = document.createElement('style');
        style.textContent = `
            .bg-purple {
                background: linear-gradient(135deg, #6f42c1, #5a32a3) !important;
            }
            .analytics-card {
                background: #f8f9fa;
                border-radius: 8px;
                padding: 1.5rem;
                border-left: 4px solid #6f42c1;
                transition: transform 0.2s ease;
            }
            .analytics-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .feature-tags {
                margin-top: 0.5rem;
            }
            .metric-card {
                background: #f8f9fa;
                border-radius: 8px;
                border: 1px solid #e9ecef;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
    }

    saveData() {
        localStorage.setItem('crops', JSON.stringify(this.cropData));
        localStorage.setItem('weedingTasks', JSON.stringify(this.weedingTasks));
    }

    loadData() {
        const savedTasks = localStorage.getItem('weedingTasks');
        if (savedTasks) {
            this.weedingTasks = JSON.parse(savedTasks);
        }
    }
}

// Add CSS styles for intelligent weeding
const intelligentWeedingStyles = `
    <style>
        .weeding-task-card .card {
            transition: transform 0.2s ease;
        }
        
        .weeding-task-card .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .weather-impact-item {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 10px;
        }
        
        .weather-impact-item h6 {
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        
        .weed-growth-indicator .badge {
            font-size: 0.8rem;
        }
        
        .urgency-score .badge {
            font-size: 0.8rem;
        }
        
        .task-details small {
            font-size: 0.8rem;
        }
        
        .weather-suitability small {
            font-size: 0.8rem;
        }
        
        .task-actions .btn {
            font-size: 0.8rem;
        }
        
        .mixture-value {
            font-size: 1.2rem;
            font-weight: bold;
            color: #007bff;
        }
        
        .mixture-label {
            font-size: 0.8rem;
            color: #6c757d;
        }
        
        .detail-value {
            font-size: 1rem;
            font-weight: bold;
            color: #495057;
        }
        
        .detail-label {
            font-size: 0.7rem;
            color: #6c757d;
        }
        
        .mixture-instructions {
            font-size: 0.9rem;
            margin-bottom: 15px;
        }
        
        .mixture-instructions li {
            margin-bottom: 5px;
        }
        
        .application-details {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #e9ecef;
        }
    </style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', intelligentWeedingStyles);

// Initialize Intelligent Weeding System
const intelligentWeeding = new IntelligentWeedingSystem();
