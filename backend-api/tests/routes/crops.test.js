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

describe('Crops Controller', () => {
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

        // Mount crops routes
        const cropsRouter = require('../../routes/crops');
        app.use('/api/crops', cropsRouter);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Set up default mock responses to return Promises
        mockDb.get.mockImplementation((query, params) => {
            if (query.includes('COUNT')) {
                return Promise.resolve({ total: 2 });
            } else if (query.includes('id')) {
                return Promise.resolve({ 
                    id: 'test-crop-1', 
                    name: 'Test Crop', 
                    type: 'GRAIN',
                    farmId: 'test-farm-1',
                    plantedDate: '2024-01-01',
                    expectedHarvestDate: '2024-06-01',
                    status: 'GROWING'
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
                    id: 'test-crop-1', 
                    name: 'Test Crop 1', 
                    type: 'GRAIN',
                    farmId: 'test-farm-1',
                    plantedDate: '2024-01-01',
                    expectedHarvestDate: '2024-06-01',
                    status: 'GROWING'
                },
                { 
                    id: 'test-crop-2', 
                    name: 'Test Crop 2', 
                    type: 'VEGETABLE',
                    farmId: 'test-farm-1',
                    plantedDate: '2024-02-01',
                    expectedHarvestDate: '2024-05-01',
                    status: 'GROWING'
                }
            ]);
        });
        
        mockDb.run.mockImplementation((query, params) => {
            return Promise.resolve({ lastID: 'new-crop-id', changes: 1 });
        });
    });

    describe('GET /api/crops', () => {
        it('should return all crops for authenticated user', async () => {
            const response = await request(app)
                .get('/api/crops')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter crops by farm ID', async () => {
            const response = await request(app)
                .get('/api/crops?farmId=test-farm-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter crops by type', async () => {
            const response = await request(app)
                .get('/api/crops?type=GRAIN')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter crops by status', async () => {
            const response = await request(app)
                .get('/api/crops?status=GROWING')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should require authentication', async () => {
            const response = await request(app)
                .get('/api/crops');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/crops/:id', () => {
        it('should return crop by ID', async () => {
            const response = await request(app)
                .get('/api/crops/test-crop-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe('test-crop-1');
        });

        it('should return 404 for non-existent crop', async () => {
            // Mock that no crop is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .get('/api/crops/non-existent-crop')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/crops', () => {
        it('should create a new crop', async () => {
            const newCrop = {
                name: 'New Test Crop',
                type: 'FRUIT',
                farmId: 'test-farm-1',
                plantedDate: '2024-03-01',
                expectedHarvestDate: '2024-08-01',
                area: 25.0
            };

            const response = await request(app)
                .post('/api/crops')
                .set(AuthHelper.getFarmerHeaders())
                .send(newCrop);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Crop created successfully');
            expect(response.body.data).toBeDefined();
        });

        it('should validate required fields', async () => {
            const invalidCrop = {
                name: 'Incomplete Crop'
                // Missing required fields
            };

            const response = await request(app)
                .post('/api/crops')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidCrop);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should validate dates are logical', async () => {
            const invalidCrop = {
                name: 'Invalid Crop',
                type: 'GRAIN',
                farmId: 'test-farm-1',
                plantedDate: '2024-06-01',
                expectedHarvestDate: '2024-01-01' // Before planted date
            };

            const response = await request(app)
                .post('/api/crops')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidCrop);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('PUT /api/crops/:id', () => {
        it('should update an existing crop', async () => {
            const updateData = {
                name: 'Updated Crop Name',
                status: 'HARVESTED'
            };

            const response = await request(app)
                .put('/api/crops/test-crop-1')
                .set(AuthHelper.getFarmerHeaders())
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Crop updated successfully');
        });

        it('should return 404 for non-existent crop', async () => {
            // Mock that no crop is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .put('/api/crops/non-existent-crop')
                .set(AuthHelper.getFarmerHeaders())
                .send({ name: 'Updated Name' });

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /api/crops/:id', () => {
        it('should delete an existing crop', async () => {
            const response = await request(app)
                .delete('/api/crops/test-crop-2')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Crop deleted successfully');
        });
    });

    describe('PATCH /api/crops/:id/status', () => {
        it('should update crop status', async () => {
            const statusUpdate = {
                status: 'HARVESTED',
                notes: 'Successfully harvested'
            };

            const response = await request(app)
                .patch('/api/crops/test-crop-1/status')
                .set(AuthHelper.getFarmerHeaders())
                .send(statusUpdate);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Crop status updated successfully');
        });

        it('should validate status transition', async () => {
            const invalidUpdate = {
                status: 'INVALID_STATUS'
            };

            const response = await request(app)
                .patch('/api/crops/test-crop-1/status')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidUpdate);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/crops/:id/analytics', () => {
        it('should return crop analytics', async () => {
            const response = await request(app)
                .get('/api/crops/test-crop-1/analytics')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.cropId).toBe('test-crop-1');
        });
    });

    describe('GET /api/crops/stats/overview', () => {
        it('should return crop statistics', async () => {
            const response = await request(app)
                .get('/api/crops/stats/overview')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });
    });
});
