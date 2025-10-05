// SmartFarm AI Advisory Database
// Intelligent recommendations for crop nutrition and livestock health management

window.AIAdvisoryDatabase = {
    // Crop Nutrition Advisory Database
    cropNutrition: {
        // Root Vegetables
        cassava: {
            name: "Cassava",
            growthStages: {
                planting: {
                    duration: "0-30 days",
                    description: "Initial establishment and root development",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "2-3 weeks after planting",
                            amount: "50-75 kg/ha",
                            frequency: "Once",
                            conditions: "When soil moisture is adequate",
                            method: "Side dressing or broadcasting",
                            notes: "Avoid direct contact with stems"
                        },
                        manure: {
                            timing: "At planting or 1 week before",
                            amount: "10-15 tons/ha",
                            frequency: "Once per season",
                            conditions: "Well-composted manure preferred",
                            method: "Incorporated into soil",
                            notes: "Ensure proper decomposition to avoid root burn"
                        },
                        npk: {
                            timing: "At planting",
                            amount: "200-300 kg/ha of 15-15-15",
                            frequency: "Once",
                            conditions: "Based on soil test results",
                            method: "Broadcasting and incorporation",
                            notes: "Adjust based on soil fertility"
                        }
                    },
                    weatherConsiderations: {
                        avoid: "Heavy rainfall within 24 hours",
                        optimal: "Light rain or irrigation after application",
                        temperature: "15-30°C optimal for nutrient uptake"
                    }
                },
                vegetative: {
                    duration: "30-90 days",
                    description: "Leaf development and stem growth",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "6-8 weeks after planting",
                            amount: "75-100 kg/ha",
                            frequency: "Once",
                            conditions: "When plants show vigorous growth",
                            method: "Side dressing",
                            notes: "Apply when soil is moist but not waterlogged"
                        },
                        manure: {
                            timing: "Not recommended during this stage",
                            amount: "N/A",
                            frequency: "N/A",
                            conditions: "N/A",
                            method: "N/A",
                            notes: "Manure applied at planting should be sufficient"
                        }
                    },
                    weatherConsiderations: {
                        avoid: "Drought conditions",
                        optimal: "Consistent soil moisture",
                        temperature: "20-35°C optimal for growth"
                    }
                },
                tuber_formation: {
                    duration: "90-150 days",
                    description: "Tuber initiation and development",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "10-12 weeks after planting",
                            amount: "50-75 kg/ha",
                            frequency: "Once",
                            conditions: "When tubers start forming",
                            method: "Side dressing away from plant base",
                            notes: "Critical stage for tuber development"
                        },
                        manure: {
                            timing: "Not recommended",
                            amount: "N/A",
                            frequency: "N/A",
                            conditions: "N/A",
                            method: "N/A",
                            notes: "Avoid fresh manure during tuber formation"
                        },
                        potassium: {
                            timing: "10-12 weeks after planting",
                            amount: "100-150 kg/ha of K2O",
                            frequency: "Once",
                            conditions: "When tubers are 2-3 cm diameter",
                            method: "Side dressing",
                            notes: "Essential for starch accumulation"
                        }
                    },
                    weatherConsiderations: {
                        avoid: "Water stress during tuber formation",
                        optimal: "Consistent moisture, moderate temperatures",
                        temperature: "25-30°C optimal for tuber development"
                    }
                },
                maturation: {
                    duration: "150-300 days",
                    description: "Tuber maturation and starch accumulation",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "Not recommended",
                            amount: "N/A",
                            frequency: "N/A",
                            conditions: "N/A",
                            method: "N/A",
                            notes: "Stop nitrogen application 4-6 weeks before harvest"
                        },
                        manure: {
                            timing: "Not recommended",
                            amount: "N/A",
                            frequency: "N/A",
                            conditions: "N/A",
                            method: "N/A",
                            notes: "No additional manure needed"
                        }
                    },
                    weatherConsiderations: {
                        avoid: "Excessive moisture near harvest",
                        optimal: "Dry conditions for harvest",
                        temperature: "20-25°C for starch accumulation"
                    }
                }
            },
            soilRequirements: {
                ph: "5.5-6.5",
                drainage: "Well-drained",
                texture: "Sandy loam to clay loam",
                organicMatter: "2-3%"
            }
        },
        
        taro: {
            name: "Taro",
            growthStages: {
                planting: {
                    duration: "0-21 days",
                    description: "Corm sprouting and initial growth",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "2-3 weeks after planting",
                            amount: "40-60 kg/ha",
                            frequency: "Once",
                            conditions: "When shoots are 10-15 cm tall",
                            method: "Side dressing",
                            notes: "Avoid direct contact with corms"
                        },
                        manure: {
                            timing: "At planting",
                            amount: "8-12 tons/ha",
                            frequency: "Once per season",
                            conditions: "Well-composted manure",
                            method: "Mixed with planting soil",
                            notes: "Essential for corm development"
                        }
                    }
                },
                vegetative: {
                    duration: "21-90 days",
                    description: "Leaf and petiole development",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "6-8 weeks after planting",
                            amount: "60-80 kg/ha",
                            frequency: "Once",
                            conditions: "When plants are actively growing",
                            method: "Side dressing",
                            notes: "Critical for leaf development"
                        }
                    }
                },
                corm_development: {
                    duration: "90-180 days",
                    description: "Corm enlargement and starch accumulation",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "12-14 weeks after planting",
                            amount: "40-60 kg/ha",
                            frequency: "Once",
                            conditions: "When corms start enlarging",
                            method: "Side dressing",
                            notes: "Last nitrogen application"
                        },
                        potassium: {
                            timing: "12-14 weeks after planting",
                            amount: "80-120 kg/ha of K2O",
                            frequency: "Once",
                            conditions: "When corms are developing",
                            method: "Side dressing",
                            notes: "Essential for starch accumulation"
                        }
                    }
                }
            }
        },
        
        sweet_potato: {
            name: "Sweet Potato",
            growthStages: {
                planting: {
                    duration: "0-14 days",
                    description: "Vine establishment and rooting",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "2-3 weeks after planting",
                            amount: "30-50 kg/ha",
                            frequency: "Once",
                            conditions: "When vines start spreading",
                            method: "Side dressing",
                            notes: "Light application for vine growth"
                        },
                        manure: {
                            timing: "At planting",
                            amount: "6-10 tons/ha",
                            frequency: "Once per season",
                            conditions: "Well-composted manure",
                            method: "Incorporated into ridges",
                            notes: "Important for root development"
                        }
                    }
                },
                vine_development: {
                    duration: "14-60 days",
                    description: "Vine growth and canopy establishment",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "4-6 weeks after planting",
                            amount: "50-70 kg/ha",
                            frequency: "Once",
                            conditions: "When vines are actively growing",
                            method: "Side dressing along ridges",
                            notes: "Support vine growth and leaf development"
                        }
                    }
                },
                tuber_formation: {
                    duration: "60-120 days",
                    description: "Tuber initiation and development",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "8-10 weeks after planting",
                            amount: "40-60 kg/ha",
                            frequency: "Once",
                            conditions: "When tubers start forming",
                            method: "Side dressing",
                            notes: "Last nitrogen application"
                        },
                        potassium: {
                            timing: "8-10 weeks after planting",
                            amount: "100-150 kg/ha of K2O",
                            frequency: "Once",
                            conditions: "When tubers are developing",
                            method: "Side dressing",
                            notes: "Critical for tuber quality"
                        }
                    }
                }
            }
        },
        
        // Leafy Vegetables
        spinach: {
            name: "Spinach",
            growthStages: {
                germination: {
                    duration: "0-7 days",
                    description: "Seed germination and cotyledon emergence",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "Not recommended",
                            amount: "N/A",
                            frequency: "N/A",
                            conditions: "N/A",
                            method: "N/A",
                            notes: "Avoid nitrogen during germination"
                        },
                        manure: {
                            timing: "1-2 weeks before planting",
                            amount: "4-6 tons/ha",
                            frequency: "Once per season",
                            conditions: "Well-composted manure",
                            method: "Incorporated into soil",
                            notes: "Prepare soil before planting"
                        }
                    }
                },
                vegetative: {
                    duration: "7-35 days",
                    description: "Leaf development and growth",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "2-3 weeks after planting",
                            amount: "30-50 kg/ha",
                            frequency: "Every 2 weeks",
                            conditions: "When plants have 4-6 true leaves",
                            method: "Side dressing or foliar application",
                            notes: "Light, frequent applications for tender leaves"
                        },
                        manure: {
                            timing: "Not recommended during growth",
                            amount: "N/A",
                            frequency: "N/A",
                            conditions: "N/A",
                            method: "N/A",
                            notes: "Manure applied before planting should be sufficient"
                        }
                    }
                }
            }
        },
        
        lettuce: {
            name: "Lettuce",
            growthStages: {
                germination: {
                    duration: "0-7 days",
                    description: "Seed germination and initial growth",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "Not recommended",
                            amount: "N/A",
                            frequency: "N/A",
                            conditions: "N/A",
                            method: "N/A",
                            notes: "Avoid nitrogen during germination"
                        }
                    }
                },
                vegetative: {
                    duration: "7-45 days",
                    description: "Leaf development and head formation",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "2-3 weeks after planting",
                            amount: "25-40 kg/ha",
                            frequency: "Every 2 weeks",
                            conditions: "When plants are actively growing",
                            method: "Side dressing or liquid application",
                            notes: "Light applications for tender leaves"
                        }
                    }
                }
            }
        },
        
        // Fruits
        banana: {
            name: "Banana",
            growthStages: {
                establishment: {
                    duration: "0-90 days",
                    description: "Plant establishment and initial growth",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "4-6 weeks after planting",
                            amount: "100-150 kg/ha",
                            frequency: "Every 2 months",
                            conditions: "When plants are well-established",
                            method: "Side dressing around plant base",
                            notes: "Support rapid vegetative growth"
                        },
                        manure: {
                            timing: "At planting",
                            amount: "15-20 tons/ha",
                            frequency: "Once per year",
                            conditions: "Well-composted manure",
                            method: "Mixed with planting soil",
                            notes: "Essential for long-term nutrition"
                        }
                    }
                },
                flowering: {
                    duration: "90-150 days",
                    description: "Flower initiation and development",
                    fertilizerRecommendations: {
                        urea: {
                            timing: "8-10 months after planting",
                            amount: "150-200 kg/ha",
                            frequency: "Once",
                            conditions: "When flower bud appears",
                            method: "Side dressing",
                            notes: "Critical for bunch development"
                        },
                        potassium: {
                            timing: "8-10 months after planting",
                            amount: "200-300 kg/ha of K2O",
                            frequency: "Once",
                            conditions: "When flowering begins",
                            method: "Side dressing",
                            notes: "Essential for fruit quality"
                        }
                    }
                }
            }
        }
    },
    
    // Livestock Health Advisory Database
    livestockHealth: {
        cattle: {
            name: "Cattle",
            healthSchedule: {
                calves: {
                    ageRange: "0-6 months",
                    vaccinations: [
                        {
                            vaccine: "Clostridial (8-in-1)",
                            timing: "6-8 weeks old",
                            frequency: "Initial + booster in 4 weeks",
                            conditions: "Healthy calf, no fever",
                            method: "Subcutaneous injection",
                            notes: "Protect against tetanus, blackleg, and other diseases"
                        },
                        {
                            vaccine: "IBR/BVD",
                            timing: "3-4 months old",
                            frequency: "Annual booster",
                            conditions: "Healthy animal",
                            method: "Intramuscular injection",
                            notes: "Protect against respiratory diseases"
                        }
                    ],
                    deworming: [
                        {
                            treatment: "Broad-spectrum dewormer",
                            timing: "2-3 weeks old",
                            frequency: "Every 6-8 weeks until 6 months",
                            conditions: "No recent deworming",
                            method: "Oral drench or injection",
                            notes: "Control internal parasites"
                        }
                    ],
                    nutrition: [
                        {
                            supplement: "Colostrum",
                            timing: "Within 2 hours of birth",
                            amount: "2-4 liters",
                            frequency: "Once",
                            conditions: "Fresh from mother",
                            method: "Bottle feeding",
                            notes: "Essential for immunity transfer"
                        }
                    ]
                },
                heifers: {
                    ageRange: "6-24 months",
                    vaccinations: [
                        {
                            vaccine: "Brucellosis",
                            timing: "4-12 months old",
                            frequency: "Once",
                            conditions: "Healthy animal, not pregnant",
                            method: "Subcutaneous injection",
                            notes: "Required for breeding animals"
                        }
                    ],
                    deworming: [
                        {
                            treatment: "Broad-spectrum dewormer",
                            timing: "Every 3-4 months",
                            frequency: "Quarterly",
                            conditions: "Based on fecal egg counts",
                            method: "Oral drench or injection",
                            notes: "Maintain parasite control"
                        }
                    ]
                },
                cows: {
                    ageRange: "24+ months",
                    vaccinations: [
                        {
                            vaccine: "Annual boosters",
                            timing: "Before breeding season",
                            frequency: "Annual",
                            conditions: "Healthy, non-pregnant",
                            method: "Various",
                            notes: "Maintain immunity levels"
                        }
                    ],
                    pregnancy: [
                        {
                            treatment: "Pregnancy check",
                            timing: "45-60 days after breeding",
                            frequency: "Per pregnancy",
                            conditions: "Regular breeding program",
                            method: "Rectal palpation or ultrasound",
                            notes: "Confirm pregnancy status"
                        }
                    ],
                    lactation: [
                        {
                            supplement: "Calcium supplement",
                            timing: "Around calving",
                            amount: "As needed",
                            frequency: "As needed",
                            conditions: "Signs of milk fever",
                            method: "Intravenous or oral",
                            notes: "Prevent milk fever"
                        }
                    ]
                }
            }
        },
        
        goats: {
            name: "Goats",
            healthSchedule: {
                kids: {
                    ageRange: "0-6 months",
                    vaccinations: [
                        {
                            vaccine: "CDT (Clostridium perfringens types C & D + Tetanus)",
                            timing: "6-8 weeks old",
                            frequency: "Initial + booster in 4 weeks",
                            conditions: "Healthy kid",
                            method: "Subcutaneous injection",
                            notes: "Essential for young goats"
                        }
                    ],
                    deworming: [
                        {
                            treatment: "Broad-spectrum dewormer",
                            timing: "4-6 weeks old",
                            frequency: "Every 4-6 weeks",
                            conditions: "Based on fecal counts",
                            method: "Oral drench",
                            notes: "Kids are very susceptible to parasites"
                        }
                    ]
                },
                does: {
                    ageRange: "6+ months",
                    vaccinations: [
                        {
                            vaccine: "CDT",
                            timing: "Before breeding season",
                            frequency: "Annual",
                            conditions: "Healthy, non-pregnant",
                            method: "Subcutaneous injection",
                            notes: "Protect during pregnancy"
                        }
                    ],
                    pregnancy: [
                        {
                            treatment: "Pregnancy check",
                            timing: "30-45 days after breeding",
                            frequency: "Per pregnancy",
                            conditions: "Regular breeding",
                            method: "Ultrasound or palpation",
                            notes: "Confirm pregnancy"
                        }
                    ]
                }
            }
        },
        
        chickens: {
            name: "Chickens",
            healthSchedule: {
                chicks: {
                    ageRange: "0-8 weeks",
                    vaccinations: [
                        {
                            vaccine: "Marek's Disease",
                            timing: "Day 1 (at hatchery)",
                            frequency: "Once",
                            conditions: "Healthy chick",
                            method: "Subcutaneous injection",
                            notes: "Usually done at hatchery"
                        },
                        {
                            vaccine: "Newcastle Disease",
                            timing: "2-3 weeks old",
                            frequency: "Initial + booster",
                            conditions: "Healthy bird",
                            method: "Eye drop or drinking water",
                            notes: "Protect against respiratory disease"
                        }
                    ],
                    nutrition: [
                        {
                            supplement: "Starter feed",
                            timing: "Day 1",
                            amount: "Ad libitum",
                            frequency: "Continuous",
                            conditions: "Fresh feed daily",
                            method: "Feeder",
                            notes: "High protein (20-24%)"
                        }
                    ]
                },
                layers: {
                    ageRange: "18+ weeks",
                    vaccinations: [
                        {
                            vaccine: "Fowl Pox",
                            timing: "16-20 weeks old",
                            frequency: "Annual",
                            conditions: "Healthy bird",
                            method: "Wing web stab",
                            notes: "Before laying begins"
                        }
                    ],
                    nutrition: [
                        {
                            supplement: "Layer feed",
                            timing: "18 weeks old",
                            amount: "Ad libitum",
                            frequency: "Continuous",
                            conditions: "Fresh feed daily",
                            method: "Feeder",
                            notes: "High calcium (3.5-4%)"
                        }
                    ]
                }
            }
        }
    },
    
    // Weather-based recommendations
    weatherRecommendations: {
        fertilizer: {
            avoid: [
                "Heavy rainfall within 24 hours",
                "Drought conditions",
                "Extreme temperatures (>35°C or <10°C)",
                "High wind conditions"
            ],
            optimal: [
                "Light rain or irrigation after application",
                "Moderate temperatures (15-30°C)",
                "Calm weather conditions",
                "Soil moisture at 50-70% field capacity"
            ]
        },
        livestock: {
            avoid: [
                "Extreme heat stress",
                "Severe weather conditions",
                "During illness or stress",
                "Pregnancy complications"
            ],
            optimal: [
                "Cool, calm weather",
                "Healthy animal condition",
                "Proper restraint available",
                "Clean, dry environment"
            ]
        }
    },
    
    // Soil testing recommendations
    soilTesting: {
        frequency: "Every 2-3 years",
        timing: "Before planting season",
        parameters: [
            "pH level",
            "Nitrogen (N)",
            "Phosphorus (P)",
            "Potassium (K)",
            "Organic matter",
            "Cation exchange capacity"
        ],
        interpretation: {
            ph: {
                low: "< 5.5 - Add lime",
                optimal: "5.5-7.0 - Good",
                high: "> 7.0 - May need sulfur"
            },
            nitrogen: {
                low: "< 50 ppm - High fertilizer need",
                medium: "50-100 ppm - Moderate fertilizer need",
                high: "> 100 ppm - Low fertilizer need"
            }
        }
    }
};

// AI Advisory Helper Functions
window.AIAdvisoryHelper = {
    // Get crop nutrition recommendations based on growth stage
    getCropNutritionRecommendations: function(cropType, growthStage, weatherConditions, soilData) {
        const crop = this.cropNutrition[cropType];
        if (!crop || !crop.growthStages[growthStage]) {
            return null;
        }
        
        const stage = crop.growthStages[growthStage];
        const recommendations = stage.fertilizerRecommendations;
        
        // Apply weather-based adjustments
        const adjustedRecommendations = this.applyWeatherAdjustments(recommendations, weatherConditions);
        
        // Apply soil-based adjustments
        const finalRecommendations = this.applySoilAdjustments(adjustedRecommendations, soilData);
        
        return {
            crop: cropType,
            stage: growthStage,
            recommendations: finalRecommendations,
            weatherConsiderations: stage.weatherConsiderations,
            soilRequirements: crop.soilRequirements
        };
    },
    
    // Get livestock health recommendations based on age and condition
    getLivestockHealthRecommendations: function(animalType, ageGroup, healthStatus, weatherConditions) {
        const animal = this.livestockHealth[animalType];
        if (!animal || !animal.healthSchedule[ageGroup]) {
            return null;
        }
        
        const schedule = animal.healthSchedule[ageGroup];
        
        // Apply health status and weather adjustments
        const adjustedSchedule = this.applyHealthAdjustments(schedule, healthStatus, weatherConditions);
        
        return {
            animal: animalType,
            ageGroup: ageGroup,
            schedule: adjustedSchedule,
            weatherConsiderations: this.weatherRecommendations.livestock
        };
    },
    
    // Apply weather-based adjustments to recommendations
    applyWeatherAdjustments: function(recommendations, weather) {
        const adjusted = { ...recommendations };
        
        if (weather.rainfall > 20) {
            // Heavy rain - delay application
            Object.keys(adjusted).forEach(key => {
                if (adjusted[key].timing) {
                    adjusted[key].notes += " - DELAY: Heavy rain expected";
                }
            });
        }
        
        if (weather.temperature > 35) {
            // High temperature - reduce rates
            Object.keys(adjusted).forEach(key => {
                if (adjusted[key].amount) {
                    adjusted[key].amount = this.reduceAmount(adjusted[key].amount, 0.8);
                    adjusted[key].notes += " - REDUCED: High temperature conditions";
                }
            });
        }
        
        return adjusted;
    },
    
    // Apply soil-based adjustments
    applySoilAdjustments: function(recommendations, soilData) {
        const adjusted = { ...recommendations };
        
        if (soilData && soilData.pH < 5.5) {
            // Low pH - add lime recommendation
            adjusted.lime = {
                timing: "2-4 weeks before fertilizer application",
                amount: "2-4 tons/ha",
                frequency: "As needed based on pH",
                conditions: "Low soil pH",
                method: "Broadcasting and incorporation",
                notes: "Essential for nutrient availability"
            };
        }
        
        return adjusted;
    },
    
    // Apply health status adjustments
    applyHealthAdjustments: function(schedule, healthStatus, weather) {
        const adjusted = { ...schedule };
        
        if (healthStatus === 'sick') {
            // Delay treatments if animal is sick
            Object.keys(adjusted).forEach(key => {
                if (Array.isArray(adjusted[key])) {
                    adjusted[key] = adjusted[key].map(item => ({
                        ...item,
                        notes: item.notes + " - DELAY: Animal currently sick"
                    }));
                }
            });
        }
        
        return adjusted;
    },
    
    // Helper function to reduce amount by percentage
    reduceAmount: function(amountStr, factor) {
        const match = amountStr.match(/(\d+)-(\d+)/);
        if (match) {
            const min = Math.round(parseInt(match[1]) * factor);
            const max = Math.round(parseInt(match[2]) * factor);
            return `${min}-${max} kg/ha`;
        }
        return amountStr;
    },
    
    // Calculate optimal application timing based on weather forecast
    calculateOptimalTiming: function(baseTiming, weatherForecast) {
        const today = new Date();
        const baseDate = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000)); // Default to 1 week
        
        // Find best day in next 2 weeks
        for (let i = 0; i < 14; i++) {
            const checkDate = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
            const dayWeather = weatherForecast[i];
            
            if (dayWeather && 
                dayWeather.rainfall < 10 && 
                dayWeather.temperature >= 15 && 
                dayWeather.temperature <= 30) {
                return checkDate.toISOString().split('T')[0];
            }
        }
        
        return baseDate.toISOString().split('T')[0];
    }
};
