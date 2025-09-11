const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json());

// Simple in-memory database
let users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@smartfarm.com',
        password: bcrypt.hashSync('password123', 10),
        role: 'admin'
    }
];

let farms = [
    {
        id: 1,
        name: 'Green Valley Farm',
        location: 'California, USA',
        size: 100,
        owner_id: 1
    }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'SmartFarm API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        database: 'In-Memory',
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
        
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists'
            });
        }
        
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: bcrypt.hashSync(password, 10),
            role: 'farmer'
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
        
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }
        
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
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
            owner_id: req.user.id
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

// Test route
app.get('/', (req, res) => {
    res.json({
        message: 'SmartFarm API Server',
        status: 'running',
        version: '1.0.0'
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SmartFarm API server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
