#!/usr/bin/env node

/**
 * SmartFarm Security Audit Script
 * Comprehensive security check for production readiness
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class SecurityAuditor {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.recommendations = [];
        this.score = 100;
    }

    // Main audit function
    async runAudit() {
        console.log('🔒 Starting SmartFarm Security Audit...\n');

        await this.checkEnvironmentVariables();
        await this.checkDependencies();
        await this.checkAuthentication();
        await this.checkInputValidation();
        await this.checkCORSConfiguration();
        await this.checkDatabaseSecurity();
        await this.checkLoggingSecurity();
        await this.checkFilePermissions();
        await this.checkSecretsManagement();

        this.generateReport();
    }

    // Check environment variables
    async checkEnvironmentVariables() {
        console.log('📋 Checking environment variables...');
        
        const requiredVars = [
            'JWT_SECRET',
            'DATABASE_URL',
            'NODE_ENV',
            'CORS_ORIGIN'
        ];

        const envFile = path.join(__dirname, '../.env');
        const envExample = path.join(__dirname, '../env.example');

        // Check if .env file exists
        if (!fs.existsSync(envFile)) {
            this.addIssue('Missing .env file', 'Create .env file with required environment variables');
        }

        // Check if env.example exists
        if (!fs.existsSync(envExample)) {
            this.addWarning('Missing env.example file', 'Create env.example for documentation');
        }

        // Check for hardcoded secrets in code
        await this.checkForHardcodedSecrets();

        console.log('✅ Environment variables check complete\n');
    }

    // Check for hardcoded secrets
    async checkForHardcodedSecrets() {
        const codeFiles = this.getCodeFiles();
        const secretPatterns = [
            /password\s*=\s*['"][^'"]{6,}['"]/gi,
            /secret\s*=\s*['"][^'"]{10,}['"]/gi,
            /key\s*=\s*['"][^'"]{20,}['"]/gi,
            /token\s*=\s*['"][^'"]{20,}['"]/gi
        ];

        for (const file of codeFiles) {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                for (const pattern of secretPatterns) {
                    const matches = content.match(pattern);
                    if (matches) {
                        this.addIssue(`Hardcoded secret in ${file}`, 'Move secrets to environment variables');
                    }
                }
            } catch (error) {
                // Skip files that can't be read
            }
        }
    }

    // Check dependencies for vulnerabilities
    async checkDependencies() {
        console.log('📦 Checking dependencies...');
        
        const packageJson = path.join(__dirname, '../package.json');
        if (!fs.existsSync(packageJson)) {
            this.addIssue('Missing package.json', 'Create package.json file');
            return;
        }

        const packageLock = path.join(__dirname, '../package-lock.json');
        if (!fs.existsSync(packageLock)) {
            this.addWarning('Missing package-lock.json', 'Run npm install to generate lock file');
        }

        // Check for known vulnerable packages
        const vulnerablePackages = [
            'express@4.17.0', // Known vulnerability
            'lodash@4.17.15'  // Known vulnerability
        ];

        try {
            const packageData = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
            const allDeps = { ...packageData.dependencies, ...packageData.devDependencies };
            
            for (const [name, version] of Object.entries(allDeps)) {
                if (vulnerablePackages.includes(`${name}@${version}`)) {
                    this.addIssue(`Vulnerable package: ${name}@${version}`, 'Update to latest secure version');
                }
            }
        } catch (error) {
            this.addWarning('Could not parse package.json', 'Check package.json syntax');
        }

        console.log('✅ Dependencies check complete\n');
    }

    // Check authentication implementation
    async checkAuthentication() {
        console.log('🔐 Checking authentication...');
        
        const authFile = path.join(__dirname, '../routes/auth.js');
        if (!fs.existsSync(authFile)) {
            this.addIssue('Missing authentication routes', 'Implement authentication system');
            return;
        }

        try {
            const authContent = fs.readFileSync(authFile, 'utf8');
            
            // Check for JWT implementation
            if (!authContent.includes('jsonwebtoken')) {
                this.addIssue('JWT not implemented', 'Implement JWT authentication');
            }

            // Check for password hashing
            if (!authContent.includes('bcrypt')) {
                this.addIssue('Password hashing not implemented', 'Use bcrypt for password hashing');
            }

            // Check for token expiration
            if (!authContent.includes('expiresIn')) {
                this.addWarning('No token expiration set', 'Set appropriate token expiration');
            }

            // Check for rate limiting
            if (!authContent.includes('rate-limit')) {
                this.addWarning('No rate limiting on auth endpoints', 'Implement rate limiting');
            }

        } catch (error) {
            this.addIssue('Could not read auth.js', 'Check authentication implementation');
        }

        console.log('✅ Authentication check complete\n');
    }

    // Check input validation
    async checkInputValidation() {
        console.log('🛡️ Checking input validation...');
        
        const validationFile = path.join(__dirname, '../middleware/validation.js');
        if (!fs.existsSync(validationFile)) {
            this.addIssue('Missing input validation middleware', 'Implement comprehensive input validation');
            return;
        }

        try {
            const validationContent = fs.readFileSync(validationFile, 'utf8');
            
            // Check for express-validator
            if (!validationContent.includes('express-validator')) {
                this.addIssue('express-validator not used', 'Use express-validator for input validation');
            }

            // Check for SQL injection prevention
            if (!validationContent.includes('SQL') || !validationContent.includes('injection')) {
                this.addWarning('SQL injection prevention not explicit', 'Add explicit SQL injection checks');
            }

            // Check for XSS prevention
            if (!validationContent.includes('escape') || !validationContent.includes('sanitize')) {
                this.addWarning('XSS prevention not implemented', 'Add input sanitization');
            }

        } catch (error) {
            this.addIssue('Could not read validation.js', 'Check validation implementation');
        }

        console.log('✅ Input validation check complete\n');
    }

    // Check CORS configuration
    async checkCORSConfiguration() {
        console.log('🌐 Checking CORS configuration...');
        
        const corsFile = path.join(__dirname, '../middleware/cors.js');
        if (!fs.existsSync(corsFile)) {
            this.addIssue('Missing CORS middleware', 'Implement CORS configuration');
            return;
        }

        try {
            const corsContent = fs.readFileSync(corsFile, 'utf8');
            
            // Check for wildcard origin
            if (corsContent.includes('*') && corsContent.includes('origin')) {
                this.addIssue('Wildcard CORS origin', 'Use specific origins instead of wildcard');
            }

            // Check for credentials
            if (corsContent.includes('credentials') && corsContent.includes('true')) {
                this.addWarning('CORS credentials enabled', 'Ensure this is necessary and secure');
            }

        } catch (error) {
            this.addIssue('Could not read cors.js', 'Check CORS implementation');
        }

        console.log('✅ CORS configuration check complete\n');
    }

    // Check database security
    async checkDatabaseSecurity() {
        console.log('🗄️ Checking database security...');
        
        const dbFile = path.join(__dirname, '../database/config.js');
        if (!fs.existsSync(dbFile)) {
            this.addIssue('Missing database configuration', 'Implement secure database configuration');
            return;
        }

        try {
            const dbContent = fs.readFileSync(dbFile, 'utf8');
            
            // Check for SQL injection protection
            if (!dbContent.includes('parameterized') && !dbContent.includes('prepared')) {
                this.addWarning('No explicit SQL injection protection', 'Use parameterized queries');
            }

            // Check for connection pooling
            if (!dbContent.includes('pool')) {
                this.addWarning('No connection pooling', 'Implement database connection pooling');
            }

            // Check for SSL configuration
            if (dbContent.includes('production') && !dbContent.includes('ssl')) {
                this.addWarning('No SSL configuration for production', 'Enable SSL for database connections');
            }

        } catch (error) {
            this.addIssue('Could not read database config', 'Check database security');
        }

        console.log('✅ Database security check complete\n');
    }

    // Check logging security
    async checkLoggingSecurity() {
        console.log('📝 Checking logging security...');
        
        const loggerFile = path.join(__dirname, '../lib/logger.js');
        if (!fs.existsSync(loggerFile)) {
            this.addIssue('Missing logging system', 'Implement secure logging');
            return;
        }

        try {
            const loggerContent = fs.readFileSync(loggerFile, 'utf8');
            
            // Check for sensitive data logging
            if (loggerContent.includes('password') || loggerContent.includes('token')) {
                this.addWarning('Potential sensitive data logging', 'Ensure passwords/tokens are not logged');
            }

            // Check for log levels
            if (!loggerContent.includes('level') || !loggerContent.includes('error')) {
                this.addWarning('No log level configuration', 'Implement proper log levels');
            }

        } catch (error) {
            this.addIssue('Could not read logger.js', 'Check logging implementation');
        }

        console.log('✅ Logging security check complete\n');
    }

    // Check file permissions
    async checkFilePermissions() {
        console.log('📁 Checking file permissions...');
        
        const sensitiveFiles = [
            '../.env',
            '../package-lock.json',
            '../database/smartfarm.db'
        ];

        for (const file of sensitiveFiles) {
            const filePath = path.join(__dirname, file);
            if (fs.existsSync(filePath)) {
                try {
                    const stats = fs.statSync(filePath);
                    const mode = stats.mode & parseInt('777', 8);
                    
                    // Check if file is world-readable
                    if (mode & 4) {
                        this.addWarning(`File ${file} is world-readable`, 'Restrict file permissions');
                    }
                } catch (error) {
                    // Skip files that can't be accessed
                }
            }
        }

        console.log('✅ File permissions check complete\n');
    }

    // Check secrets management
    async checkSecretsManagement() {
        console.log('🔑 Checking secrets management...');
        
        // Check for .gitignore
        const gitignoreFile = path.join(__dirname, '../.gitignore');
        if (!fs.existsSync(gitignoreFile)) {
            this.addIssue('Missing .gitignore file', 'Create .gitignore to exclude sensitive files');
        } else {
            try {
                const gitignoreContent = fs.readFileSync(gitignoreFile, 'utf8');
                const requiredIgnores = ['.env', 'node_modules', '*.log', '*.db'];
                
                for (const ignore of requiredIgnores) {
                    if (!gitignoreContent.includes(ignore)) {
                        this.addWarning(`Missing ${ignore} in .gitignore`, `Add ${ignore} to .gitignore`);
                    }
                }
            } catch (error) {
                this.addWarning('Could not read .gitignore', 'Check .gitignore file');
            }
        }

        console.log('✅ Secrets management check complete\n');
    }

    // Helper methods
    getCodeFiles() {
        const codeExtensions = ['.js', '.ts', '.jsx', '.tsx'];
        const files = [];
        
        const scanDirectory = (dir) => {
            try {
                const items = fs.readdirSync(dir);
                for (const item of items) {
                    const fullPath = path.join(dir, item);
                    const stat = fs.statSync(fullPath);
                    
                    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                        scanDirectory(fullPath);
                    } else if (stat.isFile() && codeExtensions.some(ext => item.endsWith(ext))) {
                        files.push(fullPath);
                    }
                }
            } catch (error) {
                // Skip directories that can't be accessed
            }
        };

        scanDirectory(path.join(__dirname, '..'));
        return files;
    }

    addIssue(title, description) {
        this.issues.push({ title, description });
        this.score -= 10;
    }

    addWarning(title, description) {
        this.warnings.push({ title, description });
        this.score -= 5;
    }

    addRecommendation(title, description) {
        this.recommendations.push({ title, description });
    }

    generateReport() {
        console.log('📊 Security Audit Report');
        console.log('========================\n');

        console.log(`Overall Security Score: ${Math.max(0, this.score)}/100\n`);

        if (this.issues.length > 0) {
            console.log('🚨 CRITICAL ISSUES:');
            this.issues.forEach((issue, index) => {
                console.log(`${index + 1}. ${issue.title}`);
                console.log(`   ${issue.description}\n`);
            });
        }

        if (this.warnings.length > 0) {
            console.log('⚠️  WARNINGS:');
            this.warnings.forEach((warning, index) => {
                console.log(`${index + 1}. ${warning.title}`);
                console.log(`   ${warning.description}\n`);
            });
        }

        if (this.recommendations.length > 0) {
            console.log('💡 RECOMMENDATIONS:');
            this.recommendations.forEach((rec, index) => {
                console.log(`${index + 1}. ${rec.title}`);
                console.log(`   ${rec.description}\n`);
            });
        }

        if (this.issues.length === 0 && this.warnings.length === 0) {
            console.log('🎉 No security issues found! Your application is secure.');
        }

        // Generate JSON report
        const report = {
            timestamp: new Date().toISOString(),
            score: Math.max(0, this.score),
            issues: this.issues,
            warnings: this.warnings,
            recommendations: this.recommendations
        };

        const reportPath = path.join(__dirname, '../security-audit-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`📄 Detailed report saved to: ${reportPath}`);

        // Exit with appropriate code
        process.exit(this.issues.length > 0 ? 1 : 0);
    }
}

// Run the audit
if (require.main === module) {
    const auditor = new SecurityAuditor();
    auditor.runAudit().catch(console.error);
}

module.exports = SecurityAuditor;
