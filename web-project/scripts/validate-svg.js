#!/usr/bin/env node

/**
 * SVG ViewBox Validation Script
 * Validates all SVG viewBox attributes in the project to ensure they contain only numeric values
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const SEARCH_PATTERNS = [
  '**/*.html',
  '**/*.js',
  '**/*.jsx',
  '**/*.ts',
  '**/*.tsx',
  '**/*.svg'
];

// Error patterns to detect
const INVALID_VIEWBOX_PATTERNS = [
  /viewBox\s*=\s*["'][^"']*%[^"']*["']/gi,  // Contains percentage
  /viewBox\s*=\s*["'][^"']*px[^"']*["']/gi,  // Contains pixels
  /maintainAspectRatio\s*:\s*false/gi        // Chart.js maintainAspectRatio: false
];

// Valid viewBox pattern (only numbers, spaces, commas, and quotes)
const VALID_VIEWBOX_PATTERN = /viewBox\s*=\s*["']\s*\d+(\.\d+)?\s+\d+(\.\d+)?\s+\d+(\.\d+)?\s+\d+(\.\d+)?\s*["']/gi;

class SVGValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.filesChecked = 0;
  }

  /**
   * Main validation function
   */
  async validate() {
    console.log('🔍 Starting SVG viewBox validation...\n');

    try {
      // Find all relevant files
      const files = this.findFiles();
      console.log(`📁 Found ${files.length} files to check\n`);

      // Validate each file
      for (const file of files) {
        await this.validateFile(file);
      }

      // Report results
      this.reportResults();

      // Exit with appropriate code
      if (this.errors.length > 0) {
        process.exit(1);
      } else {
        console.log('✅ All SVG viewBox attributes are valid!');
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

      // Check for invalid patterns
      INVALID_VIEWBOX_PATTERNS.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
          matches.forEach(match => {
            const lineNumber = this.getLineNumber(content, match);
            this.errors.push({
              file: relativePath,
              line: lineNumber,
              message: this.getErrorMessage(index, match),
              code: match.trim()
            });
          });
        }
      });

      // Check for valid viewBox attributes
      const validMatches = content.match(VALID_VIEWBOX_PATTERN);
      if (validMatches) {
        console.log(`✅ ${relativePath}: ${validMatches.length} valid viewBox attribute(s)`);
      }

    } catch (error) {
      this.warnings.push({
        file: path.relative(PROJECT_ROOT, filePath),
        message: `Could not read file: ${error.message}`
      });
    }
  }

  /**
   * Get line number for a match
   */
  getLineNumber(content, match) {
    const lines = content.substring(0, content.indexOf(match)).split('\n');
    return lines.length;
  }

  /**
   * Get appropriate error message
   */
  getErrorMessage(patternIndex, match) {
    const messages = [
      'SVG viewBox contains percentage values - use numeric values only',
      'SVG viewBox contains pixel values - use numeric values only',
      'Chart.js maintainAspectRatio: false causes invalid viewBox - use maintainAspectRatio: true with aspectRatio property'
    ];
    return messages[patternIndex] || 'Invalid SVG viewBox attribute';
  }

  /**
   * Report validation results
   */
  reportResults() {
    console.log('\n📊 Validation Results:');
    console.log(`Files checked: ${this.filesChecked}`);
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
  const validator = new SVGValidator();
  validator.validate();
}

module.exports = SVGValidator;
