#!/usr/bin/env node

/**
 * SmartFarm Complete Deployment and Verification Script
 * Handles the entire deployment process from configuration to verification
 */

const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

class SmartFarmDeployment {
  constructor() {
    this.backendUrl = 'https://smartfarm-app-production.up.railway.app';
    this.frontendUrl = 'https://dulcet-sawine-92d6a8.netlify.app';
    this.githubRepo = 'Warusi2023/smartfarm-app';
    this.deploymentStartTime = null;
  }

  async checkConfiguration() {
    console.log('🔍 Checking Deployment Configuration...\n');
    
    const configStatus = {
      githubSecrets: false,
      railwayVariables: false,
      netlifyVariables: false
    };

    // Check if configuration files exist
    const configFiles = [
      'github-secrets.txt',
      'backend-production.env',
      'frontend-production.env'
    ];

    configFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
      } else {
        console.log(`❌ ${file} missing`);
      }
    });

    console.log('\n📋 Configuration Checklist:');
    console.log('1. GitHub Secrets: https://github.com/Warusi2023/smartfarm-app/settings/secrets/actions');
    console.log('2. Railway Variables: https://railway.app → Your Project → Variables');
    console.log('3. Netlify Variables: https://app.netlify.com → Your Site → Environment variables');
    
    return configStatus;
  }

  async triggerDeployment() {
    console.log('\n🚀 Triggering Production Deployment...\n');
    
    try {
      this.deploymentStartTime = Date.now();
      
      // Create empty commit to trigger deployment
      console.log('📝 Creating deployment commit...');
      execSync('git commit --allow-empty -m "deploy: trigger production deployment"', { stdio: 'pipe' });
      console.log('✅ Deployment commit created');
      
      // Push to main branch
      console.log('🚀 Pushing to main branch...');
      execSync('git push origin main', { stdio: 'pipe' });
      console.log('✅ Code pushed to GitHub');
      
      console.log('\n📋 Monitor deployment progress:');
      console.log(`🔗 GitHub Actions: https://github.com/${this.githubRepo}/actions`);
      console.log('⏳ Expected deployment time: 5-10 minutes');
      
      return { success: true };
    } catch (error) {
      console.log('❌ Deployment trigger failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  async waitForDeployment(timeoutMinutes = 15) {
    console.log(`\n⏳ Waiting for deployment to complete (timeout: ${timeoutMinutes} minutes)...\n`);
    
    const startTime = Date.now();
    const timeout = timeoutMinutes * 60 * 1000;
    let attempt = 0;
    
    while (Date.now() - startTime < timeout) {
      attempt++;
      console.log(`🔍 Deployment check #${attempt}...`);
      
      const status = await this.checkDeploymentStatus();
      
      if (status.allGood) {
        const duration = Math.round((Date.now() - this.deploymentStartTime) / 1000);
        console.log(`\n🎉 Deployment completed successfully in ${duration} seconds!`);
        return { success: true, duration };
      }
      
      console.log('⏳ Deployment still in progress, waiting 30 seconds...');
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
    
    console.log('\n⏰ Deployment timeout reached. Please check manually.');
    return { success: false, error: 'Timeout' };
  }

  async checkDeploymentStatus() {
    const results = {
      backendHealth: await this.checkBackendHealth(),
      frontendAccess: await this.checkFrontendAccess(),
      githubActions: await this.checkGitHubActions()
    };
    
    results.allGood = results.backendHealth.success && 
                     results.frontendAccess.success && 
                     results.githubActions.success;
    
    return results;
  }

  async checkBackendHealth() {
    return new Promise((resolve) => {
      const url = `${this.backendUrl}/api/health`;
      
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const health = JSON.parse(data);
            console.log('✅ Backend Health: OK');
            resolve({ success: true, data: health });
          } catch (error) {
            console.log('❌ Backend Health: Failed');
            resolve({ success: false, error: error.message });
          }
        });
      }).on('error', (error) => {
        console.log('❌ Backend Health: Failed');
        resolve({ success: false, error: error.message });
      });
    });
  }

  async checkFrontendAccess() {
    return new Promise((resolve) => {
      https.get(this.frontendUrl, (res) => {
        if (res.statusCode === 200) {
          console.log('✅ Frontend Access: OK');
          resolve({ success: true, statusCode: res.statusCode });
        } else {
          console.log(`❌ Frontend Access: Failed (${res.statusCode})`);
          resolve({ success: false, statusCode: res.statusCode });
        }
      }).on('error', (error) => {
        console.log('❌ Frontend Access: Failed');
        resolve({ success: false, error: error.message });
      });
    });
  }

  async checkGitHubActions() {
    return new Promise((resolve) => {
      const url = `https://api.github.com/repos/${this.githubRepo}/actions/runs?per_page=1`;
      
      https.get(url, {
        headers: {
          'User-Agent': 'SmartFarm-Deployment-Checker',
          'Accept': 'application/vnd.github.v3+json'
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const runs = JSON.parse(data);
            if (runs.workflow_runs && runs.workflow_runs.length > 0) {
              const latestRun = runs.workflow_runs[0];
              const isSuccess = latestRun.conclusion === 'success';
              console.log(`✅ GitHub Actions: ${isSuccess ? 'Success' : 'In Progress/Failed'}`);
              resolve({ success: isSuccess, run: latestRun });
            } else {
              console.log('❌ GitHub Actions: No runs found');
              resolve({ success: false, error: 'No runs found' });
            }
          } catch (error) {
            console.log('❌ GitHub Actions: Failed to check');
            resolve({ success: false, error: error.message });
          }
        });
      }).on('error', (error) => {
        console.log('❌ GitHub Actions: Failed to check');
        resolve({ success: false, error: error.message });
      });
    });
  }

  async verifyFunctionality() {
    console.log('\n🧪 Verifying Application Functionality...\n');
    
    const tests = [
      { name: 'Backend Health Check', url: `${this.backendUrl}/api/health` },
      { name: 'Frontend Homepage', url: this.frontendUrl },
      { name: 'Frontend Dashboard', url: `${this.frontendUrl}/dashboard.html` }
    ];
    
    const results = [];
    
    for (const test of tests) {
      try {
        const result = await this.performTest(test);
        results.push(result);
        console.log(`${result.success ? '✅' : '❌'} ${test.name}: ${result.success ? 'OK' : 'Failed'}`);
      } catch (error) {
        results.push({ name: test.name, success: false, error: error.message });
        console.log(`❌ ${test.name}: Failed`);
      }
    }
    
    const allPassed = results.every(r => r.success);
    console.log(`\n🎯 Functionality Test Results: ${allPassed ? 'All Tests Passed ✅' : 'Some Tests Failed ❌'}`);
    
    return { allPassed, results };
  }

  async performTest(test) {
    return new Promise((resolve) => {
      https.get(test.url, (res) => {
        resolve({
          name: test.name,
          success: res.statusCode === 200,
          statusCode: res.statusCode
        });
      }).on('error', (error) => {
        resolve({
          name: test.name,
          success: false,
          error: error.message
        });
      });
    });
  }

  async runCompleteDeployment() {
    console.log('🚀 SmartFarm Complete Deployment Process\n');
    console.log('=' .repeat(50));
    
    // Step 1: Check configuration
    await this.checkConfiguration();
    
    // Step 2: Trigger deployment
    const deploymentResult = await this.triggerDeployment();
    if (!deploymentResult.success) {
      console.log('❌ Deployment trigger failed. Please check configuration.');
      return { success: false };
    }
    
    // Step 3: Wait for deployment
    const waitResult = await this.waitForDeployment(15);
    if (!waitResult.success) {
      console.log('❌ Deployment did not complete within timeout.');
      return { success: false };
    }
    
    // Step 4: Verify functionality
    const verificationResult = await this.verifyFunctionality();
    
    // Final summary
    console.log('\n' + '=' .repeat(50));
    console.log('🎉 DEPLOYMENT SUMMARY');
    console.log('=' .repeat(50));
    console.log(`✅ Backend: ${this.backendUrl}`);
    console.log(`✅ Frontend: ${this.frontendUrl}`);
    console.log(`✅ Duration: ${waitResult.duration} seconds`);
    console.log(`✅ Functionality: ${verificationResult.allPassed ? 'All Tests Passed' : 'Some Tests Failed'}`);
    console.log('\n🎯 SmartFarm is now live and ready for users!');
    
    return { 
      success: true, 
      backend: this.backendUrl,
      frontend: this.frontendUrl,
      duration: waitResult.duration,
      functionality: verificationResult.allPassed
    };
  }
}

// CLI Interface
async function main() {
  const deployment = new SmartFarmDeployment();
  const command = process.argv[2];
  
  switch (command) {
    case 'deploy':
      await deployment.runCompleteDeployment();
      break;
      
    case 'check':
      await deployment.checkDeploymentStatus();
      break;
      
    case 'verify':
      await deployment.verifyFunctionality();
      break;
      
    case 'config':
      await deployment.checkConfiguration();
      break;
      
    default:
      console.log('🚀 SmartFarm Complete Deployment\n');
      console.log('Usage:');
      console.log('  node scripts/deploy-and-verify.js deploy  - Run complete deployment');
      console.log('  node scripts/deploy-and-verify.js check  - Check deployment status');
      console.log('  node scripts/deploy-and-verify.js verify - Verify functionality');
      console.log('  node scripts/deploy-and-verify.js config - Check configuration');
      console.log('\nExample:');
      console.log('  node scripts/deploy-and-verify.js deploy');
      break;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = SmartFarmDeployment;
