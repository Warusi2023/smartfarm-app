#!/usr/bin/env node
/**
 * Script to add Sentry integration to backend/server.js
 * Run: node scripts/setup-sentry-backend.js
 */

const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, '..', 'backend', 'server.js');

console.log('🔧 Setting up Sentry for backend...\n');

// Read server.js
let serverContent = fs.readFileSync(serverPath, 'utf8');

// Check if Sentry is already configured
if (serverContent.includes('@sentry/node')) {
  console.log('⚠️  Sentry already configured in server.js');
  console.log('   Skipping setup...\n');
  process.exit(0);
}

// Sentry initialization code (to add after other requires)
const sentryInitCode = `
// --- Sentry Error Tracking ---
let Sentry;
let ProfilingIntegration;
try {
  Sentry = require("@sentry/node");
  ProfilingIntegration = require("@sentry/profiling-node");
  
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || "production",
      integrations: [
        new ProfilingIntegration(),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });
    logger.info('Sentry initialized successfully');
  } else {
    logger.warn('SENTRY_DSN not set - Sentry disabled');
  }
} catch (error) {
  logger.warn('Sentry not available:', error.message);
}
`;

// Sentry middleware (to add after CORS, before routes)
const sentryMiddlewareCode = `
// Sentry request handler (must be before routes)
if (Sentry && Sentry.Handlers) {
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}
`;

// Sentry error handler (to add after routes, before error middleware)
const sentryErrorHandlerCode = `
// Sentry error handler (must be after routes, before error middleware)
if (Sentry && Sentry.Handlers) {
  app.use(Sentry.Handlers.errorHandler());
}
`;

// Find insertion points
const afterRequiresPattern = /const HealthCheckService = require\(['"]\.\/utils\/health-check['"]\);/;
const afterCorsPattern = /app\.options\('\\*', cors\(corsOptions\)\); \/\/ proper preflight handling/;
const beforeRoutesPattern = /\/\/ --- Health & root endpoints ---/;
const afterRoutesPattern = /\/\/ Error handling middleware/;

let modified = false;

// 1. Add Sentry requires after other requires
if (afterRequiresPattern.test(serverContent)) {
  serverContent = serverContent.replace(
    afterRequiresPattern,
    `$&\n${sentryInitCode}`
  );
  modified = true;
  console.log('✅ Added Sentry initialization');
} else {
  console.log('⚠️  Could not find insertion point for Sentry initialization');
}

// 2. Add Sentry middleware after CORS
if (afterCorsPattern.test(serverContent)) {
  serverContent = serverContent.replace(
    afterCorsPattern,
    `$&\n${sentryMiddlewareCode}`
  );
  modified = true;
  console.log('✅ Added Sentry request handler');
} else {
  console.log('⚠️  Could not find insertion point for Sentry middleware');
}

// 3. Add Sentry error handler before error middleware
if (afterRoutesPattern.test(serverContent)) {
  serverContent = serverContent.replace(
    afterRoutesPattern,
    `${sentryErrorHandlerCode}\n$&`
  );
  modified = true;
  console.log('✅ Added Sentry error handler');
} else {
  // Try alternative pattern
  const altPattern = /app\.use\(express\.urlencoded/;
  if (altPattern.test(serverContent)) {
    // Find where routes end (look for error handler)
    const errorHandlerIndex = serverContent.indexOf('// Error handling middleware');
    if (errorHandlerIndex > -1) {
      serverContent = serverContent.substring(0, errorHandlerIndex) +
        sentryErrorHandlerCode + '\n' +
        serverContent.substring(errorHandlerIndex);
      modified = true;
      console.log('✅ Added Sentry error handler (alternative location)');
    }
  }
}

if (modified) {
  // Backup original file
  const backupPath = serverPath + '.backup';
  fs.writeFileSync(backupPath, fs.readFileSync(serverPath));
  console.log(`\n📦 Backup created: ${backupPath}`);
  
  // Write modified file
  fs.writeFileSync(serverPath, serverContent);
  console.log('✅ Sentry integration added to server.js\n');
  
  console.log('📝 Next steps:');
  console.log('   1. Install Sentry packages:');
  console.log('      cd backend');
  console.log('      npm install @sentry/node @sentry/profiling-node');
  console.log('   2. Add SENTRY_DSN to Railway environment variables');
  console.log('   3. Deploy backend\n');
} else {
  console.log('⚠️  No changes made. Please check server.js structure.\n');
}
