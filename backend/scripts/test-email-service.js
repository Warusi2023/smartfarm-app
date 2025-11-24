/**
 * Test Email Service Configuration
 */

require('dotenv').config();
const EmailService = require('../utils/emailService');

async function testEmailService() {
    console.log('\n🧪 Testing Email Service Configuration\n');
    console.log('='.repeat(60));
    
    // Check configuration
    console.log('\n📋 Configuration Check:');
    console.log(`EMAIL_SERVICE: ${process.env.EMAIL_SERVICE || 'NOT SET'}`);
    console.log(`EMAIL_USER: ${process.env.EMAIL_USER ? 'SET (hidden)' : 'NOT SET'}`);
    console.log(`EMAIL_PASS: ${process.env.EMAIL_PASS ? 'SET (hidden)' : 'NOT SET'}`);
    console.log(`EMAIL_FROM: ${process.env.EMAIL_FROM || 'NOT SET'}`);
    console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL || 'NOT SET'}`);
    
    // Initialize email service
    console.log('\n📧 Initializing Email Service...');
    const emailService = new EmailService();
    
    // Wait a bit for transporter verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n📧 Email Service Status:');
    if (emailService.isEmailConfigured()) {
        console.log('✅ Email service is configured and ready!');
        
        // Test sending email
        console.log('\n📤 Testing email send...');
        const testEmail = process.env.TEST_EMAIL || process.env.EMAIL_USER;
        
        if (!testEmail) {
            console.log('⚠️  Set TEST_EMAIL in .env to test sending');
            console.log('   Or email will be sent to EMAIL_USER');
            return;
        }
        
        try {
            const token = 'test-token-' + Date.now();
            console.log(`   Sending test verification email to: ${testEmail}`);
            const sent = await emailService.sendVerificationEmail(
                testEmail,
                token,
                'Test User'
            );
            
            if (sent) {
                console.log(`✅ Test email sent successfully to ${testEmail}`);
                console.log('   Check your inbox (and spam folder) for verification email');
                console.log(`   Verification link: ${process.env.FRONTEND_URL || 'http://localhost:5500'}/verify-email.html?token=${token}`);
            } else {
                console.log('❌ Failed to send test email');
                console.log('   Check email service configuration and credentials');
            }
        } catch (error) {
            console.error('❌ Error sending test email:', error.message);
            console.error('   Full error:', error);
        }
    } else {
        console.log('❌ Email service is NOT configured');
        console.log('\n📋 Setup Instructions:');
        console.log('1. Set EMAIL_SERVICE in .env (gmail, sendgrid, mailgun, etc.)');
        console.log('2. Set EMAIL_USER in .env');
        console.log('3. Set EMAIL_PASS in .env');
        console.log('4. Set EMAIL_FROM in .env');
        console.log('5. Set FRONTEND_URL in .env');
        console.log('\nFor Gmail:');
        console.log('- Enable 2-Step Verification in Google Account');
        console.log('- Generate App Password: Security → App Passwords');
        console.log('- Use App Password (16 characters, no spaces)');
        console.log('\nExample .env configuration:');
        console.log('EMAIL_SERVICE=gmail');
        console.log('EMAIL_USER=your-email@gmail.com');
        console.log('EMAIL_PASS=abcdefghijklmnop');
        console.log('EMAIL_FROM="SmartFarm <noreply@smartfarm.com>"');
        console.log('FRONTEND_URL=https://smartfarm-app.netlify.app');
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
}

testEmailService().catch(error => {
    console.error('\n❌ Test error:', error);
    process.exit(1);
});

