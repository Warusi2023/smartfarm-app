# Backend Refactoring Guide

## Overview

This document describes the refactoring approach to improve separation of concerns in the SmartFarm backend. The goal is to separate routes, controllers, services, and data access layers for better testability and maintainability.

## Architecture Layers

### 1. Routes (`backend/routes/`)
**Purpose**: Define HTTP routes and middleware only
- Route definitions
- Middleware application (auth, validation, caching)
- Delegates to controllers

**Example:**
```javascript
this.router.get('/plans', 
    cacheMiddleware('subscriptions:plans', CACHE_TTL.SUBSCRIPTION_PLANS),
    validate('subscriptions.getPlans'), 
    asyncHandler(this.controller.getPlans.bind(this.controller))
);
```

### 2. Controllers (`backend/controllers/`)
**Purpose**: Handle HTTP request/response
- Extract data from request
- Call services
- Format responses
- Handle HTTP-specific concerns

**Example:**
```javascript
async getPlans(req, res) {
    const plans = this.subscriptionService.getPlans();
    res.json({
        success: true,
        data: plans
    });
}
```

### 3. Services (`backend/services/`)
**Purpose**: Business logic
- Business rules
- Data transformation
- Orchestration of multiple repositories
- No HTTP concerns

**Example:**
```javascript
async getCurrentSubscription(userId) {
    const subscription = await this.repository.getUserSubscription(userId);
    const userTrialInfo = await this.repository.getUserTrialInfo(userId);
    
    // Business logic for determining subscription status
    if (!subscription && userTrialInfo) {
        // Check trial status...
    }
    
    return subscription;
}
```

### 4. Repositories (`backend/repositories/`)
**Purpose**: Data access layer
- Database queries
- Data persistence
- No business logic
- Abstract database implementation

**Example:**
```javascript
async getUserSubscription(userId) {
    const DatabaseHelpers = require('../utils/db-helpers');
    const dbHelpers = new DatabaseHelpers(this.dbPool);
    return await dbHelpers.getUserSubscription(userId);
}
```

## Refactoring Pattern

### Step 1: Create Repository
- Move database queries from routes/controllers to repository
- Keep only data access logic

### Step 2: Create/Enhance Service
- Move business logic from routes/controllers to service
- Use repository for data access
- Keep business rules and transformations

### Step 3: Create Controller
- Extract HTTP handling from routes
- Call services
- Format responses

### Step 4: Refactor Routes
- Keep only route definitions
- Apply middleware
- Delegate to controllers

## Benefits

1. **Testability**
   - Each layer can be tested independently
   - Mock dependencies easily
   - Unit tests for business logic

2. **Maintainability**
   - Clear separation of concerns
   - Easy to locate code
   - Changes isolated to specific layers

3. **Reusability**
   - Services can be used by multiple controllers
   - Repositories can be used by multiple services

4. **Scalability**
   - Easy to add new endpoints
   - Easy to change business logic
   - Easy to swap data sources

## Completed Refactoring

### ✅ Subscriptions Module
- **Repository**: `backend/repositories/subscriptionRepository.js`
- **Service**: `backend/services/subscriptionService.js` (enhanced)
- **Controller**: `backend/controllers/subscriptionController.js`
- **Routes**: `backend/routes/subscriptions.js` (refactored)

## Next Steps

### 🔄 Weather Alerts Module
- Create `repositories/weatherAlertRepository.js`
- Enhance `services/weatherAlertService.js`
- Create `controllers/weatherAlertController.js`
- Refactor `routes/weather-alerts.js`

### 🔄 Auth Module
- Create `repositories/userRepository.js`
- Enhance `auth/auth.js` or create `services/authService.js`
- Create `controllers/authController.js`
- Refactor `routes/auth.js`

### 🔄 Daily Tips Module
- Create `repositories/dailyTipsRepository.js` (if needed)
- Create `services/dailyTipsService.js`
- Create `controllers/dailyTipsController.js`
- Refactor `routes/daily-tips.js`

## Migration Strategy

1. **Incremental**: Refactor one module at a time
2. **Backward Compatible**: Keep API behavior unchanged
3. **Test After Each**: Ensure functionality works
4. **Document**: Update documentation as you go

## Testing Strategy

### Unit Tests
- Test each layer independently
- Mock dependencies
- Test business logic in services
- Test data access in repositories

### Integration Tests
- Test full request/response cycle
- Test controller -> service -> repository flow
- Ensure API behavior unchanged

## Code Examples

### Before (Routes with Business Logic)
```javascript
async getPlans(req, res) {
    const plans = {
        trial: { /* ... */ },
        professional: { /* ... */ },
        enterprise: { /* ... */ }
    };
    res.json({ success: true, data: plans });
}
```

### After (Separated Layers)
```javascript
// Routes
this.router.get('/plans', 
    cacheMiddleware(...),
    validate(...),
    asyncHandler(this.controller.getPlans.bind(this.controller))
);

// Controller
async getPlans(req, res) {
    const plans = this.subscriptionService.getPlans();
    res.json({ success: true, data: plans });
}

// Service
getPlans() {
    return this.repository.getPlans();
}

// Repository
getPlans() {
    return { /* static plans data */ };
}
```

## Best Practices

1. **Keep Routes Thin**: Only route definitions and middleware
2. **Controllers Handle HTTP**: Request/response formatting
3. **Services Contain Logic**: Business rules and orchestration
4. **Repositories Access Data**: Database queries only
5. **Dependency Injection**: Pass dependencies through constructors
6. **Error Handling**: Use custom errors, handle in controllers
7. **Validation**: Keep in routes/middleware, validate in services too

## Notes

- This refactoring maintains API compatibility
- No breaking changes to existing endpoints
- Gradual migration approach
- Each module refactored independently

