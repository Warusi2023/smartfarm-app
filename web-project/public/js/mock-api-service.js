/**
 * Mock API Service for SmartFarm
 * Provides fallback functionality when backend is not available
 */

class MockAPIService {
    constructor() {
        this.isBackendAvailable = false;
        this.mockUsers = [
            {
                id: 1,
                email: 'admin@smartfarm.com',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                email: 'farmer@smartfarm.com',
                firstName: 'John',
                lastName: 'Farmer',
                role: 'farmer',
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
        this.nextUserId = 3;
    }

    async checkBackendHealth() {
        try {
            const response = await fetch('/api/health', { 
                method: 'GET',
                timeout: 5000 
            });
            this.isBackendAvailable = response.ok;
            return this.isBackendAvailable;
        } catch (error) {
            this.isBackendAvailable = false;
            return false;
        }
    }

    async request(endpoint, method = 'GET', data = null) {
        // First try to check if backend is available
        if (!this.isBackendAvailable) {
            await this.checkBackendHealth();
        }

        if (this.isBackendAvailable) {
            // Try real API first
            try {
                const response = await fetch(`/api${endpoint}`, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')}`
                    },
                    body: data ? JSON.stringify(data) : undefined
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    return { success: true, data: jsonResponse.data || jsonResponse };
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.warn('Backend API failed, falling back to mock:', error.message);
                this.isBackendAvailable = false;
            }
        }

        // Fall back to mock API
        return this.mockRequest(endpoint, method, data);
    }

    mockRequest(endpoint, method, data) {
        console.log(`Mock API: ${method} ${endpoint}`, data);

        switch (endpoint) {
            case '/auth/profile':
                return this.mockGetProfile();
            
            case '/user-management/users':
                if (method === 'GET') {
                    return this.mockGetUsers();
                } else if (method === 'POST') {
                    return this.mockCreateUser(data);
                }
                break;
            
            case '/user-management/my-farms':
                return this.mockGetMyFarms();
            
            default:
                return {
                    success: false,
                    error: 'Mock API: Endpoint not implemented'
                };
        }
    }

    mockGetProfile() {
        const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
        if (!token) {
            return {
                success: false,
                error: 'No authentication token'
            };
        }

        // Return mock admin user
        return {
            success: true,
            data: {
                id: 1,
                email: 'admin@smartfarm.com',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
                status: 'active'
            }
        };
    }

    mockGetUsers() {
        return {
            success: true,
            data: this.mockUsers,
            count: this.mockUsers.length
        };
    }

    mockCreateUser(userData) {
        // Validate required fields
        if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
            return {
                success: false,
                error: 'Missing required fields'
            };
        }

        // Check if user already exists
        const existingUser = this.mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
            return {
                success: false,
                error: 'User already exists'
            };
        }

        // Create new user
        const newUser = {
            id: this.nextUserId++,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role || 'farmer',
            phone: userData.phone || null,
            permissions: userData.permissions || [],
            status: 'active',
            createdAt: new Date().toISOString()
        };

        this.mockUsers.push(newUser);

        return {
            success: true,
            data: newUser,
            message: 'User created successfully (Mock API)'
        };
    }

    mockGetMyFarms() {
        return {
            success: true,
            data: [
                {
                    id: 1,
                    name: 'Main Farm',
                    status: 'active',
                    role: 'admin'
                }
            ]
        };
    }

    showMessage(message, type = 'info') {
        // Use existing notification system if available
        if (window.showSuccessMessage && type === 'success') {
            window.showSuccessMessage(message);
        } else if (window.showErrorMessage && type === 'error') {
            window.showErrorMessage(message);
        } else {
            alert(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// Initialize mock API service
window.MockAPI = new MockAPIService();

// Override the original API service to use mock as fallback
if (window.SmartFarmAPI) {
    const originalRequest = window.SmartFarmAPI.request.bind(window.SmartFarmAPI);
    window.SmartFarmAPI.request = async function(endpoint, method, data) {
        try {
            return await originalRequest(endpoint, method, data);
        } catch (error) {
            console.warn('Original API failed, trying mock API:', error.message);
            return await window.MockAPI.request(endpoint, method, data);
        }
    };
}
