/**
 * Input Validation Middleware
 * Comprehensive validation and sanitization for all API endpoints
 */

const validator = require('validator');
const { body, param, query, validationResult } = require('express-validator');

// Generic validation result handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors.array().map(err => ({
                field: err.path,
                message: err.msg,
                value: err.value
            }))
        });
    }
    next();
};

// Sanitization middleware
const sanitizeInput = (req, res, next) => {
    // Sanitize string inputs
    const sanitizeObject = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                // Remove HTML tags and escape special characters
                obj[key] = validator.escape(validator.stripLow(obj[key]));
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitizeObject(obj[key]);
            }
        }
    };

    if (req.body) sanitizeObject(req.body);
    if (req.query) sanitizeObject(req.query);
    if (req.params) sanitizeObject(req.params);

    next();
};

// Authentication validation
const validateAuth = {
    register: [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Valid email is required'),
        body('password')
            .isLength({ min: 8 })
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('Password must be at least 8 characters with uppercase, lowercase, number, and special character'),
        body('firstName')
            .trim()
            .isLength({ min: 2, max: 50 })
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage('First name must be 2-50 characters, letters only'),
        body('lastName')
            .trim()
            .isLength({ min: 2, max: 50 })
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage('Last name must be 2-50 characters, letters only'),
        body('role')
            .optional()
            .isIn(['farmer', 'manager', 'admin'])
            .withMessage('Role must be farmer, manager, or admin'),
        handleValidationErrors
    ],

    login: [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Valid email is required'),
        body('password')
            .notEmpty()
            .withMessage('Password is required'),
        handleValidationErrors
    ],

    changePassword: [
        body('currentPassword')
            .notEmpty()
            .withMessage('Current password is required'),
        body('newPassword')
            .isLength({ min: 8 })
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('New password must be at least 8 characters with uppercase, lowercase, number, and special character'),
        handleValidationErrors
    ]
};

// Farm validation
const validateFarm = {
    create: [
        body('name')
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage('Farm name must be 2-100 characters'),
        body('location')
            .trim()
            .isLength({ min: 2, max: 200 })
            .withMessage('Location must be 2-200 characters'),
        body('size')
            .isFloat({ min: 0.01, max: 1000000 })
            .withMessage('Size must be a positive number between 0.01 and 1,000,000'),
        body('type')
            .optional()
            .isIn(['crop', 'livestock', 'mixed', 'organic', 'conventional'])
            .withMessage('Invalid farm type'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 1000 })
            .withMessage('Description must be less than 1000 characters'),
        handleValidationErrors
    ],

    update: [
        param('id')
            .isUUID()
            .withMessage('Invalid farm ID format'),
        body('name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage('Farm name must be 2-100 characters'),
        body('location')
            .optional()
            .trim()
            .isLength({ min: 2, max: 200 })
            .withMessage('Location must be 2-200 characters'),
        body('size')
            .optional()
            .isFloat({ min: 0.01, max: 1000000 })
            .withMessage('Size must be a positive number between 0.01 and 1,000,000'),
        body('status')
            .optional()
            .isIn(['active', 'inactive', 'maintenance'])
            .withMessage('Invalid status'),
        handleValidationErrors
    ],

    get: [
        param('id')
            .isUUID()
            .withMessage('Invalid farm ID format'),
        handleValidationErrors
    ]
};

// Crop validation
const validateCrop = {
    create: [
        body('name')
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage('Crop name must be 2-100 characters'),
        body('type')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Crop type must be 2-50 characters'),
        body('farmId')
            .isUUID()
            .withMessage('Invalid farm ID format'),
        body('plantedDate')
            .isISO8601()
            .withMessage('Planted date must be a valid date'),
        body('expectedHarvestDate')
            .isISO8601()
            .withMessage('Expected harvest date must be a valid date'),
        body('area')
            .optional()
            .isFloat({ min: 0.01, max: 10000 })
            .withMessage('Area must be a positive number between 0.01 and 10,000'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 1000 })
            .withMessage('Description must be less than 1000 characters'),
        handleValidationErrors
    ],

    update: [
        param('id')
            .isUUID()
            .withMessage('Invalid crop ID format'),
        body('name')
            .optional()
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage('Crop name must be 2-100 characters'),
        body('status')
            .optional()
            .isIn(['planted', 'growing', 'flowering', 'fruiting', 'harvested', 'failed'])
            .withMessage('Invalid crop status'),
        handleValidationErrors
    ]
};

// Livestock validation
const validateLivestock = {
    create: [
        body('name')
            .trim()
            .isLength({ min: 2, max: 100 })
            .withMessage('Livestock name must be 2-100 characters'),
        body('type')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Livestock type must be 2-50 characters'),
        body('farmId')
            .isUUID()
            .withMessage('Invalid farm ID format'),
        body('breed')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Breed must be 2-50 characters'),
        body('birthDate')
            .isISO8601()
            .withMessage('Birth date must be a valid date'),
        body('weight')
            .optional()
            .isFloat({ min: 0.1, max: 10000 })
            .withMessage('Weight must be between 0.1 and 10,000'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 1000 })
            .withMessage('Description must be less than 1000 characters'),
        handleValidationErrors
    ],

    update: [
        param('id')
            .isUUID()
            .withMessage('Invalid livestock ID format'),
        body('status')
            .optional()
            .isIn(['healthy', 'sick', 'injured', 'recovering', 'quarantined', 'sold', 'deceased'])
            .withMessage('Invalid livestock status'),
        handleValidationErrors
    ]
};

// Financial record validation
const validateFinancial = {
    create: [
        body('type')
            .isIn(['income', 'expense'])
            .withMessage('Type must be income or expense'),
        body('category')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Category must be 2-50 characters'),
        body('amount')
            .isFloat({ min: 0.01, max: 10000000 })
            .withMessage('Amount must be between 0.01 and 10,000,000'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 })
            .withMessage('Description must be less than 500 characters'),
        body('date')
            .isISO8601()
            .withMessage('Date must be a valid date'),
        body('farmId')
            .isUUID()
            .withMessage('Invalid farm ID format'),
        handleValidationErrors
    ]
};

// Task validation
const validateTask = {
    create: [
        body('title')
            .trim()
            .isLength({ min: 2, max: 200 })
            .withMessage('Task title must be 2-200 characters'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 1000 })
            .withMessage('Description must be less than 1000 characters'),
        body('priority')
            .optional()
            .isIn(['low', 'medium', 'high', 'urgent'])
            .withMessage('Invalid priority level'),
        body('dueDate')
            .optional()
            .isISO8601()
            .withMessage('Due date must be a valid date'),
        body('farmId')
            .isUUID()
            .withMessage('Invalid farm ID format'),
        handleValidationErrors
    ]
};

// Query parameter validation
const validateQuery = {
    pagination: [
        query('page')
            .optional()
            .isInt({ min: 1, max: 1000 })
            .withMessage('Page must be between 1 and 1000'),
        query('limit')
            .optional()
            .isInt({ min: 1, max: 100 })
            .withMessage('Limit must be between 1 and 100'),
        handleValidationErrors
    ],

    search: [
        query('search')
            .optional()
            .trim()
            .isLength({ min: 1, max: 100 })
            .withMessage('Search term must be 1-100 characters'),
        handleValidationErrors
    ]
};

// Rate limiting validation
const validateRateLimit = (req, res, next) => {
    // This would integrate with express-rate-limit
    // For now, just pass through
    next();
};

// SQL injection prevention
const preventSQLInjection = (req, res, next) => {
    const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER', 'EXEC', 'UNION'];
    
    const checkForSQLInjection = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                const upperValue = obj[key].toUpperCase();
                for (let keyword of sqlKeywords) {
                    if (upperValue.includes(keyword)) {
                        return res.status(400).json({
                            success: false,
                            error: 'Invalid input detected'
                        });
                    }
                }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                if (checkForSQLInjection(obj[key])) return true;
            }
        }
        return false;
    };

    if (req.body && checkForSQLInjection(req.body)) return;
    if (req.query && checkForSQLInjection(req.query)) return;
    if (req.params && checkForSQLInjection(req.params)) return;

    next();
};

// User Management validation
const validateUserManagement = {
    create: [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Valid email is required'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        body('firstName')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('First name must be between 2 and 50 characters'),
        body('lastName')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Last name must be between 2 and 50 characters'),
        body('role')
            .optional()
            .isIn(['farmer', 'manager', 'admin'])
            .withMessage('Role must be farmer, manager, or admin'),
        body('phone')
            .optional()
            .isMobilePhone()
            .withMessage('Valid phone number is required'),
        body('permissions')
            .optional()
            .isArray()
            .withMessage('Permissions must be an array'),
        handleValidationErrors
    ],
    updateRole: [
        body('role')
            .isIn(['farmer', 'manager', 'admin'])
            .withMessage('Role must be farmer, manager, or admin'),
        body('permissions')
            .optional()
            .isArray()
            .withMessage('Permissions must be an array'),
        body('status')
            .optional()
            .isIn(['active', 'inactive', 'suspended'])
            .withMessage('Status must be active, inactive, or suspended'),
        handleValidationErrors
    ],
    updateProfile: [
        body('firstName')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('First name must be between 2 and 50 characters'),
        body('lastName')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Last name must be between 2 and 50 characters'),
        body('phone')
            .optional()
            .isMobilePhone()
            .withMessage('Valid phone number is required'),
        body('notificationPreferences')
            .optional()
            .isObject()
            .withMessage('Notification preferences must be an object'),
        handleValidationErrors
    ],
    changePassword: [
        body('currentPassword')
            .notEmpty()
            .withMessage('Current password is required'),
        body('newPassword')
            .isLength({ min: 8 })
            .withMessage('New password must be at least 8 characters long')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error('Password confirmation does not match');
                }
                return true;
            }),
        handleValidationErrors
    ]
};

module.exports = {
    sanitizeInput,
    handleValidationErrors,
    preventSQLInjection,
    validateAuth,
    validateFarm,
    validateCrop,
    validateLivestock,
    validateFinancial,
    validateTask,
    validateQuery,
    validateRateLimit,
    validateUserManagement
};
