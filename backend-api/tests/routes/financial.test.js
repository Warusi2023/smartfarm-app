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

describe('Financial Controller', () => {
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

        // Mount financial routes
        const financialRouter = require('../../routes/financial');
        app.use('/api/financial', financialRouter);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Set up default mock responses to return Promises
        mockDb.get.mockImplementation((query, params) => {
            if (query.includes('COUNT')) {
                return Promise.resolve({ total: 2 });
            } else if (query.includes('id')) {
                return Promise.resolve({ 
                    id: 'test-financial-1', 
                    type: 'INCOME', 
                    category: 'CROP_SALES',
                    amount: 1500.0,
                    farmId: 'test-farm-1',
                    date: '2024-01-15',
                    description: 'Wheat harvest sale'
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
                    id: 'test-financial-1', 
                    type: 'INCOME', 
                    category: 'CROP_SALES',
                    amount: 1500.0,
                    farmId: 'test-farm-1',
                    date: '2024-01-15',
                    description: 'Wheat harvest sale'
                },
                { 
                    id: 'test-financial-2', 
                    type: 'EXPENSE', 
                    category: 'EQUIPMENT',
                    amount: 500.0,
                    farmId: 'test-farm-1',
                    date: '2024-01-20',
                    description: 'Tractor maintenance'
                }
            ]);
        });
        
        mockDb.run.mockImplementation((query, params) => {
            return Promise.resolve({ lastID: 'new-financial-id', changes: 1 });
        });
    });

    describe('GET /api/financial', () => {
        it('should return all financial records for authenticated user', async () => {
            const response = await request(app)
                .get('/api/financial')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter financial records by farm ID', async () => {
            const response = await request(app)
                .get('/api/financial?farmId=test-farm-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter financial records by type', async () => {
            const response = await request(app)
                .get('/api/financial?type=INCOME')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter financial records by category', async () => {
            const response = await request(app)
                .get('/api/financial?category=CROP_SALES')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter financial records by date range', async () => {
            const response = await request(app)
                .get('/api/financial?startDate=2024-01-01&endDate=2024-01-31')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should require authentication', async () => {
            const response = await request(app)
                .get('/api/financial');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/financial/:id', () => {
        it('should return financial record by ID', async () => {
            const response = await request(app)
                .get('/api/financial/test-financial-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe('test-financial-1');
        });

        it('should return 404 for non-existent financial record', async () => {
            // Mock that no financial record is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .get('/api/financial/non-existent-record')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/financial', () => {
        it('should create a new financial record', async () => {
            const newRecord = {
                type: 'INCOME',
                category: 'LIVESTOCK_SALES',
                amount: 800.0,
                farmId: 'test-farm-1',
                date: '2024-02-01',
                description: 'Cattle sale'
            };

            const response = await request(app)
                .post('/api/financial')
                .set(AuthHelper.getFarmerHeaders())
                .send(newRecord);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Financial record created successfully');
            expect(response.body.data).toBeDefined();
        });

        it('should validate required fields', async () => {
            const invalidRecord = {
                type: 'INCOME'
                // Missing required fields
            };

            const response = await request(app)
                .post('/api/financial')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidRecord);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should validate amount is positive', async () => {
            const invalidRecord = {
                type: 'INCOME',
                category: 'CROP_SALES',
                amount: -100.0,
                farmId: 'test-farm-1',
                date: '2024-02-01',
                description: 'Invalid amount'
            };

            const response = await request(app)
                .post('/api/financial')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidRecord);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should validate date is not in future', async () => {
            // Override the default mock for this specific test
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('farms WHERE id = ? AND ownerId = ?')) {
                    return Promise.resolve({ id: 'test-farm-1' });
                } else if (query.includes('COUNT')) {
                    return Promise.resolve({ total: 2 });
                } else if (query.includes('id')) {
                    return Promise.resolve({ 
                        id: 'test-financial-1', 
                        type: 'INCOME',
                        category: 'CROP_SALES',
                        amount: 1000.0,
                        farmId: 'test-farm-1',
                        date: '2024-01-01',
                        description: 'Wheat harvest sale'
                    });
                } else if (query.includes('farms WHERE id = ?')) {
                    return Promise.resolve({ id: 'test-farm-1', name: 'Test Farm' });
                } else {
                    return Promise.resolve(null);
                }
            });

            const invalidRecord = {
                type: 'INCOME',
                category: 'CROP_SALES',
                amount: 100.0,
                farmId: 'test-farm-1',
                date: '2030-01-01', // Future date that will always be in the future
                description: 'Future transaction'
            };

            const response = await request(app)
                .post('/api/financial')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidRecord);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Date cannot be in the future');
        });
    });

    describe('PUT /api/financial/:id', () => {
        it('should update an existing financial record', async () => {
            const updateData = {
                amount: 1600.0,
                description: 'Updated wheat harvest sale'
            };

            const response = await request(app)
                .put('/api/financial/test-financial-1')
                .set(AuthHelper.getFarmerHeaders())
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Financial record updated successfully');
        });

        it('should return 404 for non-existent financial record', async () => {
            // Mock that no financial record is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .put('/api/financial/non-existent-record')
                .set(AuthHelper.getFarmerHeaders())
                .send({ amount: 1000.0 });

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /api/financial/:id', () => {
        it('should delete an existing financial record', async () => {
            const response = await request(app)
                .delete('/api/financial/test-financial-2')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Financial record deleted successfully');
        });
    });

    describe('GET /api/financial/:id/analytics', () => {
        it('should return financial record analytics', async () => {
            const response = await request(app)
                .get('/api/financial/test-financial-1/analytics')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.recordId).toBe('test-financial-1');
        });
    });

    describe('GET /api/financial/stats/overview', () => {
        it('should return financial statistics', async () => {
            const response = await request(app)
                .get('/api/financial/stats/overview')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });
    });

    describe('GET /api/financial/stats/profit-loss', () => {
        it('should return profit and loss statement', async () => {
            const response = await request(app)
                .get('/api/financial/stats/profit-loss')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });
    });

    describe('GET /api/financial/stats/cash-flow', () => {
        it('should return cash flow statement', async () => {
            const response = await request(app)
                .get('/api/financial/stats/cash-flow')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });
    });
});
