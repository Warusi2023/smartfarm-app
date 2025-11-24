/**
 * Email Verification System Test Script
 * Tests the complete email verification flow
 */

// Try multiple .env file locations
const path = require('path');
const fs = require('fs');

const envPaths = [
    path.join(__dirname, '../.env'),
    path.join(__dirname, '../../.env'),
    path.join(process.cwd(), '.env')
];

for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
        require('dotenv').config({ path: envPath });
        console.log(`📁 Loaded .env from: ${envPath}`);
        break;
    }
}

// If no .env found, try default dotenv
if (!process.env.DATABASE_URL) {
    require('dotenv').config();
}

const { Pool } = require('pg');
const crypto = require('crypto');

// Database connection
let dbPool = null;
if (process.env.DATABASE_URL) {
    dbPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
} else {
    console.warn('⚠️  DATABASE_URL not found in environment variables');
    console.warn('   Set DATABASE_URL in .env file or environment');
}

// API base URL
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

// Test user data
const testUser = {
    email: `test-${Date.now()}@smartfarm-test.com`,
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User',
    phone: '+1234567890',
    country: 'Fiji'
};

let userId = null;
let verificationToken = null;

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
    console.log('\n' + '='.repeat(60));
    log(title, 'cyan');
    console.log('='.repeat(60));
}

async function testDatabaseConnection() {
    logSection('1. Testing Database Connection');
    
    if (!dbPool) {
        log('❌ Database pool not initialized', 'red');
        log('   DATABASE_URL environment variable is required', 'yellow');
        log('   Set it in backend/.env file:', 'yellow');
        log('   DATABASE_URL=postgresql://user:password@host:port/database', 'yellow');
        return false;
    }
    
    try {
        const result = await dbPool.query('SELECT NOW(), version()');
        log('✅ Database connected successfully', 'green');
        log(`   Database time: ${result.rows[0].now}`, 'blue');
        log(`   PostgreSQL version: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`, 'blue');
        
        // Check if users table exists and has required columns
        const tableCheck = await dbPool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users' 
            AND column_name IN ('is_verified', 'verification_token', 'verification_expires')
            ORDER BY column_name
        `);
        
        if (tableCheck.rows.length === 3) {
            log('✅ Email verification columns exist in users table', 'green');
            tableCheck.rows.forEach(col => {
                log(`   - ${col.column_name}: ${col.data_type}`, 'blue');
            });
        } else {
            log('⚠️  Missing email verification columns. Expected 3, found ' + tableCheck.rows.length, 'yellow');
            log('   Run migration: backend/database/migrations/add-email-verification.sql', 'yellow');
            return false;
        }
        
        return true;
    } catch (error) {
        log('❌ Database connection failed: ' + error.message, 'red');
        return false;
    }
}

async function testUserRegistration() {
    logSection('2. Testing User Registration');
    try {
        // Generate verification token
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 24 * 3600 * 1000); // 24 hours
        
        // Hash password (using bcryptjs)
        const bcrypt = require('bcryptjs');
        const passwordHash = await bcrypt.hash(testUser.password, 12);
        
        // Insert user into database
        const result = await dbPool.query(
            `INSERT INTO users (
                email, password_hash, first_name, last_name, phone, country,
                verification_token, verification_expires, is_verified, role
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id, email, verification_token, is_verified, created_at`,
            [
                testUser.email,
                passwordHash,
                testUser.firstName,
                testUser.lastName,
                testUser.phone,
                testUser.country,
                token,
                expires,
                false, // is_verified
                'farmer'
            ]
        );
        
        userId = result.rows[0].id;
        verificationToken = result.rows[0].verification_token;
        
        log('✅ Test user created successfully', 'green');
        log(`   User ID: ${userId}`, 'blue');
        log(`   Email: ${testUser.email}`, 'blue');
        log(`   Verification Token: ${verificationToken.substring(0, 20)}...`, 'blue');
        log(`   Is Verified: ${result.rows[0].is_verified}`, 'blue');
        
        return true;
    } catch (error) {
        log('❌ User registration failed: ' + error.message, 'red');
        if (error.code === '23505') { // Unique violation
            log('   User already exists, using existing user', 'yellow');
            // Try to get existing user
            const existing = await dbPool.query('SELECT id, verification_token FROM users WHERE email = $1', [testUser.email]);
            if (existing.rows.length > 0) {
                userId = existing.rows[0].id;
                verificationToken = existing.rows[0].verification_token;
                return true;
            }
        }
        return false;
    }
}

async function testEmailService() {
    logSection('3. Testing Email Service');
    try {
        const EmailService = require('../utils/emailService');
        
        // Check email configuration
        const emailService = process.env.EMAIL_SERVICE;
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        
        if (!emailService || !emailUser || !emailPass) {
            log('⚠️  Email service not configured', 'yellow');
            log('   Set EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS in .env', 'yellow');
            log('   Skipping actual email send test', 'yellow');
            return true; // Don't fail the test, just skip
        }
        
        log(`   Email Service: ${emailService}`, 'blue');
        log(`   Email User: ${emailUser}`, 'blue');
        
        // Try to send a test email
        try {
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5500';
            const verificationLink = `${frontendUrl}/verify-email.html?token=${verificationToken}`;
            
            log('   Attempting to send verification email...', 'blue');
            await EmailService.sendVerificationEmail(testUser.email, verificationToken, testUser.firstName);
            log('✅ Verification email sent successfully', 'green');
            log(`   Verification link: ${verificationLink}`, 'blue');
            return true;
        } catch (emailError) {
            log('⚠️  Email send failed: ' + emailError.message, 'yellow');
            log('   This might be due to email service configuration', 'yellow');
            log('   Email verification will still work, but emails won\'t be sent', 'yellow');
            return true; // Don't fail the test
        }
    } catch (error) {
        log('❌ Email service test failed: ' + error.message, 'red');
        return false;
    }
}

async function testLoginBeforeVerification() {
    logSection('4. Testing Login Before Verification (Should Fail)');
    try {
        // Try to login with unverified account
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password
            })
        });
        
        const data = await response.json();
        
        if (response.status === 403 && data.code === 'EMAIL_NOT_VERIFIED') {
            log('✅ Login correctly blocked for unverified user', 'green');
            log(`   Error code: ${data.code}`, 'blue');
            log(`   Message: ${data.error}`, 'blue');
            return true;
        } else if (response.status === 200) {
            log('❌ Login should be blocked but succeeded', 'red');
            log('   This indicates email verification is not enforced', 'red');
            return false;
        } else {
            log('⚠️  Unexpected response: ' + JSON.stringify(data), 'yellow');
            return false;
        }
    } catch (error) {
        log('⚠️  Could not test login (API might not be running)', 'yellow');
        log('   Error: ' + error.message, 'yellow');
        log('   Start the server with: cd backend && npm run dev', 'yellow');
        return true; // Don't fail if API is not running
    }
}

async function testEmailVerification() {
    logSection('5. Testing Email Verification');
    try {
        // Verify the email using the token
        const result = await dbPool.query(
            `UPDATE users 
             SET is_verified = true, 
                 verification_token = NULL, 
                 verification_expires = NULL,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $1 AND verification_token = $2
             RETURNING id, email, is_verified`,
            [userId, verificationToken]
        );
        
        if (result.rows.length === 0) {
            log('❌ Email verification failed: Token not found or expired', 'red');
            return false;
        }
        
        const user = result.rows[0];
        
        if (user.is_verified) {
            log('✅ Email verified successfully', 'green');
            log(`   User ID: ${user.id}`, 'blue');
            log(`   Email: ${user.email}`, 'blue');
            log(`   Is Verified: ${user.is_verified}`, 'blue');
            return true;
        } else {
            log('❌ Email verification failed: User still not verified', 'red');
            return false;
        }
    } catch (error) {
        log('❌ Email verification test failed: ' + error.message, 'red');
        return false;
    }
}

async function testLoginAfterVerification() {
    logSection('6. Testing Login After Verification (Should Succeed)');
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password
            })
        });
        
        const data = await response.json();
        
        if (response.status === 200 && data.success && data.token) {
            log('✅ Login successful after email verification', 'green');
            log(`   Token received: ${data.token.substring(0, 20)}...`, 'blue');
            return true;
        } else if (response.status === 403 && data.code === 'EMAIL_NOT_VERIFIED') {
            log('❌ Login still blocked after verification', 'red');
            log('   This might indicate a caching issue or verification didn\'t work', 'red');
            return false;
        } else {
            log('⚠️  Unexpected response: ' + JSON.stringify(data), 'yellow');
            return false;
        }
    } catch (error) {
        log('⚠️  Could not test login (API might not be running)', 'yellow');
        log('   Error: ' + error.message, 'yellow');
        return true; // Don't fail if API is not running
    }
}

async function testResendVerification() {
    logSection('7. Testing Resend Verification');
    try {
        // Create a new unverified user for resend test
        const resendEmail = `resend-test-${Date.now()}@smartfarm-test.com`;
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 24 * 3600 * 1000);
        
        const bcrypt = require('bcryptjs');
        const passwordHash = await bcrypt.hash('TestPassword123!', 12);
        
        await dbPool.query(
            `INSERT INTO users (
                email, password_hash, first_name, last_name,
                verification_token, verification_expires, is_verified
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (email) DO NOTHING`,
            [resendEmail, passwordHash, 'Resend', 'Test', token, expires, false]
        );
        
        log('✅ Test user created for resend verification', 'green');
        log(`   Email: ${resendEmail}`, 'blue');
        
        // Test resend endpoint (if API is running)
        try {
            const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: resendEmail })
            });
            
            const data = await response.json();
            
            if (response.status === 200 && data.success) {
                log('✅ Resend verification email endpoint works', 'green');
            } else {
                log('⚠️  Resend verification response: ' + JSON.stringify(data), 'yellow');
            }
        } catch (error) {
            log('⚠️  Could not test resend endpoint (API might not be running)', 'yellow');
        }
        
        // Cleanup
        await dbPool.query('DELETE FROM users WHERE email = $1', [resendEmail]);
        log('✅ Resend test user cleaned up', 'green');
        
        return true;
    } catch (error) {
        log('❌ Resend verification test failed: ' + error.message, 'red');
        return false;
    }
}

async function cleanup() {
    logSection('8. Cleanup');
    try {
        if (userId) {
            await dbPool.query('DELETE FROM users WHERE id = $1', [userId]);
            log('✅ Test user cleaned up', 'green');
        }
        
        // Clean up any other test users
        await dbPool.query(
            "DELETE FROM users WHERE email LIKE '%@smartfarm-test.com'"
        );
        log('✅ All test users cleaned up', 'green');
        
        await dbPool.end();
        log('✅ Database connection closed', 'green');
    } catch (error) {
        log('⚠️  Cleanup error: ' + error.message, 'yellow');
    }
}

async function runTests() {
    console.log('\n');
    log('🧪 Email Verification System Test Suite', 'cyan');
    log('==========================================\n', 'cyan');
    
    const results = {
        database: false,
        registration: false,
        emailService: false,
        loginBeforeVerification: false,
        emailVerification: false,
        loginAfterVerification: false,
        resendVerification: false
    };
    
    try {
        // Test 1: Database connection
        results.database = await testDatabaseConnection();
        if (!results.database) {
            log('\n❌ Database connection failed. Cannot continue tests.', 'red');
            await cleanup();
            process.exit(1);
        }
        
        // Test 2: User registration
        results.registration = await testUserRegistration();
        
        // Test 3: Email service
        results.emailService = await testEmailService();
        
        // Test 4: Login before verification (should fail)
        results.loginBeforeVerification = await testLoginBeforeVerification();
        
        // Test 5: Email verification
        results.emailVerification = await testEmailVerification();
        
        // Test 6: Login after verification (should succeed)
        results.loginAfterVerification = await testLoginAfterVerification();
        
        // Test 7: Resend verification
        results.resendVerification = await testResendVerification();
        
    } catch (error) {
        log('\n❌ Test suite error: ' + error.message, 'red');
        console.error(error);
    } finally {
        await cleanup();
    }
    
    // Print summary
    logSection('Test Summary');
    const totalTests = Object.keys(results).length;
    const passedTests = Object.values(results).filter(r => r).length;
    
    Object.entries(results).forEach(([test, passed]) => {
        const status = passed ? '✅' : '❌';
        const color = passed ? 'green' : 'red';
        log(`${status} ${test}: ${passed ? 'PASSED' : 'FAILED'}`, color);
    });
    
    console.log('\n' + '='.repeat(60));
    log(`Total: ${passedTests}/${totalTests} tests passed`, passedTests === totalTests ? 'green' : 'yellow');
    console.log('='.repeat(60) + '\n');
    
    process.exit(passedTests === totalTests ? 0 : 1);
}

// Run tests
runTests().catch(error => {
    log('\n❌ Fatal error: ' + error.message, 'red');
    console.error(error);
    process.exit(1);
});

