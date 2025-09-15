#!/usr/bin/env node

/**
 * Database Verification Script
 * Run this to check if all tables were created successfully
 */

const { Client } = require('pg');

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set.');
  process.exit(1);
}

const client = new Client({ connectionString: DATABASE_URL });

async function verifyDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Check if migration table exists
    const migrationCheck = await client.query(`
      SELECT COUNT(*) as count FROM schema_migrations;
    `);
    console.log(`📋 Migrations applied: ${migrationCheck.rows[0].count}`);

    // List all tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    console.log(`\n📊 Tables created: ${tables.rows.length}`);
    console.log('📋 Table list:');
    tables.rows.forEach((row, index) => {
      console.log(`  ${index + 1}. ${row.table_name}`);
    });

    // Check key tables
    const keyTables = ['users', 'farms', 'fields', 'crops', 'inventory_items'];
    console.log('\n🔍 Checking key tables:');
    
    for (const table of keyTables) {
      try {
        const result = await client.query(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`  ✅ ${table}: ${result.rows[0].count} rows`);
      } catch (error) {
        console.log(`  ❌ ${table}: ${error.message}`);
      }
    }

    console.log('\n🎉 Database verification complete!');

  } catch (error) {
    console.error('❌ Database verification failed:', error.message);
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  verifyDatabase();
}

module.exports = { verifyDatabase };
