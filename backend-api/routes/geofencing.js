const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../database/init');

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
}

// Helper function to check if point is within polygon
function isPointInPolygon(point, polygon) {
    const x = point.latitude;
    const y = point.longitude;
    let inside = false;
    
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].latitude;
        const yi = polygon[i].longitude;
        const xj = polygon[j].latitude;
        const yj = polygon[j].longitude;
        
        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
            inside = !inside;
        }
    }
    
    return inside;
}

// Get farms near a specific location
router.get('/nearby', async (req, res) => {
    try {
        const { latitude, longitude, radius = 10000, limit = 20 } = req.query;
        const userId = req.user.id;

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                error: 'Latitude and longitude are required'
            });
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        const searchRadius = parseInt(radius);

        // Get all public farms or farms owned by the user
        const farmsQuery = `
            SELECT f.*, u.name as ownerName, u.email as ownerEmail
            FROM farms f
            LEFT JOIN users u ON f.ownerId = u.id
            WHERE f.latitude IS NOT NULL 
            AND f.longitude IS NOT NULL
            AND (f.isPublic = 1 OR f.ownerId = ?)
        `;
        
        const farms = await db.all(farmsQuery, [userId]);
        
        // Filter farms within radius and calculate distances
        const nearbyFarms = farms
            .map(farm => {
                const distance = calculateDistance(lat, lon, farm.latitude, farm.longitude);
                return {
                    ...farm,
                    distance: Math.round(distance),
                    distanceKm: Math.round(distance / 1000 * 100) / 100
                };
            })
            .filter(farm => farm.distance <= searchRadius)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, parseInt(limit));

        res.json({
            success: true,
            data: {
                farms: nearbyFarms,
                searchCenter: { latitude: lat, longitude: lon },
                searchRadius: searchRadius,
                totalFound: nearbyFarms.length
            }
        });
    } catch (error) {
        console.error('Error finding nearby farms:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to find nearby farms'
        });
    }
});

// Check if user is within a farm's geofence
router.post('/check-location', async (req, res) => {
    try {
        const { farmId, latitude, longitude } = req.body;
        const userId = req.user.id;

        if (!farmId || !latitude || !longitude) {
            return res.status(400).json({
                success: false,
                error: 'Farm ID, latitude, and longitude are required'
            });
        }

        // Get farm details
        const farmQuery = `
            SELECT f.*, u.name as ownerName
            FROM farms f
            LEFT JOIN users u ON f.ownerId = u.id
            WHERE f.id = ? AND (f.isPublic = 1 OR f.ownerId = ?)
        `;
        
        const farm = await db.get(farmQuery, [farmId, userId]);

        if (!farm) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found or access denied'
            });
        }

        const userLocation = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        };

        let isWithinGeofence = false;
        let geofenceType = 'none';

        // Check if farm has geofence data
        if (farm.latitude && farm.longitude) {
            const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                farm.latitude,
                farm.longitude
            );

            // Check circular geofence
            if (farm.geofenceRadius && distance <= farm.geofenceRadius) {
                isWithinGeofence = true;
                geofenceType = 'circular';
            }

            // Check polygon geofence if circular check failed
            if (!isWithinGeofence && farm.geofencePolygon) {
                try {
                    const polygon = JSON.parse(farm.geofencePolygon);
                    isWithinGeofence = isPointInPolygon(userLocation, polygon);
                    if (isWithinGeofence) {
                        geofenceType = 'polygon';
                    }
                } catch (error) {
                    console.error('Error parsing geofence polygon:', error);
                }
            }
        }

        // Log location check
        const logQuery = `
            INSERT INTO location_checks (id, farmId, userId, latitude, longitude, isWithinGeofence, distance, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `;
        
        const distance = farm.latitude && farm.longitude ? 
            calculateDistance(userLocation.latitude, userLocation.longitude, farm.latitude, farm.longitude) : 
            null;

        await db.run(logQuery, [
            uuidv4(),
            farmId,
            userId,
            userLocation.latitude,
            userLocation.longitude,
            isWithinGeofence ? 1 : 0,
            distance
        ]);

        res.json({
            success: true,
            data: {
                farm: {
                    id: farm.id,
                    name: farm.name,
                    location: farm.location,
                    address: farm.address,
                    city: farm.city,
                    state: farm.state,
                    country: farm.country
                },
                userLocation,
                isWithinGeofence,
                geofenceType,
                distance: distance ? Math.round(distance) : null,
                geofenceRadius: farm.geofenceRadius,
                allowVisitors: farm.allowVisitors,
                visitorInstructions: farm.visitorInstructions
            }
        });
    } catch (error) {
        console.error('Error checking location:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to check location'
        });
    }
});

// Get directions to a farm
router.get('/directions/:farmId', async (req, res) => {
    try {
        const { farmId } = req.params;
        const { latitude, longitude } = req.query;
        const userId = req.user.id;

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                error: 'Current latitude and longitude are required'
            });
        }

        // Get farm details
        const farmQuery = `
            SELECT f.*, u.name as ownerName, u.phone as ownerPhone
            FROM farms f
            LEFT JOIN users u ON f.ownerId = u.id
            WHERE f.id = ? AND (f.isPublic = 1 OR f.ownerId = ?)
        `;
        
        const farm = await db.get(farmQuery, [farmId, userId]);

        if (!farm) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found or access denied'
            });
        }

        if (!farm.latitude || !farm.longitude) {
            return res.status(400).json({
                success: false,
                error: 'Farm location not available'
            });
        }

        const startLocation = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        };

        const endLocation = {
            latitude: farm.latitude,
            longitude: farm.longitude
        };

        const distance = calculateDistance(
            startLocation.latitude,
            startLocation.longitude,
            endLocation.latitude,
            endLocation.longitude
        );

        // Generate Google Maps URL for directions
        const mapsUrl = `https://www.google.com/maps/dir/${startLocation.latitude},${startLocation.longitude}/${endLocation.latitude},${endLocation.longitude}`;

        res.json({
            success: true,
            data: {
                farm: {
                    id: farm.id,
                    name: farm.name,
                    address: farm.address,
                    city: farm.city,
                    state: farm.state,
                    country: farm.country,
                    location: farm.location
                },
                directions: {
                    startLocation,
                    endLocation,
                    distance: Math.round(distance),
                    distanceKm: Math.round(distance / 1000 * 100) / 100,
                    estimatedTravelTime: Math.round(distance / 1000 * 2), // Rough estimate: 2 minutes per km
                    mapsUrl,
                    ownerContact: {
                        name: farm.ownerName,
                        phone: farm.ownerPhone
                    }
                },
                geofence: {
                    radius: farm.geofenceRadius,
                    polygon: farm.geofencePolygon ? JSON.parse(farm.geofencePolygon) : null
                },
                visitorInfo: {
                    allowVisitors: farm.allowVisitors,
                    instructions: farm.visitorInstructions
                }
            }
        });
    } catch (error) {
        console.error('Error getting directions:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get directions'
        });
    }
});

// Update farm geofence settings
router.put('/:farmId/geofence', async (req, res) => {
    try {
        const { farmId } = req.params;
        const { 
            latitude, 
            longitude, 
            geofenceRadius, 
            geofencePolygon, 
            isPublic, 
            allowVisitors, 
            visitorInstructions 
        } = req.body;
        const userId = req.user.id;

        // Verify farm ownership
        const farmQuery = 'SELECT id FROM farms WHERE id = ? AND ownerId = ?';
        const farm = await db.get(farmQuery, [farmId, userId]);

        if (!farm) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found or access denied'
            });
        }

        // Update geofence settings
        const updateQuery = `
            UPDATE farms 
            SET latitude = ?, 
                longitude = ?, 
                geofenceRadius = ?, 
                geofencePolygon = ?, 
                isPublic = ?, 
                allowVisitors = ?, 
                visitorInstructions = ?,
                updatedAt = datetime('now')
            WHERE id = ?
        `;

        await db.run(updateQuery, [
            latitude,
            longitude,
            geofenceRadius,
            geofencePolygon ? JSON.stringify(geofencePolygon) : null,
            isPublic ? 1 : 0,
            allowVisitors ? 1 : 0,
            visitorInstructions,
            farmId
        ]);

        res.json({
            success: true,
            data: {
                message: 'Farm geofence settings updated successfully',
                farmId: farmId
            }
        });
    } catch (error) {
        console.error('Error updating farm geofence:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update farm geofence settings'
        });
    }
});

// Get geofence analytics for a farm
router.get('/:farmId/analytics', async (req, res) => {
    try {
        const { farmId } = req.params;
        const { days = 30 } = req.query;
        const userId = req.user.id;

        // Verify farm ownership
        const farmQuery = 'SELECT id FROM farms WHERE id = ? AND ownerId = ?';
        const farm = await db.get(farmQuery, [farmId, userId]);

        if (!farm) {
            return res.status(404).json({
                success: false,
                error: 'Farm not found or access denied'
            });
        }

        // Get location check analytics
        const analyticsQuery = `
            SELECT 
                COUNT(*) as totalChecks,
                SUM(CASE WHEN isWithinGeofence = 1 THEN 1 ELSE 0 END) as withinGeofence,
                AVG(distance) as averageDistance,
                MIN(distance) as closestDistance,
                MAX(distance) as farthestDistance,
                DATE(createdAt) as checkDate
            FROM location_checks 
            WHERE farmId = ? 
            AND createdAt >= datetime('now', '-${parseInt(days)} days')
            GROUP BY DATE(createdAt)
            ORDER BY checkDate DESC
        `;

        const analytics = await db.all(analyticsQuery, [farmId]);

        // Get recent visitors
        const visitorsQuery = `
            SELECT DISTINCT u.name, u.email, lc.createdAt, lc.distance
            FROM location_checks lc
            LEFT JOIN users u ON lc.userId = u.id
            WHERE lc.farmId = ? 
            AND lc.isWithinGeofence = 1
            AND lc.createdAt >= datetime('now', '-${parseInt(days)} days')
            ORDER BY lc.createdAt DESC
            LIMIT 20
        `;

        const recentVisitors = await db.all(visitorsQuery, [farmId]);

        res.json({
            success: true,
            data: {
                farmId,
                period: `${days} days`,
                analytics,
                recentVisitors,
                summary: {
                    totalChecks: analytics.reduce((sum, day) => sum + day.totalChecks, 0),
                    totalWithinGeofence: analytics.reduce((sum, day) => sum + day.withinGeofence, 0),
                    averageDistance: analytics.length > 0 ? 
                        analytics.reduce((sum, day) => sum + (day.averageDistance || 0), 0) / analytics.length : 0
                }
            }
        });
    } catch (error) {
        console.error('Error getting geofence analytics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get geofence analytics'
        });
    }
});

// ===========================================
// ZONE MANAGEMENT ENDPOINTS
// ===========================================

// Get all geofence zones for the authenticated user
router.get('/zones', async (req, res) => {
    try {
        const userId = req.user.id;
        
        const zonesQuery = `
            SELECT gz.*, f.name as farmName
            FROM geofence_zones gz
            LEFT JOIN farms f ON gz.farmId = f.id
            WHERE f.ownerId = ? OR gz.createdBy = ?
            ORDER BY gz.createdAt DESC
        `;
        
        const zones = await db.all(zonesQuery, [userId, userId]);
        
        // Parse JSON geometry for each zone
        const zonesWithGeometry = zones.map(zone => ({
            ...zone,
            geometry: zone.geometry ? JSON.parse(zone.geometry) : null,
            metadata: zone.metadata ? JSON.parse(zone.metadata) : null
        }));
        
        res.json({
            success: true,
            data: zonesWithGeometry
        });
    } catch (error) {
        console.error('Error fetching zones:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch geofence zones'
        });
    }
});

// Get a specific zone by ID
router.get('/zones/:id', async (req, res) => {
    try {
        const zoneId = req.params.id;
        const userId = req.user.id;
        
        const zoneQuery = `
            SELECT gz.*, f.name as farmName
            FROM geofence_zones gz
            LEFT JOIN farms f ON gz.farmId = f.id
            WHERE gz.id = ? AND (f.ownerId = ? OR gz.createdBy = ?)
        `;
        
        const zone = await db.get(zoneQuery, [zoneId, userId, userId]);
        
        if (!zone) {
            return res.status(404).json({
                success: false,
                error: 'Zone not found or access denied'
            });
        }
        
        // Parse JSON geometry
        zone.geometry = zone.geometry ? JSON.parse(zone.geometry) : null;
        zone.metadata = zone.metadata ? JSON.parse(zone.metadata) : null;
        
        res.json({
            success: true,
            data: zone
        });
    } catch (error) {
        console.error('Error fetching zone:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch zone'
        });
    }
});

// Create a new geofence zone
router.post('/zones', async (req, res) => {
    try {
        const userId = req.user.id;
        const { farmId, name, type, color, geometry, metadata } = req.body;
        
        // Validate required fields
        if (!farmId || !name || !geometry) {
            return res.status(400).json({
                success: false,
                error: 'farmId, name, and geometry are required'
            });
        }
        
        // Validate geometry is a valid polygon
        if (!geometry.type || geometry.type !== 'Polygon' || !geometry.coordinates) {
            return res.status(400).json({
                success: false,
                error: 'Invalid geometry format. Must be a GeoJSON Polygon'
            });
        }
        
        // Check if user owns the farm
        const farm = await db.get(
            'SELECT id FROM farms WHERE id = ? AND ownerId = ?',
            [farmId, userId]
        );
        
        if (!farm) {
            return res.status(403).json({
                success: false,
                error: 'Farm not found or access denied'
            });
        }
        
        const zoneId = uuidv4();
        
        const insertQuery = `
            INSERT INTO geofence_zones (
                id, farmId, name, type, color, geometry, metadata, createdBy, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        `;
        
        await db.run(insertQuery, [
            zoneId,
            farmId,
            name,
            type || 'custom',
            color || '#4CAF50',
            JSON.stringify(geometry),
            metadata ? JSON.stringify(metadata) : null,
            userId
        ]);
        
        // Fetch the created zone
        const createdZone = await db.get(
            'SELECT * FROM geofence_zones WHERE id = ?',
            [zoneId]
        );
        
        createdZone.geometry = JSON.parse(createdZone.geometry);
        if (createdZone.metadata) {
            createdZone.metadata = JSON.parse(createdZone.metadata);
        }
        
        res.status(201).json({
            success: true,
            data: createdZone
        });
    } catch (error) {
        console.error('Error creating zone:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create geofence zone'
        });
    }
});

// Update a geofence zone
router.put('/zones/:id', async (req, res) => {
    try {
        const zoneId = req.params.id;
        const userId = req.user.id;
        const { name, type, color, geometry, metadata } = req.body;
        
        // Check if zone exists and user has access
        const existingZone = await db.get(`
            SELECT gz.id FROM geofence_zones gz
            LEFT JOIN farms f ON gz.farmId = f.id
            WHERE gz.id = ? AND (f.ownerId = ? OR gz.createdBy = ?)
        `, [zoneId, userId, userId]);
        
        if (!existingZone) {
            return res.status(404).json({
                success: false,
                error: 'Zone not found or access denied'
            });
        }
        
        // Validate geometry if provided
        if (geometry && (!geometry.type || geometry.type !== 'Polygon' || !geometry.coordinates)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid geometry format. Must be a GeoJSON Polygon'
            });
        }
        
        // Build update query dynamically
        const updates = [];
        const params = [];
        
        if (name !== undefined) {
            updates.push('name = ?');
            params.push(name);
        }
        if (type !== undefined) {
            updates.push('type = ?');
            params.push(type);
        }
        if (color !== undefined) {
            updates.push('color = ?');
            params.push(color);
        }
        if (geometry !== undefined) {
            updates.push('geometry = ?');
            params.push(JSON.stringify(geometry));
        }
        if (metadata !== undefined) {
            updates.push('metadata = ?');
            params.push(JSON.stringify(metadata));
        }
        
        updates.push("updatedAt = datetime('now')");
        params.push(zoneId);
        
        if (updates.length > 1) {
            await db.run(
                `UPDATE geofence_zones SET ${updates.join(', ')} WHERE id = ?`,
                params
            );
        }
        
        // Fetch updated zone
        const updatedZone = await db.get(
            'SELECT * FROM geofence_zones WHERE id = ?',
            [zoneId]
        );
        
        updatedZone.geometry = JSON.parse(updatedZone.geometry);
        if (updatedZone.metadata) {
            updatedZone.metadata = JSON.parse(updatedZone.metadata);
        }
        
        res.json({
            success: true,
            data: updatedZone
        });
    } catch (error) {
        console.error('Error updating zone:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update geofence zone'
        });
    }
});

// Delete a geofence zone
router.delete('/zones/:id', async (req, res) => {
    try {
        const zoneId = req.params.id;
        const userId = req.user.id;
        
        // Check if zone exists and user has access
        const zone = await db.get(`
            SELECT gz.id FROM geofence_zones gz
            LEFT JOIN farms f ON gz.farmId = f.id
            WHERE gz.id = ? AND (f.ownerId = ? OR gz.createdBy = ?)
        `, [zoneId, userId, userId]);
        
        if (!zone) {
            return res.status(404).json({
                success: false,
                error: 'Zone not found or access denied'
            });
        }
        
        await db.run('DELETE FROM geofence_zones WHERE id = ?', [zoneId]);
        
        res.json({
            success: true,
            message: 'Zone deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting zone:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete geofence zone'
        });
    }
});

// Log a geofence event (enter/exit)
router.post('/events', async (req, res) => {
    try {
        const userId = req.user.id;
        const { zoneId, eventType, latitude, longitude, timestamp } = req.body;
        
        // Validate required fields
        if (!zoneId || !eventType || !latitude || !longitude) {
            return res.status(400).json({
                success: false,
                error: 'zoneId, eventType, latitude, and longitude are required'
            });
        }
        
        // Validate event type
        if (!['enter', 'exit'].includes(eventType)) {
            return res.status(400).json({
                success: false,
                error: 'eventType must be either "enter" or "exit"'
            });
        }
        
        const eventId = uuidv4();
        
        const insertQuery = `
            INSERT INTO visitor_logs (
                id, farmId, userId, eventType, latitude, longitude, timestamp, createdAt
            ) VALUES (?, (SELECT farmId FROM geofence_zones WHERE id = ?), ?, ?, ?, ?, ?, datetime('now'))
        `;
        
        await db.run(insertQuery, [
            eventId,
            zoneId,
            userId,
            eventType,
            latitude,
            longitude,
            timestamp || new Date().toISOString()
        ]);
        
        res.status(201).json({
            success: true,
            data: {
                eventId,
                zoneId,
                eventType,
                timestamp: timestamp || new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error logging geofence event:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to log geofence event'
        });
    }
});

// Get geofence events for a zone
router.get('/zones/:id/events', async (req, res) => {
    try {
        const zoneId = req.params.id;
        const userId = req.user.id;
        const { limit = 50, offset = 0 } = req.query;
        
        // Check if user has access to this zone
        const zone = await db.get(`
            SELECT gz.id FROM geofence_zones gz
            LEFT JOIN farms f ON gz.farmId = f.id
            WHERE gz.id = ? AND (f.ownerId = ? OR gz.createdBy = ?)
        `, [zoneId, userId, userId]);
        
        if (!zone) {
            return res.status(404).json({
                success: false,
                error: 'Zone not found or access denied'
            });
        }
        
        const eventsQuery = `
            SELECT vl.*, u.name as userName, u.email as userEmail
            FROM visitor_logs vl
            LEFT JOIN users u ON vl.userId = u.id
            WHERE vl.farmId = (SELECT farmId FROM geofence_zones WHERE id = ?)
            ORDER BY vl.timestamp DESC
            LIMIT ? OFFSET ?
        `;
        
        const events = await db.all(eventsQuery, [zoneId, parseInt(limit), parseInt(offset)]);
        
        res.json({
            success: true,
            data: events
        });
    } catch (error) {
        console.error('Error fetching zone events:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch zone events'
        });
    }
});

module.exports = router;
