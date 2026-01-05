/**
 * Centralized Logging Utility
 * 
 * Provides structured logging with Winston for consistent log formatting
 * across the application.
 * 
 * Features:
 * - Environment-based log levels (error, warn, info, debug)
 * - JSON logging for production
 * - Human-readable logging for development
 * - Automatic error stack traces
 * - Contextual metadata support
 * 
 * Environment Variables:
 * - LOG_LEVEL: Set log level (error, warn, info, debug) - default: 'info'
 * - NODE_ENV: 'production' enables JSON logging
 * - LOG_FILE: Optional file path for log output
 */

const winston = require('winston');
const path = require('path');

// Determine log level from environment
const logLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');
const isProduction = process.env.NODE_ENV === 'production';

// Custom format for development (human-readable)
const developmentFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        let log = `${timestamp} [${level}]: ${message}`;
        
        // Add metadata if present
        if (Object.keys(meta).length > 0) {
            // Filter out internal winston properties
            const cleanMeta = Object.keys(meta)
                .filter(key => !['splat', 'Symbol(level)', 'Symbol(message)'].includes(key))
                .reduce((obj, key) => {
                    obj[key] = meta[key];
                    return obj;
                }, {});
            
            if (Object.keys(cleanMeta).length > 0) {
                log += ` ${JSON.stringify(cleanMeta, null, 2)}`;
            }
        }
        
        return log;
    })
);

// Custom format for production (JSON)
const productionFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }), // Include stack traces for errors
    winston.format.json()
);

// Create transports array
const transports = [];

// Console transport (always enabled)
transports.push(
    new winston.transports.Console({
        format: isProduction ? productionFormat : developmentFormat,
        level: logLevel,
        stderrLevels: ['error'] // Send errors to stderr
    })
);

// File transport (optional, if LOG_FILE is set)
if (process.env.LOG_FILE) {
    const logDir = path.dirname(process.env.LOG_FILE);
    const logFileName = path.basename(process.env.LOG_FILE);
    
    // Error log file
    transports.push(
        new winston.transports.File({
            filename: path.join(logDir, `error-${logFileName}`),
            level: 'error',
            format: productionFormat,
            maxsize: 5242880, // 5MB
            maxFiles: 5
        })
    );
    
    // Combined log file
    transports.push(
        new winston.transports.File({
            filename: process.env.LOG_FILE,
            format: productionFormat,
            maxsize: 5242880, // 5MB
            maxFiles: 5
        })
    );
}

// Create logger instance
const logger = winston.createLogger({
    level: logLevel,
    format: isProduction ? productionFormat : developmentFormat,
    transports: transports,
    // Don't exit on handled exceptions
    exitOnError: false,
    // Handle uncaught exceptions
    exceptionHandlers: [
        new winston.transports.Console({
            format: isProduction ? productionFormat : developmentFormat
        })
    ],
    // Handle unhandled promise rejections
    rejectionHandlers: [
        new winston.transports.Console({
            format: isProduction ? productionFormat : developmentFormat
        })
    ]
});

/**
 * Log error with stack trace and context
 * @param {string|Error} message - Error message or Error object
 * @param {Object} meta - Additional metadata
 */
logger.errorWithContext = function(message, meta = {}) {
    if (message instanceof Error) {
        this.error(message.message, {
            ...meta,
            stack: message.stack,
            name: message.name,
            code: message.code
        });
    } else {
        this.error(message, meta);
    }
};

/**
 * Log info with context
 * @param {string} message - Log message
 * @param {Object} meta - Additional metadata
 */
logger.infoWithContext = function(message, meta = {}) {
    this.info(message, meta);
};

/**
 * Log warning with context
 * @param {string} message - Log message
 * @param {Object} meta - Additional metadata
 */
logger.warnWithContext = function(message, meta = {}) {
    this.warn(message, meta);
};

/**
 * Log debug with context
 * @param {string} message - Log message
 * @param {Object} meta - Additional metadata
 */
logger.debugWithContext = function(message, meta = {}) {
    this.debug(message, meta);
};

// Log startup information
if (!isProduction) {
    logger.debug('Logger initialized', {
        level: logLevel,
        environment: process.env.NODE_ENV || 'development',
        logFile: process.env.LOG_FILE || 'console only'
    });
}

module.exports = logger;

