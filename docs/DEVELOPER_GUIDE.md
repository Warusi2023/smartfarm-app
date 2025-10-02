# SmartFarm Developer Guide

## Overview

This guide provides comprehensive information for developers who want to contribute to SmartFarm, understand the codebase, or integrate with the SmartFarm API.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Development Setup](#development-setup)
3. [Codebase Structure](#codebase-structure)
4. [API Development](#api-development)
5. [Frontend Development](#frontend-development)
6. [Database Schema](#database-schema)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [Troubleshooting](#troubleshooting)

## Architecture Overview

SmartFarm follows a modern web application architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Netlify)     │◄──►│   (Railway)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • HTML/CSS/JS   │    │ • Node.js       │    │ • Sequelize ORM │
│ • Bootstrap     │    │ • Express.js    │    │ • Migrations    │
│ • Chart.js      │    │ • JWT Auth      │    │ • Seeds         │
│ • Service Worker│    │ • Validation    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.2 for UI components
- Chart.js for data visualization
- Leaflet for maps
- Service Workers for offline functionality

**Backend:**
- Node.js runtime
- Express.js web framework
- Sequelize ORM for database operations
- JWT for authentication
- express-validator for input validation

**Database:**
- SQLite for development
- PostgreSQL for production
- Sequelize migrations for schema management

**Deployment:**
- Railway for backend hosting
- Netlify for frontend hosting
- GitHub Actions for CI/CD

## Development Setup

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 8+ (comes with Node.js)
- Git ([Download](https://git-scm.com/))
- PostgreSQL 12+ (for production testing)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smartfarm.git
   cd smartfarm
   ```

2. **Install backend dependencies**
   ```bash
   cd backend-api
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../web-project
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Backend
   cp backend-api/env.example backend-api/.env
   # Edit backend-api/.env with your configuration
   
   # Frontend
   cp web-project/env.example web-project/.env
   # Edit web-project/.env with your configuration
   ```

5. **Initialize the database**
   ```bash
   cd backend-api
   npm run setup-db
   npm run migrate
   npm run seed
   ```

6. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend-api
   npm run dev
   
   # Terminal 2 - Frontend
   cd web-project
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Dashboard: http://localhost:3000/dashboard.html

### Development Tools

**Recommended VS Code Extensions:**
- ESLint
- Prettier
- GitLens
- REST Client
- Thunder Client

**Useful Commands:**
```bash
# Backend
npm run dev          # Start development server
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run linting

# Frontend
npm run dev          # Start development server
npm run test         # Run E2E tests
npm run lint:check   # Check code formatting
npm run format       # Format code
```

## Codebase Structure

### Backend Structure

```
backend-api/
├── routes/              # API route handlers
│   ├── auth.js         # Authentication routes
│   ├── farms.js        # Farm management routes
│   ├── crops.js        # Crop management routes
│   ├── livestock.js    # Livestock management routes
│   └── health.js       # Health check routes
├── middleware/          # Custom middleware
│   ├── auth.js         # Authentication middleware
│   ├── validation.js   # Input validation middleware
│   └── errorHandler.js # Error handling middleware
├── database/           # Database configuration
│   ├── models/         # Sequelize models
│   ├── migrations/     # Database migrations
│   ├── seeds/          # Database seeds
│   └── init.js         # Database initialization
├── lib/                # Utility libraries
│   ├── logger.js       # Logging utility
│   └── utils.js        # General utilities
├── tests/              # Test files
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── setup.js        # Test setup
├── server.js           # Main server file
├── railway-server.js   # Railway deployment server
└── package.json        # Dependencies and scripts
```

### Frontend Structure

```
web-project/
├── public/             # Static files
│   ├── css/           # Stylesheets
│   │   ├── styles.css # Main styles
│   │   └── utilities.css # Utility classes
│   ├── js/            # JavaScript files
│   │   ├── api-service.js      # API client
│   │   ├── dashboard.js        # Dashboard functionality
│   │   ├── weather-service.js  # Weather integration
│   │   ├── performance-optimizer.js # Performance features
│   │   ├── accessibility-enhancer.js # Accessibility features
│   │   └── ux-enhancer.js     # UX improvements
│   ├── images/        # Images and assets
│   ├── dashboard.html # Main dashboard
│   ├── index.html     # Homepage
│   └── sw.js          # Service worker
├── tests/             # Test files
│   └── e2e/          # End-to-end tests
├── playwright.config.js # Playwright configuration
└── package.json       # Dependencies and scripts
```

## API Development

### Creating New API Endpoints

1. **Define the route in the appropriate file**
   ```javascript
   // routes/farms.js
   router.get('/farms/:id/analytics', authMiddleware, async (req, res) => {
     try {
       const farmId = req.params.id;
       const analytics = await getFarmAnalytics(farmId);
       res.json({ success: true, data: analytics });
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });
   ```

2. **Add validation middleware**
   ```javascript
   const { validateFarm } = require('../middleware/validation');
   
   router.get('/farms/:id', validateFarm.get, async (req, res) => {
     // Route handler
   });
   ```

3. **Add authentication middleware**
   ```javascript
   const authMiddleware = require('../middleware/auth');
   
   router.get('/farms', authMiddleware, async (req, res) => {
     // Route handler
   });
   ```

4. **Write tests**
   ```javascript
   // tests/unit/farms.test.js
   describe('GET /api/farms/:id/analytics', () => {
     it('should return farm analytics', async () => {
       const response = await request(app)
         .get(`/api/farms/${farmId}/analytics`)
         .set('Authorization', `Bearer ${authToken}`)
         .expect(200);
       
       expect(response.body.success).toBe(true);
       expect(response.body.data).toBeDefined();
     });
   });
   ```

### API Response Standards

**Success Response:**
```javascript
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Optional success message"
}
```

**Error Response:**
```javascript
{
  "success": false,
  "error": "Error message",
  "errors": [
    // Validation errors (if applicable)
  ]
}
```

### Input Validation

Use express-validator for input validation:

```javascript
const { body, validationResult } = require('express-validator');

const validateFarm = {
  create: [
    body('name').notEmpty().withMessage('Farm name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('size').isFloat({ min: 0.1 }).withMessage('Size must be greater than 0'),
    body('type').isIn(['Crop', 'Livestock', 'Mixed', 'Organic', 'Conventional'])
      .withMessage('Invalid farm type')
  ]
};
```

## Frontend Development

### Adding New Features

1. **Create the JavaScript module**
   ```javascript
   // public/js/new-feature.js
   class NewFeature {
     constructor() {
       this.init();
     }
     
     init() {
       // Initialize the feature
     }
   }
   
   // Initialize when DOM is ready
   document.addEventListener('DOMContentLoaded', () => {
     new NewFeature();
   });
   ```

2. **Include the script in HTML**
   ```html
   <script src="js/new-feature.js"></script>
   ```

3. **Add CSS styles if needed**
   ```css
   /* public/css/styles.css */
   .new-feature {
     /* Styles for the new feature */
   }
   ```

4. **Write E2E tests**
   ```javascript
   // tests/e2e/new-feature.spec.js
   test('should display new feature', async ({ page }) => {
     await page.goto('/dashboard.html');
     await expect(page.locator('.new-feature')).toBeVisible();
   });
   ```

### API Integration

Use the centralized API service:

```javascript
// Using the API service
const response = await window.SmartFarmAPI.createFarm({
  name: 'New Farm',
  location: 'Test Location',
  size: 100,
  type: 'Mixed'
});

if (response.success) {
  // Handle success
  console.log('Farm created:', response.data);
} else {
  // Handle error
  console.error('Error:', response.error);
}
```

### State Management

SmartFarm uses a simple state management approach:

```javascript
// Global state
window.SmartFarmState = {
  farms: [],
  crops: [],
  livestock: [],
  user: null,
  
  // State management methods
  setFarms(farms) {
    this.farms = farms;
    this.notify('farmsUpdated');
  },
  
  notify(event) {
    document.dispatchEvent(new CustomEvent(event));
  }
};
```

## Database Schema

### Core Tables

**Users Table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Farms Table:**
```sql
CREATE TABLE farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  location VARCHAR(200) NOT NULL,
  size DECIMAL(10,2) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  userId UUID REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Crops Table:**
```sql
CREATE TABLE crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  farmId UUID REFERENCES farms(id) ON DELETE CASCADE,
  plantedDate DATE NOT NULL,
  expectedHarvestDate DATE NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Planted',
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Livestock Table:**
```sql
CREATE TABLE livestock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  farmId UUID REFERENCES farms(id) ON DELETE CASCADE,
  breed VARCHAR(100) NOT NULL,
  birthDate DATE NOT NULL,
  weight DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'Active',
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Creating Migrations

```javascript
// database/migrations/20240101000000-create-new-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('new_table', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('new_table');
  }
};
```

## Testing

### Backend Testing

**Unit Tests:**
```javascript
// tests/unit/auth.test.js
describe('Authentication', () => {
  test('should register a new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User'
    };
    
    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.username).toBe(userData.username);
  });
});
```

**Integration Tests:**
```javascript
// tests/integration/api-integration.test.js
describe('API Integration', () => {
  test('should complete full workflow', async () => {
    // Register user
    const user = await registerUser();
    
    // Login
    const token = await loginUser(user);
    
    // Create farm
    const farm = await createFarm(token);
    
    // Add crop
    const crop = await addCrop(token, farm.id);
    
    // Verify data
    expect(crop.farmId).toBe(farm.id);
  });
});
```

### Frontend Testing

**E2E Tests:**
```javascript
// tests/e2e/dashboard.spec.js
test('should load dashboard successfully', async ({ page }) => {
  await page.goto('/dashboard.html');
  await expect(page.locator('h1')).toContainText('SmartFarm Dashboard');
  await expect(page.locator('.navbar')).toBeVisible();
});
```

**Running Tests:**
```bash
# Backend tests
cd backend-api
npm run test              # Run all tests
npm run test:unit         # Run unit tests
npm run test:integration  # Run integration tests
npm run test:coverage     # Run with coverage

# Frontend tests
cd web-project
npm run test              # Run E2E tests
npm run test:ui           # Run with UI
npm run test:headed       # Run in headed mode
```

## Deployment

### Backend Deployment (Railway)

1. **Connect Railway account**
2. **Create new project**
3. **Connect GitHub repository**
4. **Set environment variables**
5. **Deploy automatically on push**

### Frontend Deployment (Netlify)

1. **Connect Netlify account**
2. **Create new site**
3. **Connect GitHub repository**
4. **Set build settings**
5. **Deploy automatically on push**

### CI/CD Pipeline

The GitHub Actions workflow handles:
- **Testing**: Run all tests
- **Security Scanning**: Check for vulnerabilities
- **Building**: Prepare for deployment
- **Deployment**: Deploy to staging/production
- **Health Checks**: Verify deployment success

## Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make your changes**
4. **Add tests for new features**
5. **Ensure all tests pass**
   ```bash
   npm run test
   npm run lint
   ```
6. **Commit your changes**
   ```bash
   git commit -m "Add new feature"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/new-feature
   ```
8. **Submit a pull request**

### Code Standards

**JavaScript:**
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Write comprehensive tests

**CSS:**
- Use Bootstrap classes when possible
- Follow BEM methodology for custom CSS
- Use CSS custom properties for theming
- Ensure responsive design

**HTML:**
- Use semantic HTML elements
- Include ARIA attributes for accessibility
- Ensure proper document structure
- Validate HTML markup

### Pull Request Guidelines

1. **Update documentation** for new features
2. **Add tests** for new functionality
3. **Ensure CI/CD passes**
4. **Request code review**
5. **Address feedback**
6. **Merge when approved**

## Troubleshooting

### Common Development Issues

**Database Connection Issues:**
```bash
# Check database status
npm run setup-db

# Reset database
npm run migrate:undo:all
npm run migrate
npm run seed
```

**Port Conflicts:**
```bash
# Check what's using the port
lsof -i :3001

# Kill the process
kill -9 <PID>
```

**Dependency Issues:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Test Failures:**
```bash
# Run tests with verbose output
npm run test -- --verbose

# Run specific test file
npm run test -- tests/unit/auth.test.js
```

### Debugging Tips

**Backend Debugging:**
- Use `console.log()` for debugging
- Check server logs
- Use Postman/Thunder Client for API testing
- Enable debug mode in environment variables

**Frontend Debugging:**
- Use browser developer tools
- Check console for errors
- Use `debugger` statements
- Test in different browsers

**Database Debugging:**
- Use Sequelize logging
- Check database connection
- Verify migrations
- Use database GUI tools

### Getting Help

**Resources:**
- GitHub Issues for bug reports
- GitHub Discussions for questions
- Documentation for reference
- Community forum for help

**Contact:**
- Email: dev-support@smartfarm-app.com
- GitHub: [@your-username](https://github.com/your-username)
- Discord: SmartFarm Developers

## Performance Optimization

### Backend Optimization

**Database:**
- Use database indexes
- Optimize queries
- Use connection pooling
- Implement caching

**API:**
- Use compression
- Implement rate limiting
- Optimize response sizes
- Use pagination

### Frontend Optimization

**Assets:**
- Optimize images
- Minify CSS/JS
- Use CDN
- Implement lazy loading

**Performance:**
- Use service workers
- Implement caching
- Optimize bundle size
- Use code splitting

## Security Considerations

### Backend Security

- **Authentication**: JWT tokens
- **Authorization**: Role-based access
- **Input Validation**: Comprehensive validation
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Input sanitization
- **CSRF Protection**: CSRF tokens
- **Rate Limiting**: API rate limiting
- **Security Headers**: Helmet.js

### Frontend Security

- **HTTPS**: Enforce HTTPS
- **CSP**: Content Security Policy
- **XSS Protection**: Input sanitization
- **Secure Headers**: Security headers
- **Data Validation**: Client-side validation

## Monitoring and Logging

### Backend Logging

```javascript
// lib/logger.js
const logger = require('./lib/logger');

logger.info('User logged in', { userId: user.id });
logger.error('Database error', { error: error.message });
logger.security('Security event', { ip: req.ip, action: 'login' });
```

### Frontend Logging

```javascript
// Error tracking
window.addEventListener('error', (event) => {
  console.error('JavaScript error:', event.error);
  // Send to error tracking service
});
```

### Health Monitoring

- **Health Check Endpoint**: `/api/health`
- **Uptime Monitoring**: External monitoring services
- **Performance Metrics**: Response times, error rates
- **Database Monitoring**: Connection status, query performance

## Conclusion

This developer guide provides comprehensive information for contributing to SmartFarm. Follow the established patterns and conventions, write comprehensive tests, and ensure your code meets the quality standards.

For additional help or questions, don't hesitate to reach out to the development team or the community. Happy coding! 🚀
