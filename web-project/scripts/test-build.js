#!/usr/bin/env node

/**
 * Build Test Script
 * Tests the build process locally to ensure it works before pushing to CI
 */

const { execSync } = require('child_process');
const path = require('path');

class BuildTester {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.errors = [];
    this.warnings = [];
  }

  async runTests() {
    console.log('🧪 Starting build tests...\n');

    try {
      // Test 1: Install dependencies
      await this.testInstallDependencies();

      // Test 2: Run linting
      await this.testLinting();

      // Test 3: Run validations
      await this.testValidations();

      // Test 4: Run build
      await this.testBuild();

      // Report results
      this.reportResults();

      if (this.errors.length > 0) {
        process.exit(1);
      } else {
        console.log('✅ All build tests passed!');
        process.exit(0);
      }
    } catch (error) {
      console.error('❌ Build test failed:', error.message);
      process.exit(1);
    }
  }

  async testInstallDependencies() {
    console.log('📦 Testing dependency installation...');
    try {
      execSync('npm ci --production=false', { 
        cwd: this.projectRoot, 
        stdio: 'pipe' 
      });
      console.log('✅ Dependencies installed successfully');
    } catch (error) {
      this.errors.push('Dependency installation failed');
      console.error('❌ Dependency installation failed:', error.message);
    }
  }

  async testLinting() {
    console.log('🔍 Testing linting...');
    try {
      execSync('npm run lint:check', { 
        cwd: this.projectRoot, 
        stdio: 'pipe' 
      });
      console.log('✅ Linting passed');
    } catch (error) {
      // Linting warnings are OK, only errors should fail
      if (error.status === 0) {
        console.log('⚠️ Linting completed with warnings (this is OK for CI)');
      } else {
        this.errors.push('Linting failed');
        console.error('❌ Linting failed:', error.message);
      }
    }
  }

  async testValidations() {
    console.log('✅ Testing validations...');
    
    const validations = [
      'validate:svg',
      'validate:ids', 
      'validate:cors'
    ];

    for (const validation of validations) {
      try {
        execSync(`npm run ${validation}`, { 
          cwd: this.projectRoot, 
          stdio: 'pipe' 
        });
        console.log(`✅ ${validation} passed`);
      } catch (error) {
        this.errors.push(`${validation} failed`);
        console.error(`❌ ${validation} failed:`, error.message);
      }
    }
  }

  async testBuild() {
    console.log('🏗️ Testing build...');
    try {
      execSync('npm run build', { 
        cwd: this.projectRoot, 
        stdio: 'pipe' 
      });
      console.log('✅ Build completed successfully');
    } catch (error) {
      this.errors.push('Build failed');
      console.error('❌ Build failed:', error.message);
    }
  }

  reportResults() {
    console.log('\n📊 Build Test Results:');
    console.log(`Errors: ${this.errors.length}`);
    console.log(`Warnings: ${this.warnings.length}\n`);

    if (this.errors.length > 0) {
      console.log('❌ ERRORS:');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log('⚠️ WARNINGS:');
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
      });
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new BuildTester();
  tester.runTests();
}

module.exports = BuildTester;
