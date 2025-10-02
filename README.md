# SmartFarm - Agricultural Management System

![SmartFarm Logo](web-project/public/images/logo.png)

A comprehensive agricultural management system that helps farmers manage their farms, crops, livestock, and analytics through an intuitive web interface.

## 🌟 Features

### Farm Management
- **Farm Registration**: Register and manage multiple farms
- **Location Tracking**: GPS-based farm location management
- **Farm Analytics**: Comprehensive farm performance metrics
- **Multi-farm Support**: Manage multiple farms from a single dashboard

### Crop Management
- **Crop Planning**: Plan and track crop planting schedules
- **Growth Monitoring**: Monitor crop growth stages and health
- **Harvest Tracking**: Track harvest dates and yields
- **Crop Analytics**: Detailed crop performance analysis
- **Global Crop Database**: Access to extensive crop information

### Livestock Management
- **Livestock Tracking**: Track individual animals and herds
- **Health Monitoring**: Monitor livestock health and vaccinations
- **Breeding Records**: Track breeding and birth records
- **Weight Tracking**: Monitor livestock weight and growth
- **Livestock Analytics**: Comprehensive livestock performance metrics

### Weather Integration
- **Real-time Weather**: Current weather conditions for farm locations
- **Weather Forecasts**: 7-day weather forecasts
- **Weather Alerts**: Important weather notifications
- **Weather Analytics**: Historical weather data analysis

### Analytics & Reporting
- **Dashboard Analytics**: Comprehensive farm performance overview
- **Custom Reports**: Generate custom reports and exports
- **Data Visualization**: Interactive charts and graphs
- **Performance Metrics**: Key performance indicators (KPIs)
- **Trend Analysis**: Historical data analysis and trends

### User Management
- **User Authentication**: Secure user registration and login
- **Role-based Access**: Different access levels for users
- **Profile Management**: User profile and preferences
- **Password Security**: Secure password management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git

### Installation

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

6. **Start the development servers**
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

## 🏗️ Architecture

### Frontend
- **Technology**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.2
- **Charts**: Chart.js
- **Maps**: Leaflet
- **PDF Generation**: jsPDF
- **QR Codes**: QRCode.js
- **Service Worker**: Custom implementation for caching

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (development), PostgreSQL (production)
- **ORM**: Sequelize
- **Authentication**: JWT
- **Validation**: express-validator
- **Security**: Helmet, CORS, bcrypt

### Deployment
- **Backend**: Railway
- **Frontend**: Netlify
- **CI/CD**: GitHub Actions
- **Monitoring**: Built-in health checks

## 📁 Project Structure

```
smartfarm/
├── backend-api/                 # Backend API server
│   ├── routes/                  # API route handlers
│   ├── middleware/              # Custom middleware
│   ├── database/                # Database models and migrations
│   ├── lib/                     # Utility libraries
│   ├── tests/                   # Test files
│   └── server.js                # Main server file
├── web-project/                 # Frontend application
│   ├── public/                  # Static files
│   │   ├── css/                 # Stylesheets
│   │   ├── js/                  # JavaScript files
│   │   ├── images/              # Images and assets
│   │   └── dashboard.html       # Main dashboard
│   └── tests/                   # E2E tests
├── docs/                        # Documentation
├── .github/                     # GitHub Actions workflows
└── README.md                    # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=sqlite:smartfarm.db
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
OPENWEATHER_API_KEY=your-api-key
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_OPENWEATHER_API_KEY=your-api-key
VITE_APP_NAME=SmartFarm
VITE_ENVIRONMENT=development
```

## 🧪 Testing

### Backend Testing
```bash
cd backend-api
npm run test              # Run all tests
npm run test:unit         # Run unit tests
npm run test:integration  # Run integration tests
npm run test:coverage     # Run tests with coverage
```

### Frontend Testing
```bash
cd web-project
npm run test              # Run E2E tests
npm run test:ui           # Run tests with UI
npm run test:headed       # Run tests in headed mode
```

## 🚀 Deployment

### Production Deployment

The application is configured for automatic deployment using GitHub Actions:

1. **Backend**: Deploys to Railway on push to `main` branch
2. **Frontend**: Deploys to Netlify on push to `main` branch

### Manual Deployment

#### Backend (Railway)
1. Connect your Railway account
2. Create a new project
3. Connect your GitHub repository
4. Set environment variables
5. Deploy automatically on push

#### Frontend (Netlify)
1. Connect your Netlify account
2. Create a new site
3. Connect your GitHub repository
4. Set build settings
5. Deploy automatically on push

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/change-password` - Change password

### Farm Endpoints
- `GET /api/farms` - Get all farms
- `GET /api/farms/:id` - Get specific farm
- `POST /api/farms` - Create new farm
- `PUT /api/farms/:id` - Update farm
- `DELETE /api/farms/:id` - Delete farm
- `GET /api/farms/analytics` - Get farm analytics

### Crop Endpoints
- `GET /api/crops` - Get all crops
- `GET /api/crops/:id` - Get specific crop
- `POST /api/crops` - Create new crop
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop
- `GET /api/crops/analytics` - Get crop analytics

### Livestock Endpoints
- `GET /api/livestock` - Get all livestock
- `GET /api/livestock/:id` - Get specific livestock
- `POST /api/livestock` - Create new livestock
- `PUT /api/livestock/:id` - Update livestock
- `DELETE /api/livestock/:id` - Delete livestock
- `GET /api/livestock/analytics` - Get livestock analytics

### Health Check
- `GET /api/health` - Application health status

## 🔒 Security

### Implemented Security Features
- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive input validation and sanitization
- **SQL Injection Prevention**: Parameterized queries and validation
- **XSS Protection**: Input sanitization and CSP headers
- **CSRF Protection**: CSRF tokens and same-site cookies
- **Rate Limiting**: API rate limiting
- **Security Headers**: Helmet.js security headers
- **Password Security**: bcrypt password hashing

### Security Best Practices
- Regular dependency updates
- Security scanning in CI/CD
- Environment variable protection
- Secure database connections
- HTTPS enforcement

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Bootstrap 5 responsive grid
- Touch-friendly interface
- Adaptive layouts

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast support
- Focus indicators

### Performance
- Lazy loading
- Image optimization
- Service worker caching
- Code splitting
- Performance monitoring

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

### Code Standards
- Follow ESLint configuration
- Use Prettier for formatting
- Write comprehensive tests
- Document new features
- Follow semantic versioning

### Pull Request Process
1. Update documentation
2. Add tests for new features
3. Ensure CI/CD passes
4. Request code review
5. Address feedback
6. Merge when approved

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- Chart.js team for the powerful charting library
- Leaflet team for the mapping functionality
- All contributors and users of SmartFarm

## 📞 Support

### Getting Help
- Check the [documentation](docs/)
- Search [GitHub Issues](https://github.com/your-username/smartfarm/issues)
- Join our [community discussions](https://github.com/your-username/smartfarm/discussions)

### Reporting Issues
- Use GitHub Issues for bug reports
- Include steps to reproduce
- Provide system information
- Include error logs

### Feature Requests
- Use GitHub Discussions for feature requests
- Describe the use case
- Provide mockups if possible
- Discuss implementation approach

## 🔮 Roadmap

### Upcoming Features
- [ ] Mobile app (React Native)
- [ ] IoT device integration
- [ ] Advanced analytics and AI
- [ ] Multi-language support
- [ ] Offline functionality
- [ ] Advanced reporting
- [ ] Integration with agricultural APIs
- [ ] Machine learning predictions

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Performance optimizations and UX improvements
- **v1.2.0** - Advanced analytics and reporting
- **v2.0.0** - Mobile app and IoT integration (planned)

---

**SmartFarm** - Empowering farmers with technology for better agricultural management.

Made with ❤️ for the farming community.