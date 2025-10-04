#!/usr/bin/env node

/**
 * Railway Deployment Diagnostics Script
 * Gathers real failure information to identify deployment issues
 */

import { execSync } from 'child_process';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

class DeployDiagnostics {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
  }

  run() {
    console.log('🔍 Railway Deployment Diagnostics Starting...\n');

    try {
      this.checkEnvironment();
      this.checkNodeVersion();
      this.checkWorkingDirectory();
      this.checkBackendStructure();
      this.checkPackageFiles();
      this.checkBuildConfiguration();
      this.checkStartCommands();
      
      this.reportResults();
      
      if (this.errors.length > 0) {
        console.error('\n❌ DEPLOYMENT WILL FAIL - Fix these issues first:');
        this.errors.forEach((error, index) => {
          console.error(`${index + 1}. ${error}`);
        });
        process.exit(1);
      } else {
        console.log('\n✅ Deployment diagnostics passed - Railway should deploy successfully');
        process.exit(0);
      }
    } catch (error) {
      console.error('❌ Diagnostics script failed:', error.message);
      process.exit(1);
    }
  }

  checkEnvironment() {
    console.log('📋 Environment Information:');
    
    // CI Environment
    const ciEnv = process.env.CI || process.env.GITHUB_ACTIONS || process.env.RAILWAY_ENVIRONMENT;
    this.info.push(`CI Environment: ${ciEnv || 'Local'}`);
    
    // Platform
    this.info.push(`Platform: ${process.platform}`);
    this.info.push(`Architecture: ${process.arch}`);
    
    // Railway specific
    if (process.env.RAILWAY_ENVIRONMENT) {
      this.info.push(`Railway Environment: ${process.env.RAILWAY_ENVIRONMENT}`);
      this.info.push(`Railway Project: ${process.env.RAILWAY_PROJECT_ID || 'Not set'}`);
      this.info.push(`Railway Service: ${process.env.RAILWAY_SERVICE_ID || 'Not set'}`);
    }
    
    this.info.forEach(info => console.log(`  ${info}`));
    console.log('');
  }

  checkNodeVersion() {
    console.log('🟢 Node.js Version Check:');
    
    try {
      const nodeVersion = execSync('node -v', { encoding: 'utf8' }).trim();
      const npmVersion = execSync('npm -v', { encoding: 'utf8' }).trim();
      
      console.log(`  Node.js: ${nodeVersion}`);
      console.log(`  npm: ${npmVersion}`);
      
      // Check if Node version is compatible
      const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
      if (majorVersion < 18) {
        this.errors.push(`Node.js version ${nodeVersion} is too old. Railway requires Node.js 18+`);
      } else if (majorVersion >= 20) {
        this.warnings.push(`Node.js version ${nodeVersion} is newer than recommended (18.19.0)`);
      }
      
    } catch (error) {
      this.errors.push(`Failed to check Node.js version: ${error.message}`);
    }
    console.log('');
  }

  checkWorkingDirectory() {
    console.log('📁 Working Directory:');
    
    const cwd = process.cwd();
    console.log(`  Current Directory: ${cwd}`);
    
    // List files in current directory
    try {
      const files = readdirSync(cwd);
      console.log(`  Files in directory: ${files.length} items`);
      console.log(`  Key files: ${files.filter(f => f.includes('package.json') || f.includes('server') || f.includes('backend')).join(', ') || 'None found'}`);
    } catch (error) {
      this.errors.push(`Cannot read current directory: ${error.message}`);
    }
    console.log('');
  }

  checkBackendStructure() {
    console.log('🏗️ Backend Structure Check:');
    
    const backendPaths = [
      'backend-api',
      'backend', 
      'server',
      'api'
    ];
    
    let backendPath = null;
    for (const path of backendPaths) {
      if (existsSync(path)) {
        backendPath = path;
        break;
      }
    }
    
    if (!backendPath) {
      this.errors.push('Backend directory not found. Expected one of: backend-api, backend, server, api');
      return;
    }
    
    console.log(`  Backend Path: ${backendPath}`);
    
    // Check backend contents
    try {
      const backendFiles = readdirSync(backendPath);
      console.log(`  Backend Files: ${backendFiles.length} items`);
      
      const keyFiles = backendFiles.filter(f => 
        f.includes('package.json') || 
        f.includes('server') || 
        f.includes('index') ||
        f.includes('app')
      );
      console.log(`  Key Files: ${keyFiles.join(', ') || 'None found'}`);
      
      if (!backendFiles.includes('package.json')) {
        this.errors.push(`No package.json found in ${backendPath}`);
      }
      
    } catch (error) {
      this.errors.push(`Cannot read backend directory ${backendPath}: ${error.message}`);
    }
    console.log('');
  }

  checkPackageFiles() {
    console.log('📦 Package Configuration Check:');
    
    const backendPaths = ['backend-api', 'backend', 'server', 'api'];
    let backendPath = null;
    
    for (const path of backendPaths) {
      if (existsSync(join(path, 'package.json'))) {
        backendPath = path;
        break;
      }
    }
    
    if (!backendPath) {
      this.errors.push('No package.json found in any backend directory');
      return;
    }
    
    try {
      const packagePath = join(backendPath, 'package.json');
      const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
      
      console.log(`  Package Name: ${packageJson.name || 'Unnamed'}`);
      console.log(`  Version: ${packageJson.version || 'No version'}`);
      
      // Check engines
      if (packageJson.engines?.node) {
        console.log(`  Node Engine: ${packageJson.engines.node}`);
      } else {
        this.warnings.push('No Node.js engine specified in package.json');
      }
      
      // Check scripts
      const scripts = packageJson.scripts || {};
      console.log(`  Available Scripts: ${Object.keys(scripts).join(', ') || 'None'}`);
      
      if (!scripts.start) {
        this.errors.push('No "start" script defined in package.json');
      }
      
      if (!scripts.build && !scripts.dev) {
        this.warnings.push('No "build" or "dev" script found');
      }
      
      // Check dependencies
      const deps = Object.keys(packageJson.dependencies || {});
      const devDeps = Object.keys(packageJson.devDependencies || {});
      console.log(`  Dependencies: ${deps.length} production, ${devDeps.length} dev`);
      
      // Check for problematic scripts
      if (scripts.prepare && scripts.prepare.includes('husky')) {
        this.warnings.push('Husky prepare script may cause issues in CI - consider gating it');
      }
      
    } catch (error) {
      this.errors.push(`Failed to read package.json: ${error.message}`);
    }
    console.log('');
  }

  checkBuildConfiguration() {
    console.log('🔧 Build Configuration Check:');
    
    const backendPaths = ['backend-api', 'backend', 'server', 'api'];
    let backendPath = null;
    
    for (const path of backendPaths) {
      if (existsSync(join(path, 'package.json'))) {
        backendPath = path;
        break;
      }
    }
    
    if (!backendPath) {
      return; // Already reported error above
    }
    
    // Check for TypeScript
    if (existsSync(join(backendPath, 'tsconfig.json'))) {
      console.log('  TypeScript: tsconfig.json found');
      try {
        const tsconfig = JSON.parse(readFileSync(join(backendPath, 'tsconfig.json'), 'utf8'));
        if (tsconfig.compilerOptions?.outDir) {
          console.log(`  TypeScript Output: ${tsconfig.compilerOptions.outDir}`);
        }
        if (tsconfig.compilerOptions?.noEmit) {
          console.log('  TypeScript: noEmit enabled');
        }
      } catch (error) {
        this.warnings.push(`Invalid tsconfig.json: ${error.message}`);
      }
    }
    
    // Check for build output directory
    const buildDirs = ['dist', 'build', 'out'];
    for (const dir of buildDirs) {
      if (existsSync(join(backendPath, dir))) {
        console.log(`  Build Output: ${dir} directory exists`);
        break;
      }
    }
    
    // Check for lockfiles
    const lockfiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
    for (const lockfile of lockfiles) {
      if (existsSync(join(backendPath, lockfile))) {
        console.log(`  Lockfile: ${lockfile} found`);
        break;
      }
    }
    
    console.log('');
  }

  checkStartCommands() {
    console.log('🚀 Start Command Check:');
    
    const backendPaths = ['backend-api', 'backend', 'server', 'api'];
    let backendPath = null;
    
    for (const path of backendPaths) {
      if (existsSync(join(path, 'package.json'))) {
        backendPath = path;
        break;
      }
    }
    
    if (!backendPath) {
      return;
    }
    
    try {
      const packageJson = JSON.parse(readFileSync(join(backendPath, 'package.json'), 'utf8'));
      const startScript = packageJson.scripts?.start;
      
      if (startScript) {
        console.log(`  Start Script: ${startScript}`);
        
        // Check if start script looks correct
        if (startScript.includes('node')) {
          console.log('  ✅ Start script uses Node.js');
        } else {
          this.warnings.push('Start script may not use Node.js directly');
        }
        
        // Check for PORT handling
        if (startScript.includes('PORT') || startScript.includes('process.env.PORT')) {
          console.log('  ✅ Start script references PORT environment variable');
        } else {
          this.warnings.push('Start script may not handle Railway PORT environment variable');
        }
      }
      
      // Check for entry files
      const entryFiles = ['server.js', 'index.js', 'app.js', 'main.js'];
      for (const file of entryFiles) {
        if (existsSync(join(backendPath, file))) {
          console.log(`  Entry File: ${file} found`);
          
          // Check if entry file handles PORT
          try {
            const content = readFileSync(join(backendPath, file), 'utf8');
            if (content.includes('process.env.PORT') || content.includes('PORT')) {
              console.log('  ✅ Entry file handles PORT environment variable');
            } else {
              this.warnings.push(`${file} may not handle Railway PORT environment variable`);
            }
          } catch (error) {
            this.warnings.push(`Cannot check PORT handling in ${file}: ${error.message}`);
          }
          break;
        }
      }
      
    } catch (error) {
      this.errors.push(`Failed to check start commands: ${error.message}`);
    }
    console.log('');
  }

  reportResults() {
    console.log('📊 Diagnostics Summary:');
    console.log(`  Errors: ${this.errors.length}`);
    console.log(`  Warnings: ${this.warnings.length}`);
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️ Warnings (non-blocking):');
      this.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. ${warning}`);
      });
    }
  }
}

// Run diagnostics
const diagnostics = new DeployDiagnostics();
diagnostics.run();
