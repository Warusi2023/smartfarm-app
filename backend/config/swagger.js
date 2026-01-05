/**
 * Swagger/OpenAPI Configuration
 * Auto-generates API documentation from JSDoc comments and Zod schemas
 */

const swaggerJsdoc = require('swagger-jsdoc');
const { zodToOpenAPI } = require('zod-to-openapi');
const schemas = require('../validators/schemas');

// Note: Schemas are defined inline in JSDoc comments for better control
// and to keep documentation in sync with code

// Common response schemas
const commonSchemas = {
    SuccessResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object' }
        },
        required: ['success']
    },
    ErrorResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Error message' },
            code: { type: 'string', example: 'ERROR_CODE' },
            details: { type: 'array', items: { type: 'object' } }
        },
        required: ['success', 'error', 'code']
    },
    ValidationErrorResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Validation failed' },
            code: { type: 'string', example: 'VALIDATION_ERROR' },
            details: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        path: { type: 'string' },
                        message: { type: 'string' },
                        code: { type: 'string' }
                    }
                }
            }
        },
        required: ['success', 'error', 'code']
    },
    User: {
        type: 'object',
        properties: {
            id: { type: 'string', example: 'user-123' },
            email: { type: 'string', format: 'email', example: 'user@example.com' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            phone: { type: 'string', example: '+1234567890' },
            country: { type: 'string', example: 'USA' },
            isVerified: { type: 'boolean', example: true },
            role: { type: 'string', example: 'user' }
        }
    },
    AuthToken: {
        type: 'object',
        properties: {
            token: { type: 'string', example: 'jwt-token-here' },
            refreshToken: { type: 'string', example: 'refresh-token-here' },
            user: { $ref: '#/components/schemas/User' }
        }
    }
};

// Swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SmartFarm API',
            version: '1.0.0',
            description: 'Comprehensive agricultural management system API',
            contact: {
                name: 'SmartFarm Team',
                email: 'support@smartfarm.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: process.env.API_BASE_URL || 'http://localhost:3000',
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token obtained from /api/auth/login'
                }
            },
            schemas: commonSchemas,
            responses: {
                UnauthorizedError: {
                    description: 'Authentication required',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            },
                            example: {
                                success: false,
                                error: 'Authentication required',
                                code: 'AUTHENTICATION_ERROR'
                            }
                        }
                    }
                },
                ValidationError: {
                    description: 'Validation error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ValidationErrorResponse'
                            }
                        }
                    }
                },
                NotFoundError: {
                    description: 'Resource not found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            },
                            example: {
                                success: false,
                                error: 'Resource not found',
                                code: 'NOT_FOUND'
                            }
                        }
                    }
                },
                InternalServerError: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            },
                            example: {
                                success: false,
                                error: 'Internal server error',
                                code: 'INTERNAL_ERROR'
                            }
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Authentication',
                description: 'User authentication and authorization endpoints'
            },
            {
                name: 'Farms',
                description: 'Farm management endpoints'
            },
            {
                name: 'Crops',
                description: 'Crop management endpoints'
            },
            {
                name: 'Livestock',
                description: 'Livestock management endpoints'
            },
            {
                name: 'Weather Alerts',
                description: 'Weather alerts and notifications'
            },
            {
                name: 'AI Advisory',
                description: 'AI-powered agricultural recommendations'
            },
            {
                name: 'Daily Tips',
                description: 'Daily farming tips and recommendations'
            },
            {
                name: 'Biological Farming',
                description: 'Biological farming guides and pest matching'
            },
            {
                name: 'Subscriptions',
                description: 'Subscription management endpoints'
            },
            {
                name: 'Health',
                description: 'Health check and system status'
            }
        ]
    },
    apis: [
        './routes/*.js',
        './server.js'
    ]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec, swaggerOptions };

