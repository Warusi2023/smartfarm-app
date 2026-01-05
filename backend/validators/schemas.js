/**
 * Centralized Validation Schemas
 * 
 * All API endpoint validation schemas are defined here.
 * Uses Zod for schema-based validation.
 */

const { z } = require('zod');

// Common reusable schemas
const commonSchemas = {
    email: z.string().email().max(255).toLowerCase().trim(),
    password: z.string().min(8).max(128),
    strongPassword: z.string()
        .min(8)
        .max(128)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    uuid: z.string().uuid('Invalid UUID format'),
    phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format').optional(),
    url: z.string().url().max(2048).optional(),
    positiveInteger: z.number().int().positive(),
    nonNegativeInteger: z.number().int().nonnegative(),
    decimal: z.number(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    dateString: z.string().datetime().optional(),
    string: z.string(),
    text: z.string().max(10000).optional(),
    country: z.string().max(100).optional(),
};

// Validation schemas for each endpoint
const validationSchemas = {
    // ============ AUTH ENDPOINTS ============
    auth: {
        register: {
            body: z.object({
                email: commonSchemas.email,
                password: commonSchemas.strongPassword,
                firstName: z.string().min(1).max(100).trim(),
                lastName: z.string().min(1).max(100).trim(),
                phone: commonSchemas.phone,
                country: commonSchemas.country,
            }),
        },
        login: {
            body: z.object({
                email: commonSchemas.email,
                password: z.string().min(1, 'Password is required'),
            }),
        },
        logout: {
            body: z.object({}).optional(),
        },
        refresh: {
            body: z.object({
                refreshToken: z.string().min(1, 'Refresh token is required'),
            }),
        },
        forgotPassword: {
            body: z.object({
                email: commonSchemas.email,
            }),
        },
        resetPassword: {
            body: z.object({
                token: z.string().min(1, 'Reset token is required'),
                password: commonSchemas.strongPassword,
            }),
        },
        verifyEmail: {
            params: z.object({
                token: z.string().min(1, 'Verification token is required'),
            }),
        },
        resendVerification: {
            body: z.object({
                email: commonSchemas.email.optional(),
            }),
        },
        getProfile: {
            // No body/query/params needed - uses auth token
        },
        updateProfile: {
            body: z.object({
                firstName: z.string().min(1).max(100).trim().optional(),
                lastName: z.string().min(1).max(100).trim().optional(),
                phone: commonSchemas.phone,
                country: commonSchemas.country,
            }),
        },
        changePassword: {
            body: z.object({
                currentPassword: z.string().min(1, 'Current password is required'),
                newPassword: commonSchemas.strongPassword,
            }),
        },
        deleteAccount: {
            body: z.object({
                password: z.string().min(1, 'Password is required for account deletion'),
            }),
        },
    },

    // ============ WEATHER ALERTS ENDPOINTS ============
    weatherAlerts: {
        list: {
            query: z.object({
                farmId: commonSchemas.uuid.optional(),
                unreadOnly: z.enum(['true', 'false']).optional().transform(val => val === 'true'),
                limit: z.coerce.number().int().min(1).max(100).optional().default(50),
                page: z.coerce.number().int().positive().optional().default(1),
            }),
        },
        stats: {
            // No params needed
        },
        getById: {
            params: z.object({
                id: commonSchemas.uuid,
            }),
        },
        markRead: {
            params: z.object({
                id: commonSchemas.uuid,
            }),
        },
        dismiss: {
            params: z.object({
                id: commonSchemas.uuid,
            }),
        },
        updateAction: {
            params: z.object({
                id: commonSchemas.uuid,
            }),
            body: z.object({
                actionTaken: z.boolean(),
                actionNotes: z.string().max(1000).optional(),
            }),
        },
        generate: {
            // No params needed - uses auth token
        },
        getPreferences: {
            // No params needed
        },
        updatePreferences: {
            body: z.object({
                enableEmailAlerts: z.boolean().optional(),
                enableSmsAlerts: z.boolean().optional(),
                enablePushAlerts: z.boolean().optional(),
                alertSeverities: z.array(z.enum(['low', 'medium', 'high', 'critical'])).optional(),
                alertTypes: z.array(z.string()).optional(),
            }),
        },
    },

    // ============ AI ADVISORY ENDPOINTS ============
    aiAdvisory: {
        cropNutrition: {
            params: z.object({
                cropId: z.string().min(1).max(100),
            }),
            query: z.object({
                growthStage: z.string().optional(),
                soilType: z.string().optional(),
            }).optional(),
        },
        livestockHealth: {
            params: z.object({
                animalId: z.string().min(1).max(100),
            }),
            query: z.object({
                type: z.string().optional(),
                breed: z.string().optional(),
                age: z.coerce.number().int().positive().optional(),
                healthStatus: z.string().optional(),
            }).optional(),
        },
    },

    // ============ LIVESTOCK ENDPOINTS ============
    livestock: {
        list: {
            query: z.object({
                type: z.string().optional(),
                farmId: commonSchemas.uuid.optional(),
                page: z.coerce.number().int().positive().optional().default(1),
                limit: z.coerce.number().int().min(1).max(100).optional().default(20),
            }).optional(),
        },
        create: {
            body: z.object({
                type: z.string().min(1).max(100),
                name: z.string().min(1).max(255),
                breed: z.string().max(100).optional(),
                age: z.coerce.number().int().nonnegative().optional(),
                weight: z.coerce.number().positive().optional(),
                healthStatus: z.string().max(50).optional(),
                location: z.string().max(255).optional(),
                notes: z.string().max(1000).optional(),
            }),
        },
        getById: {
            params: z.object({
                id: z.string().min(1),
            }),
        },
        update: {
            params: z.object({
                id: z.string().min(1),
            }),
            body: z.object({
                type: z.string().min(1).max(100).optional(),
                name: z.string().min(1).max(255).optional(),
                breed: z.string().max(100).optional(),
                age: z.coerce.number().int().nonnegative().optional(),
                weight: z.coerce.number().positive().optional(),
                healthStatus: z.string().max(50).optional(),
                location: z.string().max(255).optional(),
                notes: z.string().max(1000).optional(),
            }),
        },
    },

    // ============ FARMS ENDPOINTS ============
    farms: {
        list: {
            query: z.object({
                page: z.coerce.number().int().positive().optional().default(1),
                limit: z.coerce.number().int().min(1).max(100).optional().default(20),
            }).optional(),
        },
        stats: {
            // No params needed
        },
    },

    // ============ CROPS ENDPOINTS ============
    crops: {
        list: {
            query: z.object({
                page: z.coerce.number().int().positive().optional().default(1),
                limit: z.coerce.number().int().min(1).max(100).optional().default(20),
            }).optional(),
        },
        stats: {
            // No params needed
        },
    },

    // ============ BIOLOGICAL FARMING ENDPOINTS ============
    biologicalFarming: {
        goodInsects: {
            query: z.object({
                page: z.coerce.number().int().positive().optional().default(1),
                limit: z.coerce.number().int().min(1).max(100).optional().default(20),
            }).optional(),
        },
        goodInsectById: {
            params: z.object({
                id: z.string().min(1),
            }),
        },
        badInsects: {
            query: z.object({
                page: z.coerce.number().int().positive().optional().default(1),
                limit: z.coerce.number().int().min(1).max(100).optional().default(20),
            }).optional(),
        },
        badInsectById: {
            params: z.object({
                id: z.string().min(1),
            }),
        },
        cropGuides: {
            query: z.object({
                cropName: z.string().optional(),
            }).optional(),
        },
        cropGuideByName: {
            params: z.object({
                cropName: z.string().min(1).max(100),
            }),
        },
        matchPest: {
            params: z.object({
                pestName: z.string().min(1).max(100),
            }),
        },
        recommendations: {
            params: z.object({
                cropName: z.string().min(1).max(100),
            }),
        },
    },

    // ============ DAILY TIPS ENDPOINTS ============
    dailyTips: {
        personalized: {
            query: z.object({
                limit: z.coerce.number().int().min(1).max(50).optional().default(5),
            }).optional(),
        },
        today: {
            // No params needed
        },
        byDate: {
            params: z.object({
                date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
            }),
        },
        byCategory: {
            params: z.object({
                category: z.string().min(1).max(100),
            }),
        },
        all: {
            query: z.object({
                page: z.coerce.number().int().positive().optional().default(1),
                limit: z.coerce.number().int().min(1).max(100).optional().default(20),
            }).optional(),
        },
    },

    // ============ SUBSCRIPTIONS ENDPOINTS ============
    subscriptions: {
        getPlans: {
            // No params needed
        },
        getCurrent: {
            // No params needed - uses auth token
        },
    },
};

module.exports = {
    validationSchemas,
    commonSchemas,
};

