/**
 * Centralized Request Validation Middleware
 * 
 * Provides a simple interface for applying validation to routes.
 * Uses the InputValidationMiddleware and validation schemas.
 */

const InputValidationMiddleware = require('./input-validation');
const { validationSchemas } = require('../validators/schemas');

const validator = new InputValidationMiddleware();

/**
 * Get validation middleware for a specific endpoint
 * @param {string} route - Route name (e.g., 'auth.register')
 * @returns {Function} Express middleware
 */
function validate(route) {
    const [module, endpoint] = route.split('.');
    
    if (!validationSchemas[module] || !validationSchemas[module][endpoint]) {
        const logger = require('../utils/logger');
        logger.warn('Validation schema not found', { route, module, endpoint });
        // Return no-op middleware if schema not found
        return (req, res, next) => next();
    }
    
    const schema = validationSchemas[module][endpoint];
    return validator.validate(schema);
}

/**
 * Validate request body only
 * @param {string} route - Route name
 * @returns {Function} Express middleware
 */
function validateBody(route) {
    const [module, endpoint] = route.split('.');
    
    if (!validationSchemas[module] || !validationSchemas[module][endpoint] || !validationSchemas[module][endpoint].body) {
        return (req, res, next) => next();
    }
    
    return validator.validateBody(validationSchemas[module][endpoint].body);
}

/**
 * Validate query parameters only
 * @param {string} route - Route name
 * @returns {Function} Express middleware
 */
function validateQuery(route) {
    const [module, endpoint] = route.split('.');
    
    if (!validationSchemas[module] || !validationSchemas[module][endpoint] || !validationSchemas[module][endpoint].query) {
        return (req, res, next) => next();
    }
    
    return validator.validateQuery(validationSchemas[module][endpoint].query);
}

/**
 * Validate URL parameters only
 * @param {string} route - Route name
 * @returns {Function} Express middleware
 */
function validateParams(route) {
    const [module, endpoint] = route.split('.');
    
    if (!validationSchemas[module] || !validationSchemas[module][endpoint] || !validationSchemas[module][endpoint].params) {
        return (req, res, next) => next();
    }
    
    return validator.validateParams(validationSchemas[module][endpoint].params);
}

/**
 * Custom validation middleware
 * @param {Object} schemas - Object with body, query, params schemas
 * @returns {Function} Express middleware
 */
function validateCustom(schemas) {
    return validator.validate(schemas);
}

module.exports = {
    validate,
    validateBody,
    validateQuery,
    validateParams,
    validateCustom,
    validator,
    validationSchemas,
};

