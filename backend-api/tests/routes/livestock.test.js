const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const AuthHelper = require('../helpers/authHelper');

// Mock the database module to return Promises (since routes use await)
jest.mock('../../database/init', () => ({
    get: jest.fn(),
    all: jest.fn(),
    run: jest.fn()
}));

describe('Livestock Controller', () => {
    let app;
    let mockDb;

    beforeAll(async () => {
        // Get the mocked database
        mockDb = require('../../database/init');

        // Create Express app for testing
        app = express();
        app.use(express.json());
        
        // Mock authentication middleware
        app.use((req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ success: false, error: 'No token provided' });
            }
            
            try {
                const token = authHeader.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret-key');
                req.user = decoded;
                next();
            } catch (error) {
                return res.status(401).json({ success: false, error: 'Invalid token' });
            }
        });

        // Mount livestock routes
        const livestockRouter = require('../../routes/livestock');
        app.use('/api/livestock', livestockRouter);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Set up default mock responses to return Promises
        mockDb.get.mockImplementation((query, params) => {
            if (query.includes('COUNT')) {
                return Promise.resolve({ total: 2 });
            } else if (query.includes('id')) {
                return Promise.resolve({ 
                    id: 'test-livestock-1', 
                    name: 'Test Animal', 
                    type: 'CATTLE',
                    breed: 'Angus',
                    farmId: 'test-farm-1',
                    birthDate: '2020-01-01',
                    status: 'HEALTHY'
                });
            } else if (query.includes('farms WHERE id = ? AND ownerId = ?')) {
                // Mock farm access check
                return Promise.resolve({ id: 'test-farm-1' });
            } else if (query.includes('farms WHERE id = ?')) {
                // Mock farm existence check
                return Promise.resolve({ id: 'test-farm-1', name: 'Test Farm' });
            } else {
                return Promise.resolve(null);
            }
        });
        
        mockDb.all.mockImplementation((query, params) => {
            return Promise.resolve([
                { 
                    id: 'test-livestock-1', 
                    name: 'Test Animal 1', 
                    type: 'CATTLE',
                    breed: 'Angus',
                    farmId: 'test-farm-1',
                    birthDate: '2020-01-01',
                    status: 'HEALTHY'
                },
                { 
                    id: 'test-livestock-2', 
                    name: 'Test Animal 2', 
                    type: 'POULTRY',
                    breed: 'Leghorn',
                    farmId: 'test-farm-1',
                    birthDate: '2021-03-01',
                    status: 'HEALTHY'
                }
            ]);
        });
        
        mockDb.run.mockImplementation((query, params) => {
            return Promise.resolve({ lastID: 'new-livestock-id', changes: 1 });
        });
    });

    describe('GET /api/livestock', () => {
        it('should return all livestock for authenticated user', async () => {
            const response = await request(app)
                .get('/api/livestock')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter livestock by farm ID', async () => {
            const response = await request(app)
                .get('/api/livestock?farmId=test-farm-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter livestock by type', async () => {
            const response = await request(app)
                .get('/api/livestock?type=CATTLE')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter livestock by status', async () => {
            const response = await request(app)
                .get('/api/livestock?status=HEALTHY')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should require authentication', async () => {
            const response = await request(app)
                .get('/api/livestock');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/livestock/:id', () => {
        it('should return livestock by ID', async () => {
            const response = await request(app)
                .get('/api/livestock/test-livestock-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe('test-livestock-1');
        });

        it('should return 404 for non-existent livestock', async () => {
            // Mock that no livestock is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .get('/api/livestock/non-existent-livestock')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/livestock', () => {
        it('should create a new livestock', async () => {
            const newLivestock = {
                name: 'New Test Animal',
                type: 'SHEEP',
                breed: 'Merino',
                farmId: 'test-farm-1',
                birthDate: '2022-05-01',
                weight: 45.0
            };

            const response = await request(app)
                .post('/api/livestock')
                .set(AuthHelper.getFarmerHeaders())
                .send(newLivestock);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Livestock created successfully');
            expect(response.body.data).toBeDefined();
        });

        it('should validate required fields', async () => {
            const invalidLivestock = {
                name: 'Incomplete Animal'
                // Missing required fields
            };

            const response = await request(app)
                .post('/api/livestock')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidLivestock);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should validate birth date is not in future', async () => {
            // Override the default mock for this specific test
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('farms WHERE id = ? AND ownerId = ?')) {
                    return Promise.resolve({ id: 'test-farm-1' });
                } else if (query.includes('COUNT')) {
                    return Promise.resolve({ total: 2 });
                } else if (query.includes('id')) {
                    return Promise.resolve({ 
                        id: 'test-livestock-1', 
                        name: 'Test Animal', 
                        type: 'CATTLE',
                        breed: 'Angus',
                        farmId: 'test-farm-1',
                        birthDate: '2020-01-01',
                        status: 'HEALTHY'
                    });
                } else if (query.includes('farms WHERE id = ?')) {
                    return Promise.resolve({ id: 'test-farm-1', name: 'Test Farm' });
                } else {
                    return Promise.resolve(null);
                }
            });

            const invalidLivestock = {
                name: 'Invalid Animal',
                type: 'CATTLE',
                breed: 'Angus',
                farmId: 'test-farm-1',
                birthDate: '2030-01-01' // Future date that will always be in the future
            };

            const response = await request(app)
                .post('/api/livestock')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidLivestock);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Birth date cannot be in the future');
        });
    });

    describe('PUT /api/livestock/:id', () => {
        it('should update an existing livestock', async () => {
            const updateData = {
                name: 'Updated Animal Name',
                status: 'SICK'
            };

            const response = await request(app)
                .put('/api/livestock/test-livestock-1')
                .set(AuthHelper.getFarmerHeaders())
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Livestock updated successfully');
        });

        it('should return 404 for non-existent livestock', async () => {
            // Mock that no livestock is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .put('/api/livestock/non-existent-livestock')
                .set(AuthHelper.getFarmerHeaders())
                .send({ name: 'Updated Name' });

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /api/livestock/:id', () => {
        it('should delete an existing livestock', async () => {
            const response = await request(app)
                .delete('/api/livestock/test-livestock-2')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Livestock deleted successfully');
        });
    });

    describe('PATCH /api/livestock/:id/status', () => {
        it('should update livestock status', async () => {
            const statusUpdate = {
                status: 'SICK',
                notes: 'Under veterinary care'
            };

            const response = await request(app)
                .patch('/api/livestock/test-livestock-1/status')
                .set(AuthHelper.getFarmerHeaders())
                .send(statusUpdate);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Livestock status updated successfully');
        });

        it('should validate status transition', async () => {
            const invalidUpdate = {
                status: 'INVALID_STATUS'
            };

            const response = await request(app)
                .patch('/api/livestock/test-livestock-1/status')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidUpdate);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/livestock/:id/analytics', () => {
        it('should return livestock analytics', async () => {
            const response = await request(app)
                .get('/api/livestock/test-livestock-1/analytics')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.livestockId).toBe('test-livestock-1');
        });
    });

    describe('GET /api/livestock/stats/overview', () => {
        it('should return livestock statistics', async () => {
            const response = await request(app)
                .get('/api/livestock/stats/overview')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });
    });
});
