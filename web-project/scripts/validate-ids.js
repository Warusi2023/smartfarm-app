#!/usr/bin/env node

/**
 * DOM ID Validation Script
 * Validates that all DOM elements have unique IDs
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const SEARCH_PATTERNS = ['**/*.html'];

class IDValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.filesChecked = 0;
    this.allIds = new Map(); // Track all IDs across files
  }

  /**
   * Main validation function
   */
  async validate() {
    console.log('🔍 Starting DOM ID validation...\n');

    try {
      // Find all HTML files
      const files = this.findFiles();
      console.log(`📁 Found ${files.length} files to check\n`);

      // Validate each file
      for (const file of files) {
        await this.validateFile(file);
      }

      // Check for duplicate IDs across files
      this.checkDuplicateIds();

      // Report results
      this.reportResults();

      // Exit with appropriate code
      if (this.errors.length > 0) {
        process.exit(1);
      } else {
        console.log('✅ All DOM IDs are unique!');
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

      // Find all ID attributes
      const idPattern = /id\s*=\s*["']([^"']+)["']/gi;
      const ids = [];
      let match;

      while ((match = idPattern.exec(content)) !== null) {
        const id = match[1];
        const lineNumber = this.getLineNumber(content, match[0]);
        
        ids.push({ id, line: lineNumber });
        
        // Track globally
        if (!this.allIds.has(id)) {
          this.allIds.set(id, []);
        }
        this.allIds.get(id).push({
          file: relativePath,
          line: lineNumber
        });
      }

      // Check for duplicates within the same file
      const duplicateIds = this.findDuplicatesInArray(ids);
      duplicateIds.forEach(duplicate => {
        this.errors.push({
          file: relativePath,
          line: duplicate.line,
          message: `Duplicate ID '${duplicate.id}' found`,
          code: `id="${duplicate.id}"`
        });
      });

      if (ids.length > 0) {
        console.log(`✅ ${relativePath}: ${ids.length} unique ID(s) found`);
      }

    } catch (error) {
      this.warnings.push({
        file: path.relative(PROJECT_ROOT, filePath),
        message: `Could not read file: ${error.message}`
      });
    }
  }

  /**
   * Check for duplicate IDs across all files
   */
  checkDuplicateIds() {
    this.allIds.forEach((locations, id) => {
      if (locations.length > 1) {
        locations.forEach(location => {
          this.errors.push({
            file: location.file,
            line: location.line,
            message: `ID '${id}' is used in ${locations.length} location(s)`,
            code: `id="${id}"`
          });
        });
      }
    });
  }

  /**
   * Find duplicates in an array of objects with id property
   */
  findDuplicatesInArray(arr) {
    const seen = new Map();
    const duplicates = [];

    arr.forEach(item => {
      if (seen.has(item.id)) {
        duplicates.push(item);
      } else {
        seen.set(item.id, item);
      }
    });

    return duplicates;
  }

  /**
   * Get line number for a match
   */
  getLineNumber(content, match) {
    const lines = content.substring(0, content.indexOf(match)).split('\n');
    return lines.length;
  }

  /**
   * Report validation results
   */
  reportResults() {
    console.log('\n📊 ID Validation Results:');
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
  const validator = new IDValidator();
  validator.validate();
}

module.exports = IDValidator;
