/**
 * Custom Error Classes for Centralized Error Handling
 * 
 * Provides standardized error classes with HTTP status codes,
 * error codes, and user-safe messages.
 */

/**
 * Base application error class
 */
class AppError extends Error {
    constructor(message, statusCode = 500, errorCode = 'INTERNAL_ERROR', isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = isOperational; // Operational errors are expected and handled
        
        // Capture stack trace
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Convert error to JSON format for API responses
     */
    toJSON() {
        return {
            success: false,
            error: this.message,
            code: this.errorCode,
            ...(this.details && { details: this.details })
        };
    }
}

/**
 * Validation error (400)
 */
class ValidationError extends AppError {
    constructor(message = 'Validation failed', details = null) {
        super(message, 400, 'VALIDATION_ERROR', true);
        this.details = details;
    }

    toJSON() {
        return {
            success: false,
            error: this.message,
            code: this.errorCode,
            ...(this.details && { details: this.details })
        };
    }
}

/**
 * Authentication error (401)
 */
class AuthenticationError extends AppError {
    constructor(message = 'Authentication required') {
        super(message, 401, 'AUTHENTICATION_ERROR', true);
    }
}

/**
 * Authorization error (403)
 */
class AuthorizationError extends AppError {
    constructor(message = 'Insufficient permissions') {
        super(message, 403, 'AUTHORIZATION_ERROR', true);
    }
}

/**
 * Not found error (404)
 */
class NotFoundError extends AppError {
    constructor(resource = 'Resource', identifier = null) {
        const message = identifier 
            ? `${resource} with identifier '${identifier}' not found`
            : `${resource} not found`;
        super(message, 404, 'NOT_FOUND', true);
        this.resource = resource;
        this.identifier = identifier;
    }
}

/**
 * Conflict error (409)
 */
class ConflictError extends AppError {
    constructor(message = 'Resource conflict', details = null) {
        super(message, 409, 'CONFLICT_ERROR', true);
        this.details = details;
    }

    toJSON() {
        return {
            success: false,
            error: this.message,
            code: this.errorCode,
            ...(this.details && { details: this.details })
        };
    }
}

/**
 * Rate limit error (429)
 */
class RateLimitError extends AppError {
    constructor(message = 'Too many requests', retryAfter = null) {
        super(message, 429, 'RATE_LIMIT_ERROR', true);
        this.retryAfter = retryAfter;
    }

    toJSON() {
        return {
            success: false,
            error: this.message,
            code: this.errorCode,
            ...(this.retryAfter && { retryAfter: this.retryAfter })
        };
    }
}

/**
 * Database error (500)
 */
class DatabaseError extends AppError {
    constructor(message = 'Database operation failed', originalError = null) {
        super(message, 500, 'DATABASE_ERROR', false);
        this.originalError = originalError;
    }
}

/**
 * External service error (502)
 */
class ExternalServiceError extends AppError {
    constructor(serviceName, message = 'External service unavailable', originalError = null) {
        super(message, 502, 'EXTERNAL_SERVICE_ERROR', false);
        this.serviceName = serviceName;
        this.originalError = originalError;
    }

    toJSON() {
        return {
            success: false,
            error: this.message,
            code: this.errorCode,
            ...(process.env.NODE_ENV === 'development' && this.serviceName && { service: this.serviceName })
        };
    }
}

/**
 * Service unavailable error (503)
 */
class ServiceUnavailableError extends AppError {
    constructor(message = 'Service temporarily unavailable', retryAfter = null) {
        super(message, 503, 'SERVICE_UNAVAILABLE', true);
        this.retryAfter = retryAfter;
    }

    toJSON() {
        return {
            success: false,
            error: this.message,
            code: this.errorCode,
            ...(this.retryAfter && { retryAfter: this.retryAfter })
        };
    }
}

/**
 * Bad request error (400)
 */
class BadRequestError extends AppError {
    constructor(message = 'Bad request', details = null) {
        super(message, 400, 'BAD_REQUEST', true);
        this.details = details;
    }

    toJSON() {
        return {
            success: false,
            error: this.message,
            code: this.errorCode,
            ...(this.details && { details: this.details })
        };
    }
}

/**
 * Unprocessable entity error (422)
 */
class UnprocessableEntityError extends AppError {
    constructor(message = 'Unprocessable entity', details = null) {
        super(message, 422, 'UNPROCESSABLE_ENTITY', true);
        this.details = details;
    }

    toJSON() {
        return {
            success: false,
            error: this.message,
            code: this.errorCode,
            ...(this.details && { details: this.details })
        };
    }
}

module.exports = {
    AppError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    ConflictError,
    RateLimitError,
    DatabaseError,
    ExternalServiceError,
    ServiceUnavailableError,
    BadRequestError,
    UnprocessableEntityError
};

