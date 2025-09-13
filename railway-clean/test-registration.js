// Test script for registration and login without email verification
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

// Environment variables with defaults
const PORT = process.env.PORT || 3001; // Different port to avoid conflict
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// In-memory storage for demo
const users = new Map();

// Middleware
app.use(express.json());
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'SmartFarm Test API is running',
    timestamp: new Date().toISOString(),
    environment: 'test',
    version: '1.0.0',
    port: PORT,
    logLevel: 'info',
    database: 'In-Memory',
    corsOrigin: CORS_ORIGIN
  });
});

// User registration endpoint (NO EMAIL VERIFICATION)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Username, email, and password are required'
      });
    }

    // Check if user already exists
    if (users.has(email)) {
      return res.status(409).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }

    // Create user (simplified - no password hashing for testing)
    const userId = crypto.randomUUID();
    const user = {
      id: userId,
      username,
      email,
      password, // In production, hash this!
      firstName: firstName || '',
      lastName: lastName || '',
      phone: phone || '',
      isEmailVerified: true, // Skip email verification for testing
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.set(email, user);

    console.log(`✅ User registered: ${email}`);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully (email verification skipped for testing)',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during registration'
    });
  }
});

// User login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = users.get(email);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check password (simplified for testing)
    if (user.password !== password) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({
        status: 'error',
        message: 'Please verify your email before logging in'
      });
    }

    console.log(`✅ User logged in: ${email}`);

    res.json({
      status: 'success',
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during login'
    });
  }
});

// Get all users (for testing)
app.get('/api/users', (req, res) => {
  const userList = Array.from(users.values()).map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt
  }));

  res.json({
    status: 'success',
    message: 'Users retrieved successfully',
    count: userList.length,
    users: userList
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'SmartFarm Test API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      users: 'GET /api/users'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SmartFarm Test API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Register: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`🔐 Login: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`👥 Users: GET http://localhost:${PORT}/api/users`);
});

module.exports = app;
