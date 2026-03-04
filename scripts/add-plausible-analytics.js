#!/usr/bin/env node
/**
 * Script to add Plausible Analytics to index.html
 * Run: node scripts/add-plausible-analytics.js [domain]
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
const domain = process.argv[2] || 'your-site.netlify.app';

console.log('📊 Adding Plausible Analytics to index.html...\n');

if (!fs.existsSync(indexHtmlPath)) {
  log('❌ index.html not found at:', 'red');
  log(`   ${indexHtmlPath}`, 'red');
  process.exit(1);
}

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Check if Plausible is already added
if (indexHtml.includes('plausible.io/js/script.js')) {
  log('⚠️  Plausible Analytics already appears to be configured', 'yellow');
  log('   Skipping...\n', 'yellow');
  process.exit(0);
}

// Plausible Analytics script
const plausibleScript = `
  <!-- Plausible Analytics -->
  <script defer data-domain="${domain}" src="https://plausible.io/js/script.js"></script>
`;

// Find </head> tag and insert before it
if (indexHtml.includes('</head>')) {
  const backupPath = indexHtmlPath + '.backup';
  fs.writeFileSync(backupPath, indexHtml);
  log(`📦 Backup created: ${backupPath}`, 'blue');
  
  indexHtml = indexHtml.replace('</head>', `${plausibleScript}\n  </head>`);
  fs.writeFileSync(indexHtmlPath, indexHtml);
  
  log('✅ Plausible Analytics script added to index.html\n', 'green');
  log(`📝 Domain configured: ${domain}`, 'blue');
  log('\n📝 Next steps:', 'cyan');
  log('   1. Create Plausible account at https://plausible.io', 'blue');
  log(`   2. Add domain "${domain}" in Plausible dashboard`, 'blue');
  log('   3. Update domain in script if different', 'blue');
  log('   4. Redeploy frontend', 'blue');
  log('   5. Test tracking in Plausible dashboard\n', 'blue');
} else {
  log('❌ Could not find </head> tag in index.html', 'red');
  process.exit(1);
}
