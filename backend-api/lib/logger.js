// SmartFarm Logger
// Structured logging with levels and request tracking

const environment = require('../config/environment');

const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const COLORS = {
    error: '\x1b[31m',  // Red
    warn: '\x1b[33m',   // Yellow
    info: '\x1b[36m',   // Cyan
    http: '\x1b[35m',   // Magenta
    debug: '\x1b[37m',  // White
    reset: '\x1b[0m'
};

class Logger {
    constructor() {
        this.level = environment.LOG_LEVEL || 'info';
        this.levelValue = LOG_LEVELS[this.level] || LOG_LEVELS.info;
    }

    formatMessage(level, message, meta = {}) {
        const timestamp = new Date().toISOString();
        const color = COLORS[level] || COLORS.reset;
        const reset = COLORS.reset;
        
        let formattedMessage = `${color}[${timestamp}] [${level.toUpperCase()}]${reset} ${message}`;
        
        // Add metadata if present
        if (Object.keys(meta).length > 0) {
            formattedMessage += ` ${JSON.stringify(meta)}`;
        }
        
        return formattedMessage;
    }

    shouldLog(level) {
        return LOG_LEVELS[level] <= this.levelValue;
    }

    error(message, meta = {}) {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message, meta));
        }
    }

    warn(message, meta = {}) {
        if (this.shouldLog('warn')) {
            console.warn(this.formatMessage('warn', message, meta));
        }
    }

    info(message, meta = {}) {
        if (this.shouldLog('info')) {
            console.log(this.formatMessage('info', message, meta));
        }
    }

    http(message, meta = {}) {
        if (this.shouldLog('http')) {
            console.log(this.formatMessage('http', message, meta));
        }
    }

    debug(message, meta = {}) {
        if (this.shouldLog('debug')) {
            console.log(this.formatMessage('debug', message, meta));
        }
    }

    // Request logging middleware
    logRequest(req, res, next) {
        const startTime = Date.now();
        const requestId = req.headers['x-request-id'] || this.generateRequestId();
        
        // Attach request ID to request object
        req.requestId = requestId;
        
        // Log incoming request
        this.http(`→ ${req.method} ${req.path}`, {
            requestId,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        });
        
        // Log response
        res.on('finish', () => {
            const duration = Date.now() - startTime;
            const level = res.statusCode >= 500 ? 'error' : 
                         res.statusCode >= 400 ? 'warn' : 'http';
            
            this[level](`← ${req.method} ${req.path} ${res.statusCode}`, {
                requestId,
                duration: `${duration}ms`,
                statusCode: res.statusCode
            });
        });
        
        next();
    }

    generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Handler logging helpers
    logHandlerEntry(handlerName, params = {}) {
        this.debug(`▶ Handler: ${handlerName}`, params);
    }

    logHandlerExit(handlerName, result = {}) {
        this.debug(`◀ Handler: ${handlerName} completed`, result);
    }

    logHandlerError(handlerName, error) {
        this.error(`✗ Handler: ${handlerName} failed`, {
            error: error.message,
            stack: environment.IS_DEVELOPMENT ? error.stack : undefined
        });
    }
}

// Create singleton instance
const logger = new Logger();

module.exports = logger;

