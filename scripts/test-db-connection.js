#!/usr/bin/env node
/**
 * Database Connection Test Script
 * Tests PostgreSQL database connection and verifies tables exist
 * Run: node scripts/test-db-connection.js
 */

const { Pool } = require('pg');

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

// Get database connection string
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  log('❌ DATABASE_URL environment variable not set', 'red');
  log('   Set it in Railway Dashboard → Backend → Variables', 'yellow');
  process.exit(1);
}

// Parse DATABASE_URL to get connection info (without exposing password)
let dbInfo = 'Unknown';
try {
  const url = new URL(databaseUrl);
  dbInfo = `${url.hostname}:${url.port || 5432}/${url.pathname.split('/').pop()}`;
} catch (e) {
  // If URL parsing fails, just use masked version
  dbInfo = databaseUrl.substring(0, 20) + '...';
}

// Create connection pool
let pool;
try {
  // Determine SSL configuration
  const sslConfig = process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false }
    : false;

  pool = new Pool({
    connectionString: databaseUrl,
    ssl: sslConfig,
    max: 20,
    min: 2,
  });
} catch (error) {
  log('❌ Failed to create database pool:', 'red');
  log(`   ${error.message}`, 'red');
  process.exit(1);
}

async function testConnection() {
  let client;
  
  try {
    log('\n🔍 Testing Database Connection', 'cyan');
    log('='.repeat(60), 'cyan');
    log(`Database: ${dbInfo}\n`, 'blue');

    // Test connection
    log('1. Testing connection...', 'yellow');
    client = await pool.connect();
    log('   ✅ Connection successful!\n', 'green');

    // Test query - Get database info
    log('2. Getting database information...', 'yellow');
    const dbInfoResult = await client.query('SELECT NOW() as current_time, version() as pg_version, current_database() as db_name');
    const dbInfo = dbInfoResult.rows[0];
    
    log('   📊 Database Info:', 'blue');
    log(`      Database: ${dbInfo.db_name}`, 'blue');
    log(`      Current Time: ${dbInfo.current_time}`, 'blue');
    log(`      PostgreSQL Version: ${dbInfo.pg_version.split(' ')[0]} ${dbInfo.pg_version.split(' ')[1]}`, 'blue');
    log('');

    // Check tables
    log('3. Checking database tables...', 'yellow');
    const tablesResult = await client.query(`
      SELECT table_name, 
             (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    if (tablesResult.rows.length === 0) {
      log('   ⚠️  No tables found in database', 'yellow');
      log('   💡 Run database migrations to create tables', 'yellow');
    } else {
      log(`   ✅ Found ${tablesResult.rows.length} tables:\n`, 'green');
      
      // Show first 15 tables
      tablesResult.rows.slice(0, 15).forEach((row) => {
        log(`      - ${row.table_name} (${row.column_count} columns)`, 'blue');
      });
      
      if (tablesResult.rows.length > 15) {
        log(`      ... and ${tablesResult.rows.length - 15} more tables`, 'blue');
      }
    }
    log('');

    // Test a simple query
    log('4. Testing simple query...', 'yellow');
    try {
      const testResult = await client.query('SELECT 1 as test');
      log('   ✅ Query executed successfully', 'green');
    } catch (queryError) {
      log(`   ⚠️  Query test failed: ${queryError.message}`, 'yellow');
    }
    log('');

    // Check for common SmartFarm tables
    log('5. Checking for SmartFarm tables...', 'yellow');
    const smartFarmTables = ['users', 'farms', 'crops', 'livestock'];
    const existingTables = tablesResult.rows.map(r => r.table_name.toLowerCase());
    
    smartFarmTables.forEach(tableName => {
      if (existingTables.includes(tableName)) {
        log(`   ✅ ${tableName} table exists`, 'green');
      } else {
        log(`   ⚠️  ${tableName} table not found`, 'yellow');
      }
    });
    log('');

    // Summary
    log('📊 Connection Test Summary', 'cyan');
    log('─'.repeat(60), 'cyan');
    log(`   Database: ${dbInfo.db_name}`, 'blue');
    log(`   Tables: ${tablesResult.rows.length}`, 'blue');
    log(`   Connection: ✅ Working`, 'green');
    log(`   Status: ✅ Ready`, 'green');

    log('\n✅ Database connection test complete!', 'green');
    
    client.release();
    process.exit(0);
    
  } catch (error) {
    log('\n❌ Database Connection Test Failed', 'red');
    log('─'.repeat(60), 'cyan');
    log(`   Error: ${error.message}`, 'red');
    
    if (error.code === 'ECONNREFUSED') {
      log('\n💡 Troubleshooting:', 'yellow');
      log('   1. Verify DATABASE_URL is correct in Railway', 'blue');
      log('   2. Check PostgreSQL plugin is attached to backend', 'blue');
      log('   3. Verify database is running', 'blue');
    } else if (error.code === 'ENOTFOUND') {
      log('\n💡 Troubleshooting:', 'yellow');
      log('   1. Check DATABASE_URL hostname is correct', 'blue');
      log('   2. Verify network connectivity', 'blue');
    } else if (error.message.includes('password')) {
      log('\n💡 Troubleshooting:', 'yellow');
      log('   1. Verify DATABASE_URL credentials are correct', 'blue');
      log('   2. Check PostgreSQL plugin credentials', 'blue');
    }
    
    if (client) {
      client.release();
    }
    process.exit(1);
  } finally {
    if (pool) {
      await pool.end();
    }
  }
}

// Handle unhandled errors
process.on('unhandledRejection', (error) => {
  log('\n❌ Unhandled error:', 'red');
  log(`   ${error.message}`, 'red');
  process.exit(1);
});

// Run test
testConnection();
