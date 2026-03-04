#!/usr/bin/env node
/**
 * Script to add Sentry integration to frontend
 * Run: node scripts/setup-sentry-frontend.js
 */

const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'web-project', 'index.html');
const configPath = path.join(__dirname, '..', 'web-project', 'src', 'config.ts');

console.log('🔧 Setting up Sentry for frontend...\n');

// Check if Sentry is already configured
let indexHtml = '';
let configTs = '';

if (fs.existsSync(indexHtmlPath)) {
  indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
}

if (fs.existsSync(configPath)) {
  configTs = fs.readFileSync(configPath, 'utf8');
}

if (indexHtml.includes('sentry') || configTs.includes('sentry')) {
  console.log('⚠️  Sentry already configured');
  console.log('   Skipping setup...\n');
  process.exit(0);
}

// Sentry initialization script (for index.html)
const sentryScript = `
  <!-- Sentry Error Tracking -->
  <script>
    if (import.meta.env.VITE_SENTRY_DSN) {
      import('@sentry/react').then(Sentry => {
        Sentry.init({
          dsn: import.meta.env.VITE_SENTRY_DSN,
          environment: import.meta.env.MODE || 'production',
          integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
          ],
          tracesSampleRate: 1.0,
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0,
        });
      }).catch(err => console.warn('Sentry not available:', err));
    }
  </script>
`;

// Alternative: Add to config.ts if it exists
const sentryConfigCode = `
// Sentry Error Tracking
export function initSentry() {
  if (import.meta.env.VITE_SENTRY_DSN) {
    import('@sentry/react').then(Sentry => {
      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: import.meta.env.MODE || 'production',
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration(),
        ],
        tracesSampleRate: 1.0,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
      });
    }).catch(err => console.warn('Sentry not available:', err));
  }
}
`;

let modified = false;

// Add to index.html before closing </head> tag
if (indexHtml && indexHtml.includes('</head>')) {
  const backupPath = indexHtmlPath + '.backup';
  fs.writeFileSync(backupPath, indexHtml);
  console.log(`📦 Backup created: ${backupPath}`);
  
  indexHtml = indexHtml.replace('</head>', `${sentryScript}\n  </head>`);
  fs.writeFileSync(indexHtmlPath, indexHtml);
  modified = true;
  console.log('✅ Added Sentry script to index.html');
} else {
  console.log('⚠️  Could not find index.html or </head> tag');
}

// Add to config.ts if it exists
if (configTs && !configTs.includes('sentry')) {
  const backupPath = configPath + '.backup';
  fs.writeFileSync(backupPath, configTs);
  console.log(`📦 Backup created: ${backupPath}`);
  
  configTs += sentryConfigCode;
  fs.writeFileSync(configPath, configTs);
  modified = true;
  console.log('✅ Added Sentry config to config.ts');
}

if (modified) {
  console.log('\n✅ Sentry integration added to frontend\n');
  
  console.log('📝 Next steps:');
  console.log('   1. Install Sentry package:');
  console.log('      cd web-project');
  console.log('      npm install @sentry/react');
  console.log('   2. Add VITE_SENTRY_DSN to Netlify environment variables');
  console.log('   3. Redeploy frontend\n');
} else {
  console.log('⚠️  No changes made. Please check frontend structure.\n');
}
