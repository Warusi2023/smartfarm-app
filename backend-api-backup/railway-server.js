const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple in-memory database for Railway deployment
let users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@smartfarm.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'admin',
        created_at: new Date().toISOString()
    },
    {
        id: 2,
        username: 'farmer',
        email: 'farmer@smartfarm.com',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'farmer',
        created_at: new Date().toISOString()
    }
];

let farms = [
    {
        id: 1,
        name: 'Green Valley Farm',
        location: 'California, USA',
        size: 100,
        owner_id: 1,
        created_at: new Date().toISOString()
    }
];

let livestock = [
    {
        id: 1,
        farm_id: 1,
        type: 'Cattle',
        breed: 'Holstein',
        count: 50,
        health_status: 'Healthy',
        created_at: new Date().toISOString()
    }
];

let crops = [
    {
        id: 1,
        farm_id: 1,
        name: 'Wheat',
        variety: 'Winter Wheat',
        planting_date: '2024-01-15',
        expected_harvest: '2024-06-15',
        status: 'Growing',
        created_at: new Date().toISOString()
    }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'SmartFarm API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        database: 'In-Memory (Railway)',
        features: [
            'User Authentication (JWT)',
            'Farm Management',
            'Livestock Management',
            'Crop Management',
            'Weather Integration',
            'Inventory Management',
            'Employee Management',
            'Financial Management',
            'Task Management',
            'Analytics & Reports',
            'Document Management'
        ],
        version: '1.0.0'
    });
});

// Authentication routes
app.post('/api/auth/register', (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Username, email, and password are required'
            });
        }
        
        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists'
            });
        }
        
        // Create new user
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: require('bcryptjs').hashSync(password, 10),
            role: 'farmer',
            created_at: new Date().toISOString()
        };
        
        users.push(newUser);
        
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Registration failed',
            error: error.message
        });
    }
});

app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email and password are required'
            });
        }
        
        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }
        
        // Check password
        const isValidPassword = require('bcryptjs').compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }
        
        // Generate JWT token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET || 'smartfarm-secret-key',
            { expiresIn: '24h' }
        );
        
        res.json({
            status: 'success',
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Login failed',
            error: error.message
        });
    }
});

// Simple authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Access token required'
        });
    }
    
    try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'smartfarm-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            status: 'error',
            message: 'Invalid or expired token'
        });
    }
}

// Farms routes
app.get('/api/farms', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        data: farms
    });
});

app.post('/api/farms', authenticateToken, (req, res) => {
    try {
        const { name, location, size } = req.body;
        
        const newFarm = {
            id: farms.length + 1,
            name,
            location,
            size,
            owner_id: req.user.id,
            created_at: new Date().toISOString()
        };
        
        farms.push(newFarm);
        
        res.status(201).json({
            status: 'success',
            message: 'Farm created successfully',
            data: newFarm
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create farm',
            error: error.message
        });
    }
});

// Livestock routes
app.get('/api/livestock', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        data: livestock
    });
});

app.post('/api/livestock', authenticateToken, (req, res) => {
    try {
        const { farm_id, type, breed, count, health_status } = req.body;
        
        const newLivestock = {
            id: livestock.length + 1,
            farm_id,
            type,
            breed,
            count,
            health_status,
            created_at: new Date().toISOString()
        };
        
        livestock.push(newLivestock);
        
        res.status(201).json({
            status: 'success',
            message: 'Livestock added successfully',
            data: newLivestock
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to add livestock',
            error: error.message
        });
    }
});

// Crops routes
app.get('/api/crops', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        data: crops
    });
});

app.post('/api/crops', authenticateToken, (req, res) => {
    try {
        const { farm_id, name, variety, planting_date, expected_harvest, status } = req.body;
        
        const newCrop = {
            id: crops.length + 1,
            farm_id,
            name,
            variety,
            planting_date,
            expected_harvest,
            status,
            created_at: new Date().toISOString()
        };
        
        crops.push(newCrop);
        
        res.status(201).json({
            status: 'success',
            message: 'Crop added successfully',
            data: newCrop
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to add crop',
            error: error.message
        });
    }
});

// Weather routes
app.get('/api/weather', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        data: {
            location: 'Sample Location',
            temperature: 22,
            humidity: 65,
            condition: 'Sunny',
            forecast: [
                { date: '2024-01-01', high: 25, low: 18, condition: 'Sunny' },
                { date: '2024-01-02', high: 23, low: 16, condition: 'Partly Cloudy' },
                { date: '2024-01-03', high: 20, low: 14, condition: 'Rainy' }
            ]
        }
    });
});

// Inventory routes
app.get('/api/inventory', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        data: [
            {
                id: 1,
                name: 'Seeds',
                category: 'Planting',
                quantity: 100,
                unit: 'kg',
                farm_id: 1
            }
        ]
    });
});

// Financial routes
app.get('/api/financial', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        data: {
            total_income: 50000,
            total_expenses: 30000,
            profit: 20000,
            monthly_data: [
                { month: 'January', income: 10000, expenses: 6000 },
                { month: 'February', income: 12000, expenses: 7000 },
                { month: 'March', income: 15000, expenses: 8000 }
            ]
        }
    });
});

// Tasks routes
app.get('/api/tasks', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        data: [
            {
                id: 1,
                title: 'Plant seeds',
                description: 'Plant wheat seeds in field A',
                status: 'pending',
                due_date: '2024-01-15',
                farm_id: 1
            }
        ]
    });
});

// Analytics routes
app.get('/api/analytics', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        data: {
            total_farms: farms.length,
            total_livestock: livestock.reduce((sum, l) => sum + l.count, 0),
            total_crops: crops.length,
            active_tasks: 5,
            monthly_revenue: 50000
        }
    });
});

// Documents routes
app.get('/api/documents', authenticateToken, (req, res) => {
    res.json({
        status: 'success',
        data: [
            {
                id: 1,
                name: 'Farm Plan 2024',
                type: 'PDF',
                size: '2.5 MB',
                upload_date: '2024-01-01'
            }
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
        path: req.originalUrl
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SmartFarm API server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔗 CORS Origin: ${process.env.CORS_ORIGIN || '*'}`);
});

module.exports = app;
