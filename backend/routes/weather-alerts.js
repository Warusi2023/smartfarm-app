/**
 * Weather Alerts API Routes
 * Handles weather alert retrieval, management, and metrics
 */

const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth');
const authMiddleware = new AuthMiddleware();
const authenticateToken = authMiddleware.authenticate();

// WeatherAlertService will be injected via dependency injection
let weatherAlertService = null;
let dbPool = null;

/**
 * Initialize routes with dependencies
 */
function initWeatherAlertsRoutes(pool, service) {
    dbPool = pool;
    weatherAlertService = service;
}

/**
 * GET /api/weather-alerts
 * Get all alerts for the authenticated user
 */
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { farmId, unreadOnly, limit = 50 } = req.query;

        let query = `
            SELECT wa.*, f.name as farm_name, f.location as farm_location
            FROM weather_alerts wa
            LEFT JOIN farms f ON wa.farm_id = f.id
            WHERE wa.user_id = $1
        `;
        const params = [userId];

        if (farmId) {
            query += ' AND wa.farm_id = $2';
            params.push(farmId);
        }

        if (unreadOnly === 'true') {
            query += ` AND wa.is_read = FALSE`;
        }

        query += ` ORDER BY wa.expected_time ASC, wa.created_at DESC LIMIT $${params.length + 1}`;
        params.push(parseInt(limit));

        const result = await dbPool.query(query, params);

        // Parse JSONB weather_data
        const alerts = result.rows.map(row => ({
            ...row,
            weatherData: typeof row.weather_data === 'string' 
                ? JSON.parse(row.weather_data) 
                : row.weather_data
        }));

        res.json({
            success: true,
            data: alerts,
            count: alerts.length
        });
    } catch (error) {
        console.error('Error fetching weather alerts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch weather alerts'
        });
    }
});

/**
 * GET /api/weather-alerts/stats
 * Get alert statistics for the user
 */
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const statsQuery = `
            SELECT 
                COUNT(*) as total,
                COUNT(*) FILTER (WHERE is_read = FALSE) as unread,
                COUNT(*) FILTER (WHERE severity = 'critical') as critical,
                COUNT(*) FILTER (WHERE severity = 'high') as high,
                COUNT(*) FILTER (WHERE expected_time > NOW()) as upcoming
            FROM weather_alerts
            WHERE user_id = $1
            AND is_dismissed = FALSE
        `;

        const result = await dbPool.query(statsQuery, [userId]);
        const stats = result.rows[0];

        res.json({
            success: true,
            data: {
                total: parseInt(stats.total),
                unread: parseInt(stats.unread),
                critical: parseInt(stats.critical),
                high: parseInt(stats.high),
                upcoming: parseInt(stats.upcoming)
            }
        });
    } catch (error) {
        console.error('Error fetching alert stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch alert statistics'
        });
    }
});

/**
 * GET /api/weather-alerts/:id
 * Get a specific alert
 */
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const query = `
            SELECT wa.*, f.name as farm_name, f.location as farm_location
            FROM weather_alerts wa
            LEFT JOIN farms f ON wa.farm_id = f.id
            WHERE wa.id = $1 AND wa.user_id = $2
        `;

        const result = await dbPool.query(query, [id, userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Alert not found'
            });
        }

        const alert = result.rows[0];
        alert.weatherData = typeof alert.weather_data === 'string' 
            ? JSON.parse(alert.weather_data) 
            : alert.weather_data;

        res.json({
            success: true,
            data: alert
        });
    } catch (error) {
        console.error('Error fetching alert:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch alert'
        });
    }
});

/**
 * PATCH /api/weather-alerts/:id/read
 * Mark alert as read
 */
router.patch('/:id/read', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const updateQuery = `
            UPDATE weather_alerts
            SET is_read = TRUE, updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND user_id = $2
            RETURNING *
        `;

        const result = await dbPool.query(updateQuery, [id, userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Alert not found'
            });
        }

        // Track metric
        if (weatherAlertService) {
            await weatherAlertService.trackAlertEvent(id, userId, 'viewed');
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error marking alert as read:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update alert'
        });
    }
});

/**
 * PATCH /api/weather-alerts/:id/dismiss
 * Dismiss an alert
 */
router.patch('/:id/dismiss', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const updateQuery = `
            UPDATE weather_alerts
            SET is_dismissed = TRUE, updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND user_id = $2
            RETURNING *
        `;

        const result = await dbPool.query(updateQuery, [id, userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Alert not found'
            });
        }

        // Track metric
        if (weatherAlertService) {
            await weatherAlertService.trackAlertEvent(id, userId, 'dismissed');
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error dismissing alert:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to dismiss alert'
        });
    }
});

/**
 * PATCH /api/weather-alerts/:id/action
 * Mark that action was taken on an alert
 */
router.patch('/:id/action', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { actionNotes } = req.body;

        const updateQuery = `
            UPDATE weather_alerts
            SET action_taken = TRUE, 
                action_notes = $3,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1 AND user_id = $2
            RETURNING *
        `;

        const result = await dbPool.query(updateQuery, [id, userId, actionNotes || null]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Alert not found'
            });
        }

        // Track metric
        if (weatherAlertService) {
            await weatherAlertService.trackAlertEvent(id, userId, 'action_taken', {
                notes: actionNotes
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating alert action:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update alert'
        });
    }
});

/**
 * POST /api/weather-alerts/generate
 * Manually trigger alert generation for user's farms (admin/for testing)
 */
router.post('/generate', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        if (!weatherAlertService) {
            return res.status(503).json({
                success: false,
                error: 'Weather alert service not initialized'
            });
        }

        // Get user's farms
        const farmsQuery = `
            SELECT id, user_id, name, location, latitude, longitude
            FROM farms
            WHERE user_id = $1 AND is_active = TRUE
            AND latitude IS NOT NULL AND longitude IS NOT NULL
        `;

        const farmsResult = await dbPool.query(farmsQuery, [userId]);
        const farms = farmsResult.rows;

        let totalAlerts = 0;
        const results = [];

        for (const farm of farms) {
            try {
                const alerts = await weatherAlertService.generateAlertsForFarm(
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
                results.push({
                    farmId: farm.id,
                    farmName: farm.name,
                    alertsGenerated: alerts.length
                });
            } catch (error) {
                console.error(`Error generating alerts for farm ${farm.id}:`, error);
                results.push({
                    farmId: farm.id,
                    farmName: farm.name,
                    error: error.message
                });
            }
        }

        res.json({
            success: true,
            data: {
                totalAlertsGenerated: totalAlerts,
                farmsProcessed: results
            }
        });
    } catch (error) {
        console.error('Error generating alerts:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate alerts'
        });
    }
});

/**
 * GET /api/weather-alerts/preferences
 * Get user's alert preferences
 */
router.get('/preferences', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        if (!weatherAlertService) {
            return res.status(503).json({
                success: false,
                error: 'Weather alert service not initialized'
            });
        }

        const preferences = await weatherAlertService.getUserPreferences(userId);

        res.json({
            success: true,
            data: preferences
        });
    } catch (error) {
        console.error('Error fetching preferences:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch preferences'
        });
    }
});

/**
 * PUT /api/weather-alerts/preferences
 * Update user's alert preferences
 */
router.put('/preferences', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        const allowedFields = [
            'enable_heavy_rain',
            'enable_frost',
            'enable_heat_stress',
            'enable_strong_wind',
            'enable_drought',
            'min_severity',
            'notification_enabled'
        ];

        const updateFields = [];
        const updateValues = [];
        let paramIndex = 1;

        for (const field of allowedFields) {
            if (updates.hasOwnProperty(field)) {
                updateFields.push(`${field} = $${paramIndex}`);
                updateValues.push(updates[field]);
                paramIndex++;
            }
        }

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No valid fields to update'
            });
        }

        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
        updateValues.push(userId);

        const query = `
            UPDATE alert_preferences
            SET ${updateFields.join(', ')}
            WHERE user_id = $${paramIndex}
            RETURNING *
        `;

        const result = await dbPool.query(query, updateValues);

        if (result.rows.length === 0) {
            // Create preferences if they don't exist
            const insertQuery = `
                INSERT INTO alert_preferences (user_id, ${allowedFields.join(', ')})
                VALUES ($${paramIndex}, ${allowedFields.map((_, i) => `$${i + 1}`).join(', ')})
                RETURNING *
            `;
            const insertValues = updateValues.slice(0, -1);
            insertValues.push(userId);
            const insertResult = await dbPool.query(insertQuery, insertValues);
            return res.json({
                success: true,
                data: insertResult.rows[0]
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating preferences:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update preferences'
        });
    }
});

module.exports = { router, initWeatherAlertsRoutes };

