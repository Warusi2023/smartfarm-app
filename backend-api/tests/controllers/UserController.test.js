const UserController = require('../../controllers/UserController');

// Mock the database module to return Promises (since controller uses await)
jest.mock('../../database/init', () => ({
    get: jest.fn(),
    all: jest.fn(),
    run: jest.fn()
}));

describe('UserController', () => {
    let mockReq;
    let mockRes;
    let mockDb;

    beforeEach(() => {
        jest.clearAllMocks();

        mockReq = {
            query: {},
            params: {},
            body: {},
            user: { id: 'test-user-1', role: 'admin' }
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            statusCode: 200
        };

        mockDb = require('../../database/init');
    });

    describe('getUsers', () => {
        it('should return all users with pagination', async () => {
            mockReq.query = { page: 1, limit: 10 };

            // Mock database responses
            mockDb.get.mockResolvedValue({ total: 2 });
            mockDb.all.mockResolvedValue([
                { id: 'user1', email: 'test1@example.com', firstName: 'Test', lastName: 'User1' },
                { id: 'user2', email: 'test2@example.com', firstName: 'Test', lastName: 'User2' }
            ]);

            await UserController.getUsers(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    data: expect.any(Array),
                    pagination: expect.objectContaining({
                        page: 1,
                        limit: 10,
                        total: 2,
                        totalPages: 1
                    })
                })
            );
        });

        it('should handle database errors gracefully', async () => {
            mockReq.query = { page: 1, limit: 10 };

            // Mock database error
            mockDb.get.mockRejectedValue(new Error('Database error'));

            await UserController.getUsers(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'Internal server error'
                })
            );
        });
    });

    describe('getUserById', () => {
        it('should return user by ID', async () => {
            mockReq.params = { id: 'test-user-1' };

            // Mock database response
            mockDb.get.mockResolvedValue({
                id: 'test-user-1',
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User'
            });

            await UserController.getUserById(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    data: expect.objectContaining({
                        id: 'test-user-1'
                    })
                })
            );
        });

        it('should return 404 for non-existent user', async () => {
            mockReq.params = { id: 'non-existent' };

            // Mock database response (user not found)
            mockDb.get.mockResolvedValue(null);

            await UserController.getUserById(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'User not found'
                })
            );
        });
    });

    describe('createUser', () => {
        it('should create a new user successfully', async () => {
            mockReq.body = {
                email: 'newuser@example.com',
                password: 'password123',
                firstName: 'New',
                lastName: 'User',
                role: 'farmer'
            };

            // Mock database responses
            mockDb.get.mockResolvedValue(null); // No existing user
            mockDb.run.mockResolvedValue({ changes: 1 });
            mockDb.get.mockResolvedValueOnce(null).mockResolvedValueOnce({
                id: 'new-user-id',
                email: 'newuser@example.com',
                firstName: 'New',
                lastName: 'User',
                role: 'farmer',
                status: 'active',
                createdAt: '2024-01-01T00:00:00.000Z'
            });

            await UserController.createUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    message: 'User created successfully',
                    data: expect.any(Object)
                })
            );
        });

        it('should validate required fields', async () => {
            mockReq.body = {
                email: 'incomplete@example.com'
                // Missing required fields
            };

            await UserController.createUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'Missing required fields: email, password, firstName, lastName'
                })
            );
        });

        it('should validate password length', async () => {
            mockReq.body = {
                email: 'test@example.com',
                password: '123', // Too short
                firstName: 'Test',
                lastName: 'User'
            };

            await UserController.createUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'Password must be at least 6 characters long'
                })
            );
        });

        it('should prevent duplicate email', async () => {
            mockReq.body = {
                email: 'existing@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User'
            };

            // Mock existing user found
            mockDb.get.mockResolvedValue({ id: 'existing-user' });

            await UserController.createUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(409);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'User with this email already exists'
                })
            );
        });
    });

    describe('updateUser', () => {
        it('should update user successfully', async () => {
            mockReq.params = { id: 'test-user-1' };
            mockReq.body = {
                firstName: 'Updated',
                lastName: 'Name'
            };

            // Mock database responses
            mockDb.get.mockResolvedValue({ id: 'test-user-1' }); // User exists
            mockDb.run.mockResolvedValue({ changes: 1 });

            await UserController.updateUser(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    message: 'User updated successfully'
                })
            );
        });

        it('should validate required fields', async () => {
            mockReq.params = { id: 'test-user-1' };
            mockReq.body = {}; // No fields provided

            await UserController.updateUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'At least one field must be provided for update'
                })
            );
        });

        it('should return 404 for non-existent user', async () => {
            mockReq.params = { id: 'non-existent' };
            mockReq.body = { firstName: 'Updated' };

            // Mock user not found
            mockDb.get.mockResolvedValue(null);

            await UserController.updateUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'User not found'
                })
            );
        });
    });

    describe('deleteUser', () => {
        it('should delete user successfully', async () => {
            mockReq.params = { id: 'test-user-1' };

            // Mock database responses
            mockDb.get.mockResolvedValueOnce({ id: 'test-user-1' }) // User exists
                .mockResolvedValueOnce({ count: 0 }); // No farms
            mockDb.run.mockResolvedValue({ changes: 1 });

            await UserController.deleteUser(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    message: 'User deleted successfully'
                })
            );
        });

        it('should return 404 for non-existent user', async () => {
            mockReq.params = { id: 'non-existent' };

            // Mock user not found
            mockDb.get.mockResolvedValue(null);

            await UserController.deleteUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'User not found'
                })
            );
        });

        it('should prevent deletion of user with farms', async () => {
            mockReq.params = { id: 'test-user-1' };

            // Mock database responses
            mockDb.get.mockResolvedValueOnce({ id: 'test-user-1' }) // User exists
                .mockResolvedValueOnce({ count: 2 }); // Has farms

            await UserController.deleteUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'Cannot delete user with associated farms'
                })
            );
        });
    });

    describe('getUserStats', () => {
        it('should return user statistics', async () => {
            // Mock database responses
            mockDb.get.mockResolvedValueOnce({ total: 5 }) // Total users
                .mockResolvedValueOnce({ count: 3 }); // Active users
            mockDb.all.mockResolvedValueOnce([ // By role
                { role: 'farmer', count: 3 },
                { role: 'admin', count: 2 }
            ]).mockResolvedValueOnce([ // By status
                { status: 'active', count: 4 },
                { status: 'inactive', count: 1 }
            ]).mockResolvedValueOnce([{ count: 2 }]); // Recent registrations

            await UserController.getUserStats(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    data: expect.objectContaining({
                        activeUsers: 3,
                        byRole: expect.any(Array),
                        byStatus: expect.any(Array),
                        recentRegistrations: 2,
                        total: 5
                    })
                })
            );
        });
    });

    describe('resetUserPassword', () => {
        it('should reset password successfully', async () => {
            mockReq.params = { id: 'test-user-1' };
            mockReq.body = { newPassword: 'newpassword123' };

            // Mock database responses
            mockDb.get.mockResolvedValue({ id: 'test-user-1' }); // User exists
            mockDb.run.mockResolvedValue({ changes: 1 });

            await UserController.resetUserPassword(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    message: 'Password reset successfully'
                })
            );
        });

        it('should validate password length', async () => {
            mockReq.params = { id: 'test-user-1' };
            mockReq.body = { newPassword: '123' }; // Too short

            await UserController.resetUserPassword(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'Password must be at least 6 characters long'
                })
            );
        });

        it('should return 404 for non-existent user', async () => {
            mockReq.params = { id: 'non-existent' };
            mockReq.body = { newPassword: 'newpassword123' };

            // Mock user not found
            mockDb.get.mockResolvedValue(null);

            await UserController.resetUserPassword(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: false,
                    error: 'User not found'
                })
            );
        });
    });
});
