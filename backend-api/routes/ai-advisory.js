const express = require('express');
const router = express.Router();
const db = require('../database/init');

// Get crop nutrition recommendations
router.get('/crop-nutrition/:cropId', async (req, res) => {
    try {
        const { cropId } = req.params;
        const { weatherData, soilData } = req.query;
        
        // Get crop details
        const crop = await db.get(
            'SELECT * FROM crops WHERE id = ? AND userId = ?',
            [cropId, req.user.id]
        );
        
        if (!crop) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }
        
        // Calculate growth stage based on planting date
        const growthStage = calculateGrowthStage(crop.name, crop.plantingDate);
        
        // Get AI recommendations
        const recommendations = getCropNutritionRecommendations(
            crop.name.toLowerCase().replace(/\s+/g, '_'),
            growthStage,
            weatherData ? JSON.parse(weatherData) : null,
            soilData ? JSON.parse(soilData) : null
        );
        
        // Save recommendation to database
        const recommendationId = `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await db.run(`
            INSERT INTO ai_recommendations (
                id, userId, type, sourceType, sourceId, recommendations,
                growthStage, weatherData, soilData, createdAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            recommendationId, req.user.id, 'crop_nutrition', 'crop', cropId,
            JSON.stringify(recommendations), growthStage,
            weatherData || null, soilData || null, new Date().toISOString()
        ]);
        
        res.json({
            success: true,
            data: {
                crop: crop,
                growthStage: growthStage,
                recommendations: recommendations
            }
        });
    } catch (error) {
        console.error('Error getting crop nutrition recommendations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get crop nutrition recommendations'
        });
    }
});

// Get livestock health recommendations
router.get('/livestock-health/:livestockId', async (req, res) => {
    try {
        const { livestockId } = req.params;
        const { weatherData, healthStatus } = req.query;
        
        // Get livestock details
        const livestock = await db.get(
            'SELECT * FROM livestock WHERE id = ? AND userId = ?',
            [livestockId, req.user.id]
        );
        
        if (!livestock) {
            return res.status(404).json({
                success: false,
                error: 'Livestock not found'
            });
        }
        
        // Calculate age group based on age and type
        const ageGroup = calculateAgeGroup(livestock.animalType, livestock.age);
        
        // Get AI recommendations
        const recommendations = getLivestockHealthRecommendations(
            livestock.animalType.toLowerCase(),
            ageGroup,
            healthStatus || 'healthy',
            weatherData ? JSON.parse(weatherData) : null
        );
        
        // Save recommendation to database
        const recommendationId = `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await db.run(`
            INSERT INTO ai_recommendations (
                id, userId, type, sourceType, sourceId, recommendations,
                growthStage, weatherData, soilData, createdAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            recommendationId, req.user.id, 'livestock_health', 'livestock', livestockId,
            JSON.stringify(recommendations), ageGroup,
            weatherData || null, null, new Date().toISOString()
        ]);
        
        res.json({
            success: true,
            data: {
                livestock: livestock,
                ageGroup: ageGroup,
                recommendations: recommendations
            }
        });
    } catch (error) {
        console.error('Error getting livestock health recommendations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get livestock health recommendations'
        });
    }
});

// Get optimal timing for fertilizer application
router.post('/optimal-timing', async (req, res) => {
    try {
        const {
            cropId,
            fertilizerType,
            baseTiming,
            weatherForecast
        } = req.body;
        
        // Get crop details
        const crop = await db.get(
            'SELECT * FROM crops WHERE id = ? AND userId = ?',
            [cropId, req.user.id]
        );
        
        if (!crop) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found'
            });
        }
        
        // Calculate optimal timing based on weather forecast
        const optimalTiming = calculateOptimalTiming(baseTiming, weatherForecast);
        
        // Get weather-based recommendations
        const weatherRecommendations = getWeatherRecommendations(fertilizerType, weatherForecast);
        
        res.json({
            success: true,
            data: {
                crop: crop,
                fertilizerType: fertilizerType,
                optimalTiming: optimalTiming,
                weatherRecommendations: weatherRecommendations
            }
        });
    } catch (error) {
        console.error('Error calculating optimal timing:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to calculate optimal timing'
        });
    }
});

// Get upcoming health schedule for livestock
router.get('/health-schedule', async (req, res) => {
    try {
        const { animalType, daysAhead = 30 } = req.query;
        
        let query = `
            SELECT l.*, u.name as farmerName
            FROM livestock l
            LEFT JOIN users u ON l.userId = u.id
            WHERE l.userId = ?
        `;
        
        const params = [req.user.id];
        
        if (animalType) {
            query += ' AND l.animalType = ?';
            params.push(animalType);
        }
        
        const livestock = await db.all(query, params);
        
        // Generate health schedule for each animal
        const healthSchedule = livestock.map(animal => {
            const ageGroup = calculateAgeGroup(animal.animalType, animal.age);
            const schedule = getUpcomingHealthSchedule(
                animal.animalType.toLowerCase(),
                ageGroup,
                parseInt(daysAhead)
            );
            
            return {
                animal: animal,
                ageGroup: ageGroup,
                upcomingSchedule: schedule
            };
        });
        
        res.json({
            success: true,
            data: healthSchedule
        });
    } catch (error) {
        console.error('Error getting health schedule:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get health schedule'
        });
    }
});

// Get soil testing recommendations
router.get('/soil-testing', async (req, res) => {
    try {
        const { farmId } = req.query;
        
        // Get farm details
        const farm = await db.get(
            'SELECT * FROM farms WHERE id = ? AND userId = ?',
            [farmId, req.user.id]
        );
        
        if (!farm) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found'
            });
        }
        
        // Get soil testing recommendations
        const soilRecommendations = getSoilTestingRecommendations(farm.location);
        
        res.json({
            success: true,
            data: {
                farm: farm,
                recommendations: soilRecommendations
            }
        });
    } catch (error) {
        console.error('Error getting soil testing recommendations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get soil testing recommendations'
        });
    }
});

// Get AI recommendations history
router.get('/recommendations', async (req, res) => {
    try {
        const { type, sourceType, limit = 50 } = req.query;
        
        let query = `
            SELECT ar.*, c.name as cropName, l.animalType as livestockType
            FROM ai_recommendations ar
            LEFT JOIN crops c ON ar.sourceType = 'crop' AND ar.sourceId = c.id
            LEFT JOIN livestock l ON ar.sourceType = 'livestock' AND ar.sourceId = l.id
            WHERE ar.userId = ?
        `;
        
        const params = [req.user.id];
        
        if (type) {
            query += ' AND ar.type = ?';
            params.push(type);
        }
        
        if (sourceType) {
            query += ' AND ar.sourceType = ?';
            params.push(sourceType);
        }
        
        query += ' ORDER BY ar.createdAt DESC LIMIT ?';
        params.push(parseInt(limit));
        
        const recommendations = await db.all(query, params);
        
        res.json({
            success: true,
            data: recommendations
        });
    } catch (error) {
        console.error('Error getting recommendations history:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get recommendations history'
        });
    }
});

// Helper functions
function calculateGrowthStage(cropName, plantingDate) {
    const planting = new Date(plantingDate);
    const now = new Date();
    const daysSincePlanting = Math.floor((now - planting) / (1000 * 60 * 60 * 24));
    
    const cropStages = {
        cassava: {
            planting: 30,
            vegetative: 90,
            tuber_formation: 150,
            maturation: 300
        },
        taro: {
            planting: 21,
            vegetative: 90,
            corm_development: 180
        },
        sweet_potato: {
            planting: 14,
            vine_development: 60,
            tuber_formation: 120
        },
        spinach: {
            germination: 7,
            vegetative: 35
        },
        lettuce: {
            germination: 7,
            vegetative: 45
        },
        banana: {
            establishment: 90,
            flowering: 150
        }
    };
    
    const stages = cropStages[cropName.toLowerCase().replace(/\s+/g, '_')];
    if (!stages) return 'unknown';
    
    if (daysSincePlanting <= stages.planting) return 'planting';
    if (daysSincePlanting <= stages.vegetative) return 'vegetative';
    if (stages.tuber_formation && daysSincePlanting <= stages.tuber_formation) return 'tuber_formation';
    if (stages.corm_development && daysSincePlanting <= stages.corm_development) return 'corm_development';
    if (stages.flowering && daysSincePlanting <= stages.flowering) return 'flowering';
    if (stages.maturation && daysSincePlanting <= stages.maturation) return 'maturation';
    
    return 'mature';
}

function calculateAgeGroup(animalType, ageInMonths) {
    const ageGroups = {
        cattle: {
            calves: 6,
            heifers: 24,
            cows: 999
        },
        goats: {
            kids: 6,
            does: 999
        },
        chickens: {
            chicks: 8,
            layers: 999
        }
    };
    
    const groups = ageGroups[animalType.toLowerCase()];
    if (!groups) return 'adult';
    
    if (ageInMonths <= groups.calves || ageInMonths <= groups.kids || ageInMonths <= groups.chicks) {
        return animalType.toLowerCase() === 'cattle' ? 'calves' : 
               animalType.toLowerCase() === 'goats' ? 'kids' : 'chicks';
    }
    
    if (animalType.toLowerCase() === 'cattle' && ageInMonths <= groups.heifers) {
        return 'heifers';
    }
    
    return animalType.toLowerCase() === 'cattle' ? 'cows' : 
           animalType.toLowerCase() === 'goats' ? 'does' : 'layers';
}

function getCropNutritionRecommendations(cropType, growthStage, weatherData, soilData) {
    // This would typically use the AI advisory database
    // For now, return sample recommendations
    const recommendations = {
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
        }
    };
    
    // Apply weather adjustments
    if (weatherData && weatherData.rainfall > 20) {
        recommendations.urea.notes += " - DELAY: Heavy rain expected";
    }
    
    return recommendations;
}

function getLivestockHealthRecommendations(animalType, ageGroup, healthStatus, weatherData) {
    // This would typically use the AI advisory database
    // For now, return sample recommendations
    const recommendations = {
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
    };
    
    return recommendations;
}

function calculateOptimalTiming(baseTiming, weatherForecast) {
    const today = new Date();
    
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
    
    return new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
}

function getWeatherRecommendations(fertilizerType, weatherForecast) {
    return {
        avoid: [
            "Heavy rainfall within 24 hours",
            "Drought conditions",
            "Extreme temperatures"
        ],
        optimal: [
            "Light rain or irrigation after application",
            "Moderate temperatures (15-30°C)",
            "Calm weather conditions"
        ]
    };
}

function getUpcomingHealthSchedule(animalType, ageGroup, daysAhead) {
    // This would generate upcoming health schedule based on AI database
    return [
        {
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            treatment: "Deworming",
            type: "Preventive",
            priority: "Medium"
        },
        {
            date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            treatment: "Vaccination",
            type: "Preventive",
            priority: "High"
        }
    ];
}

function getSoilTestingRecommendations(location) {
    return {
        frequency: "Every 2-3 years",
        timing: "Before planting season",
        parameters: [
            "pH level",
            "Nitrogen (N)",
            "Phosphorus (P)",
            "Potassium (K)",
            "Organic matter"
        ],
        interpretation: {
            ph: {
                low: "< 5.5 - Add lime",
                optimal: "5.5-7.0 - Good",
                high: "> 7.0 - May need sulfur"
            }
        }
    };
}

module.exports = router;
