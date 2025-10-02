#!/usr/bin/env node

/**
 * SmartFarm Deployment Automation Script
 * Automates the deployment process and provides status checking
 */

const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

class DeploymentAutomation {
  constructor() {
    this.backendUrl = 'https://smartfarm-app-production.up.railway.app';
    this.frontendUrl = 'https://dulcet-sawine-92d6a8.netlify.app';
    this.githubRepo = 'Warusi2023/smartfarm-app';
  }

  async checkBackendHealth() {
    return new Promise((resolve) => {
      const url = `${this.backendUrl}/api/health`;
      console.log(`🔍 Checking backend health: ${url}`);
      
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const health = JSON.parse(data);
            console.log('✅ Backend Health Check:');
            console.log(`   Status: ${health.status || 'OK'}`);
            console.log(`   Environment: ${health.environment || 'production'}`);
            console.log(`   Database: ${health.database?.connected ? 'Connected' : 'Disconnected'}`);
            console.log(`   Uptime: ${health.uptime || 'N/A'}`);
            resolve({ success: true, data: health });
          } catch (error) {
            console.log('❌ Backend Health Check Failed:');
            console.log(`   Error: ${error.message}`);
            console.log(`   Response: ${data}`);
            resolve({ success: false, error: error.message });
          }
        });
      }).on('error', (error) => {
        console.log('❌ Backend Health Check Failed:');
        console.log(`   Error: ${error.message}`);
        resolve({ success: false, error: error.message });
      });
    });
  }

  async checkFrontendAccessibility() {
    return new Promise((resolve) => {
      const url = this.frontendUrl;
      console.log(`🔍 Checking frontend accessibility: ${url}`);
      
      https.get(url, (res) => {
        console.log('✅ Frontend Accessibility Check:');
        console.log(`   Status Code: ${res.statusCode}`);
        console.log(`   Content-Type: ${res.headers['content-type']}`);
        console.log(`   Content-Length: ${res.headers['content-length']}`);
        
        if (res.statusCode === 200) {
          resolve({ success: true, statusCode: res.statusCode });
        } else {
          resolve({ success: false, statusCode: res.statusCode });
        }
      }).on('error', (error) => {
        console.log('❌ Frontend Accessibility Check Failed:');
        console.log(`   Error: ${error.message}`);
        resolve({ success: false, error: error.message });
      });
    });
  }

  async checkGitHubActions() {
    try {
      console.log('🔍 Checking GitHub Actions status...');
      const url = `https://api.github.com/repos/${this.githubRepo}/actions/runs?per_page=1`;
      
      return new Promise((resolve) => {
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
                console.log('✅ GitHub Actions Status:');
                console.log(`   Latest Run: ${latestRun.head_commit.message}`);
                console.log(`   Status: ${latestRun.status}`);
                console.log(`   Conclusion: ${latestRun.conclusion || 'In Progress'}`);
                console.log(`   URL: ${latestRun.html_url}`);
                resolve({ success: true, run: latestRun });
              } else {
                console.log('❌ No GitHub Actions runs found');
                resolve({ success: false, error: 'No runs found' });
              }
            } catch (error) {
              console.log('❌ GitHub Actions Check Failed:');
              console.log(`   Error: ${error.message}`);
              resolve({ success: false, error: error.message });
            }
          });
        }).on('error', (error) => {
          console.log('❌ GitHub Actions Check Failed:');
          console.log(`   Error: ${error.message}`);
          resolve({ success: false, error: error.message });
        });
      });
    } catch (error) {
      console.log('❌ GitHub Actions Check Failed:');
      console.log(`   Error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async triggerDeployment() {
    try {
      console.log('🚀 Triggering deployment...');
      
      // Create empty commit to trigger deployment
      execSync('git commit --allow-empty -m "deploy: trigger production deployment"', { stdio: 'inherit' });
      
      // Push to main branch
      execSync('git push origin main', { stdio: 'inherit' });
      
      console.log('✅ Deployment triggered successfully!');
      console.log('📋 Monitor progress at: https://github.com/Warusi2023/smartfarm-app/actions');
      
      return { success: true };
    } catch (error) {
      console.log('❌ Deployment trigger failed:');
      console.log(`   Error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async runFullDeploymentCheck() {
    console.log('🔍 Running Full Deployment Check\n');
    
    // Check backend health
    const backendHealth = await this.checkBackendHealth();
    console.log('');
    
    // Check frontend accessibility
    const frontendAccess = await this.checkFrontendAccessibility();
    console.log('');
    
    // Check GitHub Actions
    const githubActions = await this.checkGitHubActions();
    console.log('');
    
    // Summary
    console.log('📊 Deployment Status Summary:');
    console.log(`   Backend Health: ${backendHealth.success ? '✅ OK' : '❌ Failed'}`);
    console.log(`   Frontend Access: ${frontendAccess.success ? '✅ OK' : '❌ Failed'}`);
    console.log(`   GitHub Actions: ${githubActions.success ? '✅ OK' : '❌ Failed'}`);
    
    const allGood = backendHealth.success && frontendAccess.success && githubActions.success;
    console.log(`\n🎯 Overall Status: ${allGood ? '✅ All Systems Operational' : '❌ Issues Detected'}`);
    
    if (!allGood) {
      console.log('\n🔧 Troubleshooting Steps:');
      if (!backendHealth.success) {
        console.log('   - Check Railway deployment status');
        console.log('   - Verify environment variables');
        console.log('   - Check Railway logs');
      }
      if (!frontendAccess.success) {
        console.log('   - Check Netlify deployment status');
        console.log('   - Verify environment variables');
        console.log('   - Check Netlify logs');
      }
      if (!githubActions.success) {
        console.log('   - Check GitHub Actions workflow');
        console.log('   - Verify secrets configuration');
        console.log('   - Check workflow permissions');
      }
    }
    
    return { backendHealth, frontendAccess, githubActions, allGood };
  }

  async waitForDeployment(timeoutMinutes = 10) {
    console.log(`⏳ Waiting for deployment to complete (timeout: ${timeoutMinutes} minutes)...`);
    
    const startTime = Date.now();
    const timeout = timeoutMinutes * 60 * 1000;
    
    while (Date.now() - startTime < timeout) {
      const status = await this.runFullDeploymentCheck();
      
      if (status.allGood) {
        console.log('\n🎉 Deployment completed successfully!');
        return { success: true };
      }
      
      console.log('\n⏳ Waiting 30 seconds before next check...');
      await new Promise(resolve => setTimeout(resolve, 30000));
    }
    
    console.log('\n⏰ Deployment timeout reached. Please check manually.');
    return { success: false, error: 'Timeout' };
  }
}

// CLI Interface
async function main() {
  const automation = new DeploymentAutomation();
  const command = process.argv[2];
  
  switch (command) {
    case 'check':
      await automation.runFullDeploymentCheck();
      break;
      
    case 'deploy':
      await automation.triggerDeployment();
      break;
      
    case 'wait':
      const timeout = parseInt(process.argv[3]) || 10;
      await automation.waitForDeployment(timeout);
      break;
      
    case 'health':
      await automation.checkBackendHealth();
      break;
      
    case 'frontend':
      await automation.checkFrontendAccessibility();
      break;
      
    case 'actions':
      await automation.checkGitHubActions();
      break;
      
    default:
      console.log('🚀 SmartFarm Deployment Automation\n');
      console.log('Usage:');
      console.log('  node scripts/deploy-automation.js check     - Check deployment status');
      console.log('  node scripts/deploy-automation.js deploy    - Trigger deployment');
      console.log('  node scripts/deploy-automation.js wait [minutes] - Wait for deployment');
      console.log('  node scripts/deploy-automation.js health    - Check backend health');
      console.log('  node scripts/deploy-automation.js frontend  - Check frontend access');
      console.log('  node scripts/deploy-automation.js actions   - Check GitHub Actions');
      console.log('\nExamples:');
      console.log('  node scripts/deploy-automation.js check');
      console.log('  node scripts/deploy-automation.js deploy');
      console.log('  node scripts/deploy-automation.js wait 15');
      break;
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = DeploymentAutomation;
