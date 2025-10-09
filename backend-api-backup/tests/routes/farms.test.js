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

describe('Farms Controller', () => {
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

        // Mount farms routes
        const farmsRouter = require('../../routes/farms');
        app.use('/api/farms', farmsRouter);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Set up default mock responses to return Promises
        mockDb.get.mockImplementation((query, params) => {
            if (query.includes('COUNT')) {
                return Promise.resolve({ total: 2 });
            } else if (query.includes('id')) {
                return Promise.resolve({ 
                    id: 'test-farm-1', 
                    name: 'Test Farm', 
                    location: 'Test Location',
                    size: 100.0,
                    ownerId: 'test-user-1',
                    status: 'active'
                });
            } else if (query.includes('users WHERE id = ?')) {
                // Mock user existence check
                return Promise.resolve({ id: 'test-user-1', role: 'farmer' });
            } else {
                return Promise.resolve(null);
            }
        });
        
        mockDb.all.mockImplementation((query, params) => {
            return Promise.resolve([
                { 
                    id: 'test-farm-1', 
                    name: 'Test Farm 1', 
                    location: 'Test Location 1',
                    size: 100.0,
                    ownerId: 'test-user-1',
                    status: 'active'
                },
                { 
                    id: 'test-farm-2', 
                    name: 'Test Farm 2', 
                    location: 'Test Location 2',
                    size: 150.0,
                    ownerId: 'test-user-1',
                    status: 'active'
                }
            ]);
        });
        
        mockDb.run.mockImplementation((query, params) => {
            return Promise.resolve({ lastID: 'new-farm-id', changes: 1 });
        });
    });

    describe('GET /api/farms', () => {
        it('should return all farms for authenticated user', async () => {
            const response = await request(app)
                .get('/api/farms')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter farms by status', async () => {
            const response = await request(app)
                .get('/api/farms?status=active')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter farms by size range', async () => {
            const response = await request(app)
                .get('/api/farms?minSize=50&maxSize=200')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should require authentication', async () => {
            const response = await request(app)
                .get('/api/farms');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/farms/:id', () => {
        it('should return farm by ID', async () => {
            const response = await request(app)
                .get('/api/farms/test-farm-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe('test-farm-1');
        });

        it('should return 404 for non-existent farm', async () => {
            // Mock that no farm is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-user-1' });
            });

            const response = await request(app)
                .get('/api/farms/non-existent-farm')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/farms', () => {
        it('should create a new farm', async () => {
            const newFarm = {
                name: 'New Test Farm',
                location: 'New Test Location',
                size: 75.0,
                description: 'A new test farm'
            };

            const response = await request(app)
                .post('/api/farms')
                .set(AuthHelper.getFarmerHeaders())
                .send(newFarm);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Farm created successfully');
            expect(response.body.data).toBeDefined();
        });

        it('should validate required fields', async () => {
            const invalidFarm = {
                name: 'Incomplete Farm'
                // Missing required fields
            };

            const response = await request(app)
                .post('/api/farms')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidFarm);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should validate size is positive', async () => {
            const invalidFarm = {
                name: 'Invalid Farm',
                location: 'Test Location',
                size: -50.0
            };

            const response = await request(app)
                .post('/api/farms')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidFarm);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('PUT /api/farms/:id', () => {
        it('should update an existing farm', async () => {
            const updateData = {
                name: 'Updated Farm Name',
                location: 'Updated Location'
            };

            const response = await request(app)
                .put('/api/farms/test-farm-1')
                .set(AuthHelper.getFarmerHeaders())
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Farm updated successfully');
        });

        it('should return 404 for non-existent farm', async () => {
            // Mock that no farm is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-user-1' });
            });

            const response = await request(app)
                .put('/api/farms/non-existent-farm')
                .set(AuthHelper.getFarmerHeaders())
                .send({ name: 'Updated Name' });

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /api/farms/:id', () => {
        it('should delete an existing farm', async () => {
            const response = await request(app)
                .delete('/api/farms/test-farm-2')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Farm deleted successfully');
        });
    });

    describe('GET /api/farms/:id/analytics', () => {
        it('should return farm analytics', async () => {
            const response = await request(app)
                .get('/api/farms/test-farm-1/analytics')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.farmId).toBe('test-farm-1');
        });
    });

    describe('GET /api/farms/stats/overview', () => {
        it('should return farm statistics', async () => {
            const response = await request(app)
                .get('/api/farms/stats/overview')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });
    });
});
