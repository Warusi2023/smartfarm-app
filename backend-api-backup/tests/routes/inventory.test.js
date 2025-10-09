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

describe('Inventory Controller', () => {
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

        // Mount inventory routes
        const inventoryRouter = require('../../routes/inventory');
        app.use('/api/inventory', inventoryRouter);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Set up default mock responses to return Promises
        mockDb.get.mockImplementation((query, params) => {
            if (query.includes('COUNT')) {
                return Promise.resolve({ total: 2 });
            } else if (query.includes('id')) {
                return Promise.resolve({ 
                    id: 'test-inventory-1', 
                    name: 'Test Item', 
                    category: 'SEEDS',
                    quantity: 50.0,
                    unit: 'kg',
                    cost: 25.0,
                    supplier: 'Test Supplier',
                    farmId: 'test-farm-1',
                    lowStockThreshold: 10.0
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
                    id: 'test-inventory-1', 
                    name: 'Test Item 1', 
                    category: 'SEEDS',
                    quantity: 50.0,
                    unit: 'kg',
                    cost: 25.0,
                    supplier: 'Test Supplier 1',
                    farmId: 'test-farm-1',
                    lowStockThreshold: 10.0
                },
                { 
                    id: 'test-inventory-2', 
                    name: 'Test Item 2', 
                    category: 'FERTILIZER',
                    quantity: 100.0,
                    unit: 'kg',
                    cost: 75.0,
                    supplier: 'Test Supplier 2',
                    farmId: 'test-farm-1',
                    lowStockThreshold: 20.0
                }
            ]);
        });
        
        mockDb.run.mockImplementation((query, params) => {
            return Promise.resolve({ lastID: 'new-inventory-id', changes: 1 });
        });
    });

    describe('GET /api/inventory', () => {
        it('should return all inventory items for authenticated user', async () => {
            const response = await request(app)
                .get('/api/inventory')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter inventory by farm ID', async () => {
            const response = await request(app)
                .get('/api/inventory?farmId=test-farm-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should filter inventory by category', async () => {
            const response = await request(app)
                .get('/api/inventory?category=SEEDS')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter low stock items', async () => {
            const response = await request(app)
                .get('/api/inventory?lowStock=true')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should require authentication', async () => {
            const response = await request(app)
                .get('/api/inventory');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/inventory/:id', () => {
        it('should return inventory item by ID', async () => {
            const response = await request(app)
                .get('/api/inventory/test-inventory-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe('test-inventory-1');
        });

        it('should return 404 for non-existent item', async () => {
            // Mock that no item is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .get('/api/inventory/non-existent-item')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/inventory', () => {
        it('should create a new inventory item', async () => {
            const newItem = {
                name: 'New Test Item',
                category: 'EQUIPMENT',
                quantity: 25.0,
                unit: 'pieces',
                cost: 150.0,
                supplier: 'Test Supplier',
                farmId: 'test-farm-1'
            };

            const response = await request(app)
                .post('/api/inventory')
                .set(AuthHelper.getFarmerHeaders())
                .send(newItem);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Inventory item created successfully');
            expect(response.body.data).toBeDefined();
        });

        it('should validate required fields', async () => {
            const invalidItem = {
                name: 'Incomplete Item'
                // Missing required fields
            };

            const response = await request(app)
                .post('/api/inventory')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidItem);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should validate quantity and cost are non-negative', async () => {
            const invalidItem = {
                name: 'Invalid Item',
                category: 'EQUIPMENT',
                quantity: -5.0,
                unit: 'pieces',
                cost: 150.0,
                farmId: 'test-farm-1'
            };

            const response = await request(app)
                .post('/api/inventory')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidItem);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('PUT /api/inventory/:id', () => {
        it('should update an existing inventory item', async () => {
            const updateData = {
                name: 'Updated Item Name',
                quantity: 75.0
            };

            const response = await request(app)
                .put('/api/inventory/test-inventory-1')
                .set(AuthHelper.getFarmerHeaders())
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Inventory item updated successfully');
        });

        it('should return 404 for non-existent item', async () => {
            // Mock that no item is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .put('/api/inventory/non-existent-item')
                .set(AuthHelper.getFarmerHeaders())
                .send({ name: 'Updated Name' });

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /api/inventory/:id', () => {
        it('should delete an existing inventory item', async () => {
            const response = await request(app)
                .delete('/api/inventory/test-inventory-2')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Inventory item deleted successfully');
        });
    });

    describe('PATCH /api/inventory/:id/quantity', () => {
        it('should update inventory quantity', async () => {
            const quantityUpdate = {
                quantity: 60.0,
                notes: 'Updated quantity after stock check'
            };

            const response = await request(app)
                .patch('/api/inventory/test-inventory-1/quantity')
                .set(AuthHelper.getFarmerHeaders())
                .send(quantityUpdate);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Inventory quantity updated successfully');
        });

        it('should update quantity using adjustment', async () => {
            const adjustmentUpdate = {
                adjustment: -10.0,
                notes: 'Sold 10 units'
            };

            const response = await request(app)
                .patch('/api/inventory/test-inventory-1/quantity')
                .set(AuthHelper.getFarmerHeaders())
                .send(adjustmentUpdate);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should prevent negative quantity', async () => {
            const invalidUpdate = {
                quantity: -100.0
            };

            const response = await request(app)
                .patch('/api/inventory/test-inventory-1/quantity')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidUpdate);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/inventory/:id/analytics', () => {
        it('should return inventory analytics', async () => {
            const response = await request(app)
                .get('/api/inventory/test-inventory-1/analytics')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.itemId).toBe('test-inventory-1');
            expect(response.body.data.stockLevel).toBeDefined();
            expect(response.body.data.isLowStock).toBeDefined();
        });
    });

    describe('GET /api/inventory/stats/overview', () => {
        it('should return inventory statistics', async () => {
            const response = await request(app)
                .get('/api/inventory/stats/overview')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.overview).toBeDefined();
            expect(response.body.data.byCategory).toBeDefined();
            expect(response.body.data.lowStockItems).toBeDefined();
        });
    });
});
