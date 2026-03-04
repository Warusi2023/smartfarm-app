#!/usr/bin/env node
/**
 * Environment Variables Verification Script
 * Verifies that all required environment variables are set correctly
 */

const fs = require('fs');
const path = require('path');

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

// Required backend variables
const requiredBackendVars = {
  'DATABASE_URL': {
    description: 'PostgreSQL connection string',
    required: true,
    autoProvided: true,
    note: 'Auto-provided by Railway PostgreSQL plugin'
  },
  'JWT_SECRET': {
    description: 'JWT signing secret (32+ characters)',
    required: true,
    minLength: 32,
    note: 'Generate with: openssl rand -base64 32'
  },
  'ALLOWED_ORIGINS': {
    description: 'Comma-separated list of allowed CORS origins',
    required: true,
    note: 'Must include your Netlify frontend URL'
  },
  'NODE_ENV': {
    description: 'Node.js environment',
    required: true,
    expectedValue: 'production',
    note: 'Should be "production" in production'
  },
  'PORT': {
    description: 'Server port',
    required: false,
    default: '3000',
    note: 'Railway usually provides this automatically'
  }
};

// Optional but recommended backend variables
const optionalBackendVars = {
  'SENTRY_DSN': {
    description: 'Sentry error tracking DSN',
    required: false,
    note: 'Get from Sentry dashboard'
  },
  'WEATHER_API_KEY': {
    description: 'OpenWeatherMap API key',
    required: false,
    note: 'Required for weather alerts feature'
  },
  'GOOGLE_API_KEY': {
    description: 'Google Maps/Places API key',
    required: false,
    note: 'Required for maps features'
  }
};

// Required frontend variables (for Netlify)
const requiredFrontendVars = {
  'VITE_API_URL': {
    description: 'Backend API URL',
    required: true,
    note: 'Should be your Railway backend URL (no trailing /api)'
  },
  'VITE_APP_NAME': {
    description: 'Application name',
    required: true,
    expectedValue: 'SmartFarm'
  },
  'VITE_APP_VERSION': {
    description: 'Application version',
    required: true,
    expectedValue: '1.0.0'
  }
};

// Optional frontend variables
const optionalFrontendVars = {
  'VITE_SENTRY_DSN': {
    description: 'Frontend Sentry DSN',
    required: false,
    note: 'Get from Sentry dashboard'
  }
};

function checkBackendVars() {
  log('\n📦 Backend Environment Variables (Railway)', 'cyan');
  log('─'.repeat(60), 'cyan');
  
  let allGood = true;
  let missing = [];
  let warnings = [];

  // Check required variables
  Object.keys(requiredBackendVars).forEach(varName => {
    const config = requiredBackendVars[varName];
    const value = process.env[varName];
    
    if (!value) {
      if (config.required) {
        log(`  ❌ ${varName}: MISSING`, 'red');
        log(`     Description: ${config.description}`, 'yellow');
        if (config.note) log(`     Note: ${config.note}`, 'yellow');
        missing.push(varName);
        allGood = false;
      } else {
        log(`  ⚠️  ${varName}: Not set (using default: ${config.default || 'none'})`, 'yellow');
        warnings.push(varName);
      }
    } else {
      // Validate value
      let isValid = true;
      if (config.minLength && value.length < config.minLength) {
        log(`  ⚠️  ${varName}: Too short (min ${config.minLength} chars)`, 'yellow');
        isValid = false;
        warnings.push(varName);
      }
      if (config.expectedValue && value !== config.expectedValue) {
        log(`  ⚠️  ${varName}: Expected "${config.expectedValue}", got "${value}"`, 'yellow');
        isValid = false;
        warnings.push(varName);
      }
      
      if (isValid) {
        const displayValue = varName.includes('SECRET') || varName.includes('PASSWORD') || varName.includes('KEY')
          ? '***' + value.slice(-4)
          : value.length > 50
          ? value.substring(0, 47) + '...'
          : value;
        log(`  ✅ ${varName}: ${displayValue}`, 'green');
        if (config.note && !config.autoProvided) {
          log(`     ${config.note}`, 'blue');
        }
      }
    }
  });

  // Check optional variables
  log('\n📋 Optional Backend Variables:', 'cyan');
  Object.keys(optionalBackendVars).forEach(varName => {
    const config = optionalBackendVars[varName];
    const value = process.env[varName];
    
    if (value) {
      const displayValue = varName.includes('KEY') || varName.includes('DSN')
        ? '***' + value.slice(-4)
        : value;
      log(`  ✅ ${varName}: Set`, 'green');
    } else {
      log(`  ⚠️  ${varName}: Not set (${config.note})`, 'yellow');
    }
  });

  return { allGood, missing, warnings };
}

function checkFrontendVars() {
  log('\n🌐 Frontend Environment Variables (Netlify)', 'cyan');
  log('─'.repeat(60), 'cyan');
  log('  ⚠️  Note: Frontend variables must be checked in Netlify dashboard', 'yellow');
  log('  📍 Go to: Netlify Dashboard → Site Settings → Environment Variables\n', 'blue');
  
  log('Required Variables:', 'cyan');
  Object.keys(requiredFrontendVars).forEach(varName => {
    const config = requiredFrontendVars[varName];
    log(`  - ${varName}: ${config.description}`, 'blue');
    if (config.expectedValue) {
      log(`    Expected: ${config.expectedValue}`, 'blue');
    }
    if (config.note) {
      log(`    Note: ${config.note}`, 'yellow');
    }
  });

  log('\nOptional Variables:', 'cyan');
  Object.keys(optionalFrontendVars).forEach(varName => {
    const config = optionalFrontendVars[varName];
    log(`  - ${varName}: ${config.description}`, 'blue');
    if (config.note) {
      log(`    Note: ${config.note}`, 'yellow');
    }
  });
}

function generateReport() {
  log('\n📊 Verification Summary', 'cyan');
  log('─'.repeat(60), 'cyan');
  
  const backendCheck = checkBackendVars();
  checkFrontendVars();

  log('\n📝 Next Steps:', 'cyan');
  if (!backendCheck.allGood) {
    log('  1. Add missing backend variables in Railway dashboard', 'yellow');
    log('  2. Railway → Your Service → Variables → Add Variable', 'blue');
  }
  log('  3. Verify frontend variables in Netlify dashboard', 'yellow');
  log('  4. Netlify → Site Settings → Environment Variables', 'blue');
  log('  5. Redeploy both services after adding variables', 'yellow');
  
  if (backendCheck.missing.length > 0) {
    log('\n❌ Missing Required Variables:', 'red');
    backendCheck.missing.forEach(v => log(`  - ${v}`, 'red'));
  }
  
  if (backendCheck.warnings.length > 0) {
    log('\n⚠️  Warnings:', 'yellow');
    backendCheck.warnings.forEach(v => log(`  - ${v}`, 'yellow'));
  }

  log('\n✅ Verification complete!', 'green');
  
  return backendCheck.allGood && backendCheck.missing.length === 0;
}

// Run verification
if (require.main === module) {
  log('🔍 Environment Variables Verification', 'cyan');
  log('='.repeat(60), 'cyan');
  
  const success = generateReport();
  process.exit(success ? 0 : 1);
}

module.exports = { checkBackendVars, checkFrontendVars, generateReport };
