// bootstrap.cjs — minimal, safe startup + crash visibility
process.on('uncaughtException', (e) => { 
  console.error('[uncaughtException]', e); 
  process.exit(1); 
});
process.on('unhandledRejection', (r) => { 
  console.error('[unhandledRejection]', r); 
  process.exit(1); 
});

// Set defaults for Railway
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || '3000';
process.env.API_NAME = process.env.API_NAME || 'SmartFarm';
process.env.API_VERSION = process.env.API_VERSION || 'v1';
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

console.log('[boot] NODE_ENV =', process.env.NODE_ENV);
console.log('[boot] PORT     =', process.env.PORT);
console.log('[boot] CORS_ORIGIN =', process.env.CORS_ORIGIN);
console.log('[boot] Starting SmartFarm Backend...');

try {
  require('./server.cjs');
} catch (error) {
  console.error('[boot] Failed to load server.cjs:', error.message);
  process.exit(1);
}
