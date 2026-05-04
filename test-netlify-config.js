// Test script to verify Netlify configuration
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Netlify Configuration...\n');

// Test 1: Check if netlify.toml exists and is valid
function testNetlifyToml() {
    console.log('1️⃣ Testing netlify.toml configuration...');
    
    const netlifyTomlPath = path.join(__dirname, 'netlify.toml');
    
    if (!fs.existsSync(netlifyTomlPath)) {
        console.log('❌ netlify.toml not found');
        return false;
    }
    
    const content = fs.readFileSync(netlifyTomlPath, 'utf8');
    
    // Check for problematic commands
    const problematicCommands = [
        'npm run build:production',
        'npm run build:preview', 
        'npm run build:development'
    ];
    
    let hasProblems = false;
    problematicCommands.forEach(cmd => {
        if (content.includes(cmd)) {
            console.log(`❌ Found problematic command: ${cmd}`);
            hasProblems = true;
        }
    });
    
    // Check for correct configuration
    if (content.includes('publish = "public"')) {
        console.log('✅ Publish directory set to "public"');
    } else {
        console.log('❌ Publish directory not set to "public"');
        hasProblems = true;
    }
    
    if (content.includes('base = "."')) {
        console.log('✅ Base directory set to "."');
    } else {
        console.log('❌ Base directory not set to "."');
        hasProblems = true;
    }
    
    if (content.includes('web-production-86d39.up.railway.app')) {
        console.log('✅ Correct API URL configured');
    } else {
        console.log('❌ Incorrect API URL');
        hasProblems = true;
    }
    
    if (!hasProblems) {
        console.log('✅ netlify.toml configuration looks good');
    }
    
    return !hasProblems;
}

// Test 2: Check if public directory exists and has content
function testPublicDirectory() {
    console.log('\n2️⃣ Testing public directory...');
    
    const publicPath = path.join(__dirname, 'public');
    
    if (!fs.existsSync(publicPath)) {
        console.log('❌ public directory not found');
        return false;
    }
    
    const files = fs.readdirSync(publicPath);
    console.log(`✅ public directory exists with ${files.length} files`);
    
    // Check for key files
    const keyFiles = ['dashboard.html', 'index.html'];
    keyFiles.forEach(file => {
        if (files.includes(file)) {
            console.log(`✅ ${file} found`);
        } else {
            console.log(`❌ ${file} missing`);
        }
    });
    
    return true;
}

// Test 3: Check package.json for build scripts
function testPackageJson() {
    console.log('\n3️⃣ Testing package.json build scripts...');
    
    const packageJsonPath = path.join(__dirname, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
        console.log('❌ package.json not found');
        return false;
    }
    
    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const scripts = packageJson.scripts || {};
        
        const requiredScripts = [
            'build',
            'build:production',
            'build:preview',
            'build:development'
        ];
        
        let allScriptsExist = true;
        requiredScripts.forEach(script => {
            if (scripts[script]) {
                console.log(`✅ ${script} script exists: ${scripts[script]}`);
            } else {
                console.log(`❌ ${script} script missing`);
                allScriptsExist = false;
            }
        });
        
        return allScriptsExist;
    } catch (error) {
        console.log(`❌ Error parsing package.json: ${error.message}`);
        return false;
    }
}

// Test 4: Check GitHub Actions workflow
function testGitHubActions() {
    console.log('\n4️⃣ Testing GitHub Actions workflow...');
    
    const workflowPath = path.join(__dirname, '.github', 'workflows', 'netlify-deploy.yml');
    
    if (!fs.existsSync(workflowPath)) {
        console.log('❌ GitHub Actions workflow not found');
        return false;
    }
    
    const content = fs.readFileSync(workflowPath, 'utf8');
    
    if (content.includes('Deploy to Netlify')) {
        console.log('✅ GitHub Actions workflow exists');
    } else {
        console.log('❌ GitHub Actions workflow missing');
        return false;
    }
    
    if (content.includes('publish-dir: \'./public\'')) {
        console.log('✅ Workflow configured for public directory');
    } else {
        console.log('❌ Workflow not configured for public directory');
        return false;
    }
    
    return true;
}

// Run all tests
function runAllTests() {
    console.log('🚀 Starting Netlify Configuration Tests...\n');
    
    const results = [
        testNetlifyToml(),
        testPublicDirectory(),
        testPackageJson(),
        testGitHubActions()
    ];
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log(`\n📊 Test Results: ${passed}/${total} tests passed`);
    
    if (passed === total) {
        console.log('✅ All tests passed! Netlify configuration should work correctly.');
    } else {
        console.log('❌ Some tests failed. Please fix the issues above.');
    }
    
    return passed === total;
}

// Auto-run tests
if (require.main === module) {
    runAllTests();
}

module.exports = {
    testNetlifyToml,
    testPublicDirectory,
    testPackageJson,
    testGitHubActions,
    runAllTests
};
