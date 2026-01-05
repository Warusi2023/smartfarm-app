/**
 * Global Error Handling Middleware
 * 
 * Centralized error handling for all Express routes.
 * Normalizes error responses, prevents stack trace leaks,
 * and logs all errors using the centralized logger.
 */

const logger = require('../utils/logger');
const {
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
} = require('../utils/errors');

/**
 * Check if error is an operational error (expected and handled)
 */
function isOperationalError(error) {
    if (error instanceof AppError) {
        return error.isOperational;
    }
    return false;
}

/**
 * Get user-safe error message
 */
function getUserSafeMessage(error) {
    // If it's an operational error, use its message
    if (error instanceof AppError && error.isOperational) {
        return error.message;
    }

    // For non-operational errors, return generic message in production
    if (process.env.NODE_ENV === 'production') {
        return 'An unexpected error occurred. Please try again later.';
    }

    // In development, return the actual error message
    return error.message || 'An unexpected error occurred';
}

/**
 * Get HTTP status code from error
 */
function getStatusCode(error) {
    if (error instanceof AppError) {
        return error.statusCode;
    }

    // Handle common error codes
    if (error.statusCode) {
        return error.statusCode;
    }

    if (error.status) {
        return error.status;
    }

    // Default to 500 for unknown errors
    return 500;
}

/**
 * Get error code from error
 */
function getErrorCode(error) {
    if (error instanceof AppError) {
        return error.errorCode;
    }

    // Map common error types to error codes
    if (error.name === 'ValidationError' || error.name === 'ZodError') {
        return 'VALIDATION_ERROR';
    }

    if (error.name === 'JsonWebTokenError') {
        return 'AUTHENTICATION_ERROR';
    }

    if (error.name === 'TokenExpiredError') {
        return 'AUTHENTICATION_ERROR';
    }

    if (error.code === '23505') { // PostgreSQL unique violation
        return 'CONFLICT_ERROR';
    }

    if (error.code === '23503') { // PostgreSQL foreign key violation
        return 'BAD_REQUEST';
    }

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        return 'EXTERNAL_SERVICE_ERROR';
    }

    return 'INTERNAL_ERROR';
}

/**
 * Log error with context
 */
function logError(error, req) {
    const context = {
        method: req.method,
        path: req.path,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent'),
        userId: req.user?.id || null,
        statusCode: getStatusCode(error),
        errorCode: getErrorCode(error),
        isOperational: isOperationalError(error)
    };

    // Add error details
    if (error instanceof AppError) {
        context.errorName = error.name;
        if (error.details) {
            context.details = error.details;
        }
        if (error.originalError) {
            context.originalError = error.originalError.message;
        }
    } else {
        context.errorName = error.name || 'Error';
        context.errorMessage = error.message;
    }

    // Log with appropriate level
    if (isOperationalError(error)) {
        // Operational errors are expected, log as warn
        logger.warn('Operational error', context);
    } else {
        // Non-operational errors are unexpected, log as error with stack trace
        logger.errorWithContext('Unhandled error', {
            ...context,
            error: error,
            stack: error.stack
        });
    }
}

/**
 * Global error handler middleware
 * Must be used AFTER all routes
 */
function errorHandler(err, req, res, next) {
    // Log the error
    logError(err, req);

    // Get status code and error code
    const statusCode = getStatusCode(err);
    const errorCode = getErrorCode(err);
    const userMessage = getUserSafeMessage(err);

    // Build error response
    const errorResponse = {
        success: false,
        error: userMessage,
        code: errorCode
    };

    // Add details if available (for validation errors, etc.)
    if (err instanceof AppError && err.toJSON) {
        const jsonError = err.toJSON();
        if (jsonError.details) {
            errorResponse.details = jsonError.details;
        }
        if (jsonError.retryAfter) {
            errorResponse.retryAfter = jsonError.retryAfter;
        }
    } else if (err instanceof ValidationError && err.details) {
        errorResponse.details = err.details;
    }

    // Add stack trace ONLY in development
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
        if (err.originalError) {
            errorResponse.originalError = err.originalError.message;
        }
    }

    // Send error response
    res.status(statusCode).json(errorResponse);
}

/**
 * Async handler wrapper
 * Wraps async route handlers to catch errors and pass them to error handler
 * 
 * Usage:
 *   router.get('/route', asyncHandler(async (req, res) => {
 *       // async code here
 *   }));
 */
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

/**
 * 404 Not Found handler
 * Must be used AFTER all routes but BEFORE error handler
 */
function notFoundHandler(req, res, next) {
    const error = new NotFoundError('Route', req.path);
    next(error);
}

module.exports = {
    errorHandler,
    asyncHandler,
    notFoundHandler,
    isOperationalError,
    getUserSafeMessage,
    getStatusCode,
    getErrorCode,
    logError
};

