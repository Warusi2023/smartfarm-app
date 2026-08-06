/**
 * SmartFarm AI Advisory Routes
 * AI-powered agricultural recommendations and advisory endpoints
 */

const express = require('express');
const { validate } = require('../middleware/validator');
const { cacheMiddleware } = require('../middleware/cache-middleware');
const { CACHE_TTL } = require('../config/cache-config');
const { buildLivestockHealthAdvice } = require('../services/livestockHealthAdvice');

class AIAdvisoryRoutes {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        // Crop nutrition advice endpoint (cached - computed recommendations)
        this.router.get('/crop-nutrition/:cropId', 
            cacheMiddleware('ai-advisory:crop-nutrition', CACHE_TTL.AI_ADVISORY, (req) => 
                `ai-advisory:crop-nutrition:${req.params.cropId}:stage:${req.query.growthStage || req.query.status || 'default'}`
            ),
            validate('aiAdvisory.cropNutrition'), 
            this.getCropNutritionAdvice.bind(this)
        );
        
        // Livestock health advice endpoint (cached - computed recommendations)
        this.router.get('/livestock-health/:animalId', 
            cacheMiddleware('ai-advisory:livestock-health', CACHE_TTL.AI_ADVISORY, (req) => 
                `ai-advisory:livestock-health:${req.params.animalId}:type:${req.query.type || 'default'}:age:${req.query.age || 'default'}`
            ),
            validate('aiAdvisory.livestockHealth'), 
            this.getLivestockHealthAdvice.bind(this)
        );
    }

    /**
     * Get AI nutrition advice for a crop
     * GET /api/ai-advisory/crop-nutrition/:cropId
     */
    async getCropNutritionAdvice(req, res) {
        try {
            const { cropId } = req.params;

            // In production, fetch crop data from database
            // For now, generate AI recommendations based on crop type and growth stage
            
            // Mock crop data - in production, fetch from database
            const crop = {
                id: cropId,
                name: req.query.name || 'Crop',
                variety: req.query.variety || 'Standard',
                growthStage: req.query.growthStage || 'vegetative',
                plantingDate: req.query.plantingDate || new Date().toISOString(),
                field: req.query.field || 'Field 1'
            };

            // Generate AI recommendations
            const recommendations = this.generateCropNutritionAdvice(crop);

            res.json({
                success: true,
                message: 'AI nutrition advice generated successfully',
                data: recommendations
            });

        } catch (error) {
            console.error('Error generating crop nutrition advice:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate AI nutrition advice',
                code: 'AI_ADVICE_ERROR'
            });
        }
    }

    /**
     * Generate crop nutrition advice based on crop data
     */
    generateCropNutritionAdvice(crop) {
        const growthStage = crop.growthStage || 'vegetative';
        const cropName = crop.name?.toLowerCase() || 'crop';
        
        // Determine growth stage
        let stage = 'vegetative';
        if (growthStage.includes('seedling') || growthStage.includes('early')) {
            stage = 'seedling';
        } else if (growthStage.includes('flowering') || growthStage.includes('bloom')) {
            stage = 'flowering';
        } else if (growthStage.includes('fruiting') || growthStage.includes('fruit')) {
            stage = 'fruiting';
        } else if (growthStage.includes('mature') || growthStage.includes('harvest')) {
            stage = 'mature';
        }

        // Generate recommendations based on crop type and growth stage
        const recommendations = {
            growthStage: stage,
            nutrients: this.getNutrientRecommendations(cropName, stage),
            fertilizer: this.getFertilizerRecommendations(cropName, stage),
            watering: this.getWateringRecommendations(cropName, stage),
            timing: this.getTimingRecommendations(stage),
            warnings: this.getWarnings(cropName, stage),
            tips: this.getNutritionTips(cropName, stage)
        };

        return recommendations;
    }

    /**
     * Get nutrient recommendations
     */
    getNutrientRecommendations(cropName, stage) {
        const baseNutrients = {
            nitrogen: { value: 50, unit: 'kg/ha', priority: 'high' },
            phosphorus: { value: 30, unit: 'kg/ha', priority: 'medium' },
            potassium: { value: 40, unit: 'kg/ha', priority: 'high' },
            calcium: { value: 20, unit: 'kg/ha', priority: 'low' },
            magnesium: { value: 15, unit: 'kg/ha', priority: 'low' }
        };

        // Adjust based on growth stage
        if (stage === 'seedling') {
            baseNutrients.nitrogen.value = 30;
            baseNutrients.phosphorus.value = 40; // Higher for root development
            baseNutrients.potassium.value = 25;
        } else if (stage === 'flowering') {
            baseNutrients.nitrogen.value = 40;
            baseNutrients.phosphorus.value = 50; // Critical for flowering
            baseNutrients.potassium.value = 60; // High for fruit development
        } else if (stage === 'fruiting') {
            baseNutrients.nitrogen.value = 35;
            baseNutrients.phosphorus.value = 45;
            baseNutrients.potassium.value = 70; // Very high for fruit quality
        } else if (stage === 'mature') {
            baseNutrients.nitrogen.value = 20;
            baseNutrients.phosphorus.value = 25;
            baseNutrients.potassium.value = 30;
        }

        // Adjust for specific crop types
        if (cropName.includes('tomato') || cropName.includes('pepper')) {
            baseNutrients.calcium.value = 40; // Higher for tomatoes
            baseNutrients.calcium.priority = 'high';
        }

        if (cropName.includes('corn') || cropName.includes('maize')) {
            baseNutrients.nitrogen.value *= 1.5; // Corn needs more nitrogen
        }

        return baseNutrients;
    }

    /**
     * Get fertilizer recommendations
     */
    getFertilizerRecommendations(cropName, stage) {
        const fertilizers = [];

        if (stage === 'seedling') {
            fertilizers.push({
                name: 'Starter Fertilizer (NPK 10-20-10)',
                amount: '50-75 kg/ha',
                application: 'Apply at planting or 1 week after',
                reason: 'Promotes strong root development'
            });
        } else if (stage === 'vegetative') {
            fertilizers.push({
                name: 'Balanced Fertilizer (NPK 15-15-15)',
                amount: '100-150 kg/ha',
                application: 'Apply every 2-3 weeks',
                reason: 'Supports healthy vegetative growth'
            });
        } else if (stage === 'flowering') {
            fertilizers.push({
                name: 'High Phosphorus Fertilizer (NPK 10-30-20)',
                amount: '75-100 kg/ha',
                application: 'Apply at first sign of flowering',
                reason: 'Essential for flower and fruit set'
            });
        } else if (stage === 'fruiting') {
            fertilizers.push({
                name: 'High Potassium Fertilizer (NPK 5-15-30)',
                amount: '50-75 kg/ha',
                application: 'Apply every 2 weeks during fruiting',
                reason: 'Improves fruit quality and size'
            });
        }

        return fertilizers;
    }

    /**
     * Get watering recommendations
     */
    getWateringRecommendations(cropName, stage) {
        const recommendations = {
            frequency: 'Daily',
            amount: '2-3 cm',
            timing: 'Early morning',
            method: 'Drip irrigation recommended'
        };

        if (stage === 'seedling') {
            recommendations.frequency = '2-3 times daily';
            recommendations.amount = '1-2 cm';
            recommendations.method = 'Gentle sprinkling to avoid soil disturbance';
        } else if (stage === 'vegetative') {
            recommendations.frequency = 'Every 1-2 days';
            recommendations.amount = '2-3 cm';
        } else if (stage === 'flowering' || stage === 'fruiting') {
            recommendations.frequency = 'Daily';
            recommendations.amount = '3-4 cm';
            recommendations.timing = 'Early morning or late evening';
        } else if (stage === 'mature') {
            recommendations.frequency = 'Every 2-3 days';
            recommendations.amount = '2-3 cm';
        }

        return recommendations;
    }

    /**
     * Get timing recommendations
     */
    getTimingRecommendations(stage) {
        const timing = {
            nextFertilization: 'In 2 weeks',
            nextWatering: 'Today',
            criticalPeriod: 'Current stage'
        };

        if (stage === 'seedling') {
            timing.nextFertilization = 'In 1 week';
            timing.criticalPeriod = 'Root establishment (next 2-3 weeks)';
        } else if (stage === 'flowering') {
            timing.nextFertilization = 'Immediately';
            timing.criticalPeriod = 'Flower set (next 1-2 weeks)';
        } else if (stage === 'fruiting') {
            timing.nextFertilization = 'In 1 week';
            timing.criticalPeriod = 'Fruit development (next 4-6 weeks)';
        }

        return timing;
    }

    /**
     * Get warnings
     */
    getWarnings(cropName, stage) {
        const warnings = [];

        if (stage === 'flowering' || stage === 'fruiting') {
            warnings.push({
                type: 'critical',
                message: 'Avoid water stress during flowering and fruiting stages',
                impact: 'Can significantly reduce yield'
            });
        }

        if (stage === 'seedling') {
            warnings.push({
                type: 'warning',
                message: 'Protect seedlings from extreme weather conditions',
                impact: 'Young plants are sensitive to temperature fluctuations'
            });
        }

        warnings.push({
            type: 'info',
            message: 'Monitor soil pH regularly (optimal: 6.0-7.0)',
            impact: 'Affects nutrient availability'
        });

        return warnings;
    }

    /**
     * Get nutrition tips
     */
    getNutritionTips(cropName, stage) {
        const tips = [];

        tips.push('Test soil before applying fertilizers to avoid over-fertilization');
        tips.push('Use organic compost to improve soil structure and nutrient retention');
        
        if (stage === 'flowering') {
            tips.push('Increase phosphorus application to support flower development');
            tips.push('Maintain consistent moisture levels to prevent flower drop');
        }

        if (stage === 'fruiting') {
            tips.push('Increase potassium for better fruit quality and disease resistance');
            tips.push('Avoid excessive nitrogen which can delay fruiting');
        }

        tips.push('Apply fertilizers in split doses rather than all at once');
        tips.push('Water deeply but less frequently to encourage deep root growth');

        return tips;
    }

    /**
     * Get AI health advice for livestock
     * GET /api/ai-advisory/livestock-health/:animalId
     */
    async getLivestockHealthAdvice(req, res) {
        try {
            const { animalId } = req.params;

            // Client must pass species via ?type= (from animal.species). No cattle default.
            const recommendations = buildLivestockHealthAdvice({
                id: animalId,
                type: req.query.type,
                breed: req.query.breed || 'Mixed',
                age: req.query.age,
                healthStatus: req.query.healthStatus || 'healthy'
            });

            res.json({
                success: true,
                message: 'AI health advice generated successfully',
                data: recommendations
            });

        } catch (error) {
            console.error('Error generating livestock health advice:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate AI health advice',
                code: 'AI_ADVICE_ERROR'
            });
        }
    }

    generateLivestockHealthAdvice(animal) {
        return buildLivestockHealthAdvice({
            type: animal.type || animal.species,
            breed: animal.breed,
            age: animal.age,
            healthStatus: animal.healthStatus
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = AIAdvisoryRoutes;

