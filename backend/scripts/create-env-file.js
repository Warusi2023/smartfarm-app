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
        } catch (error) {
            console.log('⚠️  Database connection test failed:', error.message);
            console.log('   You can test later with: npm run test:db');
        }
    } else {
        console.log('\n⚠️  DATABASE_URL not set. Set it manually in .env file');
    }
    
    // Ask about email configuration
    console.log('\n📧 Email Configuration (Required for Email Verification)\n');
    console.log('Email verification requires email service to be configured.');
    console.log('Users will receive verification emails when they register.\n');
    const setupEmail = await question('Do you want to configure email service now? (y/n): ');
    
    if (setupEmail.toLowerCase() === 'y') {
        console.log('\n📋 Email Provider Options:');
        console.log('1. Gmail (Easiest for testing)');
        console.log('2. SendGrid (Production)');
        console.log('3. Mailgun (Production)');
        console.log('4. AWS SES (Production)');
        console.log('5. Custom SMTP\n');
        
        const providerChoice = await question('Select provider (1-5) [1]: ') || '1';
        
        let emailService = 'gmail';
        let emailUser = '';
        let emailPass = '';
        let smtpHost = '';
        let smtpPort = '';
        
        switch(providerChoice) {
            case '1':
                emailService = 'gmail';
                console.log('\n📧 Gmail Setup:');
                console.log('1. Enable 2-Step Verification in Google Account');
                console.log('2. Go to: Security → App Passwords');
                console.log('3. Generate App Password for "Mail"');
                console.log('4. Copy the 16-character password\n');
                emailUser = await question('Gmail address: ');
                emailPass = await hidePassword('App Password (16 characters, no spaces): ');
                break;
            case '2':
                emailService = 'sendgrid';
                console.log('\n📧 SendGrid Setup:');
                console.log('1. Go to SendGrid Dashboard');
                console.log('2. Settings → API Keys');
                console.log('3. Create API Key with "Mail Send" permissions\n');
                emailUser = 'apikey';
                emailPass = await hidePassword('SendGrid API Key: ');
                break;
            case '3':
                emailService = 'mailgun';
                console.log('\n📧 Mailgun Setup:');
                console.log('1. Go to Mailgun Dashboard');
                console.log('2. Sending → Domain Settings → SMTP credentials\n');
                emailUser = await question('Mailgun SMTP Username: ');
                emailPass = await hidePassword('Mailgun SMTP Password: ');
                smtpHost = await question('SMTP Host [smtp.mailgun.org]: ') || 'smtp.mailgun.org';
                smtpPort = await question('SMTP Port [587]: ') || '587';
                break;
            case '4':
                emailService = 'ses';
                console.log('\n📧 AWS SES Setup:');
                console.log('1. Go to AWS SES Console');
                console.log('2. SMTP Settings → Create SMTP Credentials\n');
                emailUser = await question('AWS SES SMTP Username: ');
                emailPass = await hidePassword('AWS SES SMTP Password: ');
                const awsRegion = await question('AWS Region [us-east-1]: ') || 'us-east-1';
                smtpHost = `email-smtp.${awsRegion}.amazonaws.com`;
                smtpPort = '587';
                break;
            case '5':
                emailService = 'smtp';
                console.log('\n📧 Custom SMTP Setup:\n');
                smtpHost = await question('SMTP Host: ');
                smtpPort = await question('SMTP Port [587]: ') || '587';
                emailUser = await question('SMTP Username: ');
                emailPass = await hidePassword('SMTP Password: ');
                break;
        }
        
        const emailFrom = await question('From address [SmartFarm <noreply@smartfarm.com>]: ') || 'SmartFarm <noreply@smartfarm.com>';
        const frontendUrl = await question('Frontend URL [https://smartfarm-app.netlify.app]: ') || 'https://smartfarm-app.netlify.app';
        
        // Update email settings in .env
        let updatedContent = fs.readFileSync(envPath, 'utf8');
        updatedContent = updatedContent.replace(/EMAIL_SERVICE=.*/g, `EMAIL_SERVICE=${emailService}`);
        updatedContent = updatedContent.replace(/EMAIL_USER=.*/g, `EMAIL_USER=${emailUser}`);
        updatedContent = updatedContent.replace(/EMAIL_PASS=.*/g, `EMAIL_PASS=${emailPass}`);
        updatedContent = updatedContent.replace(/EMAIL_FROM=.*/g, `EMAIL_FROM="${emailFrom}"`);
        updatedContent = updatedContent.replace(/FRONTEND_URL=.*/g, `FRONTEND_URL=${frontendUrl}`);
        
        if (smtpHost) {
            if (updatedContent.includes('SMTP_HOST=')) {
                updatedContent = updatedContent.replace(/SMTP_HOST=.*/g, `SMTP_HOST=${smtpHost}`);
            } else {
                updatedContent += `\nSMTP_HOST=${smtpHost}\n`;
            }
        }
        
        if (smtpPort) {
            if (updatedContent.includes('SMTP_PORT=')) {
                updatedContent = updatedContent.replace(/SMTP_PORT=.*/g, `SMTP_PORT=${smtpPort}`);
            } else {
                updatedContent += `\nSMTP_PORT=${smtpPort}\n`;
            }
        }
        
        fs.writeFileSync(envPath, updatedContent);
        console.log('\n✅ Email configuration saved!');
        console.log('\n🧪 Testing email configuration...');
        console.log('   Run: npm run test:email');
    }
    
    console.log('\n📋 Next steps:');
    console.log('1. Test database: npm run test:db');
    console.log('2. Test email service: npm run test:email');
    console.log('3. Test email verification: npm run test:email-verification');
    console.log('4. Start server: npm run dev');
    console.log('\n');
    
    rl.close();
}

createEnvFile().catch(error => {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
});

