/**
 * Database Connection Test Script
 * Tests PostgreSQL connection and verifies database is accessible
 * 
 * Usage: node backend/scripts/test-db-connection.js
 */

require('dotenv').config();
const { Pool } = require('pg');

async function testDatabaseConnection() {
    console.log('🔍 Testing PostgreSQL Database Connection...\n');
    
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL environment variable is not set!');
        console.log('\n📋 To set it:');
        console.log('1. Railway Dashboard → Postgres service → Settings → Variables');
        console.log('2. Copy the DATABASE_URL value');
        console.log('3. Add to your .env file or Railway service variables');
        process.exit(1);
    }
    
    console.log('✅ DATABASE_URL is set');
    console.log('🔗 Connection string:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@')); // Hide password
    
    // Create connection pool
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 5,
        min: 1,
        connectionTimeoutMillis: 10000,
        query_timeout: 10000
    });
    
    let client;
    
    try {
        console.log('\n📡 Attempting to connect...');
        
        // Test connection
        client = await pool.connect();
        console.log('✅ Successfully connected to database!');
        
        // Test basic query
        console.log('\n🔍 Running test queries...');
        
        const result1 = await client.query('SELECT NOW(), version()');
        console.log('✅ Database timestamp:', result1.rows[0].now);
        console.log('✅ PostgreSQL version:', result1.rows[0].version.split(' ')[0] + ' ' + result1.rows[0].version.split(' ')[1]);
        
        // Check current database
        const result2 = await client.query('SELECT current_database()');
        console.log('✅ Current database:', result2.rows[0].current_database);
        
        // Check if users table exists
        const result3 = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            )
        `);
        
        if (result3.rows[0].exists) {
            console.log('✅ Users table exists');
            
            // Check table structure
            const result4 = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'users'
                ORDER BY ordinal_position
            `);
            
            console.log('\n📊 Users table columns:');
            result4.rows.forEach(col => {
                console.log(`   - ${col.column_name} (${col.data_type})`);
            });
            
            // Check for email verification fields
            const columns = result4.rows.map(r => r.column_name);
            const hasVerificationToken = columns.includes('verification_token');
            const hasVerificationExpires = columns.includes('verification_expires');
            const hasIsVerified = columns.includes('is_verified');
            
            console.log('\n📧 Email Verification Fields:');
            console.log(`   - verification_token: ${hasVerificationToken ? '✅' : '❌ MISSING'}`);
            console.log(`   - verification_expires: ${hasVerificationExpires ? '✅' : '❌ MISSING'}`);
            console.log(`   - is_verified: ${hasIsVerified ? '✅' : '❌ MISSING'}`);
            
            if (!hasVerificationToken || !hasVerificationExpires || !hasIsVerified) {
                console.log('\n⚠️  Email verification fields are missing!');
                console.log('📋 Run migration: backend/database/migrations/add-email-verification.sql');
            }
            
            // Count users
            const result5 = await client.query('SELECT COUNT(*) as count FROM users');
            console.log(`\n👥 Total users: ${result5.rows[0].count}`);
        } else {
            console.log('⚠️  Users table does not exist');
            console.log('📋 You may need to run database migrations');
        }
        
        // Check connection pool status
        console.log('\n📊 Connection Pool Status:');
        console.log(`   - Total connections: ${pool.totalCount}`);
        console.log(`   - Idle connections: ${pool.idleCount}`);
        console.log(`   - Waiting clients: ${pool.waitingCount}`);
        
        console.log('\n✅ All database tests passed!');
        console.log('🎉 Database is accessible and working correctly.');
        
    } catch (error) {
        console.error('\n❌ Database connection failed!');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('\n🔧 Troubleshooting:');
            console.log('   - Check if Postgres service is running in Railway');
            console.log('   - Verify DATABASE_URL is correct');
            console.log('   - Check network/firewall settings');
        } else if (error.code === 'ETIMEDOUT') {
            console.log('\n🔧 Troubleshooting:');
            console.log('   - Connection timeout - check network');
            console.log('   - Verify DATABASE_URL host and port');
            console.log('   - Check Railway service status');
        } else if (error.code === '28P01') {
            console.log('\n🔧 Troubleshooting:');
            console.log('   - Authentication failed - check username/password');
            console.log('   - Verify DATABASE_URL credentials');
        } else if (error.code === '3D000') {
            console.log('\n🔧 Troubleshooting:');
            console.log('   - Database does not exist');
            console.log('   - Check database name in DATABASE_URL');
        }
        
        process.exit(1);
    } finally {
        if (client) {
            client.release();
        }
        await pool.end();
        console.log('\n🔌 Connection closed.');
    }
}

// Run the test
testDatabaseConnection().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});

