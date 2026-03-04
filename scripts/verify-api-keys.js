#!/usr/bin/env node
/**
 * API Keys Verification Script
 * Verifies that all API keys are configured correctly
 */

const https = require('https');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// API Keys configuration
const apiKeys = {
  'WEATHER_API_KEY': {
    name: 'OpenWeatherMap API Key',
    description: 'Required for weather alerts feature',
    test: async (key) => {
      return new Promise((resolve) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`;
        https.get(url, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              if (json.cod === 200) {
                resolve({ valid: true, message: 'API key is valid' });
              } else if (json.cod === 401) {
                resolve({ valid: false, message: 'Invalid API key' });
              } else {
                resolve({ valid: false, message: `API error: ${json.message || 'Unknown'}` });
              }
            } catch (e) {
              resolve({ valid: false, message: 'Failed to parse response' });
            }
          });
        }).on('error', (err) => {
          resolve({ valid: false, message: `Network error: ${err.message}` });
        });
      });
    }
  },
  'GOOGLE_API_KEY': {
    name: 'Google Maps API Key',
    description: 'Required for maps and geocoding features',
    test: null // Can't easily test without making actual API call
  },
  'OPENAI_API_KEY': {
    name: 'OpenAI API Key',
    description: 'Required for AI features (advisory, chat, etc.)',
    test: null // Can't easily test without making actual API call
  },
  'SENTRY_DSN': {
    name: 'Sentry DSN',
    description: 'Required for error tracking',
    test: null // DSN format validation only
  }
};

// Frontend API keys (check in Netlify)
const frontendApiKeys = {
  'VITE_SENTRY_DSN': {
    name: 'Frontend Sentry DSN',
    description: 'Required for frontend error tracking'
  },
  'VITE_GOOGLE_MAPS_API_KEY': {
    name: 'Google Maps API Key (Frontend)',
    description: 'Required if frontend directly uses Google Maps'
  },
  'VITE_GA_MEASUREMENT_ID': {
    name: 'Google Analytics Measurement ID',
    description: 'Optional - for analytics tracking'
  }
};

function maskKey(key) {
  if (!key || key.length < 12) return '***';
  return key.substring(0, 8) + '...' + key.substring(key.length - 4);
}

function validateSentryDSN(dsn) {
  if (!dsn) return { valid: false, message: 'DSN not set' };
  if (!dsn.startsWith('https://')) {
    return { valid: false, message: 'DSN should start with https://' };
  }
  if (!dsn.includes('@')) {
    return { valid: false, message: 'DSN format looks incorrect' };
  }
  return { valid: true, message: 'DSN format looks correct' };
}

function validateGoogleAPIKey(key) {
  if (!key) return { valid: false, message: 'API key not set' };
  if (key.length < 20) {
    return { valid: false, message: 'API key seems too short' };
  }
  return { valid: true, message: 'API key format looks correct' };
}

function validateOpenAIAPIKey(key) {
  if (!key) return { valid: false, message: 'API key not set' };
  if (!key.startsWith('sk-')) {
    return { valid: false, message: 'OpenAI API key should start with sk-' };
  }
  if (key.length < 20) {
    return { valid: false, message: 'API key seems too short' };
  }
  return { valid: true, message: 'API key format looks correct' };
}

async function verifyBackendApiKeys() {
  log('\n📦 Backend API Keys (Railway)', 'cyan');
  log('─'.repeat(60), 'cyan');

  let allSet = true;
  let allValid = true;

  for (const [key, config] of Object.entries(apiKeys)) {
    const value = process.env[key];
    
    if (!value) {
      log(`\n❌ ${config.name} (${key}): NOT SET`, 'red');
      log(`   Description: ${config.description}`, 'yellow');
      allSet = false;
      continue;
    }

    const displayValue = maskKey(value);
    log(`\n✅ ${config.name} (${key}): Set`, 'green');
    log(`   Value: ${displayValue}`, 'blue');
    log(`   Description: ${config.description}`, 'blue');

    // Test if test function available
    if (config.test) {
      log(`   Testing API key...`, 'yellow');
      try {
        const result = await config.test(value);
        if (result.valid) {
          log(`   ✅ ${result.message}`, 'green');
        } else {
          log(`   ⚠️  ${result.message}`, 'yellow');
          allValid = false;
        }
      } catch (error) {
        log(`   ⚠️  Test failed: ${error.message}`, 'yellow');
        allValid = false;
      }
    } else {
      // Basic format validation
      let validation;
      if (key === 'SENTRY_DSN') {
        validation = validateSentryDSN(value);
      } else if (key === 'GOOGLE_API_KEY') {
        validation = validateGoogleAPIKey(value);
      } else if (key === 'OPENAI_API_KEY') {
        validation = validateOpenAIAPIKey(value);
      } else {
        validation = { valid: true, message: 'Key is set' };
      }

      if (validation.valid) {
        log(`   ✅ ${validation.message}`, 'green');
      } else {
        log(`   ⚠️  ${validation.message}`, 'yellow');
        allValid = false;
      }
    }
  }

  return { allSet, allValid };
}

function verifyFrontendApiKeys() {
  log('\n🌐 Frontend API Keys (Netlify)', 'cyan');
  log('─'.repeat(60), 'cyan');
  log('  ⚠️  Note: Frontend keys must be checked in Netlify dashboard', 'yellow');
  log('  📍 Go to: Netlify Dashboard → Site Settings → Environment Variables\n', 'blue');

  Object.entries(frontendApiKeys).forEach(([key, config]) => {
    log(`  - ${key}: ${config.name}`, 'blue');
    log(`    Description: ${config.description}`, 'blue');
  });
}

async function generateReport() {
  log('🔑 API Keys Verification', 'cyan');
  log('='.repeat(60), 'cyan');

  const backendResult = await verifyBackendApiKeys();
  verifyFrontendApiKeys();

  log('\n📊 Verification Summary', 'cyan');
  log('─'.repeat(60), 'cyan');

  if (backendResult.allSet && backendResult.allValid) {
    log('✅ All backend API keys are set and valid!', 'green');
  } else if (backendResult.allSet) {
    log('⚠️  Backend API keys are set but some may be invalid', 'yellow');
  } else {
    log('❌ Some backend API keys are missing', 'red');
  }

  log('\n📝 Next Steps:', 'cyan');
  if (!backendResult.allSet) {
    log('  1. Add missing API keys in Railway dashboard', 'yellow');
    log('  2. Railway → Your Service → Variables → Add Variable', 'blue');
  }
  log('  3. Verify frontend API keys in Netlify dashboard', 'yellow');
  log('  4. Netlify → Site Settings → Environment Variables', 'blue');
  log('  5. Test features that use API keys', 'yellow');

  log('\n✅ Verification complete!', 'green');

  return backendResult.allSet && backendResult.allValid;
}

// Run verification
if (require.main === module) {
  generateReport()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = { verifyBackendApiKeys, verifyFrontendApiKeys, generateReport };
