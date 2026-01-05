# Architecture Documentation

## System Overview

SmartFarm is a multi-platform agricultural management system consisting of:

- **Web Application** - Browser-based interface (Vite + HTML/CSS/JS)
- **Backend API** - Node.js/Express REST API
- **Android Application** - Native Android app (Kotlin)

## Architecture Components

### Frontend Architecture
- **Technology Stack**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.2
- **Build Tool**: Vite
- **Charts**: Chart.js
- **Maps**: Leaflet
- **PDF Generation**: jsPDF
- **QR Codes**: QRCode.js

### Backend Architecture
- **Runtime**: Node.js 18-22
- **Framework**: Express.js
- **Database**: PostgreSQL (production), SQLite (development)
- **Authentication**: JWT with bcrypt
- **Validation**: Zod schemas
- **Logging**: Winston
- **Error Handling**: Centralized error middleware

### Database Schema
See [Database Schema](./DATABASE_SCHEMA.md) for detailed schema documentation.

### Security Architecture
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- SSL/TLS enforcement
- Security headers (Helmet)
- CORS configuration

## Design Patterns

### Backend Patterns
- **MVC Architecture**: Routes → Services → Database
- **Middleware Pattern**: Request validation, authentication, error handling
- **Dependency Injection**: Services injected into routes
- **Error Handling**: Centralized error handler with custom error classes

### Frontend Patterns
- **Component-based**: Modular HTML/CSS/JS components
- **Service Layer**: API communication abstraction
- **State Management**: Local storage and session management

## System Integration

### API Communication
- RESTful API design
- JSON request/response format
- Standardized error responses
- Request validation middleware

### Cross-Platform Sync
- Shared API configuration (`shared-api-config.json`)
- Automated code generation
- Consistent API contracts

## Performance Considerations

- Database connection pooling
- Caching strategies
- Lazy loading
- Code splitting
- Service worker caching

## Scalability

- Horizontal scaling support
- Database connection pooling
- Stateless API design
- CDN-ready static assets

