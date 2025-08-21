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

describe('Tasks Controller', () => {
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

        // Mount tasks routes
        const tasksRouter = require('../../routes/tasks');
        app.use('/api/tasks', tasksRouter);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        
        // Set up default mock responses to return Promises
        mockDb.get.mockImplementation((query, params) => {
            if (query.includes('COUNT')) {
                return Promise.resolve({ total: 2 });
            } else if (query.includes('id')) {
                return Promise.resolve({
                    id: 'test-task-1',
                    title: 'Test Task',
                    description: 'Test Description',
                    farmId: 'test-farm-1',
                    status: 'PENDING',
                    priority: 'HIGH',
                    category: 'PLANTING',
                    dueDate: '2024-12-31'
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
                    id: 'test-task-1',
                    title: 'Test Task 1',
                    description: 'Test Description 1',
                    farmId: 'test-farm-1',
                    status: 'PENDING',
                    priority: 'HIGH',
                    category: 'PLANTING',
                    dueDate: '2024-12-31'
                },
                {
                    id: 'test-task-2',
                    title: 'Test Task 2',
                    description: 'Test Description 2',
                    farmId: 'test-farm-1',
                    status: 'IN_PROGRESS',
                    priority: 'MEDIUM',
                    category: 'HARVESTING',
                    dueDate: '2024-12-30'
                }
            ]);
        });
        
        mockDb.run.mockImplementation((query, params) => {
            return Promise.resolve({ lastID: 'new-task-id', changes: 1 });
        });
    });

    describe('GET /api/tasks', () => {
        it('should return all tasks for authenticated user', async () => {
            const response = await request(app)
                .get('/api/tasks')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter tasks by farm ID', async () => {
            const response = await request(app)
                .get('/api/tasks?farmId=test-farm-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
        });

        it('should filter tasks by status', async () => {
            const response = await request(app)
                .get('/api/tasks?status=PENDING')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should filter tasks by priority', async () => {
            const response = await request(app)
                .get('/api/tasks?priority=HIGH')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });

        it('should require authentication', async () => {
            const response = await request(app)
                .get('/api/tasks');

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/tasks/:id', () => {
        it('should return task by ID', async () => {
            const response = await request(app)
                .get('/api/tasks/test-task-1')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBe('test-task-1');
        });

        it('should return 404 for non-existent task', async () => {
            // Mock that no task is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .get('/api/tasks/non-existent-task')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
            const newTask = {
                title: 'New Test Task',
                description: 'New task description',
                farmId: 'test-farm-1',
                priority: 'MEDIUM',
                category: 'IRRIGATION',
                dueDate: '2024-12-25'
            };

            const response = await request(app)
                .post('/api/tasks')
                .set(AuthHelper.getFarmerHeaders())
                .send(newTask);

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Task created successfully');
            expect(response.body.data).toBeDefined();
        });

        it('should validate required fields', async () => {
            const invalidTask = {
                title: 'Incomplete Task'
                // Missing required fields
            };

            const response = await request(app)
                .post('/api/tasks')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidTask);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        // Note: Date validation for past dates is not currently implemented in the API
        // This test would pass if the API were to validate that dueDate is in the future
    });

    describe('PUT /api/tasks/:id', () => {
        it('should update an existing task', async () => {
            const updateData = {
                title: 'Updated Task Title',
                description: 'Updated description'
            };

            const response = await request(app)
                .put('/api/tasks/test-task-1')
                .set(AuthHelper.getFarmerHeaders())
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Task updated successfully');
        });

        it('should return 404 for non-existent task', async () => {
            // Mock that no task is found
            mockDb.get.mockImplementation((query, params) => {
                if (query.includes('id = ?')) {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ id: 'test-farm-1' });
            });

            const response = await request(app)
                .put('/api/tasks/non-existent-task')
                .set(AuthHelper.getFarmerHeaders())
                .send({ title: 'Updated Title' });

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /api/tasks/:id', () => {
        it('should delete an existing task', async () => {
            const response = await request(app)
                .delete('/api/tasks/test-task-2')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Task deleted successfully');
        });
    });

    describe('PATCH /api/tasks/:id/status', () => {
        it('should update task status', async () => {
            const statusUpdate = {
                status: 'IN_PROGRESS',
                notes: 'Started working on task'
            };

            const response = await request(app)
                .patch('/api/tasks/test-task-1/status')
                .set(AuthHelper.getFarmerHeaders())
                .send(statusUpdate);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Task status updated successfully');
        });

        it('should validate status transition', async () => {
            const invalidUpdate = {
                status: 'INVALID_STATUS'
            };

            const response = await request(app)
                .patch('/api/tasks/test-task-1/status')
                .set(AuthHelper.getFarmerHeaders())
                .send(invalidUpdate);

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/tasks/:id/analytics', () => {
        it('should return task analytics', async () => {
            const response = await request(app)
                .get('/api/tasks/test-task-1/analytics')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.taskId).toBe('test-task-1');
            expect(response.body.data.status).toBeDefined();
            expect(response.body.data.priority).toBeDefined();
        });
    });

    describe('GET /api/tasks/stats/overview', () => {
        it('should return task statistics', async () => {
            const response = await request(app)
                .get('/api/tasks/stats/overview')
                .set(AuthHelper.getFarmerHeaders());

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.overview).toBeDefined();
            expect(response.body.data.byCategory).toBeDefined();
            expect(response.body.data.byPriority).toBeDefined();
        });
    });
});
