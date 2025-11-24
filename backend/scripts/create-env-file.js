/**
 * Quick .env file creator
 * Creates .env file with DATABASE_URL prompt
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function createEnvFile() {
    console.log('\n🔧 Creating .env file for SmartFarm Backend\n');
    
    const envPath = path.join(__dirname, '../.env');
    const envExamplePath = path.join(__dirname, '../env.example');
    
    // Check if .env already exists
    if (fs.existsSync(envPath)) {
        console.log('⚠️  .env file already exists!');
        const overwrite = await question('Do you want to overwrite it? (y/n): ');
        if (overwrite.toLowerCase() !== 'y') {
            console.log('Cancelled. Existing .env file preserved.');
            rl.close();
            return;
        }
    }
    
    console.log('\n📋 Database Configuration\n');
    console.log('Get your Railway DATABASE_URL from:');
    console.log('1. Railway Dashboard → Postgres service → Variables tab');
    console.log('2. Copy the DATABASE_URL value\n');
    
    const databaseUrl = await question('Paste your DATABASE_URL (or press Enter to skip): ');
    
    // Generate JWT secret
    const jwtSecret = crypto.randomBytes(32).toString('hex');
    
    // Read env.example as template
    let envContent = '';
    if (fs.existsSync(envExamplePath)) {
        envContent = fs.readFileSync(envExamplePath, 'utf8');
    } else {
        // Create basic template
        envContent = `# SmartFarm Backend Environment Variables
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=

# Authentication
JWT_SECRET=
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
FRONTEND_URL=http://localhost:5500
`;
    }
    
    // Update DATABASE_URL
    if (databaseUrl && databaseUrl.trim()) {
        if (envContent.includes('DATABASE_URL=')) {
            envContent = envContent.replace(/DATABASE_URL=.*/, `DATABASE_URL=${databaseUrl.trim()}`);
        } else {
            envContent += `\nDATABASE_URL=${databaseUrl.trim()}\n`;
        }
    }
    
    // Update JWT_SECRET
    if (envContent.includes('JWT_SECRET=')) {
        envContent = envContent.replace(/JWT_SECRET=.*/, `JWT_SECRET=${jwtSecret}`);
    } else {
        envContent += `\nJWT_SECRET=${jwtSecret}\n`;
    }
    
    // Set NODE_ENV to development if not set
    if (!envContent.includes('NODE_ENV=')) {
        envContent = `NODE_ENV=development\n${envContent}`;
    } else {
        envContent = envContent.replace(/NODE_ENV=.*/, 'NODE_ENV=development');
    }
    
    // Write .env file
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n✅ .env file created successfully!');
    console.log(`   Location: ${envPath}`);
    
    if (databaseUrl && databaseUrl.trim()) {
        console.log('\n🔍 Testing database connection...');
        try {
            const { Pool } = require('pg');
            const testPool = new Pool({
                connectionString: databaseUrl.trim(),
                ssl: databaseUrl.includes('railway') ? { rejectUnauthorized: false } : false,
                connectionTimeoutMillis: 5000
            });
            
            const result = await testPool.query('SELECT NOW(), version()');
            await testPool.end();
            
            console.log('✅ Database connection successful!');
            console.log(`   Database time: ${result.rows[0].now}`);
        } catch (error) {
            console.log('⚠️  Database connection test failed:', error.message);
            console.log('   You can test later with: npm run test:db');
        }
    } else {
        console.log('\n⚠️  DATABASE_URL not set. Set it manually in .env file');
    }
    
    console.log('\n📋 Next steps:');
    console.log('1. Test database: npm run test:db');
    console.log('2. Test email verification: npm run test:email-verification');
    console.log('3. Start server: npm run dev');
    console.log('\n');
    
    rl.close();
}

createEnvFile().catch(error => {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
});

