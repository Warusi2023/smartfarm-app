#!/usr/bin/env node
/**
 * Script to add Google Analytics to index.html
 * Run: node scripts/add-google-analytics.js
 */

const fs = require('fs');
const path = require('path');

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

const indexHtmlPath = path.join(__dirname, '..', 'web-project', 'public', 'index.html');

console.log('📊 Adding Google Analytics to index.html...\n');

if (!fs.existsSync(indexHtmlPath)) {
  log('❌ index.html not found at:', 'red');
  log(`   ${indexHtmlPath}`, 'red');
  process.exit(1);
}

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Check if Google Analytics is already added
if (indexHtml.includes('googletagmanager.com/gtag') || indexHtml.includes('gtag(')) {
  log('⚠️  Google Analytics already appears to be configured', 'yellow');
  log('   Skipping...\n', 'yellow');
  process.exit(0);
}

// Google Analytics script (using environment variable)
const gaScript = `
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=%VITE_GA_MEASUREMENT_ID%"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    const gaId = import.meta?.env?.VITE_GA_MEASUREMENT_ID;
    if (gaId) {
      gtag('config', gaId, {
        page_path: window.location.pathname,
      });
    }
  </script>
`;

// Find </head> tag and insert before it
if (indexHtml.includes('</head>')) {
  const backupPath = indexHtmlPath + '.backup';
  fs.writeFileSync(backupPath, indexHtml);
  log(`📦 Backup created: ${backupPath}`, 'blue');
  
  indexHtml = indexHtml.replace('</head>', `${gaScript}\n  </head>`);
  fs.writeFileSync(indexHtmlPath, indexHtml);
  
  log('✅ Google Analytics script added to index.html\n', 'green');
  log('📝 Next steps:', 'cyan');
  log('   1. Add VITE_GA_MEASUREMENT_ID to Netlify environment variables', 'blue');
  log('   2. Get Measurement ID from Google Analytics dashboard', 'blue');
  log('   3. Redeploy frontend', 'blue');
  log('   4. Test tracking in Google Analytics dashboard\n', 'blue');
} else {
  log('❌ Could not find </head> tag in index.html', 'red');
  process.exit(1);
}
