# SmartFarm - Agricultural Management System

![SmartFarm Logo](web-project/public/images/logo.png)

A comprehensive agricultural management system that helps farmers manage their farms, crops, livestock, and analytics through an intuitive web interface and mobile app.

## 🌟 Features

### Core Features
- **Farm Management** - Register and manage multiple farms with GPS tracking
- **Crop Management** - Plan, monitor, and track crop growth and harvests
- **Livestock Management** - Track animals, health, breeding, and weight
- **Weather Integration** - Real-time weather, forecasts, and alerts
- **Analytics & Reporting** - Comprehensive dashboards and custom reports
- **User Management** - Secure authentication with role-based access

### Advanced Features
- **AI Advisory** - Crop nutrition and livestock health recommendations
- **Daily Tips** - Personalized farming tips and recommendations
- **Biological Farming** - Beneficial insects, pest matching, and crop guides
- **Subscriptions** - Flexible subscription plans with trial support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- PostgreSQL (for production)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SmartFarm
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run setup:db
   npm run dev
   ```

3. **Web Application Setup**
   ```bash
   cd web-project
   npm install
   npm run dev
   ```
   The web app runs on http://localhost:5173

4. **Android Setup**
   ```bash
   cd android-project
   # Open in Android Studio
   # Follow setup instructions in android-project/README.md
   ```

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- **[Architecture](./docs/architecture/)** - System design and technical overview
- **[Setup & Deployment](./docs/setup-deployment/)** - Installation and deployment guides
- **[API Reference](./docs/api-reference/)** - Complete API documentation
- **[Feature Modules](./docs/feature-modules/)** - Feature-specific documentation

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.2
- Vite (build tool)
- Chart.js, Leaflet, jsPDF

**Backend:**
- Node.js 18-22
- Express.js
- PostgreSQL (production) / SQLite (development)
- JWT authentication
- Zod validation
- Winston logging

**Mobile:**
- Kotlin (Android)
- Shared backend API

### Project Structure

```
SmartFarm/
├── backend/              # Backend API server
│   ├── routes/          # API route handlers
│   ├── middleware/      # Custom middleware
│   ├── services/        # Business logic services
│   ├── utils/           # Utility functions
│   └── tests/           # Test suite
├── web-project/         # Web application
│   ├── public/          # Static assets
│   └── src/             # Source code
├── android-project/      # Android application
├── docs/                 # Documentation
└── README.md            # This file
```

## 🔧 Configuration

### Environment Variables

See [Environment Variables Guide](./docs/setup-deployment/ENVIRONMENT_VARIABLES.md) for detailed configuration.

**Backend (.env):**
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/smartfarm
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:unit     # Unit tests only
npm run test:integration  # Integration tests only
```

### CI/CD
Tests run automatically on push and pull requests via GitHub Actions.

## 🚀 Deployment

### Backend (Railway)
1. Connect Railway account
2. Create new project
3. Connect GitHub repository
4. Set environment variables
5. Deploy automatically on push

### Frontend (Netlify)
1. Connect Netlify account
2. Create new site
3. Connect GitHub repository
4. Set build settings
5. Deploy automatically on push

See [Deployment Guide](./docs/setup-deployment/DEPLOYMENT.md) for detailed instructions.

## 📊 API Documentation

Complete API documentation is available at [docs/api-reference/](./docs/api-reference/).

### Key Endpoints

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile

**Farms:**
- `GET /api/farms` - Get all farms
- `POST /api/farms` - Create farm
- `GET /api/farms/:id` - Get farm details

**Weather Alerts:**
- `GET /api/weather-alerts` - Get weather alerts
- `POST /api/weather-alerts/generate` - Generate alerts

See [API Reference](./docs/api-reference/README.md) for complete documentation.

## 🔒 Security

### Implemented Security Features
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- SSL/TLS enforcement
- Security headers (Helmet)
- CORS configuration
- Password hashing (bcrypt)
- SQL injection prevention
- XSS protection

See [Security Documentation](./docs/architecture/SECURITY.md) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

See [Contributing Guide](./CONTRIBUTING.md) for detailed guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 📞 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/smartfarm/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/smartfarm/discussions)

## 🙏 Acknowledgments

- Bootstrap team for the CSS framework
- Chart.js team for charting library
- Leaflet team for mapping functionality
- All contributors and users of SmartFarm

---

**SmartFarm** - Empowering farmers with technology for better agricultural management.

Made with ❤️ for the farming community.
