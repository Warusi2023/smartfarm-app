const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../database/init');

// Helper function to check farm access
async function checkFarmAccess(farmId, userId) {
    const farm = await db.get(
        'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
        [farmId, userId]
    );
    return farm !== null;
}

// Get watering recommendations based on weather and crop data
router.get('/recommendations', async (req, res) => {
    try {
        const { farmId } = req.query;
        const userId = req.user.id;

        // Verify farm access
        if (farmId) {
            const hasAccess = await checkFarmAccess(farmId, userId);
            if (!hasAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this farm'
                });
            }
        }

        // Get current crops for the farm
        const cropsQuery = `
            SELECT c.*, f.name as farmName
            FROM crops c
            LEFT JOIN farms f ON c.farmId = f.id
            WHERE f.ownerId = ? AND c.status = 'growing'
            ${farmId ? 'AND c.farmId = ?' : ''}
        `;
        const cropsParams = farmId ? [userId, farmId] : [userId];
        const crops = await db.all(cropsQuery, cropsParams);

        // Simulate weather data (in production, this would come from a weather API)
        const weatherData = {
            temperature: 28,
            humidity: 75,
            rainfall: 0,
            windSpeed: 12,
            uvIndex: 8,
            cloudCover: 30,
            season: getCurrentSeason(),
            location: 'Fiji'
        };

        // Generate watering recommendations for each crop
        const recommendations = crops.map(crop => {
            const cropData = getCropData(crop.type);
            const soilData = getSoilData(crop.soilType || 'loam');
            
            return {
                cropId: crop.id,
                cropName: crop.name,
                cropType: crop.type,
                farmName: crop.farmName,
                wateringNeed: calculateWateringNeed(cropData, weatherData, soilData),
                optimalTime: calculateOptimalTime(weatherData, cropData),
                duration: calculateWateringDuration(cropData, soilData, weatherData),
                frequency: calculateWateringFrequency(cropData, soilData, weatherData),
                priority: calculatePriority(cropData, weatherData, soilData),
                recommendations: generateSpecificRecommendations(cropData, weatherData, soilData),
                weatherImpact: assessWeatherImpact(weatherData),
                soilMoisture: estimateSoilMoisture(cropData, soilData, weatherData)
            };
        });

        // Sort by priority
        recommendations.sort((a, b) => b.priority - a.priority);

        res.json({
            success: true,
            data: {
                recommendations,
                weatherData,
                optimalTimes: calculateOptimalTimesForToday(weatherData),
                summary: {
                    totalCrops: crops.length,
                    highPriority: recommendations.filter(r => r.priority >= 8).length,
                    moderatePriority: recommendations.filter(r => r.priority >= 4 && r.priority < 8).length,
                    lowPriority: recommendations.filter(r => r.priority < 4).length
                }
            }
        });
    } catch (error) {
        console.error('Error fetching watering recommendations:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch watering recommendations'
        });
    }
});

// Get optimal watering times for today
router.get('/optimal-times', async (req, res) => {
    try {
        const weatherData = {
            temperature: 28,
            humidity: 75,
            rainfall: 0,
            windSpeed: 12,
            uvIndex: 8,
            cloudCover: 30
        };

        const optimalTimes = calculateOptimalTimesForToday(weatherData);

        res.json({
            success: true,
            data: optimalTimes
        });
    } catch (error) {
        console.error('Error fetching optimal watering times:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch optimal watering times'
        });
    }
});

// Schedule watering
router.post('/schedule', async (req, res) => {
    try {
        const { cropId, scheduledTime, duration, zone, notes } = req.body;
        const userId = req.user.id;

        // Verify crop access
        const cropQuery = `
            SELECT c.*, f.name as farmName
            FROM crops c
            LEFT JOIN farms f ON c.farmId = f.id
            WHERE c.id = ? AND f.ownerId = ?
        `;
        const crop = await db.get(cropQuery, [cropId, userId]);

        if (!crop) {
            return res.status(404).json({
                success: false,
                error: 'Crop not found or access denied'
            });
        }

        // Create watering schedule entry
        const scheduleId = uuidv4();
        const insertQuery = `
            INSERT INTO watering_schedules (id, cropId, farmId, scheduledTime, duration, zone, notes, status, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'scheduled', datetime('now'), datetime('now'))
        `;
        
        await db.run(insertQuery, [
            scheduleId,
            cropId,
            crop.farmId,
            scheduledTime,
            duration,
            zone,
            notes
        ]);

        res.json({
            success: true,
            data: {
                scheduleId,
                message: 'Watering scheduled successfully'
            }
        });
    } catch (error) {
        console.error('Error scheduling watering:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to schedule watering'
        });
    }
});

// Get watering history
router.get('/history', async (req, res) => {
    try {
        const { farmId, limit = 50 } = req.query;
        const userId = req.user.id;

        let whereClause = 'WHERE ws.farmId IN (SELECT id FROM farms WHERE ownerId = ?)';
        const params = [userId];

        if (farmId) {
            const hasAccess = await checkFarmAccess(farmId, userId);
            if (!hasAccess) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this farm'
                });
            }
            whereClause += ' AND ws.farmId = ?';
            params.push(farmId);
        }

        const query = `
            SELECT ws.*, c.name as cropName, f.name as farmName
            FROM watering_schedules ws
            LEFT JOIN crops c ON ws.cropId = c.id
            LEFT JOIN farms f ON ws.farmId = f.id
            ${whereClause}
            ORDER BY ws.scheduledTime DESC
            LIMIT ?
        `;
        params.push(parseInt(limit));

        const history = await db.all(query, params);

        res.json({
            success: true,
            data: history
        });
    } catch (error) {
        console.error('Error fetching watering history:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch watering history'
        });
    }
});

// Helper functions
function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Autumn';
    if (month >= 6 && month <= 8) return 'Winter';
    if (month >= 9 && month <= 11) return 'Spring';
    return 'Summer';
}

function getCropData(cropType) {
    const cropDatabase = {
        'tomato': {
            waterNeeds: 'high',
            rootDepth: 60,
            dailyWaterRequirement: 25,
            criticalMoistureLevel: 0.3,
            optimalWateringTime: 'early_morning',
            droughtTolerance: 'medium',
            floweringWaterSensitivity: 'high'
        },
        'lettuce': {
            waterNeeds: 'very_high',
            rootDepth: 30,
            dailyWaterRequirement: 20,
            criticalMoistureLevel: 0.4,
            optimalWateringTime: 'early_morning',
            droughtTolerance: 'low',
            floweringWaterSensitivity: 'medium'
        },
        'corn': {
            waterNeeds: 'high',
            rootDepth: 120,
            dailyWaterRequirement: 30,
            criticalMoistureLevel: 0.25,
            optimalWateringTime: 'early_morning',
            droughtTolerance: 'medium',
            floweringWaterSensitivity: 'very_high'
        },
        'pepper': {
            waterNeeds: 'medium',
            rootDepth: 45,
            dailyWaterRequirement: 18,
            criticalMoistureLevel: 0.35,
            optimalWateringTime: 'early_morning',
            droughtTolerance: 'high',
            floweringWaterSensitivity: 'medium'
        },
        'carrot': {
            waterNeeds: 'medium',
            rootDepth: 40,
            dailyWaterRequirement: 15,
            criticalMoistureLevel: 0.3,
            optimalWateringTime: 'early_morning',
            droughtTolerance: 'medium',
            floweringWaterSensitivity: 'low'
        },
        'kava': {
            waterNeeds: 'high',
            rootDepth: 80,
            dailyWaterRequirement: 22,
            criticalMoistureLevel: 0.4,
            optimalWateringTime: 'early_morning',
            droughtTolerance: 'low',
            floweringWaterSensitivity: 'high'
        }
    };
    
    return cropDatabase[cropType.toLowerCase()] || cropDatabase['tomato'];
}

function getSoilData(soilType) {
    const soilTypes = {
        'clay': {
            waterRetention: 'high',
            drainageRate: 'slow',
            wateringFrequency: 'less_frequent',
            wateringDuration: 'longer',
            moistureRetention: 0.8
        },
        'sandy': {
            waterRetention: 'low',
            drainageRate: 'fast',
            wateringFrequency: 'more_frequent',
            wateringDuration: 'shorter',
            moistureRetention: 0.3
        },
        'loam': {
            waterRetention: 'medium',
            drainageRate: 'medium',
            wateringFrequency: 'moderate',
            wateringDuration: 'moderate',
            moistureRetention: 0.6
        },
        'silt': {
            waterRetention: 'medium_high',
            drainageRate: 'medium_slow',
            wateringFrequency: 'moderate',
            wateringDuration: 'moderate_long',
            moistureRetention: 0.7
        }
    };
    
    return soilTypes[soilType] || soilTypes['loam'];
}

function calculateWateringNeed(cropData, weather, soilData) {
    let need = 'moderate';
    
    // Temperature impact
    if (weather.temperature > 30) {
        need = 'high';
    } else if (weather.temperature < 20) {
        need = 'low';
    }
    
    // Humidity impact
    if (weather.humidity < 60) {
        need = need === 'low' ? 'moderate' : 'high';
    } else if (weather.humidity > 85) {
        need = 'low';
    }
    
    // Wind impact
    if (weather.windSpeed > 15) {
        need = need === 'low' ? 'moderate' : 'high';
    }
    
    // Rainfall impact
    if (weather.rainfall > 10) {
        need = 'low';
    }
    
    // Crop-specific needs
    if (cropData.waterNeeds === 'very_high') {
        need = need === 'low' ? 'moderate' : 'high';
    } else if (cropData.waterNeeds === 'low') {
        need = need === 'high' ? 'moderate' : 'low';
    }
    
    return need;
}

function calculateOptimalTime(weather, cropData) {
    const currentHour = new Date().getHours();
    
    // Base optimal time from crop data
    let optimalTime = cropData.optimalWateringTime;
    
    // Adjust based on weather conditions
    if (weather.temperature > 30) {
        // Hot weather - water early morning or late evening
        optimalTime = currentHour < 10 ? 'early_morning' : 'late_evening';
    } else if (weather.temperature < 20) {
        // Cool weather - can water during day
        optimalTime = 'mid_morning';
    }
    
    // Wind considerations
    if (weather.windSpeed > 15) {
        optimalTime = 'early_morning'; // Less wind in early morning
    }
    
    return optimalTime;
}

function calculateWateringDuration(cropData, soilData, weather) {
    let baseDuration = cropData.dailyWaterRequirement; // mm
    
    // Adjust for soil type
    if (soilData.drainageRate === 'fast') {
        baseDuration *= 1.5; // Sandy soil needs more frequent watering
    } else if (soilData.drainageRate === 'slow') {
        baseDuration *= 0.7; // Clay soil retains water longer
    }
    
    // Adjust for weather
    if (weather.temperature > 30) {
        baseDuration *= 1.3;
    } else if (weather.temperature < 20) {
        baseDuration *= 0.8;
    }
    
    if (weather.humidity < 60) {
        baseDuration *= 1.2;
    } else if (weather.humidity > 85) {
        baseDuration *= 0.7;
    }
    
    return Math.round(baseDuration);
}

function calculateWateringFrequency(cropData, soilData, weather) {
    let frequency = 'daily';
    
    // Soil type impact
    if (soilData.waterRetention === 'high') {
        frequency = 'every_other_day';
    } else if (soilData.waterRetention === 'low') {
        frequency = 'twice_daily';
    }
    
    // Weather impact
    if (weather.temperature > 30 && weather.humidity < 60) {
        frequency = 'twice_daily';
    } else if (weather.temperature < 20 && weather.humidity > 80) {
        frequency = 'every_other_day';
    }
    
    // Rainfall impact
    if (weather.rainfall > 15) {
        frequency = 'skip_today';
    }
    
    return frequency;
}

function calculatePriority(cropData, weather, soilData) {
    let priority = 5; // Medium priority
    
    // High priority for high water needs crops in hot, dry conditions
    if (cropData.waterNeeds === 'very_high' && weather.temperature > 30 && weather.humidity < 60) {
        priority = 9;
    }
    
    // High priority for flowering crops
    if (cropData.floweringWaterSensitivity === 'very_high') {
        priority = 8;
    }
    
    // Low priority if recent rainfall
    if (weather.rainfall > 10) {
        priority = 2;
    }
    
    // Low priority for drought tolerant crops
    if (cropData.droughtTolerance === 'high' && weather.temperature < 25) {
        priority = 3;
    }
    
    return priority;
}

function generateSpecificRecommendations(cropData, weather, soilData) {
    const recommendations = [];
    
    // Time-based recommendations
    if (weather.temperature > 30) {
        recommendations.push('🌅 Water early morning (6-8 AM) to avoid evaporation');
    } else if (weather.temperature < 20) {
        recommendations.push('🌞 Water mid-morning (9-11 AM) for better absorption');
    }
    
    // Wind recommendations
    if (weather.windSpeed > 15) {
        recommendations.push('💨 Avoid watering during high winds to prevent uneven distribution');
    }
    
    // Humidity recommendations
    if (weather.humidity < 60) {
        recommendations.push('💧 Increase watering frequency due to low humidity');
    } else if (weather.humidity > 85) {
        recommendations.push('🌫️ Reduce watering frequency due to high humidity');
    }
    
    // Soil-specific recommendations
    if (soilData.drainageRate === 'fast') {
        recommendations.push('🏖️ Sandy soil: Water more frequently with shorter duration');
    } else if (soilData.drainageRate === 'slow') {
        recommendations.push('🏺 Clay soil: Water less frequently with longer duration');
    }
    
    // Crop-specific recommendations
    if (cropData.floweringWaterSensitivity === 'very_high') {
        recommendations.push('🌸 Critical watering period - maintain consistent moisture');
    }
    
    return recommendations;
}

function assessWeatherImpact(weather) {
    let impact = 'moderate';
    
    if (weather.temperature > 32 || weather.humidity < 50 || weather.windSpeed > 20) {
        impact = 'high';
    } else if (weather.temperature < 18 || weather.humidity > 90 || weather.rainfall > 15) {
        impact = 'low';
    }
    
    return impact;
}

function estimateSoilMoisture(cropData, soilData, weather) {
    let moisture = 0.6; // Default moderate moisture
    
    // Adjust based on rainfall
    if (weather.rainfall > 10) {
        moisture = 0.8;
    } else if (weather.rainfall === 0 && weather.temperature > 25) {
        moisture = 0.4;
    }
    
    // Adjust based on soil type
    if (soilData.moistureRetention > 0.7) {
        moisture *= 1.2;
    } else if (soilData.moistureRetention < 0.4) {
        moisture *= 0.8;
    }
    
    return Math.min(Math.max(moisture, 0.1), 1.0);
}

function calculateOptimalTimesForToday(weather) {
    const times = [];
    
    // Early morning (6-8 AM)
    times.push({
        time: '6:00 - 8:00 AM',
        description: 'Best for most crops',
        rating: weather.temperature > 30 ? 'Excellent' : 'Good',
        color: weather.temperature > 30 ? 'success' : 'primary'
    });
    
    // Mid morning (9-11 AM)
    times.push({
        time: '9:00 - 11:00 AM',
        description: 'Good for cool weather',
        rating: weather.temperature < 25 ? 'Good' : 'Fair',
        color: weather.temperature < 25 ? 'primary' : 'warning'
    });
    
    // Late afternoon (4-6 PM)
    times.push({
        time: '4:00 - 6:00 PM',
        description: 'Avoid if windy',
        rating: weather.windSpeed > 15 ? 'Poor' : 'Fair',
        color: weather.windSpeed > 15 ? 'danger' : 'warning'
    });
    
    return times;
}

module.exports = router;
