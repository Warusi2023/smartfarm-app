const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
// ✅ Use the instance exported from ./email-config (no "new" anywhere)
const emailService = require('./email-config');

const app = express();

// Environment variables with defaults
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';
const API_VERSION = process.env.API_VERSION || '1.0.0';
const API_NAME = process.env.API_NAME || 'SmartFarm API';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'https://www.smartfarm-app.com';
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail';
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@smartfarm-app.com';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// In-memory storage for demo (replace with database in production)
const users = new Map();
const emailVerificationTokens = new Map();

// ---- Email helpers/shims (so we work with different email-config shapes) ----
const EMAIL_CONFIGURED = (emailService?.isConfigured ?? emailService?.enabled ?? false) === true;

async function verifyEmailConnection() {
  try {
    if (typeof emailService?.verifyConnection === 'function') {
      return await emailService.verifyConnection();
    }
    // Fallback if email-config only exposes transporter
    if (!EMAIL_CONFIGURED || !emailService?.transporter) return false;
    if (typeof emailService.transporter.verify === 'function') {
      await emailService.transporter.verify();
      return true;
    }
    // If transporter exists but no verify, assume configured
    return true;
  } catch {
    return false;
  }
}

// Build verification link (adjust APP_BASE_URL if you have a frontend)
function buildVerificationLink(token) {
  const base = process.env.APP_BASE_URL || `http://localhost:${PORT}`;
  // You can point this to your frontend route that posts to /api/auth/verify-email
  return `${base}/verify?token=${token}`;
}

// Helper to send verification email (uses emailService.sendVerificationEmail if present, else generic send)
async function sendVerificationEmail(email, token) {
  try {
    if (typeof emailService?.sendVerificationEmail === 'function') {
      const result = await emailService.sendVerificationEmail(email, token);
      return !!result?.success;
    }
    if (!EMAIL_CONFIGURED || typeof emailService?.send !== 'function') return false;

    const verifyUrl = buildVerificationLink(token);
    await emailService.send({
      to: email,
      subject: 'Verify your SmartFarm account',
      text: `Welcome to SmartFarm! Please verify your email by visiting: ${verifyUrl}`,
      html: `
        <p>Welcome to <strong>SmartFarm</strong>!</p>
        <p>Please verify your email by clicking the link below:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        <p>If you didn’t request this, you can ignore this email.</p>
      `,
    });
    return true;
  } catch (err) {
    console.error('sendVerificationEmail error:', err.message);
    return false;
  }
}

// Helper to send welcome email
async function sendWelcomeEmail(email, username) {
  try {
    if (typeof emailService?.sendWelcomeEmail === 'function') {
      const result = await emailService.sendWelcomeEmail(email, username);
      return !!result?.success;
    }
    if (!EMAIL_CONFIGURED || typeof emailService?.send !== 'function') return false;

    await emailService.send({
      to: email,
      subject: 'Welcome to SmartFarm!',
      text: `Hi ${username || ''}, welcome to SmartFarm!`,
      html: `<p>Hi ${username || ''},</p><p>Welcome to <strong>SmartFarm</strong>! 🎉</p>`,
    });
    return true;
  } catch (err) {
    console.error('sendWelcomeEmail error:', err.message);
    return false;
  }
}
// ---------------------------------------------------------------------------

// Verify email service connection on startup
verifyEmailConnection().then(isConnected => {
  if (isConnected) {
    console.log('✅ Email service connection verified');
  } else {
    console.log('⚠️ Email service connection failed - check credentials');
  }
}).catch(error => {
  console.error('❌ Email service verification error:', error.message);
});

// Helper function to generate verification token
function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://www.smartfarm-app.com', 'https://smartfarm-app.com', 'https://dulcet-sawine-92d6a8.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const emailStatus = await verifyEmailConnection();
  
  res.json({
    status: 'success',
    message: `${API_NAME} is running`,
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    version: API_VERSION,
    port: PORT,
    logLevel: LOG_LEVEL,
    database: 'In-Memory',
    corsOrigin: CORS_ORIGIN,
    uptime: process.uptime(),
    email: {
      configured: EMAIL_CONFIGURED,
      connected: emailStatus,
      from: EMAIL_FROM,
      service: EMAIL_SERVICE
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: API_NAME,
    status: 'running',
    version: API_VERSION,
    environment: NODE_ENV,
    endpoints: {
      health: '/api/health',
      root: '/'
    },
    timestamp: new Date().toISOString()
  });
});

// User registration endpoint
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

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user (password should be hashed in production)
    const user = {
      id: users.size + 1,
      username,
      email,
      password, // In production, hash this password
      firstName,
      lastName,
      phone,
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store user and verification token
    users.set(email, user);
    emailVerificationTokens.set(verificationToken, {
      email,
      userId: user.id,
      expiresAt: tokenExpiry
    });

    // Send verification email (skip if no email credentials)
    if (EMAIL_USER && EMAIL_PASS) {
      console.log(`📧 Sending verification email to: ${email}`);
      const emailSent = await sendVerificationEmail(email, verificationToken);
      if (!emailSent) {
        console.error(`❌ Failed to send verification email to: ${email}`);
        return res.status(500).json({
          status: 'error',
          message: 'Failed to send verification email. Please try again or contact support.'
        });
      }
      console.log(`✅ Verification email sent successfully to: ${email}`);
    } else {
      console.log(`⚠️ Email verification skipped - no email credentials configured`);
      console.log(`   Set EMAIL_USER and EMAIL_PASS environment variables to enable email verification`);
      // For testing: mark email as verified
      user.isEmailVerified = true;
    }

    res.status(201).json({
      status: 'success',
      message: 'Registration successful! Please check your email to verify your account.',
      data: {
        userId: user.id,
        email: user.email,
        username: user.username,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during registration'
    });
  }
});

// Email verification endpoint
app.post('/api/auth/verify-email', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        status: 'error',
        message: 'Verification token is required'
      });
    }

    // Check if token exists and is valid
    const tokenData = emailVerificationTokens.get(token);
    if (!tokenData) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid verification token'
      });
    }

    // Check if token is expired
    if (new Date() > tokenData.expiresAt) {
      emailVerificationTokens.delete(token);
      return res.status(400).json({
        status: 'error',
        message: 'Verification token has expired. Please request a new one.'
      });
    }

    // Get user and verify email
    const user = users.get(tokenData.email);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Update user email verification status
    user.isEmailVerified = true;
    user.updatedAt = new Date();

    // Remove verification token
    emailVerificationTokens.delete(token);

    // Send welcome email (non-blocking failure)
    try {
      console.log(`📧 Sending welcome email to: ${user.email}`);
      const welcomeSent = await sendWelcomeEmail(user.email, user.username);
      if (welcomeSent) {
        console.log(`✅ Welcome email sent successfully to: ${user.email}`);
      } else {
        console.error(`❌ Failed to send welcome email to: ${user.email}`);
      }
    } catch (error) {
      console.error(`❌ Welcome email error for ${user.email}:`, error.message);
    }

    res.json({
      status: 'success',
      message: 'Email verified successfully! You can now log in to your account.',
      data: {
        userId: user.id,
        email: user.email,
        username: user.username,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during email verification'
    });
  }
});

// Resend verification email endpoint
app.post('/api/auth/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is required'
      });
    }

    // Check if user exists
    const user = users.get(email);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check if email is already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is already verified'
      });
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store new verification token
    emailVerificationTokens.set(verificationToken, {
      email,
      userId: user.id,
      expiresAt: tokenExpiry
    });

    // Send verification email
    console.log(`📧 Resending verification email to: ${email}`);
    const emailSent = await sendVerificationEmail(email, verificationToken);

    if (!emailSent) {
      console.error(`❌ Failed to resend verification email to: ${email}`);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to send verification email. Please try again or contact support.'
      });
    }

    console.log(`✅ Verification email resent successfully to: ${email}`);

    res.json({
      status: 'success',
      message: 'Verification email sent successfully!'
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// User login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

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

    // Check password (in production, use proper password hashing)
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
        message: 'Please verify your email address before logging in',
        data: {
          isEmailVerified: false,
          email: user.email
        }
      });
    }

    res.json({
      status: 'success',
      message: 'Login successful!',
      data: {
        userId: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during login'
    });
  }
});

// Get user profile endpoint
app.get('/api/user/profile/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user by ID
    let user = null;
    for (const [, userData] of users.entries()) {
      if (userData.id == userId) {
        user = userData;
        break;
      }
    }

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = user;
    
    res.json({
      status: 'success',
      data: userWithoutPassword
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Railway deployment test successful!',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    version: API_VERSION
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ${API_NAME} server running on port ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📝 Log level: ${LOG_LEVEL}`);
  console.log(`🔗 CORS origin: ${CORS_ORIGIN}`);
  console.log(`📧 Email service: ${EMAIL_CONFIGURED ? 'Configured' : 'Not configured'}`);
  console.log(`📧 Email from: ${EMAIL_FROM}`);
  console.log(`📧 Email service provider: ${EMAIL_SERVICE}`);
  
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log(`⚠️ To enable email verification, set these environment variables:`);
    console.log(`   EMAIL_USER=${EMAIL_FROM}`);
    console.log(`   EMAIL_PASS=your-app-password`);
    console.log(`   EMAIL_FROM=${EMAIL_FROM}`);
  }
});

module.exports = app;
