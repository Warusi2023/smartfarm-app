#!/usr/bin/env node

/**
 * CORS Configuration Validation Script
 * Validates CORS configuration files and API endpoints
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const SEARCH_PATTERNS = [
  '**/*.js',
  '**/*.json',
  '**/*.toml',
  '**/*.env*'
];

class CORSValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.filesChecked = 0;
    this.corsConfigs = [];
  }

  /**
   * Main validation function
   */
  async validate() {
    console.log('🔍 Starting CORS configuration validation...\n');

    try {
      // Find all relevant files
      const files = this.findFiles();
      console.log(`📁 Found ${files.length} files to check\n`);

      // Validate each file
      for (const file of files) {
        await this.validateFile(file);
      }

      // Validate CORS configurations
      this.validateCORSConfigurations();

      // Report results
      this.reportResults();

      // Exit with appropriate code
      if (this.errors.length > 0) {
        process.exit(1);
      } else {
        console.log('✅ All CORS configurations are valid!');
        process.exit(0);
      }
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Find all files matching the search patterns
   */
  findFiles() {
    const files = [];
    SEARCH_PATTERNS.forEach(pattern => {
      const matches = glob.sync(pattern, { cwd: PROJECT_ROOT, absolute: true });
      files.push(...matches);
    });
    return [...new Set(files)]; // Remove duplicates
  }

  /**
   * Validate a single file
   */
  async validateFile(filePath) {
    this.filesChecked++;
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(PROJECT_ROOT, filePath);

      // Check for CORS configurations
      this.checkCORSConfigurations(content, relativePath);

      // Check for API endpoint configurations
      this.checkAPIEndpoints(content, relativePath);

    } catch (error) {
      this.warnings.push({
        file: path.relative(PROJECT_ROOT, filePath),
        message: `Could not read file: ${error.message}`
      });
    }
  }

  /**
   * Check for CORS configurations in file content
   */
  checkCORSConfigurations(content, filePath) {
    const corsPatterns = [
      /cors\s*\(\s*\{[^}]*origin[^}]*\}/gi,
      /Access-Control-Allow-Origin/gi,
      /CORS_ORIGIN/gi,
      /allowedOrigins/gi
    ];

    corsPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          this.corsConfigs.push({
            file: filePath,
            config: match.trim(),
            type: 'cors'
          });
        });
      }
    });

    // Check for problematic CORS configurations
    if (content.includes('Access-Control-Allow-Origin: *') && 
        !content.includes('Access-Control-Allow-Credentials: true')) {
      // This is actually fine for most cases
      console.log(`✅ ${filePath}: CORS configured with wildcard origin`);
    }
  }

  /**
   * Check for API endpoint configurations
   */
  checkAPIEndpoints(content, filePath) {
    const apiPatterns = [
      /\/api\//g,
      /baseURL/g,
      /API_BASE_URL/g,
      /railway\.app/g,
      /netlify\.app/g
    ];

    apiPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        console.log(`✅ ${filePath}: Found ${matches.length} API endpoint reference(s)`);
      }
    });

    // Check for hardcoded URLs that should be environment variables
    const hardcodedUrlPattern = /https?:\/\/[^\s"']+\.(railway|netlify|heroku)\.app/gi;
    const hardcodedUrls = content.match(hardcodedUrlPattern);
    if (hardcodedUrls) {
      this.warnings.push({
        file: filePath,
        message: `Found ${hardcodedUrls.length} hardcoded URL(s). Consider using environment variables.`
      });
    }
  }

  /**
   * Validate CORS configurations
   */
  validateCORSConfigurations() {
    if (this.corsConfigs.length === 0) {
      this.warnings.push({
        file: 'Global',
        message: 'No explicit CORS configurations found. Ensure CORS is properly configured in backend.'
      });
    } else {
      console.log(`✅ Found ${this.corsConfigs.length} CORS configuration(s)`);
    }

    // Check for common CORS issues
    this.corsConfigs.forEach(config => {
      if (config.config.includes('origin: true')) {
        this.errors.push({
          file: config.file,
          line: 0,
          message: 'CORS origin: true is insecure. Use specific origins or environment variables.',
          code: config.config
        });
      }
    });
  }

  /**
   * Report validation results
   */
  reportResults() {
    console.log('\n📊 CORS Validation Results:');
    console.log(`Files checked: ${this.filesChecked}`);
    console.log(`CORS configurations found: ${this.corsConfigs.length}`);
    console.log(`Errors: ${this.errors.length}`);
    console.log(`Warnings: ${this.warnings.length}\n`);

    // Report errors
    if (this.errors.length > 0) {
      console.log('❌ ERRORS FOUND:');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.file}:${error.line}`);
        console.log(`   ${error.message}`);
        console.log(`   Code: ${error.code}`);
        console.log('');
      });
    }

    // Report warnings
    if (this.warnings.length > 0) {
      console.log('⚠️  WARNINGS:');
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning.file}: ${warning.message}`);
      });
    }
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  const validator = new CORSValidator();
  validator.validate();
}

module.exports = CORSValidator;
