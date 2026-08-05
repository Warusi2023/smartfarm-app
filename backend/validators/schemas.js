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
                newPassword: commonSchemas.strongPassword,
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
                enableHeavyRain: z.boolean().optional(),
                enableFrost: z.boolean().optional(),
                enableHeatStress: z.boolean().optional(),
                enableStrongWind: z.boolean().optional(),
                enableDrought: z.boolean().optional(),
                minSeverity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
                notificationEnabled: z.boolean().optional(),
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
    // Body schemas keep the animal-detail fields both clients send (tag, sex,
    // birthDate, value, purpose...). Unknown keys are stripped by the validator,
    // so anything omitted here would silently never reach the database.
    livestock: {
        list: {
            query: z.object({
                type: z.string().optional(),
                farmId: commonSchemas.uuid.optional(),
                page: z.coerce.number().int().positive().optional().default(1),
                limit: z.coerce.number().int().min(1).max(200).optional().default(100),
            }).optional(),
        },
        create: {
            body: z.object({
                type: z.string().min(1).max(100).optional(),
                species: z.string().min(1).max(100).optional(),
                name: z.string().min(1).max(255).optional(),
                breed: z.string().max(100).optional(),
                tag: z.string().max(50).optional(),
                tagNumber: z.string().max(50).optional(),
                sex: z.string().max(20).optional(),
                gender: z.string().max(20).optional(),
                birthDate: z.string().max(40).optional(),
                age: z.coerce.number().int().nonnegative().optional(),
                weight: z.coerce.number().positive().optional(),
                healthStatus: z.string().max(50).optional(),
                location: z.string().max(255).optional(),
                field: z.string().max(255).optional(),
                value: z.coerce.number().nonnegative().optional(),
                purpose: z.string().max(100).optional(),
                productionPurpose: z.string().max(100).optional(),
                lifecycle: z.string().max(100).optional(),
                lifecycleStage: z.string().max(100).optional(),
                breedingStatus: z.string().max(100).nullable().optional(),
                sireTag: z.string().max(50).optional(),
                damTag: z.string().max(50).optional(),
                firstCalvingDate: z.string().max(40).nullable().optional(),
                lastCalvingDate: z.string().max(40).nullable().optional(),
                photo: z.string().nullable().optional(),
                photoUrl: z.string().nullable().optional(),
                photo_url: z.string().nullable().optional(),
                notes: z.string().max(1000).optional(),
                description: z.string().max(1000).optional(),
                healthNotes: z.string().max(1000).optional(),
                farmId: commonSchemas.uuid.optional(),
            }).refine((body) => Boolean(body.type || body.species), {
                message: 'type (species) is required',
                path: ['type'],
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
                species: z.string().min(1).max(100).optional(),
                name: z.string().min(1).max(255).optional(),
                breed: z.string().max(100).optional(),
                tag: z.string().max(50).optional(),
                tagNumber: z.string().max(50).optional(),
                sex: z.string().max(20).optional(),
                gender: z.string().max(20).optional(),
                birthDate: z.string().max(40).optional(),
                age: z.coerce.number().int().nonnegative().optional(),
                weight: z.coerce.number().positive().optional(),
                healthStatus: z.string().max(50).optional(),
                status: z.string().max(50).optional(),
                location: z.string().max(255).optional(),
                field: z.string().max(255).optional(),
                value: z.coerce.number().nonnegative().optional(),
                purpose: z.string().max(100).optional(),
                productionPurpose: z.string().max(100).optional(),
                lifecycle: z.string().max(100).optional(),
                lifecycleStage: z.string().max(100).optional(),
                breedingStatus: z.string().max(100).nullable().optional(),
                sireTag: z.string().max(50).optional(),
                damTag: z.string().max(50).optional(),
                firstCalvingDate: z.string().max(40).nullable().optional(),
                lastCalvingDate: z.string().max(40).nullable().optional(),
                photo: z.string().nullable().optional(),
                photoUrl: z.string().nullable().optional(),
                photo_url: z.string().nullable().optional(),
                notes: z.string().max(1000).optional(),
                description: z.string().max(1000).optional(),
                healthNotes: z.string().max(1000).optional(),
                farmId: commonSchemas.uuid.optional(),
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
        create: {
            body: z.object({
                name: z.string().min(1).max(255),
                location: z.string().min(1).max(255),
                areaHectares: z.coerce.number().positive(),
                farmType: z.string().min(1).max(100),
                description: z.string().max(2000).optional(),
                latitude: z.coerce.number().optional(),
                longitude: z.coerce.number().optional(),
            }),
        },
    },

    // ============ CROPS ENDPOINTS ============
    // Align with web-project SmartFarmAPI.createCrop / dashboard addNewCropWithData payload.
    crops: {
        list: {
            query: z.object({
                farmId: commonSchemas.uuid.optional(),
                page: z.coerce.number().int().positive().optional().default(1),
                limit: z.coerce.number().int().min(1).max(100).optional().default(20),
            }).optional(),
        },
        create: {
            body: z.object({
                name: z.string().min(1).max(255),
                type: z.string().max(100).optional(),
                farmId: commonSchemas.uuid.optional(),
                plantedDate: z.string().max(32).optional(),
                expectedHarvestDate: z.string().max(32).optional(),
                area: z.coerce.number().positive().optional(),
                description: z.string().max(2000).optional(),
                variety: z.string().max(255).optional(),
                status: z.string().max(50).optional(),
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
                name: z.string().min(1).max(255).optional(),
                type: z.string().max(100).optional(),
                farmId: commonSchemas.uuid.optional(),
                plantedDate: z.string().max(32).optional(),
                expectedHarvestDate: z.string().max(32).optional(),
                area: z.coerce.number().positive().optional(),
                description: z.string().max(2000).optional(),
                variety: z.string().max(255).optional(),
                status: z.string().max(50).optional(),
                notes: z.string().max(1000).optional(),
            }),
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
        pestsProtectionList: {},
        pestsProtectionByCrop: {
            params: z.object({
                cropName: z.string().min(1).max(100),
            }),
            query: z.object({
                region: z.string().min(2).max(20).optional(),
                regionCode: z.string().min(2).max(20).optional(),
            }).optional(),
        },
    },

    // ============ DAILY TIPS ENDPOINTS ============
    dailyTips: {
        personalized: {
            query: z.object({
                crops: z.union([z.string(), z.array(z.any())]).optional(),
                livestock: z.union([z.string(), z.array(z.any())]).optional(),
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

    // ============ AQUACULTURE ENDPOINTS (Phase 1) ============
    aquaculture: {
        listUnits: {
            query: z.object({
                farmId: commonSchemas.uuid,
            }),
        },
        createUnit: {
            body: z.object({
                farmId: commonSchemas.uuid,
                name: z.string().min(1).max(255).trim(),
                unitType: z.enum(['pond', 'tank', 'cage', 'hatchery']),
                species: z.enum(['tilapia', 'shrimp', 'other']),
                speciesOther: z.string().max(255).optional(),
                capacityNotes: z.string().max(2000).optional(),
            }),
        },
        getUnit: {
            params: z.object({
                unitId: commonSchemas.uuid,
            }),
        },
        updateUnit: {
            params: z.object({
                unitId: commonSchemas.uuid,
            }),
            body: z.object({
                name: z.string().min(1).max(255).trim().optional(),
                capacityNotes: z.string().max(2000).optional(),
                isActive: z.boolean().optional(),
            }),
        },
        listLogs: {
            params: z.object({
                unitId: commonSchemas.uuid,
            }),
            query: z.object({
                from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'from must be YYYY-MM-DD'),
                to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'to must be YYYY-MM-DD'),
            }),
        },
        saveLog: {
            params: z.object({
                unitId: commonSchemas.uuid,
            }),
            body: z.object({
                logDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
                feedAmountKg: z.number().nonnegative().optional(),
                mortalityCount: z.number().int().nonnegative().optional(),
                estimatedStockCount: z.number().int().positive().optional(),
                averageWeightG: z.number().nonnegative().optional(),
                waterTempC: z.number().optional(),
                ph: z.number().min(0).max(14).optional(),
                dissolvedOxygenMgl: z.number().nonnegative().optional(),
                notes: z.string().max(2000).optional(),
            }),
        },
        farmStatus: {
            query: z.object({
                farmId: commonSchemas.uuid,
            }),
        },
    },

    // ============ FARM TEAM (memberships, invites, tasks) ============
    farmTeam: {
        listMembers: {
            params: z.object({ farmId: commonSchemas.uuid }),
        },
        updateMember: {
            params: z.object({
                farmId: commonSchemas.uuid,
                membershipId: commonSchemas.uuid,
            }),
            body: z.object({
                role: z.enum(['manager', 'worker', 'viewer']),
            }),
        },
        removeMember: {
            params: z.object({
                farmId: commonSchemas.uuid,
                membershipId: commonSchemas.uuid,
            }),
        },
        createInvitation: {
            params: z.object({ farmId: commonSchemas.uuid }),
            body: z.object({
                email: commonSchemas.email,
                role: z.enum(['manager', 'worker', 'viewer']),
            }),
        },
        listInvitations: {
            params: z.object({ farmId: commonSchemas.uuid }),
        },
        revokeInvitation: {
            params: z.object({
                farmId: commonSchemas.uuid,
                invitationId: commonSchemas.uuid,
            }),
        },
        listTasks: {
            params: z.object({ farmId: commonSchemas.uuid }),
            query: z.object({
                status: z.enum(['open', 'in_progress', 'done', 'cancelled']).optional(),
            }).optional(),
        },
        listMyTasks: {
            params: z.object({ farmId: commonSchemas.uuid }),
        },
        createTask: {
            params: z.object({ farmId: commonSchemas.uuid }),
            body: z.object({
                title: z.string().min(1).max(500).trim(),
                description: z.string().max(5000).optional(),
                category: z.string().max(100).optional(),
                priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
                assignedToUserId: commonSchemas.uuid.optional(),
                dueAt: z.string().datetime().optional(),
                sourceType: z.string().max(100).optional(),
                sourceId: commonSchemas.uuid.optional(),
            }),
        },
        getTask: {
            params: z.object({
                farmId: commonSchemas.uuid,
                taskId: commonSchemas.uuid,
            }),
        },
        updateTask: {
            params: z.object({
                farmId: commonSchemas.uuid,
                taskId: commonSchemas.uuid,
            }),
            body: z.object({
                title: z.string().min(1).max(500).trim().optional(),
                description: z.string().max(5000).optional(),
                category: z.string().max(100).optional(),
                status: z.enum(['open', 'in_progress', 'done', 'cancelled']).optional(),
                priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
                assignedToUserId: commonSchemas.uuid.nullable().optional(),
                dueAt: z.string().datetime().nullable().optional(),
            }),
        },
        completeTask: {
            params: z.object({
                farmId: commonSchemas.uuid,
                taskId: commonSchemas.uuid,
            }),
        },
        addTaskUpdate: {
            params: z.object({
                farmId: commonSchemas.uuid,
                taskId: commonSchemas.uuid,
            }),
            body: z.object({
                updateType: z.enum(['comment', 'status_change', 'reassigned', 'completion', 'attachment']).optional(),
                body: z.string().max(5000).optional(),
                metadata: z.record(z.unknown()).optional(),
            }),
        },
        acceptInvitation: {
            params: z.object({
                token: z.string().min(16).max(128),
            }),
        },
        declineInvitation: {
            params: z.object({
                token: z.string().min(16).max(128),
            }),
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
        subscribe: {
            body: z.object({
                planName: z.string().min(1).max(100).optional(),
                planType: z.string().min(1).max(50).optional(),
                billingCycle: z.enum(['monthly', 'yearly']).optional(),
                paymentMethodId: z.string().optional(),
            }).optional(),
        },
        cancel: {
            body: z.object({
                reason: z.string().max(500).optional(),
                immediate: z.boolean().optional(),
            }).optional(),
        },
        update: {
            body: z.object({
                planName: z.string().min(1).max(100).optional(),
                planType: z.string().min(1).max(50).optional(),
                billingCycle: z.enum(['monthly', 'yearly']).optional(),
            }).optional(),
        },
        getHistory: {
            query: z.object({
                page: z.coerce.number().int().positive().optional().default(1),
                limit: z.coerce.number().int().min(1).max(100).optional().default(20),
            }).optional(),
        },
        createCheckoutSession: {
            body: z.object({}).optional(),
        },
        logEvent: {
            body: z.object({
                eventType: z.string().min(1).max(64),
                metadata: z.record(z.unknown()).optional(),
            }),
        },
    },

    billing: {
        createPortalSession: {
            body: z.object({}).optional(),
        },
    },
};

module.exports = {
    validationSchemas,
    commonSchemas,
};
