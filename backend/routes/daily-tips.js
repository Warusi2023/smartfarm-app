const express = require('express');
const { validate } = require('../middleware/validator');
const { asyncHandler } = require('../middleware/error-handler');
const { cacheMiddleware } = require('../middleware/cache-middleware');
const { CACHE_TTL } = require('../config/cache-config');

/**
 * Daily Farming Tips API
 * Provides personalized daily gardening and animal rearing tips based on farmer's crops and livestock
 */
class DailyTipsRoutes {
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    setupRoutes() {
        // Get personalized tip based on user's crops and livestock (cached - changes daily)
        this.router.get('/personalized', 
            cacheMiddleware('daily-tips:personalized', CACHE_TTL.DAILY_TIPS, (req) => {
                const date = new Date().toISOString().split('T')[0];
                return `daily-tips:personalized:${date}:crops:${req.query.crops || 'none'}:livestock:${req.query.livestock || 'none'}`;
            }),
            validate('dailyTips.personalized'), 
            asyncHandler(async (req, res) => {
            const { crops, livestock } = req.query;
            
            // Parse crops and livestock from query params
            let cropsData = [];
            let livestockData = [];
            
            if (crops) {
                try {
                    cropsData = typeof crops === 'string' ? JSON.parse(crops) : crops;
                } catch (e) {
                    cropsData = [];
                }
            }
            
            if (livestock) {
                try {
                    livestockData = typeof livestock === 'string' ? JSON.parse(livestock) : livestock;
                } catch (e) {
                    livestockData = [];
                }
            }

            const tip = this.getPersonalizedTip(cropsData, livestockData);
            res.json({
                success: true,
                tip: tip,
                date: new Date().toISOString().split('T')[0],
                basedOn: {
                    crops: cropsData.length,
                    livestock: livestockData.length
                }
            });
        }));

        // Get today's tip (fallback for when no crops/livestock data available) (cached - changes daily)
        this.router.get('/today', 
            cacheMiddleware('daily-tips:today', CACHE_TTL.DAILY_TIPS, (req) => {
                const date = new Date().toISOString().split('T')[0];
                return `daily-tips:today:${date}`;
            }),
            validate('dailyTips.today'), 
            asyncHandler((req, res) => {
            const tip = this.getTodaysTip();
            res.json({
                success: true,
                tip: tip,
                date: new Date().toISOString().split('T')[0]
            });
        }));

        // Get tip by date (cached - static per date)
        this.router.get('/date/:date', 
            cacheMiddleware('daily-tips:date', CACHE_TTL.DAILY_TIPS, (req) => 
                `daily-tips:date:${req.params.date}`
            ),
            validate('dailyTips.byDate'), 
            asyncHandler((req, res) => {
            const { date } = req.params;
            const tip = this.getTipByDate(date);
            res.json({
                success: true,
                tip: tip,
                date: date
            });
        }));

        // Get tips by category (cached - static data)
        this.router.get('/category/:category', 
            cacheMiddleware('daily-tips:category', CACHE_TTL.DAILY_TIPS, (req) => 
                `daily-tips:category:${req.params.category}`
            ),
            validate('dailyTips.byCategory'), 
            asyncHandler((req, res) => {
            const { category } = req.params;
            const tips = this.getTipsByCategory(category);
            res.json({
                success: true,
                tips: tips,
                category: category
            });
        }));

        // Get all tips (for browsing) (cached - static data)
        this.router.get('/all', 
            cacheMiddleware('daily-tips:all', CACHE_TTL.DAILY_TIPS),
            validate('dailyTips.all'), 
            asyncHandler((req, res) => {
            const tips = this.getAllTips();
            res.json({
                success: true,
                tips: tips,
                total: tips.length
            });
        }));
    }

    /**
     * Get personalized tip based on user's crops and livestock
     */
    getPersonalizedTip(crops = [], livestock = []) {
        // If no crops or livestock, return generic tip
        if (crops.length === 0 && livestock.length === 0) {
            return this.getTodaysTip();
        }

        // Determine which category to prioritize
        const hasCrops = crops.length > 0;
        const hasLivestock = livestock.length > 0;

        // Get crop-specific tips
        if (hasCrops) {
            const cropTip = this.getCropSpecificTip(crops);
            if (cropTip) return cropTip;
        }

        // Get livestock-specific tips
        if (hasLivestock) {
            const livestockTip = this.getLivestockSpecificTip(livestock);
            if (livestockTip) return livestockTip;
        }

        // Fallback to generic tip
        return this.getTodaysTip();
    }

    /**
     * Get crop-specific tip based on what crops the farmer is growing
     */
    getCropSpecificTip(crops) {
        // Extract crop names/types
        const cropNames = crops.map(c => (c.name || c.cropName || c.variety || '').toLowerCase());
        const cropTypes = crops.map(c => (c.type || c.cropType || '').toLowerCase());
        const growthStages = crops.map(c => (c.status || c.growthStage || c.stage || '').toLowerCase());

        // Find most common crop type
        const cropTypeCounts = {};
        cropTypes.forEach(type => {
            if (type) cropTypeCounts[type] = (cropTypeCounts[type] || 0) + 1;
        });
        const mostCommonType = Object.keys(cropTypeCounts).sort((a, b) => cropTypeCounts[b] - cropTypeCounts[a])[0];

        // Get tips for specific crops
        const cropTips = this.getCropTips();
        
        // Match tips to crops
        for (const cropName of cropNames) {
            const matchingTip = cropTips.find(tip => 
                tip.crops && tip.crops.some(c => cropName.includes(c.toLowerCase()) || c.toLowerCase().includes(cropName))
            );
            if (matchingTip) return matchingTip;
        }

        // Match tips to crop types
        if (mostCommonType) {
            const typeTip = cropTips.find(tip => 
                tip.cropTypes && tip.cropTypes.some(t => mostCommonType.includes(t.toLowerCase()) || t.toLowerCase().includes(mostCommonType))
            );
            if (typeTip) return typeTip;
        }

        // Match tips to growth stages
        const hasSeedling = growthStages.some(s => s.includes('seedling') || s.includes('planting'));
        const hasFlowering = growthStages.some(s => s.includes('flowering') || s.includes('bloom'));
        const hasFruiting = growthStages.some(s => s.includes('fruiting') || s.includes('harvest'));

        if (hasSeedling) {
            const seedlingTip = cropTips.find(tip => tip.stage === 'seedling');
            if (seedlingTip) return seedlingTip;
        }
        if (hasFlowering) {
            const floweringTip = cropTips.find(tip => tip.stage === 'flowering');
            if (floweringTip) return floweringTip;
        }
        if (hasFruiting) {
            const fruitingTip = cropTips.find(tip => tip.stage === 'fruiting');
            if (fruitingTip) return fruitingTip;
        }

        // Return general crop tip
        return cropTips.find(tip => tip.general) || cropTips[0];
    }

    /**
     * Get livestock-specific tip based on what animals the farmer has
     */
    getLivestockSpecificTip(livestock) {
        // Extract livestock types/breeds
        const livestockTypes = livestock.map(l => (l.type || l.animalType || l.species || '').toLowerCase());
        const breeds = livestock.map(l => (l.breed || '').toLowerCase());
        const healthStatuses = livestock.map(l => (l.healthStatus || l.status || '').toLowerCase());

        // Find most common livestock type
        const typeCounts = {};
        livestockTypes.forEach(type => {
            if (type) typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        const mostCommonType = Object.keys(typeCounts).sort((a, b) => typeCounts[b] - typeCounts[a])[0];

        // Get tips for specific livestock
        const livestockTips = this.getLivestockTips();

        // Match tips to livestock types
        if (mostCommonType) {
            const typeTip = livestockTips.find(tip => 
                tip.livestockTypes && tip.livestockTypes.some(t => 
                    mostCommonType.includes(t.toLowerCase()) || t.toLowerCase().includes(mostCommonType)
                )
            );
            if (typeTip) return typeTip;
        }

        // Match tips to health status
        const hasUnhealthy = healthStatuses.some(s => s.includes('sick') || s.includes('ill') || s.includes('unhealthy'));
        if (hasUnhealthy) {
            const healthTip = livestockTips.find(tip => tip.healthFocus);
            if (healthTip) return healthTip;
        }

        // Return general livestock tip
        return livestockTips.find(tip => tip.general) || livestockTips[0];
    }

    /**
     * Get crop-specific tips
     */
    getCropTips() {
        return [
            // Tomato-specific tips
            {
                id: 101,
                category: 'gardening',
                title: 'Tomato Pruning for Better Yield',
                content: 'Remove suckers (side shoots) from tomato plants weekly. Keep only the main stem and 2-3 strong branches. This improves air circulation and directs energy to fruit production.',
                icon: '🍅',
                crops: ['tomato', 'tomatoes'],
                cropTypes: ['vegetable', 'solanaceae'],
                stage: 'fruiting',
                tags: ['tomato', 'pruning', 'yield']
            },
            {
                id: 102,
                category: 'gardening',
                title: 'Tomato Watering Best Practices',
                content: 'Water tomatoes at the base, not the leaves. Keep soil consistently moist but not waterlogged. Mulch around plants to retain moisture and prevent soil splash on leaves.',
                icon: '🍅',
                crops: ['tomato', 'tomatoes'],
                cropTypes: ['vegetable'],
                tags: ['tomato', 'watering', 'disease-prevention']
            },
            {
                id: 103,
                category: 'gardening',
                title: 'Tomato Seedling Care',
                content: 'Start tomato seeds indoors 6-8 weeks before last frost. Transplant when seedlings have 2-3 true leaves. Harden off gradually before planting outdoors.',
                icon: '🍅',
                crops: ['tomato', 'tomatoes'],
                stage: 'seedling',
                tags: ['tomato', 'seed-starting', 'transplanting']
            },
            
            // Corn-specific tips
            {
                id: 104,
                category: 'gardening',
                title: 'Corn Pollination Success',
                content: 'Plant corn in blocks of at least 4 rows for proper pollination. Space plants 12-18 inches apart. Corn is wind-pollinated, so block planting ensures good kernel development.',
                icon: '🌽',
                crops: ['corn', 'maize'],
                cropTypes: ['grain', 'cereal'],
                stage: 'flowering',
                tags: ['corn', 'pollination', 'spacing']
            },
            {
                id: 105,
                category: 'gardening',
                title: 'Corn Watering During Tasseling',
                content: 'Corn needs consistent water during tasseling and silking (critical period). Provide 1-1.5 inches of water per week. Water stress during this stage reduces yield significantly.',
                icon: '🌽',
                crops: ['corn', 'maize'],
                stage: 'flowering',
                tags: ['corn', 'watering', 'critical-period']
            },
            
            // Wheat/Grain tips
            {
                id: 106,
                category: 'gardening',
                title: 'Wheat Growth Stage Monitoring',
                content: 'Monitor wheat growth stages carefully. Apply nitrogen fertilizer at tillering stage (4-6 weeks after planting). Avoid late nitrogen applications which can cause lodging.',
                icon: '🌾',
                crops: ['wheat', 'barley', 'oats', 'rye'],
                cropTypes: ['grain', 'cereal'],
                stage: 'vegetative',
                tags: ['wheat', 'fertilizer', 'growth-stages']
            },
            
            // Rice tips
            {
                id: 107,
                category: 'gardening',
                title: 'Rice Water Management',
                content: 'Maintain 2-4 inches of standing water in rice fields during vegetative growth. Drain fields briefly before flowering to allow root aeration, then re-flood.',
                icon: '🌾',
                crops: ['rice'],
                cropTypes: ['grain'],
                tags: ['rice', 'water-management', 'flooding']
            },
            
            // Potato tips
            {
                id: 108,
                category: 'gardening',
                title: 'Potato Hilling Technique',
                content: 'Hill potatoes when plants are 6-8 inches tall. Mound soil around stems to cover lower leaves. Repeat every 2-3 weeks. This prevents greening and increases yield.',
                icon: '🥔',
                crops: ['potato', 'potatoes'],
                cropTypes: ['vegetable', 'tuber'],
                tags: ['potato', 'hilling', 'yield']
            },
            {
                id: 109,
                category: 'gardening',
                title: 'Potato Blight Prevention',
                content: 'Prevent late blight by ensuring good air circulation, watering at soil level, and applying fungicide preventatively. Remove infected plants immediately.',
                icon: '🥔',
                crops: ['potato', 'potatoes'],
                tags: ['potato', 'disease-prevention', 'blight']
            },
            
            // General crop tips by stage
            {
                id: 110,
                category: 'gardening',
                title: 'Seedling Care Essentials',
                content: 'Keep seedlings warm (65-75°F) and provide 14-16 hours of light daily. Water from bottom to prevent damping off. Thin seedlings when they have 2-3 true leaves.',
                icon: '🌱',
                stage: 'seedling',
                general: true,
                tags: ['seedling', 'care', 'lighting']
            },
            {
                id: 111,
                category: 'gardening',
                title: 'Flowering Stage Nutrition',
                content: 'During flowering, increase phosphorus application to support flower development. Reduce nitrogen slightly to prevent excessive vegetative growth at the expense of flowers.',
                icon: '🌸',
                stage: 'flowering',
                general: true,
                tags: ['flowering', 'fertilizer', 'phosphorus']
            },
            {
                id: 112,
                category: 'gardening',
                title: 'Fruiting Stage Care',
                content: 'During fruiting, maintain consistent moisture to prevent fruit cracking. Increase potassium for better fruit quality. Support heavy fruit with stakes or cages.',
                icon: '🍎',
                stage: 'fruiting',
                general: true,
                tags: ['fruiting', 'potassium', 'support']
            },
            
            // General crop tips
            {
                id: 113,
                category: 'gardening',
                title: 'Water Early Morning',
                content: 'Water your crops early in the morning (6-8 AM) to minimize evaporation and allow leaves to dry before evening, reducing disease risk.',
                icon: '💧',
                general: true,
                tags: ['watering', 'timing', 'disease-prevention']
            },
            {
                id: 114,
                category: 'gardening',
                title: 'Monitor for Pests Daily',
                content: 'Check your crops daily for pests and diseases. Early detection allows for organic treatment before problems spread. Look under leaves and check stems.',
                icon: '🔍',
                general: true,
                tags: ['pest-control', 'monitoring', 'early-detection']
            }
        ];
    }

    /**
     * Get livestock-specific tips
     */
    getLivestockTips() {
        return [
            // Cattle-specific tips
            {
                id: 201,
                category: 'animal-rearing',
                title: 'Cattle Grazing Management',
                content: 'Rotate cattle pastures every 7-14 days to prevent overgrazing and allow grass recovery. This improves pasture health and reduces parasite load.',
                icon: '🐄',
                livestockTypes: ['cattle', 'cow', 'beef', 'dairy'],
                tags: ['cattle', 'grazing', 'rotation']
            },
            {
                id: 202,
                category: 'animal-rearing',
                title: 'Dairy Cow Milking Schedule',
                content: 'Maintain consistent milking times (morning and evening). Clean udders before milking. Ensure proper milking equipment hygiene to prevent mastitis.',
                icon: '🐄',
                livestockTypes: ['dairy', 'cow'],
                tags: ['dairy', 'milking', 'hygiene']
            },
            {
                id: 203,
                category: 'animal-rearing',
                title: 'Cattle Heat Stress Prevention',
                content: 'Provide shade and clean water during hot weather. Avoid handling cattle during peak heat hours. Watch for signs of heat stress: rapid breathing, drooling, restlessness.',
                icon: '🐄',
                livestockTypes: ['cattle', 'cow'],
                tags: ['cattle', 'heat-stress', 'summer-care']
            },
            
            // Poultry-specific tips
            {
                id: 204,
                category: 'animal-rearing',
                title: 'Chicken Egg Collection',
                content: 'Collect eggs 2-3 times daily, especially in hot weather. Store eggs pointy-end down at 45-55°F. Clean dirty eggs gently with dry cloth, avoid washing unless necessary.',
                icon: '🐔',
                livestockTypes: ['chicken', 'poultry', 'hen'],
                tags: ['chicken', 'eggs', 'collection']
            },
            {
                id: 205,
                category: 'animal-rearing',
                title: 'Chicken Coop Ventilation',
                content: 'Ensure good ventilation in chicken coop to prevent respiratory issues. Provide 1 square foot of vent per bird. Keep vents high to avoid drafts at bird level.',
                icon: '🐔',
                livestockTypes: ['chicken', 'poultry'],
                tags: ['chicken', 'ventilation', 'coop']
            },
            {
                id: 206,
                category: 'animal-rearing',
                title: 'Poultry Feed Management',
                content: 'Feed chickens layer feed (16-18% protein) for egg production. Provide grit for digestion. Limit treats to 10% of diet. Ensure calcium source (oyster shell) for strong eggshells.',
                icon: '🐔',
                livestockTypes: ['chicken', 'poultry'],
                tags: ['chicken', 'nutrition', 'feeding']
            },
            
            // Goat-specific tips
            {
                id: 207,
                category: 'animal-rearing',
                title: 'Goat Hoof Trimming',
                content: 'Trim goat hooves every 6-8 weeks. Overgrown hooves cause lameness and foot rot. Use proper hoof trimmers and trim gradually to avoid cutting too deep.',
                icon: '🐐',
                livestockTypes: ['goat'],
                tags: ['goat', 'hoof-care', 'trimming']
            },
            {
                id: 208,
                category: 'animal-rearing',
                title: 'Goat Parasite Control',
                content: 'Rotate deworming medications to prevent resistance. Use FAMACHA scoring to determine which goats need deworming. Practice pasture rotation to reduce parasite load.',
                icon: '🐐',
                livestockTypes: ['goat'],
                tags: ['goat', 'parasites', 'deworming']
            },
            
            // Pig-specific tips
            {
                id: 209,
                category: 'animal-rearing',
                title: 'Pig Wallowing Behavior',
                content: 'Pigs need wallowing areas to regulate body temperature. Provide mud wallows or sprinklers in hot weather. Pigs cannot sweat, so cooling is essential.',
                icon: '🐷',
                livestockTypes: ['pig', 'swine', 'hog'],
                tags: ['pig', 'cooling', 'wallowing']
            },
            {
                id: 210,
                category: 'animal-rearing',
                title: 'Pig Feed Efficiency',
                content: 'Feed pigs according to growth stage: starter (weaning-8 weeks), grower (8-12 weeks), finisher (12+ weeks). Provide clean water at all times. Avoid overfeeding to prevent waste.',
                icon: '🐷',
                livestockTypes: ['pig', 'swine'],
                tags: ['pig', 'nutrition', 'feeding']
            },
            
            // Sheep-specific tips
            {
                id: 211,
                category: 'animal-rearing',
                title: 'Sheep Shearing Timing',
                content: 'Shear sheep before hot weather (spring). Ensure sheep are dry before shearing. Provide shelter after shearing as they can get cold. Check for cuts and treat immediately.',
                icon: '🐑',
                livestockTypes: ['sheep', 'lamb'],
                tags: ['sheep', 'shearing', 'seasonal-care']
            },
            {
                id: 212,
                category: 'animal-rearing',
                title: 'Sheep Foot Rot Prevention',
                content: 'Keep sheep hooves dry and clean. Trim hooves regularly. Avoid muddy areas. Isolate animals showing signs of foot rot immediately to prevent spread.',
                icon: '🐑',
                livestockTypes: ['sheep'],
                tags: ['sheep', 'foot-rot', 'prevention']
            },
            
            // Health-focused tips
            {
                id: 213,
                category: 'animal-rearing',
                title: 'Early Disease Detection',
                content: 'Watch for early signs of illness: reduced appetite, isolation from herd, changes in behavior, discharge from eyes/nose, lameness, or unusual vocalizations. Act quickly.',
                icon: '🏥',
                healthFocus: true,
                tags: ['health', 'monitoring', 'early-detection']
            },
            
            // General livestock tips
            {
                id: 214,
                category: 'animal-rearing',
                title: 'Provide Clean Water Always',
                content: 'Ensure all animals have access to clean, fresh water at all times. Change water daily and clean containers regularly. Dehydration affects health and production.',
                icon: '💧',
                general: true,
                tags: ['water', 'hygiene', 'health']
            },
            {
                id: 215,
                category: 'animal-rearing',
                title: 'Regular Health Checks',
                content: 'Perform weekly health checks: examine eyes, nose, coat, hooves, and behavior. Early detection of issues saves lives and reduces treatment costs.',
                icon: '🏥',
                general: true,
                tags: ['health', 'monitoring', 'prevention']
            }
        ];
    }

    /**
     * Get today's tip based on day of year (fallback)
     */
    getTodaysTip() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const tips = this.getAllTips();
        const tipIndex = dayOfYear % tips.length;
        return tips[tipIndex];
    }

    /**
     * Get tip for a specific date
     */
    getTipByDate(dateString) {
        const date = new Date(dateString);
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const tips = this.getAllTips();
        const tipIndex = dayOfYear % tips.length;
        return tips[tipIndex];
    }

    /**
     * Get tips filtered by category
     */
    getTipsByCategory(category) {
        const allTips = this.getAllTips();
        return allTips.filter(tip => tip.category === category);
    }

    /**
     * Get all available tips (generic tips for fallback)
     */
    getAllTips() {
        return [
            {
                id: 1,
                category: 'gardening',
                title: 'Water Early Morning',
                content: 'Water your plants early in the morning (6-8 AM) to minimize evaporation and allow leaves to dry before evening, reducing disease risk.',
                icon: '💧',
                tags: ['watering', 'timing', 'disease-prevention']
            },
            {
                id: 2,
                category: 'gardening',
                title: 'Test Soil pH Regularly',
                content: 'Test your soil pH every season. Most vegetables prefer pH 6.0-7.0. Adjust with lime (raise) or sulfur (lower) as needed.',
                icon: '🌱',
                tags: ['soil', 'ph', 'testing']
            },
            {
                id: 3,
                category: 'animal-rearing',
                title: 'Provide Clean Water Always',
                content: 'Ensure animals have access to clean, fresh water at all times. Change water daily and clean containers regularly to prevent disease.',
                icon: '💧',
                tags: ['water', 'hygiene', 'health']
            },
            {
                id: 4,
                category: 'animal-rearing',
                title: 'Regular Health Checks',
                content: 'Perform weekly health checks: check eyes, nose, coat, hooves, and behavior. Early detection of issues saves lives and money.',
                icon: '🏥',
                tags: ['health', 'monitoring', 'prevention']
            }
        ];
    }
}

module.exports = new DailyTipsRoutes().router;
