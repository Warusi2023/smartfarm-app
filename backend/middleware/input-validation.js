/**
 * Input Validation and Sanitization Middleware
 * Prevents SQL injection, XSS, command injection, and other input-based attacks
 */

const validator = require('validator');
const { z } = require('zod');

class InputValidationMiddleware {
    constructor() {
        // Define validation schemas for common inputs
        this.schemas = {
            email: z.string().email().max(255),
            password: z.string().min(8).max(128).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
            uuid: z.string().uuid(),
            phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/),
            url: z.string().url().max(2048),
            integer: z.number().int(),
            positiveInteger: z.number().int().positive(),
            decimal: z.number(),
            date: z.string().datetime(),
            string: z.string(),
            text: z.string().max(10000),
        };
    }

    /**
     * Validate request body against schema
     */
    validateBody(schema) {
        return (req, res, next) => {
            try {
                req.body = schema.parse(req.body || {});
                next();
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const { ValidationError } = require('../utils/errors');
                    const details = error.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message,
                        code: e.code
                    }));
                    return next(new ValidationError('Validation failed', details));
                }
                next(error);
            }
        };
    }

    /**
     * Validate query parameters against schema
     */
    validateQuery(schema) {
        return (req, res, next) => {
            try {
                req.query = schema.parse(req.query || {});
                next();
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const { ValidationError } = require('../utils/errors');
                    const details = error.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message,
                        code: e.code
                    }));
                    return next(new ValidationError('Invalid query parameters', details));
                }
                next(error);
            }
        };
    }

    /**
     * Validate URL parameters against schema
     */
    validateParams(schema) {
        return (req, res, next) => {
            try {
                req.params = schema.parse(req.params || {});
                next();
            } catch (error) {
                if (error instanceof z.ZodError) {
                    const { ValidationError } = require('../utils/errors');
                    const details = error.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message,
                        code: e.code
                    }));
                    return next(new ValidationError('Invalid URL parameters', details));
                }
                next(error);
            }
        };
    }

    /**
     * Combined validation middleware - validates body, query, and params together
     * @param {Object} schemas - Object with optional body, query, and params schemas
     * @returns {Function} Express middleware
     */
    validate(schemas = {}) {
        const middlewares = [];
        
        if (schemas.body) {
            middlewares.push(this.validateBody(schemas.body));
        }
        
        if (schemas.query) {
            middlewares.push(this.validateQuery(schemas.query));
        }
        
        if (schemas.params) {
            middlewares.push(this.validateParams(schemas.params));
        }
        
        // If no schemas provided, return no-op middleware
        if (middlewares.length === 0) {
            return (req, res, next) => next();
        }
        
        // Chain all validation middlewares
        return (req, res, next) => {
            let index = 0;
            const runNext = (err) => {
                if (err) return next(err);
                if (index >= middlewares.length) return next();
                middlewares[index++](req, res, runNext);
            };
            runNext();
        };
    }

    /**
     * Sanitize string input
     */
    sanitizeString(input) {
        if (typeof input !== 'string') return input;
        
        // Remove null bytes
        let sanitized = input.replace(/\0/g, '');
        
        // Remove control characters except newlines and tabs
        sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        
        // Trim whitespace
        sanitized = sanitized.trim();
        
        return sanitized;
    }

    /**
     * Sanitize HTML input (prevent XSS)
     */
    sanitizeHTML(input) {
        if (typeof input !== 'string') return input;
        
        // Use validator.js to escape HTML
        return validator.escape(input);
    }

    /**
     * Sanitize SQL input (use parameterized queries instead, but this is a safety net)
     */
    sanitizeSQL(input) {
        if (typeof input !== 'string') return input;
        
        // Remove SQL injection patterns
        const dangerous = [
            /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/gi,
            /(--|#|\/\*|\*\/|;)/g,
            /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi,
            /'|"|`/g
        ];
        
        let sanitized = input;
        dangerous.forEach(pattern => {
            sanitized = sanitized.replace(pattern, '');
        });
        
        return sanitized;
    }

    /**
     * Sanitize object recursively
     */
    sanitizeObject(obj, options = {}) {
        if (!obj || typeof obj !== 'object') return obj;
        
        const sanitized = Array.isArray(obj) ? [] : {};
        const { 
            sanitizeHTML: escapeHTML = false,
            sanitizeSQL: escapeSQL = false,
            maxDepth = 10 
        } = options;

        const sanitize = (value, depth = 0) => {
            if (depth > maxDepth) return '[MAX_DEPTH_EXCEEDED]';
            
            if (typeof value === 'string') {
                let result = this.sanitizeString(value);
                if (escapeHTML) result = this.sanitizeHTML(result);
                if (escapeSQL) result = this.sanitizeSQL(result);
                return result;
            }
            
            if (Array.isArray(value)) {
                return value.map(item => sanitize(item, depth + 1));
            }
            
            if (value && typeof value === 'object') {
                const result = {};
                for (const [key, val] of Object.entries(value)) {
                    result[this.sanitizeString(key)] = sanitize(val, depth + 1);
                }
                return result;
            }
            
            return value;
        };

        return sanitize(obj);
    }

    /**
     * Middleware to sanitize all inputs
     */
    sanitizeInput(options = {}) {
        return (req, res, next) => {
            // Sanitize body
            if (req.body) {
                req.body = this.sanitizeObject(req.body, options);
            }
            
            // Sanitize query
            if (req.query) {
                req.query = this.sanitizeObject(req.query, options);
            }
            
            // Sanitize params
            if (req.params) {
                req.params = this.sanitizeObject(req.params, options);
            }
            
            next();
        };
    }

    /**
     * File upload validation
     */
    validateFileUpload(options = {}) {
        const {
            allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
            maxFileSize = 10 * 1024 * 1024, // 10MB default
            requireMalwareScan = false
        } = options;

        return (req, res, next) => {
            if (!req.file && !req.files) {
                return next();
            }

            const files = req.files || [req.file].filter(Boolean);

            for (const file of files) {
                // Check file size
                if (file.size > maxFileSize) {
                    return res.status(400).json({
                        success: false,
                        error: `File ${file.originalname} exceeds maximum size of ${maxFileSize / 1024 / 1024}MB`,
                        code: 'FILE_TOO_LARGE'
                    });
                }

                // Check MIME type
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return res.status(400).json({
                        success: false,
                        error: `File type ${file.mimetype} not allowed`,
                        code: 'INVALID_FILE_TYPE',
                        allowedTypes: allowedMimeTypes
                    });
                }

                // Check file extension
                const ext = file.originalname.split('.').pop().toLowerCase();
                const allowedExtensions = allowedMimeTypes.map(mime => {
                    const map = {
                        'image/jpeg': 'jpg',
                        'image/png': 'png',
                        'image/gif': 'gif',
                        'application/pdf': 'pdf'
                    };
                    return map[mime];
                }).filter(Boolean);

                if (!allowedExtensions.includes(ext)) {
                    return res.status(400).json({
                        success: false,
                        error: `File extension .${ext} not allowed`,
                        code: 'INVALID_FILE_EXTENSION'
                    });
                }

                // TODO: Implement malware scanning (ClamAV integration)
                if (requireMalwareScan) {
                    // Placeholder for ClamAV integration
                    const logger = require('../utils/logger');
                    logger.warn('Malware scanning required but not implemented', { filename: file.originalname });
                }
            }

            next();
        };
    }

    /**
     * Common validation schemas
     */
    getSchemas() {
        return {
            // User registration
            register: z.object({
                email: this.schemas.email,
                password: this.schemas.password,
                firstName: z.string().min(1).max(100),
                lastName: z.string().min(1).max(100),
                phone: this.schemas.phone.optional(),
                country: z.string().max(100).optional()
            }),

            // User login
            login: z.object({
                email: this.schemas.email,
                password: z.string().min(1)
            }),

            // Pagination
            pagination: z.object({
                page: this.schemas.positiveInteger.optional().default(1),
                limit: z.number().int().min(1).max(100).optional().default(20)
            }),

            // UUID parameter
            uuidParam: z.object({
                id: this.schemas.uuid
            }),

            // Farm creation
            farm: z.object({
                name: z.string().min(1).max(255),
                location: z.string().min(1).max(255),
                area_hectares: this.schemas.decimal.positive(),
                farm_type: z.string().min(1).max(100),
                description: this.schemas.text.optional(),
                latitude: this.schemas.decimal.optional(),
                longitude: this.schemas.decimal.optional()
            })
        };
    }
}

module.exports = InputValidationMiddleware;

