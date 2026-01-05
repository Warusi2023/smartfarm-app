/**
 * SmartFarm Biological Farming API Routes
 * Provides endpoints for beneficial insects, pest matching, and crop guides
 */

const express = require('express');
const router = express.Router();

// Good Insects Database
const goodInsects = [
    {
        id: 1,
        name: 'Ladybirds (Ladybugs)',
        icon: '🐞',
        description: 'Eat aphids, mites, and whiteflies',
        targets: ['Aphids', 'Mites', 'Whiteflies'],
        breedingTips: [
            'Plant marigolds and sunflowers',
            'Provide shallow water sources',
            'Avoid broad-spectrum pesticides',
            'Release early in growing season'
        ],
        releaseTiming: 'Early planting stage, before pest populations grow',
        effectiveness: 'High - Can consume 50+ aphids per day'
    },
    {
        id: 2,
        name: 'Green Lacewings',
        icon: '🦋',
        description: 'Their larvae attack aphids, thrips, caterpillar eggs',
        targets: ['Aphids', 'Thrips', 'Caterpillar Eggs', 'Spider Mites'],
        breedingTips: [
            'Plant coriander and fennel',
            'Provide nectar sources',
            'Avoid pesticides during breeding',
            'Release larvae directly on plants'
        ],
        releaseTiming: 'Early season, when pests first appear',
        effectiveness: 'Very High - Larvae are voracious predators'
    },
    {
        id: 3,
        name: 'Parasitic Wasps',
        icon: '🐝',
        description: 'Lay eggs inside caterpillars and armyworms',
        targets: ['Caterpillars', 'Armyworms', 'Tomato Hornworms', 'Cabbage Worms'],
        breedingTips: [
            'Plant basil and flowering herbs',
            'Provide small water sources',
            'Avoid spraying during wasp activity',
            'Release near pest-infested areas'
        ],
        releaseTiming: 'When caterpillars are small (early instar stage)',
        effectiveness: 'High - Parasitize pest larvae effectively'
    },
    {
        id: 4,
        name: 'Predatory Mites',
        icon: '🕷️',
        description: 'Attack spider mites',
        targets: ['Spider Mites', 'Thrips'],
        breedingTips: [
            'Maintain high humidity',
            'Avoid miticides',
            'Provide pollen sources',
            'Release on infested plants'
        ],
        releaseTiming: 'Early detection of spider mite infestation',
        effectiveness: 'Very High - Specialized spider mite predators'
    },
    {
        id: 5,
        name: 'Hoverflies',
        icon: '🪰',
        description: 'Larvae feed on aphids and soft-bodied pests',
        targets: ['Aphids', 'Soft-bodied Pests', 'Thrips'],
        breedingTips: [
            'Plant coriander and fennel',
            'Provide flowering plants',
            'Avoid pesticides',
            'Create diverse habitat'
        ],
        releaseTiming: 'Early season, when aphids appear',
        effectiveness: 'High - Larvae consume many aphids'
    },
    {
        id: 6,
        name: 'Assassin Bugs',
        icon: '🐛',
        description: 'Attack a wide range of harmful insects',
        targets: ['Caterpillars', 'Beetles', 'Aphids', 'Thrips'],
        breedingTips: [
            'Provide diverse plant habitat',
            'Avoid broad-spectrum pesticides',
            'Maintain natural areas',
            'Provide shelter and water'
        ],
        releaseTiming: 'Early season, throughout growing period',
        effectiveness: 'High - Generalist predators'
    },
    {
        id: 7,
        name: 'Ground Beetles',
        icon: '🪲',
        description: 'Feed on soil pests like cutworms',
        targets: ['Cutworms', 'Wireworms', 'Slugs', 'Snails'],
        breedingTips: [
            'Provide ground cover',
            'Maintain organic mulch',
            'Avoid soil pesticides',
            'Create permanent habitat'
        ],
        releaseTiming: 'Early season, before soil pests damage crops',
        effectiveness: 'Moderate - Effective against soil pests'
    },
    {
        id: 8,
        name: 'Spiders',
        icon: '🕸️',
        description: 'General predators of many crop pests',
        targets: ['Flying Insects', 'Crawling Pests', 'General Pest Control'],
        breedingTips: [
            'Do not kill spiders',
            'Provide diverse habitat',
            'Avoid pesticides',
            'Maintain natural areas'
        ],
        releaseTiming: 'Natural populations - support existing spiders',
        effectiveness: 'Moderate to High - Natural pest control'
    }
];

// Bad Insects (Pests) Database
const badInsects = [
    {
        id: 1,
        name: 'Aphids',
        icon: '🐛',
        description: 'Suck sap from leaves and stems, spread diseases',
        damage: 'Leaf curl, stunted growth, honeydew production',
        cropsAffected: ['Tomatoes', 'Peppers', 'Cabbage', 'Beans', 'Lettuce']
    },
    {
        id: 2,
        name: 'Whiteflies',
        icon: '🦟',
        description: 'Feed on plant sap, transmit viruses',
        damage: 'Yellowing leaves, reduced yield, sooty mold',
        cropsAffected: ['Tomatoes', 'Cucumbers', 'Eggplant', 'Okra']
    },
    {
        id: 3,
        name: 'Spider Mites',
        icon: '🕷️',
        description: 'Tiny pests that suck plant juices',
        damage: 'Yellow stippling, leaf drop, webbing',
        cropsAffected: ['Cucumbers', 'Peppers', 'Beans', 'Eggplant']
    },
    {
        id: 4,
        name: 'Armyworms / Caterpillars',
        icon: '🐛',
        description: 'Feed on leaves and fruits',
        damage: 'Holes in leaves, defoliation, fruit damage',
        cropsAffected: ['Cabbage', 'Corn', 'Tomatoes', 'Peppers']
    },
    {
        id: 5,
        name: 'Stem Borers',
        icon: '🐛',
        description: 'Larvae bore into stems',
        damage: 'Wilting, stem breakage, plant death',
        cropsAffected: ['Corn', 'Rice', 'Sugarcane']
    },
    {
        id: 6,
        name: 'Thrips',
        icon: '🪰',
        description: 'Feed on flowers and leaves',
        damage: 'Silver streaks, deformed fruits, flower damage',
        cropsAffected: ['Peppers', 'Beans', 'Okra', 'Onions']
    },
    {
        id: 7,
        name: 'Leafminers',
        icon: '🪰',
        description: 'Larvae tunnel through leaves',
        damage: 'White trails in leaves, reduced photosynthesis',
        cropsAffected: ['Tomatoes', 'Lettuce', 'Spinach']
    },
    {
        id: 8,
        name: 'Fruit Flies',
        icon: '🪰',
        description: 'Lay eggs in fruits',
        damage: 'Fruit rot, premature drop, unmarketable produce',
        cropsAffected: ['Tomatoes', 'Cucumbers', 'Melons']
    }
];

// Crop Guides Database
const cropGuides = {
    'Tomatoes': {
        badInsects: ['Whiteflies', 'Aphids', 'Leafminers', 'Caterpillar pests'],
        goodInsects: ['Ladybirds', 'Lacewings', 'Parasitic Wasps'],
        releaseTiming: '2-3 weeks after transplanting, before pests appear',
        notes: 'Monitor for early pest detection. Release beneficial insects preventively.'
    },
    'Capsicum (Bell Pepper)': {
        badInsects: ['Aphids', 'Thrips', 'Spider Mites'],
        goodInsects: ['Predatory Mites', 'Ladybirds', 'Lacewings'],
        releaseTiming: 'Early flowering stage, when first pests detected',
        notes: 'Thrips are major pest - focus on predatory mites and lacewings.'
    },
    'Cucumbers & Gourds': {
        badInsects: ['Spider Mites', 'Whiteflies'],
        goodInsects: ['Predatory Mites', 'Ladybirds'],
        releaseTiming: 'Early vine stage, before mite infestation',
        notes: 'Spider mites are critical - release predatory mites early.'
    },
    'Cabbage & Brassicas': {
        badInsects: ['Caterpillars (Armyworm, Diamondback Moth)', 'Aphids'],
        goodInsects: ['Parasitic Wasps', 'Lacewings', 'Assassin Bugs'],
        releaseTiming: 'Immediately after transplanting, before caterpillars appear',
        notes: 'Caterpillars are major threat - parasitic wasps are essential.'
    },
    'Long Beans / French Beans': {
        badInsects: ['Aphids', 'Mites', 'Thrips'],
        goodInsects: ['Ladybirds', 'Predatory Mites'],
        releaseTiming: 'Early flowering stage',
        notes: 'Aphids can be severe - ladybirds provide excellent control.'
    },
    'Eggplant (Brinjal)': {
        badInsects: ['Shoot Borer', 'Whiteflies', 'Mites'],
        goodInsects: ['Lacewings', 'Parasitic Wasps', 'Predatory Mites'],
        releaseTiming: 'Early growth stage, before shoot borer damage',
        notes: 'Shoot borer requires early intervention with parasitic wasps.'
    },
    'Okra': {
        badInsects: ['Jassids', 'Whiteflies', 'Thrips'],
        goodInsects: ['Ladybirds', 'Lacewings', 'Hoverflies'],
        releaseTiming: 'Early flowering stage',
        notes: 'Jassids can cause yellowing - use ladybirds and lacewings.'
    },
    'Lettuce & Leafy Greens': {
        badInsects: ['Aphids'],
        goodInsects: ['Hoverflies', 'Ladybirds'],
        releaseTiming: 'Early growth stage, before aphid infestation',
        notes: 'Aphids are primary pest - hoverflies are very effective.'
    },
    'Sweet Corn / Maize': {
        badInsects: ['Fall Armyworm', 'Stem Borers'],
        goodInsects: ['Parasitic Wasps', 'Assassin Bugs'],
        releaseTiming: 'Early growth stage, before armyworm damage',
        notes: 'Armyworm is critical pest - release parasitic wasps early.'
    },
    'Root Crops (Cassava, Taro, Sweet Potato)': {
        badInsects: ['Aphids', 'Weevils', 'Whiteflies'],
        goodInsects: ['Ladybirds', 'Ground Beetles'],
        releaseTiming: 'Early growth stage',
        notes: 'Weevils attack roots - ground beetles help control soil pests.'
    }
};

/**
 * GET /api/biological-farming/good-insects
 * Get all beneficial insects
 */
const { validate } = require('../middleware/validator');

router.get('/good-insects', 
    cacheMiddleware('biological-farming:good-insects', CACHE_TTL.BIOLOGICAL_FARMING),
    validate('biologicalFarming.goodInsects'), 
    (req, res) => {
    try {
        res.json({
            success: true,
            data: goodInsects,
            count: goodInsects.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch beneficial insects',
            message: error.message
        });
    }
});

/**
 * GET /api/biological-farming/good-insects/:id
 * Get a specific beneficial insect by ID
 */
router.get('/good-insects/:id', 
    cacheMiddleware('biological-farming:good-insects', CACHE_TTL.BIOLOGICAL_FARMING, (req) => 
        `biological-farming:good-insects:id:${req.params.id}`
    ),
    validate('biologicalFarming.goodInsectById'), 
    (req, res) => {
    try {
        const insect = goodInsects.find(i => i.id === parseInt(req.params.id));
        if (!insect) {
            return res.status(404).json({
                success: false,
                error: 'Beneficial insect not found'
            });
        }
        res.json({
            success: true,
            data: insect
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch beneficial insect',
            message: error.message
        });
    }
});

/**
 * GET /api/biological-farming/bad-insects
 * Get all harmful pests
 */
router.get('/bad-insects', 
    cacheMiddleware('biological-farming:bad-insects', CACHE_TTL.BIOLOGICAL_FARMING),
    validate('biologicalFarming.badInsects'), 
    (req, res) => {
    try {
        res.json({
            success: true,
            data: badInsects,
            count: badInsects.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch harmful pests',
            message: error.message
        });
    }
});

/**
 * GET /api/biological-farming/bad-insects/:id
 * Get a specific pest by ID
 */
router.get('/bad-insects/:id', 
    cacheMiddleware('biological-farming:bad-insects', CACHE_TTL.BIOLOGICAL_FARMING, (req) => 
        `biological-farming:bad-insects:id:${req.params.id}`
    ),
    validate('biologicalFarming.badInsectById'), 
    (req, res) => {
    try {
        const pest = badInsects.find(p => p.id === parseInt(req.params.id));
        if (!pest) {
            return res.status(404).json({
                success: false,
                error: 'Pest not found'
            });
        }
        res.json({
            success: true,
            data: pest
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch pest',
            message: error.message
        });
    }
});

/**
 * GET /api/biological-farming/crop-guides
 * Get all crop guides
 */
router.get('/crop-guides', 
    cacheMiddleware('biological-farming:crop-guides', CACHE_TTL.BIOLOGICAL_FARMING),
    validate('biologicalFarming.cropGuides'), 
    (req, res) => {
    try {
        res.json({
            success: true,
            data: cropGuides,
            crops: Object.keys(cropGuides)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch crop guides',
            message: error.message
        });
    }
});

/**
 * GET /api/biological-farming/crop-guides/:cropName
 * Get crop guide for a specific crop
 */
router.get('/crop-guides/:cropName', 
    cacheMiddleware('biological-farming:crop-guides', CACHE_TTL.BIOLOGICAL_FARMING, (req) => 
        `biological-farming:crop-guides:name:${req.params.cropName.toLowerCase()}`
    ),
    validate('biologicalFarming.cropGuideByName'), 
    (req, res) => {
    try {
        const cropName = req.params.cropName;
        const guide = cropGuides[cropName];
        
        if (!guide) {
            return res.status(404).json({
                success: false,
                error: 'Crop guide not found',
                availableCrops: Object.keys(cropGuides)
            });
        }
        
        res.json({
            success: true,
            crop: cropName,
            data: guide
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch crop guide',
            message: error.message
        });
    }
});

/**
 * GET /api/biological-farming/match/:pestName
 * Find beneficial insects that target a specific pest
 */
router.get('/match/:pestName', 
    cacheMiddleware('biological-farming:match', CACHE_TTL.BIOLOGICAL_FARMING, (req) => 
        `biological-farming:match:pest:${req.params.pestName.toLowerCase()}`
    ),
    validate('biologicalFarming.matchPest'), 
    (req, res) => {
    try {
        const pestName = req.params.pestName.toLowerCase();
        const matchingInsects = goodInsects.filter(insect => 
            insect.targets.some(target => 
                target.toLowerCase().includes(pestName) ||
                pestName.includes(target.toLowerCase())
            )
        );
        
        res.json({
            success: true,
            pest: req.params.pestName,
            matchingInsects: matchingInsects.map(i => ({
                id: i.id,
                name: i.name,
                icon: i.icon,
                description: i.description,
                effectiveness: i.effectiveness
            })),
            count: matchingInsects.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to match beneficial insects',
            message: error.message
        });
    }
});

/**
 * GET /api/biological-farming/recommendations/:cropName
 * Get pest control recommendations for a crop
 */
router.get('/recommendations/:cropName', 
    cacheMiddleware('biological-farming:recommendations', CACHE_TTL.BIOLOGICAL_FARMING, (req) => 
        `biological-farming:recommendations:crop:${req.params.cropName.toLowerCase()}`
    ),
    validate('biologicalFarming.recommendations'), 
    (req, res) => {
    try {
        const cropName = req.params.cropName;
        const guide = cropGuides[cropName];
        
        if (!guide) {
            return res.status(404).json({
                success: false,
                error: 'Crop guide not found',
                availableCrops: Object.keys(cropGuides)
            });
        }
        
        // Get detailed information for recommended beneficial insects
        const recommendedInsects = goodInsects.filter(insect =>
            guide.goodInsects.some(gi => 
                insect.name.toLowerCase().includes(gi.toLowerCase()) ||
                gi.toLowerCase().includes(insect.name.toLowerCase())
            )
        );
        
        res.json({
            success: true,
            crop: cropName,
            pests: guide.badInsects,
            recommendedInsects: recommendedInsects.map(i => ({
                id: i.id,
                name: i.name,
                icon: i.icon,
                description: i.description,
                targets: i.targets,
                releaseTiming: i.releaseTiming,
                effectiveness: i.effectiveness,
                breedingTips: i.breedingTips
            })),
            releaseTiming: guide.releaseTiming,
            notes: guide.notes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to get recommendations',
            message: error.message
        });
    }
});

module.exports = router;

