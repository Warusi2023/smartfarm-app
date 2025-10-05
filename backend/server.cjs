const express = require("express");
const cors = require("cors");

process.on("uncaughtException", (err) => {
  console.error("[SmartFarm] Uncaught Exception:", err && err.stack || err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[SmartFarm] Unhandled Rejection:", reason);
});

const app = express();
app.use(express.json());
app.use(cors({
  origin: (process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*"),
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "SmartFarm", ts: Date.now(), env: { NODE_ENV: process.env.NODE_ENV || "unset" } });
});

app.get("/api/ready", (_req, res) => {
  res.json({ ready: true, ts: Date.now() });
});

// Mock user database
let users = [
    {
        id: 1,
        email: 'admin@smartfarm.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        phone: '+1234567890',
        permissions: ['user_management', 'farm_management', 'all'],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: 'active',
        farms: []
    },
    {
        id: 2,
        email: 'manager@smartfarm.com',
        password: 'manager123',
        firstName: 'Farm',
        lastName: 'Manager',
        role: 'manager',
        phone: '+1234567891',
        permissions: ['farm_management', 'task_management'],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        lastLogin: new Date(Date.now() - 3600000).toISOString(),
        status: 'active',
        farms: [1, 2]
    }
];

let nextUserId = 3;

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, error: 'Access token required' });
    }

    // Mock authenticated user
    req.user = { id: 1, role: 'admin' };
    next();
};

// Admin authorization middleware
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    next();
};

// User Management API Routes
app.get('/api/user-management/users', authenticateToken, (req, res) => {
    try {
        const safeUsers = users.map(user => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            phone: user.phone,
            permissions: user.permissions,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin,
            status: user.status,
            farms: user.farms
        }));

        res.json({
            success: true,
            data: safeUsers,
            total: safeUsers.length
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

app.post('/api/user-management/users', authenticateToken, requireAdmin, (req, res) => {
    try {
        const { email, password, firstName, lastName, role, phone, permissions } = req.body;

        // Validation
        if (!email || !password || !firstName || !lastName || !role) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: email, password, firstName, lastName, role'
            });
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: 'User with this email already exists'
            });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 8 characters long'
            });
        }

        // Create new user
        const newUser = {
            id: nextUserId++,
            email,
            password,
            firstName,
            lastName,
            role: role.toLowerCase(),
            phone: phone || '',
            permissions: permissions || [],
            createdAt: new Date().toISOString(),
            lastLogin: null,
            status: 'active',
            farms: []
        };

        users.push(newUser);

        // Return user without password
        const { password: _, ...safeUser } = newUser;

        res.status(201).json({
            success: true,
            data: safeUser,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        const user = users.find(u => u.email === email && u.status === 'active');

        if (!user || user.password !== password) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        }

        user.lastLogin = new Date().toISOString();
        const token = `smartfarm_token_${user.id}_${Date.now()}`;
        const { password: _, ...safeUser } = user;

        res.json({
            success: true,
            data: {
                user: safeUser,
                token: token
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

app.get('/api/auth/profile', (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access token required'
            });
        }

        const tokenParts = token.split('_');
        if (tokenParts.length !== 4 || tokenParts[0] !== 'smartfarm' || tokenParts[1] !== 'token') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token format'
            });
        }

        const userId = parseInt(tokenParts[2]);
        const user = users.find(u => u.id === userId && u.status === 'active');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User not found or inactive'
            });
        }

        const { password, ...safeUser } = user;

        res.json({
            success: true,
            data: safeUser
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

console.log('[SmartFarm] API routes loaded successfully');

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0"; // ensure we bind to all interfaces
app.listen(PORT, HOST, () => {
  console.log(`[SmartFarm] Listening on http://${HOST}:${PORT}`);
  console.log(`[SmartFarm] Health: GET /api/health | Ready: GET /api/ready`);
  
  // Log API key status
  try {
    const googleKey = getGoogleApiKey();
    console.log(`[SmartFarm] Google API Key: ${googleKey.substring(0, 10)}...`);
  } catch (error) {
    console.warn(`[SmartFarm] Google API Key: Not configured`);
  }
});