/**
 * SmartFarm Feed Mix Calculator
 * Calculates optimal feed mixes for livestock based on weight, age, and production purpose
 */

class FeedMixCalculator {
    constructor() {
        this.nutritionalRequirements = this.initializeNutritionalRequirements();
        this.feedIngredients = this.initializeFeedIngredients();
    }

    initializeNutritionalRequirements() {
        return {
            cattle: {
                calf: {
                    weightRange: [0, 200], // kg
                    dailyRequirements: {
                        protein: { min: 16, max: 18 }, // % of dry matter
                        energy: { min: 2.8, max: 3.2 }, // Mcal/kg
                        fiber: { min: 15, max: 25 }, // % of dry matter
                        calcium: { min: 0.6, max: 0.8 }, // % of dry matter
                        phosphorus: { min: 0.4, max: 0.6 }, // % of dry matter
                        dailyIntake: { min: 2.5, max: 3.5 } // % of body weight
                    }
                },
                heifer: {
                    weightRange: [200, 400],
                    dailyRequirements: {
                        protein: { min: 12, max: 14 },
                        energy: { min: 2.4, max: 2.8 },
                        fiber: { min: 20, max: 30 },
                        calcium: { min: 0.4, max: 0.6 },
                        phosphorus: { min: 0.3, max: 0.4 },
                        dailyIntake: { min: 2.0, max: 2.8 }
                    }
                },
                cow_dairy: {
                    weightRange: [400, 700],
                    dailyRequirements: {
                        protein: { min: 14, max: 18 },
                        energy: { min: 2.6, max: 3.2 },
                        fiber: { min: 18, max: 28 },
                        calcium: { min: 0.7, max: 1.0 },
                        phosphorus: { min: 0.4, max: 0.6 },
                        dailyIntake: { min: 2.8, max: 3.5 }
                    }
                },
                cow_beef: {
                    weightRange: [400, 600],
                    dailyRequirements: {
                        protein: { min: 10, max: 12 },
                        energy: { min: 2.2, max: 2.6 },
                        fiber: { min: 25, max: 35 },
                        calcium: { min: 0.3, max: 0.5 },
                        phosphorus: { min: 0.2, max: 0.3 },
                        dailyIntake: { min: 2.0, max: 2.5 }
                    }
                },
                bull: {
                    weightRange: [500, 1000],
                    dailyRequirements: {
                        protein: { min: 12, max: 14 },
                        energy: { min: 2.4, max: 2.8 },
                        fiber: { min: 20, max: 30 },
                        calcium: { min: 0.4, max: 0.6 },
                        phosphorus: { min: 0.3, max: 0.4 },
                        dailyIntake: { min: 2.0, max: 2.8 }
                    }
                }
            },
            pigs: {
                piglet: {
                    weightRange: [0, 25],
                    dailyRequirements: {
                        protein: { min: 18, max: 22 },
                        energy: { min: 3.2, max: 3.6 },
                        fiber: { min: 4, max: 8 },
                        calcium: { min: 0.8, max: 1.0 },
                        phosphorus: { min: 0.6, max: 0.8 },
                        dailyIntake: { min: 4.0, max: 6.0 }
                    }
                },
                grower: {
                    weightRange: [25, 60],
                    dailyRequirements: {
                        protein: { min: 16, max: 18 },
                        energy: { min: 3.0, max: 3.4 },
                        fiber: { min: 6, max: 10 },
                        calcium: { min: 0.6, max: 0.8 },
                        phosphorus: { min: 0.5, max: 0.7 },
                        dailyIntake: { min: 3.0, max: 4.0 }
                    }
                },
                finisher: {
                    weightRange: [60, 100],
                    dailyRequirements: {
                        protein: { min: 14, max: 16 },
                        energy: { min: 2.8, max: 3.2 },
                        fiber: { min: 8, max: 12 },
                        calcium: { min: 0.5, max: 0.7 },
                        phosphorus: { min: 0.4, max: 0.6 },
                        dailyIntake: { min: 2.5, max: 3.5 }
                    }
                },
                sow: {
                    weightRange: [150, 250],
                    dailyRequirements: {
                        protein: { min: 14, max: 16 },
                        energy: { min: 2.6, max: 3.0 },
                        fiber: { min: 10, max: 15 },
                        calcium: { min: 0.7, max: 0.9 },
                        phosphorus: { min: 0.5, max: 0.7 },
                        dailyIntake: { min: 2.0, max: 3.0 }
                    }
                }
            },
            chickens: {
                chick: {
                    weightRange: [0, 0.5],
                    dailyRequirements: {
                        protein: { min: 20, max: 22 },
                        energy: { min: 2.8, max: 3.2 },
                        fiber: { min: 4, max: 6 },
                        calcium: { min: 0.9, max: 1.1 },
                        phosphorus: { min: 0.6, max: 0.8 },
                        dailyIntake: { min: 10, max: 15 }
                    }
                },
                pullet: {
                    weightRange: [0.5, 1.5],
                    dailyRequirements: {
                        protein: { min: 16, max: 18 },
                        energy: { min: 2.6, max: 2.8 },
                        fiber: { min: 5, max: 8 },
                        calcium: { min: 0.8, max: 1.0 },
                        phosphorus: { min: 0.5, max: 0.7 },
                        dailyIntake: { min: 8, max: 12 }
                    }
                },
                layer: {
                    weightRange: [1.5, 3.0],
                    dailyRequirements: {
                        protein: { min: 16, max: 18 },
                        energy: { min: 2.7, max: 2.9 },
                        fiber: { min: 5, max: 8 },
                        calcium: { min: 3.5, max: 4.5 },
                        phosphorus: { min: 0.5, max: 0.7 },
                        dailyIntake: { min: 100, max: 120 }
                    }
                },
                broiler: {
                    weightRange: [0.5, 3.0],
                    dailyRequirements: {
                        protein: { min: 18, max: 22 },
                        energy: { min: 3.0, max: 3.4 },
                        fiber: { min: 4, max: 6 },
                        calcium: { min: 0.9, max: 1.1 },
                        phosphorus: { min: 0.6, max: 0.8 },
                        dailyIntake: { min: 80, max: 150 }
                    }
                }
            },
            sheep: {
                lamb: {
                    weightRange: [0, 30],
                    dailyRequirements: {
                        protein: { min: 16, max: 18 },
                        energy: { min: 2.6, max: 3.0 },
                        fiber: { min: 15, max: 25 },
                        calcium: { min: 0.6, max: 0.8 },
                        phosphorus: { min: 0.4, max: 0.6 },
                        dailyIntake: { min: 3.0, max: 4.0 }
                    }
                },
                ewe: {
                    weightRange: [40, 80],
                    dailyRequirements: {
                        protein: { min: 12, max: 14 },
                        energy: { min: 2.2, max: 2.6 },
                        fiber: { min: 25, max: 35 },
                        calcium: { min: 0.4, max: 0.6 },
                        phosphorus: { min: 0.3, max: 0.4 },
                        dailyIntake: { min: 2.5, max: 3.5 }
                    }
                },
                ram: {
                    weightRange: [60, 120],
                    dailyRequirements: {
                        protein: { min: 12, max: 14 },
                        energy: { min: 2.4, max: 2.8 },
                        fiber: { min: 20, max: 30 },
                        calcium: { min: 0.4, max: 0.6 },
                        phosphorus: { min: 0.3, max: 0.4 },
                        dailyIntake: { min: 2.0, max: 3.0 }
                    }
                }
            },
            goats: {
                kid: {
                    weightRange: [0, 20],
                    dailyRequirements: {
                        protein: { min: 16, max: 18 },
                        energy: { min: 2.6, max: 3.0 },
                        fiber: { min: 15, max: 25 },
                        calcium: { min: 0.6, max: 0.8 },
                        phosphorus: { min: 0.4, max: 0.6 },
                        dailyIntake: { min: 3.0, max: 4.0 }
                    }
                },
                doe: {
                    weightRange: [30, 60],
                    dailyRequirements: {
                        protein: { min: 12, max: 14 },
                        energy: { min: 2.2, max: 2.6 },
                        fiber: { min: 25, max: 35 },
                        calcium: { min: 0.4, max: 0.6 },
                        phosphorus: { min: 0.3, max: 0.4 },
                        dailyIntake: { min: 2.5, max: 3.5 }
                    }
                },
                buck: {
                    weightRange: [40, 80],
                    dailyRequirements: {
                        protein: { min: 12, max: 14 },
                        energy: { min: 2.4, max: 2.8 },
                        fiber: { min: 20, max: 30 },
                        calcium: { min: 0.4, max: 0.6 },
                        phosphorus: { min: 0.3, max: 0.4 },
                        dailyIntake: { min: 2.0, max: 3.0 }
                    }
                }
            }
        };
    }

    initializeFeedIngredients() {
        return {
            grains: {
                'Corn/Maize': { protein: 8.5, energy: 3.4, fiber: 2.5, calcium: 0.03, phosphorus: 0.28, cost: 0.25 },
                'Wheat': { protein: 13.0, energy: 3.3, fiber: 2.5, calcium: 0.05, phosphorus: 0.36, cost: 0.28 },
                'Barley': { protein: 11.5, energy: 2.9, fiber: 5.0, calcium: 0.08, phosphorus: 0.36, cost: 0.26 },
                'Oats': { protein: 12.0, energy: 2.8, fiber: 11.0, calcium: 0.10, phosphorus: 0.35, cost: 0.30 },
                'Sorghum': { protein: 10.0, energy: 3.2, fiber: 2.5, calcium: 0.04, phosphorus: 0.30, cost: 0.24 },
                'Rice Bran': { protein: 13.0, energy: 2.8, fiber: 12.0, calcium: 0.10, phosphorus: 1.20, cost: 0.22 }
            },
            protein_sources: {
                'Soybean Meal': { protein: 48.0, energy: 2.4, fiber: 7.0, calcium: 0.30, phosphorus: 0.70, cost: 0.45 },
                'Cottonseed Meal': { protein: 41.0, energy: 2.0, fiber: 12.0, calcium: 0.20, phosphorus: 1.20, cost: 0.40 },
                'Sunflower Meal': { protein: 35.0, energy: 1.8, fiber: 18.0, calcium: 0.40, phosphorus: 1.00, cost: 0.35 },
                'Groundnut Meal': { protein: 45.0, energy: 2.2, fiber: 8.0, calcium: 0.25, phosphorus: 0.65, cost: 0.50 },
                'Fish Meal': { protein: 60.0, energy: 3.0, fiber: 0.0, calcium: 5.00, phosphorus: 3.00, cost: 1.20 }
            },
            roughages: {
                'Alfalfa Hay': { protein: 18.0, energy: 2.1, fiber: 30.0, calcium: 1.30, phosphorus: 0.25, cost: 0.35 },
                'Grass Hay': { protein: 8.0, energy: 1.8, fiber: 35.0, calcium: 0.40, phosphorus: 0.20, cost: 0.20 },
                'Corn Silage': { protein: 8.5, energy: 2.4, fiber: 25.0, calcium: 0.25, phosphorus: 0.22, cost: 0.18 },
                'Wheat Straw': { protein: 4.0, energy: 1.5, fiber: 45.0, calcium: 0.20, phosphorus: 0.10, cost: 0.12 }
            },
            supplements: {
                'Limestone': { protein: 0.0, energy: 0.0, fiber: 0.0, calcium: 38.0, phosphorus: 0.0, cost: 0.15 },
                'Dicalcium Phosphate': { protein: 0.0, energy: 0.0, fiber: 0.0, calcium: 23.0, phosphorus: 18.0, cost: 0.80 },
                'Salt': { protein: 0.0, energy: 0.0, fiber: 0.0, calcium: 0.0, phosphorus: 0.0, cost: 0.10 },
                'Vitamin Premix': { protein: 0.0, energy: 0.0, fiber: 0.0, calcium: 0.0, phosphorus: 0.0, cost: 2.00 }
            }
        };
    }

    calculateFeedMix(animalData) {
        console.log('FeedMixCalculator.calculateFeedMix called with:', animalData);
        
        const { species, weight, age, lifecycle, purpose, productionStage } = animalData;
        
        // Validate required inputs
        if (!species) {
            throw new Error('Species is required');
        }
        
        if (!weight || isNaN(weight) || weight <= 0) {
            throw new Error('Valid weight is required');
        }
        
        console.log('Processing:', { species, weight, lifecycle, purpose });
        
        // Determine nutritional requirements
        const requirements = this.getNutritionalRequirements(species, weight, lifecycle, purpose);
        
        console.log('Nutritional requirements found:', requirements);
        
        if (!requirements) {
            throw new Error(`No nutritional requirements found for ${species} ${lifecycle}`);
        }

        // Some requirement entries store nutrients under `dailyRequirements`
        // Normalize to a flat shape so downstream code can use requirements.protein.min, etc.
        const normalizedReq = requirements.dailyRequirements ? requirements.dailyRequirements : requirements;

        // Calculate daily intake based on weight
        console.log('Calculating daily intake with weight:', weight, 'and intake range:', normalizedReq.dailyIntake);
        const dailyIntake = this.calculateDailyIntake(weight, normalizedReq.dailyIntake);
        
        console.log('Daily intake calculated:', dailyIntake);
        
        // Generate feed mix
        const feedMix = this.generateOptimalMix(normalizedReq, dailyIntake, species);
        
        console.log('Feed mix generated:', feedMix);
        
        // Calculate costs
        const totalCost = this.calculateFeedCost(feedMix, dailyIntake);
        
        console.log('Total cost calculated:', totalCost);
        
        const result = {
            animal: animalData,
            requirements: normalizedReq,
            dailyIntake: dailyIntake,
            feedMix: feedMix,
            totalCost: totalCost,
            recommendations: this.generateRecommendations(feedMix, normalizedReq)
        };
        
        console.log('Final calculation result:', result);
        
        return result;
    }

    getNutritionalRequirements(species, weight, lifecycle, purpose) {
        const speciesReqs = this.nutritionalRequirements[species.toLowerCase()];
        if (!speciesReqs) {
            console.error(`Species not found: ${species}`);
            return null;
        }

        // Determine the correct category based on lifecycle and purpose
        let category = lifecycle ? lifecycle.toLowerCase() : null;
        
        // Special handling for cattle with purpose
        if (species.toLowerCase() === 'cattle') {
            if (purpose && purpose.toLowerCase().includes('dairy')) {
                category = 'cow_dairy';
            } else if (purpose && purpose.toLowerCase().includes('beef')) {
                category = 'cow_beef';
            }
        }

        // Try to find the requirements
        let requirements = null;
        
        if (category) {
            requirements = speciesReqs[category];
        }
        
        // Fallback: try original lifecycle value
        if (!requirements && lifecycle) {
            requirements = speciesReqs[lifecycle.toLowerCase()];
        }
        
        // Fallback: try to find by weight range
        if (!requirements && weight) {
            for (const [stage, reqs] of Object.entries(speciesReqs)) {
                if (reqs.weightRange && 
                    weight >= reqs.weightRange[0] && 
                    weight <= reqs.weightRange[1]) {
                    requirements = reqs;
                    console.log(`Found requirements by weight range: ${stage}`);
                    break;
                }
            }
        }
        
        // Fallback: use first available stage as default
        if (!requirements) {
            const firstStage = Object.keys(speciesReqs)[0];
            requirements = speciesReqs[firstStage];
            console.warn(`Using default stage (${firstStage}) for ${species}`);
        }

        return requirements;
    }

    calculateDailyIntake(weight, intakeRange) {
        console.log('calculateDailyIntake called with:', { weight, intakeRange });
        
        // Validate inputs
        if (!intakeRange || typeof intakeRange.min === 'undefined' || typeof intakeRange.max === 'undefined') {
            console.error('Invalid intakeRange:', intakeRange);
            console.log('Using default intake range');
            // Provide default values
            intakeRange = { min: 2.0, max: 3.0 };
        }
        
        // Ensure weight is a valid number
        if (!weight || isNaN(weight) || weight <= 0) {
            console.error('Invalid weight:', weight);
            weight = 100; // Default weight
        }
        
        // Calculate daily intake as percentage of body weight
        const minIntake = (weight * intakeRange.min) / 100;
        const maxIntake = (weight * intakeRange.max) / 100;
        const avgIntake = (minIntake + maxIntake) / 2;
        
        console.log('Daily intake calculation:', { minIntake, maxIntake, avgIntake });
        
        return {
            min: minIntake,
            max: maxIntake,
            recommended: avgIntake
        };
    }

    generateOptimalMix(requirements, dailyIntake, species) {
        const mix = {};
        let totalPercentage = 0;

        // Base roughage (40-60% for ruminants, 10-20% for monogastrics)
        const roughagePercentage = species.toLowerCase() === 'chickens' || species.toLowerCase() === 'pigs' ? 15 : 50;
        
        if (roughagePercentage > 0) {
            mix['Alfalfa Hay'] = roughagePercentage;
            totalPercentage += roughagePercentage;
        }

        // Energy source (grains)
        const energyPercentage = 35;
        mix['Corn/Maize'] = energyPercentage;
        totalPercentage += energyPercentage;

        // Protein source
        const proteinPercentage = 25;
        if (species.toLowerCase() === 'pigs' || species.toLowerCase() === 'chickens') {
            mix['Soybean Meal'] = proteinPercentage;
        } else {
            mix['Cottonseed Meal'] = proteinPercentage;
        }
        totalPercentage += proteinPercentage;

        // Minerals and supplements
        mix['Limestone'] = 1.5;
        mix['Dicalcium Phosphate'] = 1.0;
        mix['Salt'] = 0.5;
        mix['Vitamin Premix'] = 0.5;
        totalPercentage += 3.5;

        // Adjust percentages to total 100%
        const adjustmentFactor = 100 / totalPercentage;
        for (const ingredient in mix) {
            mix[ingredient] = Math.round(mix[ingredient] * adjustmentFactor * 10) / 10;
        }

        return mix;
    }

    calculateFeedCost(feedMix, dailyIntake) {
        let totalCostPerKg = 0;
        
        for (const [ingredient, percentage] of Object.entries(feedMix)) {
            const cost = this.getIngredientCost(ingredient);
            totalCostPerKg += (cost * percentage) / 100;
        }

        return {
            costPerKg: Math.round(totalCostPerKg * 100) / 100,
            dailyCost: Math.round(totalCostPerKg * dailyIntake.recommended * 100) / 100,
            monthlyCost: Math.round(totalCostPerKg * dailyIntake.recommended * 30 * 100) / 100,
            annualCost: Math.round(totalCostPerKg * dailyIntake.recommended * 365 * 100) / 100
        };
    }

    getIngredientCost(ingredientName) {
        for (const category of Object.values(this.feedIngredients)) {
            if (category[ingredientName]) {
                return category[ingredientName].cost;
            }
        }
        return 0.50; // Default cost if ingredient not found
    }

    generateRecommendations(feedMix, requirements) {
        const recommendations = [];

        // Check protein levels
        const totalProtein = this.calculateNutrientContent(feedMix, 'protein');
        if (totalProtein < requirements.protein.min) {
            recommendations.push({
                type: 'warning',
                message: `Protein content (${totalProtein.toFixed(1)}%) is below minimum requirement (${requirements.protein.min}%). Consider increasing protein sources.`
            });
        } else if (totalProtein > requirements.protein.max) {
            recommendations.push({
                type: 'info',
                message: `Protein content (${totalProtein.toFixed(1)}%) is above maximum requirement (${requirements.protein.max}%). Consider reducing protein sources to save costs.`
            });
        }

        // Check energy levels
        const totalEnergy = this.calculateNutrientContent(feedMix, 'energy');
        if (totalEnergy < requirements.energy.min) {
            recommendations.push({
                type: 'warning',
                message: `Energy content (${totalEnergy.toFixed(2)} Mcal/kg) is below minimum requirement (${requirements.energy.min} Mcal/kg). Consider increasing energy sources.`
            });
        }

        // Check calcium levels
        const totalCalcium = this.calculateNutrientContent(feedMix, 'calcium');
        if (totalCalcium < requirements.calcium.min) {
            recommendations.push({
                type: 'warning',
                message: `Calcium content (${totalCalcium.toFixed(2)}%) is below minimum requirement (${requirements.calcium.min}%). Consider increasing limestone or calcium sources.`
            });
        }

        // Check phosphorus levels
        const totalPhosphorus = this.calculateNutrientContent(feedMix, 'phosphorus');
        if (totalPhosphorus < requirements.phosphorus.min) {
            recommendations.push({
                type: 'warning',
                message: `Phosphorus content (${totalPhosphorus.toFixed(2)}%) is below minimum requirement (${requirements.phosphorus.min}%). Consider increasing phosphorus sources.`
            });
        }

        if (recommendations.length === 0) {
            recommendations.push({
                type: 'success',
                message: 'Feed mix meets all nutritional requirements. This is an optimal formulation.'
            });
        }

        return recommendations;
    }

    calculateNutrientContent(feedMix, nutrient) {
        let totalNutrient = 0;
        
        for (const [ingredient, percentage] of Object.entries(feedMix)) {
            const nutrientValue = this.getNutrientValue(ingredient, nutrient);
            totalNutrient += (nutrientValue * percentage) / 100;
        }
        
        return totalNutrient;
    }

    getNutrientValue(ingredientName, nutrient) {
        for (const category of Object.values(this.feedIngredients)) {
            if (category[ingredientName]) {
                return category[ingredientName][nutrient] || 0;
            }
        }
        return 0;
    }

    // Get available lifecycle stages for a species
    getLifecycleStages(species) {
        const speciesReqs = this.nutritionalRequirements[species.toLowerCase()];
        if (!speciesReqs) return [];
        
        return Object.keys(speciesReqs).map(stage => ({
            value: stage,
            label: this.formatLifecycleLabel(stage)
        }));
    }

    formatLifecycleLabel(stage) {
        return stage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Get all available species
    getAvailableSpecies() {
        return Object.keys(this.nutritionalRequirements).map(species => ({
            value: species,
            label: species.charAt(0).toUpperCase() + species.slice(1)
        }));
    }
}

// Create global instance
window.FeedMixCalculator = new FeedMixCalculator();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeedMixCalculator;
}

console.log('🌾 Feed Mix Calculator initialized');
