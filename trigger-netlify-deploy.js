// Script to trigger Netlify deployment
// This can be run to manually trigger a deployment if webhooks aren't working

const https = require('https');

// Netlify webhook URL (you'll need to get this from your Netlify dashboard)
const NETLIFY_WEBHOOK_URL = process.env.NETLIFY_WEBHOOK_URL || 'https://api.netlify.com/build_hooks/YOUR_WEBHOOK_ID';

function triggerNetlifyDeploy() {
    console.log('🚀 Triggering Netlify deployment...');
    
    const postData = JSON.stringify({
        trigger_title: 'Manual deployment trigger from Cursor',
        trigger_branch: 'main'
    });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = https.request(NETLIFY_WEBHOOK_URL, options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`Response: ${chunk}`);
        });
        
        res.on('end', () => {
            if (res.statusCode === 200 || res.statusCode === 201) {
                console.log('✅ Netlify deployment triggered successfully!');
            } else {
                console.log('❌ Failed to trigger Netlify deployment');
            }
        });
    });

    req.on('error', (e) => {
        console.error(`❌ Problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
}

// Instructions for getting webhook URL
function showInstructions() {
    console.log(`
🔧 NETLIFY WEBHOOK SETUP INSTRUCTIONS:

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your SmartFarm project
3. Go to Site settings → Build & deploy → Build hooks
4. Click "Add build hook"
5. Set:
   - Name: "GitHub Webhook"
   - Branch: "main"
   - Build command: (leave empty - we're using netlify.toml)
6. Copy the webhook URL
7. Set it as environment variable:
   export NETLIFY_WEBHOOK_URL="https://api.netlify.com/build_hooks/YOUR_WEBHOOK_ID"
8. Run this script again

Alternatively, you can manually trigger deployment from Netlify dashboard.
    `);
}

if (NETLIFY_WEBHOOK_URL.includes('YOUR_WEBHOOK_ID')) {
    showInstructions();
} else {
    triggerNetlifyDeploy();
}

module.exports = { triggerNetlifyDeploy, showInstructions };
