# 📝 Changelog

All notable changes to SmartFarm will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Netlify API proxy (`758392e`, `b5b6a2d`):** same-origin `/api/*` from `www.smartfarm-app.com` now proxy to the Railway backend via `dist/_redirects` and are no longer intercepted by SPA fallback. Verified `/api/health`, `/api/auth/profile`, and `/api/auth/me` return 200 JSON in production. See [`docs/post-deploy-notes/netlify-proxy-fix.md`](docs/post-deploy-notes/netlify-proxy-fix.md).

## [W6-02] - 2025-06-08

### Added
- **Dashboard command center (W6-02):** daily checklist, weekly summary, weekly priorities, weekly reset/carry-forward, and "This week's focus" progress pills on production dashboard.
- **Release messaging:** in-app announcement banner (dismissible, once per user), [`release-notes.html`](web-project/public/release-notes.html), and help-center link.

### Changed
- Production API routing locked to healthy Railway host (`web-production-86d39`) on `smartfarm-app.com`.
- Service worker offline responses return JSON instead of plain `"Offline"` text.
- Dashboard script load order: API origin fix before fetch-dependent scripts; removed aggressive fetch override scripts.

### Fixed
- Wrong production backend URL causing CORS/503 failures on dashboard API calls.
- JSON parse crashes when service worker returned non-JSON offline bodies.

### Known limitations
- Weather command-center block may show `unavailable` until farm coordinates and `WEATHER_API_KEY` are configured on production.

## [Previous Unreleased]

### Added
- **W1-07:** [`docs/BETA_LIMITATIONS.md`](docs/BETA_LIMITATIONS.md) — beta persistence limits for crop recommendation log, Today on farm panel, Railway/Netlify deploy behavior (also at `/docs/BETA_LIMITATIONS.md` on Netlify builds).
- [`docs/WEEK1_WEB_RELEASE.md`](docs/WEEK1_WEB_RELEASE.md) — Week 1 web beta scope (W1-01–W1-04) with link to beta limitations.
- Comprehensive project documentation
- Complete .gitignore for all platforms
- Contributing guidelines
- Code of conduct
- License file

### Changed
- Improved Railway deployment configuration
- Enhanced environment variables setup

### Fixed
- Railway deployment conflicts
- Environment variable configuration

## [1.0.0] - 2024-09-11

### Added
- 🌱 **SmartFarm Web Application**
  - Progressive Web App (PWA) with offline support
  - Modern Material Design 3 interface
  - Responsive design for all devices
  - Real-time data synchronization

- 📱 **Android Application**
  - Native Android app with Kotlin
  - Offline capabilities and sync
  - Material Design components
  - Push notifications support

- 🚀 **Backend API**
  - Node.js/Express.js REST API
  - JWT authentication system
  - Railway cloud deployment
  - Health check endpoints

- 🌾 **Core Features**
  - Crop management system
  - Weather integration (OpenWeather API)
  - Soil analysis tools
  - Market insights and pricing
  - AI chat assistant (OpenAI integration)
  - Blockchain supply chain tracking

- 🔧 **Technical Features**
  - Multi-platform support (Web, Android)
  - Real-time data synchronization
  - Offline-first architecture
  - Progressive Web App capabilities
  - Responsive design
  - Accessibility compliance (WCAG 2.1 AA)

- 🛠️ **Development Tools**
  - Comprehensive testing suite
  - CI/CD pipeline with GitHub Actions
  - Automated deployment to Railway/Netlify
  - Code quality tools (ESLint, Prettier)
  - Documentation generation

- 📚 **Documentation**
  - Complete API documentation
  - User manual and guides
  - Developer documentation
  - Deployment guides
  - Contributing guidelines

### Technical Details
- **Frontend**: Kotlin Multiplatform, Compose for Web
- **Backend**: Node.js, Express.js, JWT
- **Database**: In-memory (development), PostgreSQL (production)
- **Deployment**: Railway (backend), Netlify (frontend)
- **Testing**: Jest, JUnit, Espresso
- **Version Control**: Git with GitHub

### Security
- JWT-based authentication
- HTTPS enforcement
- CORS configuration
- Input validation and sanitization
- Secure environment variable management

### Performance
- Optimized bundle sizes
- Lazy loading implementation
- Caching strategies
- Database query optimization
- CDN integration

## [0.9.0] - 2024-08-15

### Added
- Initial project setup
- Basic web application structure
- Android project foundation
- Backend API skeleton
- Basic authentication system

### Changed
- Project structure reorganization
- Build system improvements

## [0.8.0] - 2024-07-20

### Added
- Weather API integration
- Basic crop management features
- User authentication system
- Database schema design

### Fixed
- Initial deployment issues
- Configuration problems

## [0.7.0] - 2024-06-10

### Added
- Project initialization
- Basic UI components
- Navigation structure
- Theme system

### Changed
- Design system implementation
- Component architecture

## [0.6.0] - 2024-05-05

### Added
- Initial concept development
- Market research
- Technology stack selection
- Project planning

---

## Version Numbering

We use [Semantic Versioning](https://semver.org/) for version numbers:

- **MAJOR** version for incompatible API changes
- **MINOR** version for added functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

## Release Types

- **Feature Release**: New functionality and improvements
- **Bug Fix Release**: Bug fixes and stability improvements
- **Security Release**: Security patches and updates
- **Maintenance Release**: Dependency updates and maintenance

## Support Policy

- **Current Version**: Full support and active development
- **Previous Major Version**: Bug fixes and security updates only
- **Older Versions**: Community support only

---

**For more information about releases, visit our [Releases Page](https://github.com/Warusi2023/smartfarm-app/releases).**