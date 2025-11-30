/**
 * Weather Alert Service
 * Evaluates weather conditions and generates alerts for farmers
 * Shared logic that can be used by both web and Android
 */

const axios = require('axios');

// Alert rule definitions
const ALERT_RULES = {
    heavy_rain: {
        name: 'Heavy Rain Expected',
        threshold: 20, // mm per hour
        forecastHours: 24,
        severity: 'high',
        messageTemplate: (data) => `Heavy rain expected: ${data.rainfall}mm within ${data.hours}h. Consider protecting crops and ensuring proper drainage.`
    },
    frost: {
        name: 'Frost Risk',
        threshold: 2, // degrees Celsius
        forecastHours: 48,
        severity: 'critical',
        messageTemplate: (data) => `Frost risk: Temperature may drop to ${data.temperature}°C within ${data.hours}h. Protect sensitive crops with covers or irrigation.`
    },
    heat_stress: {
        name: 'Heat Stress Warning',
        threshold: 35, // degrees Celsius
        forecastHours: 24,
        severity: 'high',
        messageTemplate: (data) => `High temperature alert: ${data.temperature}°C expected. Increase irrigation and provide shade for sensitive crops.`
    },
    strong_wind: {
        name: 'Strong Wind Warning',
        threshold: 50, // km/h
        forecastHours: 24,
        severity: 'medium',
        messageTemplate: (data) => `Strong winds expected: ${data.windSpeed} km/h. Secure equipment and protect tall crops.`
    },
    drought: {
        name: 'Drought Risk',
        threshold: 7, // days without significant rain
        forecastDays: 7,
        severity: 'high',
        messageTemplate: (data) => `Drought conditions: No significant rain forecasted for ${data.days} days. Plan irrigation schedule.`
    }
};

class WeatherAlertService {
    constructor(dbPool, weatherApiKey) {
        this.db = dbPool;
        this.weatherApiKey = weatherApiKey;
    }

    /**
     * Fetch weather forecast from OpenWeatherMap API
     */
    async fetchWeatherForecast(lat, lng, days = 5) {
        if (!this.weatherApiKey) {
            console.warn('Weather API key not configured');
            return null;
        }

        try {
            const response = await axios.get(
                'https://api.openweathermap.org/data/2.5/forecast',
                {
                    params: {
                        lat,
                        lon: lng,
                        appid: this.weatherApiKey,
                        units: 'metric',
                        cnt: days * 8 // 8 forecasts per day (3-hour intervals)
                    },
                    timeout: 10000
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error fetching weather forecast:', error.message);
            return null;
        }
    }

    /**
     * Evaluate weather conditions against alert rules
     */
    evaluateWeatherConditions(forecastData, rules = ALERT_RULES) {
        const alerts = [];

        if (!forecastData || !forecastData.list) {
            return alerts;
        }

        const forecasts = forecastData.list;
        const now = new Date();

        // Check heavy rain
        if (rules.heavy_rain) {
            const rule = rules.heavy_rain;
            for (let i = 0; i < Math.min(8, forecasts.length); i++) { // Check next 24 hours
                const forecast = forecasts[i];
                const forecastTime = new Date(forecast.dt * 1000);
                const hoursUntil = (forecastTime - now) / (1000 * 60 * 60);

                if (hoursUntil <= rule.forecastHours && forecast.rain && forecast.rain['3h']) {
                    const rainRate = (forecast.rain['3h'] / 3) * 60; // mm per hour
                    if (rainRate >= rule.threshold) {
                        alerts.push({
                            type: 'heavy_rain',
                            severity: rule.severity,
                            title: rule.name,
                            message: rule.messageTemplate({
                                rainfall: forecast.rain['3h'].toFixed(1),
                                hours: Math.round(hoursUntil)
                            }),
                            expectedTime: forecastTime,
                            weatherData: {
                                rainfall: forecast.rain['3h'],
                                temperature: forecast.main.temp,
                                humidity: forecast.main.humidity
                            }
                        });
                        break; // Only one alert per type
                    }
                }
            }
        }

        // Check frost risk
        if (rules.frost) {
            const rule = rules.frost;
            for (let i = 0; i < Math.min(16, forecasts.length); i++) { // Check next 48 hours
                const forecast = forecasts[i];
                const forecastTime = new Date(forecast.dt * 1000);
                const hoursUntil = (forecastTime - now) / (1000 * 60 * 60);

                if (hoursUntil <= rule.forecastHours) {
                    const minTemp = forecast.main.temp_min;
                    if (minTemp <= rule.threshold) {
                        alerts.push({
                            type: 'frost',
                            severity: rule.severity,
                            title: rule.name,
                            message: rule.messageTemplate({
                                temperature: minTemp.toFixed(1),
                                hours: Math.round(hoursUntil)
                            }),
                            expectedTime: forecastTime,
                            weatherData: {
                                temperature: minTemp,
                                maxTemp: forecast.main.temp_max,
                                humidity: forecast.main.humidity
                            }
                        });
                        break;
                    }
                }
            }
        }

        // Check heat stress
        if (rules.heat_stress) {
            const rule = rules.heat_stress;
            for (let i = 0; i < Math.min(8, forecasts.length); i++) {
                const forecast = forecasts[i];
                const forecastTime = new Date(forecast.dt * 1000);
                const hoursUntil = (forecastTime - now) / (1000 * 60 * 60);

                if (hoursUntil <= rule.forecastHours) {
                    const maxTemp = forecast.main.temp_max || forecast.main.temp;
                    if (maxTemp >= rule.threshold) {
                        alerts.push({
                            type: 'heat_stress',
                            severity: rule.severity,
                            title: rule.name,
                            message: rule.messageTemplate({
                                temperature: maxTemp.toFixed(1),
                                hours: Math.round(hoursUntil)
                            }),
                            expectedTime: forecastTime,
                            weatherData: {
                                temperature: maxTemp,
                                humidity: forecast.main.humidity,
                                feelsLike: forecast.main.feels_like
                            }
                        });
                        break;
                    }
                }
            }
        }

        // Check strong wind
        if (rules.strong_wind) {
            const rule = rules.strong_wind;
            for (let i = 0; i < Math.min(8, forecasts.length); i++) {
                const forecast = forecasts[i];
                const forecastTime = new Date(forecast.dt * 1000);
                const hoursUntil = (forecastTime - now) / (1000 * 60 * 60);

                if (hoursUntil <= rule.forecastHours && forecast.wind) {
                    const windSpeed = forecast.wind.speed * 3.6; // Convert m/s to km/h
                    if (windSpeed >= rule.threshold) {
                        alerts.push({
                            type: 'strong_wind',
                            severity: rule.severity,
                            title: rule.name,
                            message: rule.messageTemplate({
                                windSpeed: windSpeed.toFixed(1),
                                hours: Math.round(hoursUntil)
                            }),
                            expectedTime: forecastTime,
                            weatherData: {
                                windSpeed: windSpeed,
                                windDirection: forecast.wind.deg,
                                gust: forecast.wind.gust ? forecast.wind.gust * 3.6 : null
                            }
                        });
                        break;
                    }
                }
            }
        }

        // Check drought (requires checking multiple days)
        if (rules.drought) {
            const rule = rules.drought;
            let daysWithoutRain = 0;
            let hasSignificantRain = false;

            for (let i = 0; i < Math.min(rule.forecastDays * 8, forecasts.length); i++) {
                const forecast = forecasts[i];
                if (forecast.rain && forecast.rain['3h'] && forecast.rain['3h'] > 5) {
                    hasSignificantRain = true;
                    break;
                }
                daysWithoutRain += 0.125; // 3-hour intervals = 0.125 days
            }

            if (!hasSignificantRain && daysWithoutRain >= rule.threshold) {
                alerts.push({
                    type: 'drought',
                    severity: rule.severity,
                    title: rule.name,
                    message: rule.messageTemplate({
                        days: Math.round(daysWithoutRain)
                    }),
                    expectedTime: new Date(now.getTime() + daysWithoutRain * 24 * 60 * 60 * 1000),
                    weatherData: {
                        daysWithoutRain: Math.round(daysWithoutRain)
                    }
                });
            }
        }

        return alerts;
    }

    /**
     * Generate alerts for a specific farm
     */
    async generateAlertsForFarm(farmId, userId, farmData) {
        if (!farmData.latitude || !farmData.longitude) {
            console.warn(`Farm ${farmId} has no location data`);
            return [];
        }

        // Fetch weather forecast
        const forecastData = await this.fetchWeatherForecast(
            farmData.latitude,
            farmData.longitude
        );

        if (!forecastData) {
            return [];
        }

        // Evaluate conditions
        const alerts = this.evaluateWeatherConditions(forecastData);

        // Check user preferences
        const preferences = await this.getUserPreferences(userId);
        const filteredAlerts = this.filterAlertsByPreferences(alerts, preferences);

        // Save alerts to database
        const savedAlerts = [];
        for (const alert of filteredAlerts) {
            // Check if similar alert already exists (avoid duplicates)
            const existingAlert = await this.findSimilarAlert(farmId, alert.type, alert.expectedTime);
            
            if (!existingAlert) {
                const savedAlert = await this.saveAlert({
                    farmId,
                    userId,
                    ...alert,
                    locationLat: farmData.latitude,
                    locationLng: farmData.longitude,
                    locationName: farmData.location || farmData.name
                });
                savedAlerts.push(savedAlert);
            }
        }

        return savedAlerts;
    }

    /**
     * Save alert to database
     */
    async saveAlert(alertData) {
        const query = `
            INSERT INTO weather_alerts (
                farm_id, user_id, alert_type, severity, title, message,
                expected_time, location_lat, location_lng, location_name, weather_data
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;

        const values = [
            alertData.farmId,
            alertData.userId,
            alertData.type,
            alertData.severity,
            alertData.title,
            alertData.message,
            alertData.expectedTime,
            alertData.locationLat,
            alertData.locationLng,
            alertData.locationName,
            JSON.stringify(alertData.weatherData || {})
        ];

        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    /**
     * Get user alert preferences
     */
    async getUserPreferences(userId) {
        const query = 'SELECT * FROM alert_preferences WHERE user_id = $1';
        const result = await this.db.query(query, [userId]);

        if (result.rows.length === 0) {
            // Create default preferences
            const insertQuery = `
                INSERT INTO alert_preferences (user_id) VALUES ($1) RETURNING *
            `;
            const insertResult = await this.db.query(insertQuery, [userId]);
            return insertResult.rows[0];
        }

        return result.rows[0];
    }

    /**
     * Filter alerts based on user preferences
     */
    filterAlertsByPreferences(alerts, preferences) {
        if (!preferences) return alerts;

        return alerts.filter(alert => {
            // Check if alert type is enabled
            const enableKey = `enable_${alert.type}`;
            if (preferences[enableKey] === false) {
                return false;
            }

            // Check severity threshold
            const severityLevels = { low: 1, medium: 2, high: 3, critical: 4 };
            const minSeverity = severityLevels[preferences.min_severity] || 2;
            const alertSeverity = severityLevels[alert.severity] || 2;

            return alertSeverity >= minSeverity;
        });
    }

    /**
     * Find similar alert to avoid duplicates
     */
    async findSimilarAlert(farmId, alertType, expectedTime) {
        const query = `
            SELECT * FROM weather_alerts
            WHERE farm_id = $1
            AND alert_type = $2
            AND expected_time BETWEEN $3 AND $4
            AND is_dismissed = FALSE
            LIMIT 1
        `;

        const timeWindowStart = new Date(expectedTime.getTime() - 6 * 60 * 60 * 1000); // 6 hours before
        const timeWindowEnd = new Date(expectedTime.getTime() + 6 * 60 * 60 * 1000); // 6 hours after

        const result = await this.db.query(query, [
            farmId,
            alertType,
            timeWindowStart,
            timeWindowEnd
        ]);

        return result.rows[0] || null;
    }

    /**
     * Process alerts for all active farms (called by cron job)
     */
    async processAllFarms() {
        const query = `
            SELECT f.id, f.user_id, f.name, f.location, f.latitude, f.longitude
            FROM farms f
            WHERE f.is_active = TRUE
            AND f.latitude IS NOT NULL
            AND f.longitude IS NOT NULL
        `;

        const result = await this.db.query(query);
        const farms = result.rows;

        console.log(`Processing weather alerts for ${farms.length} farms`);

        let totalAlerts = 0;
        for (const farm of farms) {
            try {
                const alerts = await this.generateAlertsForFarm(
                    farm.id,
                    farm.user_id,
                    {
                        latitude: parseFloat(farm.latitude),
                        longitude: parseFloat(farm.longitude),
                        location: farm.location,
                        name: farm.name
                    }
                );
                totalAlerts += alerts.length;
            } catch (error) {
                console.error(`Error processing farm ${farm.id}:`, error.message);
            }
        }

        console.log(`Generated ${totalAlerts} weather alerts`);
        return totalAlerts;
    }

    /**
     * Track alert engagement metrics
     */
    async trackAlertEvent(alertId, userId, eventType, metadata = {}) {
        const query = `
            INSERT INTO alert_metrics (alert_id, user_id, event_type, metadata)
            VALUES ($1, $2, $3, $4)
        `;

        await this.db.query(query, [
            alertId,
            userId,
            eventType,
            JSON.stringify(metadata)
        ]);
    }
}

module.exports = WeatherAlertService;

