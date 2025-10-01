// Geofencing API Tests
const request = require('supertest');
const app = require('../server');
const db = require('../database/init');

describe('Geofencing API', () => {
    let authToken;
    let userId;
    let farmId;
    let zoneId;

    beforeAll(async () => {
        // Create test user and get token
        const registerRes = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: `test${Date.now()}@test.com`,
                password: 'password123',
                role: 'farmer'
            });

        authToken = registerRes.body.token;
        userId = registerRes.body.user.id;

        // Create test farm
        const farmRes = await request(app)
            .post('/api/farms')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'Test Farm',
                location: 'Test Location',
                size: 10,
                latitude: -18.1234,
                longitude: 178.4567
            });

        farmId = farmRes.body.data.id;
    });

    afterAll(async () => {
        // Cleanup test data
        if (zoneId) {
            await db.run('DELETE FROM geofence_zones WHERE id = ?', [zoneId]);
        }
        if (farmId) {
            await db.run('DELETE FROM farms WHERE id = ?', [farmId]);
        }
        if (userId) {
            await db.run('DELETE FROM users WHERE id = ?', [userId]);
        }
    });

    describe('POST /api/geofencing/zones', () => {
        it('should create a new geofence zone', async () => {
            const res = await request(app)
                .post('/api/geofencing/zones')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    farmId: farmId,
                    name: 'North Field',
                    type: 'crop_area',
                    color: '#4CAF50',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [-18.1234, 178.4567],
                                [-18.1244, 178.4567],
                                [-18.1244, 178.4577],
                                [-18.1234, 178.4577],
                                [-18.1234, 178.4567]
                            ]
                        ]
                    },
                    metadata: {
                        cropType: 'Taro',
                        area: '2.5 hectares'
                    }
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data.name).toBe('North Field');
            
            zoneId = res.body.data.id;
        });

        it('should fail without authentication', async () => {
            const res = await request(app)
                .post('/api/geofencing/zones')
                .send({
                    farmId: farmId,
                    name: 'Unauthorized Zone',
                    geometry: { type: 'Polygon', coordinates: [[[]]] }
                });

            expect(res.statusCode).toBe(401);
        });

        it('should fail with invalid geometry', async () => {
            const res = await request(app)
                .post('/api/geofencing/zones')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    farmId: farmId,
                    name: 'Invalid Zone',
                    geometry: { type: 'Invalid', coordinates: [] }
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.error).toContain('Invalid geometry');
        });
    });

    describe('GET /api/geofencing/zones', () => {
        it('should list all zones for user', async () => {
            const res = await request(app)
                .get('/api/geofencing/zones')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('GET /api/geofencing/zones/:id', () => {
        it('should get a specific zone', async () => {
            const res = await request(app)
                .get(`/api/geofencing/zones/${zoneId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.id).toBe(zoneId);
        });

        it('should return 404 for non-existent zone', async () => {
            const res = await request(app)
                .get('/api/geofencing/zones/non-existent-id')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(404);
        });
    });

    describe('PUT /api/geofencing/zones/:id', () => {
        it('should update a zone', async () => {
            const res = await request(app)
                .put(`/api/geofencing/zones/${zoneId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'North Field - Updated',
                    color: '#FF5722'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe('North Field - Updated');
            expect(res.body.data.color).toBe('#FF5722');
        });
    });

    describe('POST /api/geofencing/events', () => {
        it('should log a geofence event', async () => {
            const res = await request(app)
                .post('/api/geofencing/events')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    zoneId: zoneId,
                    eventType: 'enter',
                    latitude: -18.1240,
                    longitude: 178.4570
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.eventType).toBe('enter');
        });

        it('should fail with invalid event type', async () => {
            const res = await request(app)
                .post('/api/geofencing/events')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    zoneId: zoneId,
                    eventType: 'invalid',
                    latitude: -18.1240,
                    longitude: 178.4570
                });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('DELETE /api/geofencing/zones/:id', () => {
        it('should delete a zone', async () => {
            const res = await request(app)
                .delete(`/api/geofencing/zones/${zoneId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toContain('deleted');
            
            // Clear zoneId so afterAll doesn't try to delete it again
            zoneId = null;
        });
    });
});

