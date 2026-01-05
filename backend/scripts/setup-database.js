/**
 * Database Setup Script
 * Helps configure DATABASE_URL for local development
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

function hidePassword(prompt) {
    return new Promise((resolve) => {
        const stdin = process.stdin;
        const stdout = process.stdout;
        
        stdout.write(prompt);
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');
        
        let password = '';
        stdin.on('data', function(char) {
            char = char + '';
            
            switch(char) {
                case '\n':
                case '\r':
                case '\u0004':
                    stdin.setRawMode(false);
                    stdin.pause();
                    stdout.write('\n');
                    resolve(password);
                    return;
                case '\u0003':
                    stdin.setRawMode(false);
                    stdin.pause();
                    process.exit();
                    return;
                case '\u007f': // Backspace
                    if (password.length > 0) {
                        password = password.slice(0, -1);
                        stdout.write('\b \b');
                    }
                    break;
                default:
                    password += char;
                    stdout.write('*');
                    break;
            }
        });
    });
}

async function setupDatabase() {
    console.log('\n🔧 SmartFarm Database Setup\n');
    console.log('='.repeat(60));
    console.log('This script will help you configure your database connection.\n');
    
    const envPath = path.join(__dirname, '../.env');
    const envExamplePath = path.join(__dirname, '../env.example');
    
    // Check if .env already exists
    let existingEnv = {};
    if (fs.existsSync(envPath)) {
        console.log('⚠️  .env file already exists');
        const overwrite = await question('Do you want to update it? (y/n): ');
        if (overwrite.toLowerCase() !== 'y') {
            console.log('Setup cancelled.');
            rl.close();
            return;
        }
        
        // Read existing .env
        const existingContent = fs.readFileSync(envPath, 'utf8');
        existingContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                existingEnv[match[1].trim()] = match[2].trim();
            }
        });
    }
    
    console.log('\n📋 Database Connection Options:\n');
    console.log('1. Railway PostgreSQL (Recommended for production)');
    console.log('2. Local PostgreSQL');
    console.log('3. Enter DATABASE_URL directly');
    console.log('4. Skip database setup (use later)\n');
    
    const choice = await question('Select option (1-4): ');
    
    let databaseUrl = '';
    
    switch(choice) {
        case '1':
            console.log('\n🚂 Railway PostgreSQL Setup\n');
            console.log('To get your Railway DATABASE_URL:');
            console.log('1. Go to Railway Dashboard: https://railway.app');
            console.log('2. Select your Postgres service');
            console.log('3. Go to "Variables" tab');
            console.log('4. Copy the DATABASE_URL value\n');
            
            databaseUrl = await question('Paste your Railway DATABASE_URL: ');
            break;
            
        case '2':
            console.log('\n💻 Local PostgreSQL Setup\n');
            const host = await question('Database host (default: localhost): ') || 'localhost';
            const port = await question('Database port (default: 5432): ') || '5432';
            const database = await question('Database name: ');
            const user = await question('Database user: ');
            const password = await hidePassword('Database password: ');
            
            databaseUrl = `postgresql://${user}:${password}@${host}:${port}/${database}`;
            break;
            
        case '3':
            console.log('\n🔗 Direct DATABASE_URL\n');
            databaseUrl = await question('Enter DATABASE_URL: ');
            break;
            
        case '4':
            console.log('\n⏭️  Skipping database setup');
            console.log('You can set DATABASE_URL manually in backend/.env file');
            rl.close();
            return;
            
        default:
            console.log('\n❌ Invalid option');
            rl.close();
            return;
    }
    
    if (!databaseUrl || !databaseUrl.trim()) {
        console.log('\n❌ DATABASE_URL is required');
        rl.close();
        return;
    }
    
    // Test the connection
    console.log('\n🔍 Testing database connection...');
    try {
        const { Pool } = require('pg');
        const { getPostgresSSLConfig } = require('../utils/ssl-config');
        const testPool = new Pool({
            connectionString: databaseUrl.trim(),
            ssl: getPostgresSSLConfig(databaseUrl.trim()),
            connectionTimeoutMillis: 5000
        });
        
        const result = await testPool.query('SELECT NOW(), version()');
        await testPool.end();
        
        console.log('✅ Database connection successful!');
        console.log(`   Database time: ${result.rows[0].now}`);
        console.log(`   PostgreSQL version: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
    } catch (error) {
        console.log('❌ Database connection failed:', error.message);
        const continueAnyway = await question('\nDo you want to continue anyway? (y/n): ');
        if (continueAnyway.toLowerCase() !== 'y') {
            console.log('Setup cancelled.');
            rl.close();
            return;
        }
    }
    
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
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-characters
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"
FRONTEND_URL=http://localhost:5500
`;
    }
    
    // Update DATABASE_URL in envContent
    if (envContent.includes('DATABASE_URL=')) {
        envContent = envContent.replace(
            /DATABASE_URL=.*/,
            `DATABASE_URL=${databaseUrl.trim()}`
        );
    } else {
        envContent += `\nDATABASE_URL=${databaseUrl.trim()}\n`;
    }
    
    // Preserve existing values for other variables
    Object.keys(existingEnv).forEach(key => {
        if (key !== 'DATABASE_URL' && !envContent.includes(`${key}=`)) {
            envContent += `\n${key}=${existingEnv[key]}`;
        }
    });
    
    // Write .env file
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env file created/updated successfully!');
    console.log(`   Location: ${envPath}`);
    
    // Ask about other settings
    console.log('\n📧 Email Configuration (Optional)\n');
    const setupEmail = await question('Do you want to configure email service now? (y/n): ');
    
    if (setupEmail.toLowerCase() === 'y') {
        const emailService = await question('Email service (gmail/sendgrid/mailgun/ses/smtp) [gmail]: ') || 'gmail';
        const emailUser = await question('Email address or API key: ');
        const emailPass = await hidePassword('Email password or API key: ');
        const emailFrom = await question('From address [SmartFarm <noreply@smartfarm.com>]: ') || 'SmartFarm <noreply@smartfarm.com>';
        const frontendUrl = await question('Frontend URL [http://localhost:5500]: ') || 'http://localhost:5500';
        
        // Update email settings in .env
        let updatedContent = fs.readFileSync(envPath, 'utf8');
        updatedContent = updatedContent.replace(/EMAIL_SERVICE=.*/g, `EMAIL_SERVICE=${emailService}`);
        updatedContent = updatedContent.replace(/EMAIL_USER=.*/g, `EMAIL_USER=${emailUser}`);
        updatedContent = updatedContent.replace(/EMAIL_PASS=.*/g, `EMAIL_PASS=${emailPass}`);
        updatedContent = updatedContent.replace(/EMAIL_FROM=.*/g, `EMAIL_FROM="${emailFrom}"`);
        updatedContent = updatedContent.replace(/FRONTEND_URL=.*/g, `FRONTEND_URL=${frontendUrl}`);
        
        fs.writeFileSync(envPath, updatedContent);
        console.log('\n✅ Email configuration saved!');
    }
    
    // Generate JWT secret if not set
    let finalContent = fs.readFileSync(envPath, 'utf8');
    if (!finalContent.includes('JWT_SECRET=') || finalContent.includes('JWT_SECRET=replace_with') || finalContent.includes('JWT_SECRET=your-super-secret')) {
        const crypto = require('crypto');
        const jwtSecret = crypto.randomBytes(32).toString('hex');
        finalContent = finalContent.replace(/JWT_SECRET=.*/g, `JWT_SECRET=${jwtSecret}`);
        fs.writeFileSync(envPath, finalContent);
        console.log('\n✅ JWT_SECRET generated automatically');
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Database setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Test connection: npm run test:db');
    console.log('2. Test email verification: npm run test:email-verification');
    console.log('3. Start server: npm run dev');
    console.log('='.repeat(60) + '\n');
    
    rl.close();
}

setupDatabase().catch(error => {
    console.error('\n❌ Setup error:', error);
    rl.close();
    process.exit(1);
});

