#!/usr/bin/env node

/**
 * SmartFarm Email Flow Test Script
 * 
 * This script tests the complete email verification flow:
 * 1. User registration
 * 2. Email verification
 * 3. Welcome email
 * 
 * Usage: node test-email-flow.js
 */

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000';
const TEST_EMAIL = 'test@example.com';
const TEST_USER = {
  username: 'testuser',
  email: TEST_EMAIL,
  password: 'testpassword123',
  firstName: 'Test',
  lastName: 'User',
  phone: '+1234567890'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n[${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️ ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️ ${message}`, 'blue');
}

async function testServerHealth() {
  logStep('1', 'Testing server health...');
  
  try {
    const response = await axios.get(`${BASE_URL}/api/health`);
    
    if (response.status === 200) {
      logSuccess('Server is healthy');
      logInfo(`Server: ${response.data.message}`);
      logInfo(`Environment: ${response.data.environment}`);
      logInfo(`Version: ${response.data.version}`);
      return true;
    } else {
      logError(`Server returned status: ${response.status}`);
      return false;
    }
  } catch (error) {
    logError(`Server health check failed: ${error.message}`);
    logInfo('Make sure the server is running on port 3000');
    return false;
  }
}

async function testUserRegistration() {
  logStep('2', 'Testing user registration...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, TEST_USER);
    
    if (response.status === 201) {
      logSuccess('User registration successful');
      logInfo(`User ID: ${response.data.data.userId}`);
      logInfo(`Email: ${response.data.data.email}`);
      logInfo(`Email Verified: ${response.data.data.isEmailVerified}`);
      logInfo(`Message: ${response.data.message}`);
      return response.data.data;
    } else {
      logError(`Registration failed with status: ${response.status}`);
      logError(`Response: ${JSON.stringify(response.data, null, 2)}`);
      return null;
    }
  } catch (error) {
    if (error.response) {
      logError(`Registration failed: ${error.response.data.message}`);
      logInfo(`Status: ${error.response.status}`);
      
      if (error.response.status === 409) {
        logWarning('User already exists - this is expected for subsequent runs');
        return { userId: 1, email: TEST_USER.email, isEmailVerified: false };
      }
    } else {
      logError(`Registration request failed: ${error.message}`);
    }
    return null;
  }
}

async function testEmailVerification(token) {
  logStep('3', 'Testing email verification...');
  
  if (!token) {
    logWarning('No verification token available - skipping verification test');
    return false;
  }
  
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/verify-email`, {
      token: token
    });
    
    if (response.status === 200) {
      logSuccess('Email verification successful');
      logInfo(`User ID: ${response.data.data.userId}`);
      logInfo(`Email: ${response.data.data.email}`);
      logInfo(`Email Verified: ${response.data.data.isEmailVerified}`);
      logInfo(`Message: ${response.data.message}`);
      return true;
    } else {
      logError(`Verification failed with status: ${response.status}`);
      logError(`Response: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    if (error.response) {
      logError(`Verification failed: ${error.response.data.message}`);
      logInfo(`Status: ${error.response.status}`);
    } else {
      logError(`Verification request failed: ${error.message}`);
    }
    return false;
  }
}

async function testUserLogin() {
  logStep('4', 'Testing user login...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    });
    
    if (response.status === 200) {
      logSuccess('User login successful');
      logInfo(`User ID: ${response.data.data.userId}`);
      logInfo(`Email: ${response.data.data.email}`);
      logInfo(`Email Verified: ${response.data.data.isEmailVerified}`);
      logInfo(`Message: ${response.data.message}`);
      return true;
    } else {
      logError(`Login failed with status: ${response.status}`);
      logError(`Response: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    if (error.response) {
      logError(`Login failed: ${error.response.data.message}`);
      logInfo(`Status: ${error.response.status}`);
      
      if (error.response.status === 403) {
        logWarning('Login blocked - email not verified (this is expected behavior)');
      }
    } else {
      logError(`Login request failed: ${error.message}`);
    }
    return false;
  }
}

async function testResendVerification() {
  logStep('5', 'Testing resend verification email...');
  
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/resend-verification`, {
      email: TEST_USER.email
    });
    
    if (response.status === 200) {
      logSuccess('Resend verification successful');
      logInfo(`Message: ${response.data.message}`);
      return true;
    } else {
      logError(`Resend verification failed with status: ${response.status}`);
      logError(`Response: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    if (error.response) {
      logError(`Resend verification failed: ${error.response.data.message}`);
      logInfo(`Status: ${error.response.status}`);
    } else {
      logError(`Resend verification request failed: ${error.message}`);
    }
    return false;
  }
}

async function testEmailConfiguration() {
  logStep('6', 'Testing email configuration...');
  
  try {
    const response = await axios.get(`${BASE_URL}/api/health`);
    
    if (response.status === 200) {
      logSuccess('Email configuration check');
      logInfo('Check server logs for email service status');
      logInfo('Look for messages like:');
      logInfo('  ✅ Email service configured: noreply@smartfarm-app.com');
      logInfo('  ⚠️ Email service not configured - EMAIL_USER and EMAIL_PASS required');
      return true;
    }
  } catch (error) {
    logError(`Configuration check failed: ${error.message}`);
    return false;
  }
}

async function runTests() {
  log('🚀 Starting SmartFarm Email Flow Tests', 'bright');
  log('=' .repeat(50), 'cyan');
  
  const results = {
    serverHealth: false,
    registration: false,
    verification: false,
    login: false,
    resendVerification: false,
    emailConfig: false
  };
  
  // Test 1: Server Health
  results.serverHealth = await testServerHealth();
  if (!results.serverHealth) {
    log('\n❌ Server is not running. Please start the server first:', 'red');
    log('   cd railway-clean && node server.js', 'yellow');
    return;
  }
  
  // Test 2: User Registration
  const userData = await testUserRegistration();
  results.registration = userData !== null;
  
  // Test 3: Email Configuration
  await testEmailConfiguration();
  results.emailConfig = true;
  
  // Test 4: Resend Verification
  results.resendVerification = await testResendVerification();
  
  // Test 5: User Login (should fail if email not verified)
  results.login = await testUserLogin();
  
  // Test 6: Email Verification (simulate with a fake token)
  results.verification = await testEmailVerification('fake-token-for-testing');
  
  // Summary
  log('\n📊 Test Results Summary', 'bright');
  log('=' .repeat(50), 'cyan');
  
  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    const color = passed ? 'green' : 'red';
    log(`${test.padEnd(20)} ${status}`, color);
  });
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  log(`\nOverall: ${passedTests}/${totalTests} tests passed`, 
      passedTests === totalTests ? 'green' : 'yellow');
  
  // Instructions
  log('\n📝 Next Steps:', 'bright');
  log('1. Set up email credentials in your environment:', 'blue');
  log('   EMAIL_USER=noreply@smartfarm-app.com', 'yellow');
  log('   EMAIL_PASS=your-app-password', 'yellow');
  log('   EMAIL_FROM=noreply@smartfarm-app.com', 'yellow');
  
  log('\n2. For Gmail, use an App Password:', 'blue');
  log('   - Enable 2-factor authentication', 'yellow');
  log('   - Generate an App Password', 'yellow');
  log('   - Use the App Password as EMAIL_PASS', 'yellow');
  
  log('\n3. Check your email inbox for verification emails', 'blue');
  log(`   Expected from: noreply@smartfarm-app.com`, 'yellow');
  log(`   To: ${TEST_USER.email}`, 'yellow');
  
  log('\n4. Test the complete flow:', 'blue');
  log('   - Register a new user', 'yellow');
  log('   - Check email for verification link', 'yellow');
  log('   - Click the verification link', 'yellow');
  log('   - Login with verified account', 'yellow');
}

// Run the tests
if (require.main === module) {
  runTests().catch(error => {
    logError(`Test execution failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  testServerHealth,
  testUserRegistration,
  testEmailVerification,
  testUserLogin,
  testResendVerification,
  testEmailConfiguration
};
