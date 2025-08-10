# SmartFarm Web Application - Deployment & Usage Guide

## 🚀 Overview

SmartFarm is a comprehensive farm management web application built with Kotlin Multiplatform and Compose for Web. This guide covers deployment, configuration, and usage instructions.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Production Deployment](#production-deployment)
4. [Configuration](#configuration)
5. [Usage Guide](#usage-guide)
6. [Troubleshooting](#troubleshooting)
7. [API Integration](#api-integration)
8. [Mobile Optimization](#mobile-optimization)

## 🔧 Prerequisites

### Required Software
- **Java 17** or higher
- **Node.js 16** or higher
- **Git** for version control
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Optional Software
- **IntelliJ IDEA** or **Android Studio** for development
- **Docker** for containerized deployment
- **PostgreSQL** for production database

## 🏠 Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smartfarm.git
cd smartfarm
```

### 2. Build the Application
```bash
# Build the web application
./gradlew :web:build

# Or use the deployment script
powershell -ExecutionPolicy Bypass -File "deploy-web.ps1" -Platform "local" -BuildOnly
```

### 3. Start Development Server
```bash
# Start local development server
powershell -ExecutionPolicy Bypass -File "deploy-web.ps1" -Platform "local"

# Or manually
./gradlew :web:run
```

The application will be available at: **http://localhost:8080**

## 🌐 Production Deployment

### Option 1: Netlify Deployment

1. **Build for Production**
```bash
./gradlew :web:build
```

2. **Deploy to Netlify**
```bash
# Using the deployment script
powershell -ExecutionPolicy Bypass -File "deploy-web.ps1" -Platform "netlify"

# Or manually upload the build folder
# The build output is in: web/build/distributions/
```

3. **Configure Netlify**
- Build command: `./gradlew :web:build`
- Publish directory: `web/build/distributions/`
- Environment variables: Set in Netlify dashboard

### Option 2: Vercel Deployment

1. **Deploy to Vercel**
```bash
# Using the deployment script
powershell -ExecutionPolicy Bypass -File "deploy-web.ps1" -Platform "vercel"

# Or using Vercel CLI
vercel --prod
```

2. **Configure Vercel**
- Framework preset: Other
- Build command: `./gradlew :web:build`
- Output directory: `web/build/distributions/`

### Option 3: GitHub Pages

1. **Deploy to GitHub Pages**
```bash
# Using the deployment script
powershell -ExecutionPolicy Bypass -File "deploy-web.ps1" -Platform "github-pages"
```

2. **Configure GitHub Actions**
The repository includes a GitHub Actions workflow for automatic deployment.

### Option 4: Docker Deployment

1. **Build Docker Image**
```bash
docker build -t smartfarm-web .
```

2. **Run Container**
```bash
docker run -p 8080:8080 smartfarm-web
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# API Configuration
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
OPENAI_API_KEY=your_openai_api_key

# Database Configuration (if using)
DATABASE_URL=postgresql://username:password@localhost:5432/smartfarm
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password

# Application Configuration
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
```

### API Keys Setup

1. **Google Maps API**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Create API key with appropriate restrictions

2. **OpenWeather API**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your API key from the dashboard

3. **OpenAI API**
   - Sign up at [OpenAI](https://platform.openai.com/)
   - Generate API key in your account settings

### Configuration Script

Run the configuration script to set up API keys:

```bash
powershell -ExecutionPolicy Bypass -File "setup-api-keys.ps1"
```

## 📖 Usage Guide

### 🏠 Home Dashboard

The home screen provides an overview of your farm operations:

- **Quick Stats**: View key metrics at a glance
- **Recent Activity**: See latest farm activities
- **Weather Widget**: Current weather conditions
- **Quick Actions**: Access frequently used features

### 🐄 Livestock Management

Track and manage your livestock:

1. **Add New Animal**
   - Click "Add Animal" button
   - Fill in animal details (ID, type, breed, etc.)
   - Set health status and notes

2. **View Animal Details**
   - Click on any animal card
   - View detailed information
   - Update health records

3. **Health Monitoring**
   - Track vaccinations
   - Monitor weight changes
   - Record medical treatments

### 🌾 Crop Management

Manage your crop operations:

1. **Add New Crop**
   - Select crop type
   - Set planting date
   - Define field location

2. **Track Growth**
   - Monitor growth stages
   - Record harvest dates
   - Track yields

3. **Field Management**
   - View field status
   - Plan crop rotation
   - Monitor soil health

### 📦 Inventory Management

Manage farm supplies and equipment:

1. **Add Inventory Item**
   - Click "Add Item" button
   - Select category (supplies, equipment, tools, machinery)
   - Set quantity and location

2. **Track Stock Levels**
   - Monitor low stock items
   - Set reorder points
   - Track usage patterns

3. **Equipment Management**
   - Record equipment status
   - Schedule maintenance
   - Track utilization

### 👥 Employee Management

Manage your farm workforce:

1. **Add Employee**
   - Fill in personal details
   - Assign role and department
   - Set hire date

2. **Schedule Management**
   - View weekly schedules
   - Assign shifts
   - Track attendance

3. **Role Management**
   - Define job responsibilities
   - Set salary ranges
   - Manage permissions

### 📈 Market Price Tracking

Monitor market conditions:

1. **View Price Trends**
   - Select product category
   - Choose timeframe
   - Analyze price movements

2. **Set Price Alerts**
   - Create price thresholds
   - Receive notifications
   - Track market news

3. **AI Predictions**
   - View price forecasts
   - Check confidence levels
   - Plan sales strategy

### 📄 Document Management

Organize farm records:

1. **Upload Documents**
   - Drag and drop files
   - Categorize documents
   - Add descriptions

2. **Search and Filter**
   - Search by name or content
   - Filter by category
   - Sort by date or size

3. **Document Organization**
   - Mark important documents
   - Share with team members
   - Track document versions

### 💰 Financial Management

Track farm finances:

1. **Income Tracking**
   - Record sales
   - Track revenue sources
   - Monitor cash flow

2. **Expense Management**
   - Log expenses
   - Categorize costs
   - Track budgets

3. **Financial Reports**
   - Generate profit/loss statements
   - View cash flow reports
   - Analyze trends

### ✅ Task Management

Organize farm tasks:

1. **Create Tasks**
   - Set task title and description
   - Assign priority and due date
   - Assign to team members

2. **Track Progress**
   - Update task status
   - Add comments
   - Mark as complete

3. **Task Categories**
   - Organize by type
   - Set recurring tasks
   - Track completion rates

### 🤖 Expert Chat

Get AI-powered farm advice:

1. **Ask Questions**
   - Type your farm-related questions
   - Get instant expert advice
   - Access best practices

2. **Upload Images**
   - Share photos of crops or animals
   - Get visual analysis
   - Identify issues

3. **Save Conversations**
   - Keep track of advice
   - Reference previous solutions
   - Build knowledge base

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clean and rebuild
./gradlew clean
./gradlew :web:build

# Check Java version
java -version

# Verify Node.js installation
node --version
```

#### API Integration Issues
- Verify API keys are correctly set
- Check API quotas and limits
- Ensure proper CORS configuration

#### Performance Issues
- Enable browser caching
- Optimize images
- Use CDN for static assets

### Error Logs

Check the browser console for JavaScript errors:
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages

### Support

For additional support:
- Check the [GitHub Issues](https://github.com/your-username/smartfarm/issues)
- Review the [API Documentation](API_DOCUMENTATION.md)
- Contact the development team

## 🔌 API Integration

### Available APIs

1. **Weather API**
   - Current weather conditions
   - 7-day forecast
   - Weather alerts

2. **Google Maps API**
   - Field mapping
   - Location services
   - Route planning

3. **OpenAI API**
   - Expert chat functionality
   - Image analysis
   - Predictive analytics

### Custom API Development

To add custom APIs:

1. **Create API Endpoints**
```kotlin
// Example API endpoint
@GET("/api/crops")
suspend fun getCrops(): List<Crop>
```

2. **Add to Frontend**
```kotlin
// Example API call
val crops = apiService.getCrops()
```

3. **Update UI Components**
```kotlin
// Example UI update
crops.forEach { crop ->
    CropCard(crop)
}
```

## 📱 Mobile Optimization

### PWA Features

The application includes Progressive Web App (PWA) features:

- **Offline Support**: Access core features without internet
- **Install Prompt**: Install as native app
- **Push Notifications**: Receive alerts and updates
- **Responsive Design**: Optimized for all screen sizes

### Mobile Usage

1. **Install PWA**
   - Visit the web app on mobile
   - Tap "Add to Home Screen"
   - Access like a native app

2. **Offline Mode**
   - Core data cached locally
   - Sync when connection restored
   - Work without internet

3. **Touch Optimization**
   - Large touch targets
   - Swipe gestures
   - Mobile-friendly navigation

## 🔒 Security Considerations

### Data Protection
- All data encrypted in transit
- Secure API key storage
- Regular security updates

### Access Control
- Role-based permissions
- User authentication
- Audit logging

### Privacy
- GDPR compliance
- Data retention policies
- User consent management

## 📈 Performance Optimization

### Loading Speed
- Code splitting
- Lazy loading
- Image optimization

### Caching Strategy
- Browser caching
- Service worker caching
- CDN distribution

### Monitoring
- Performance metrics
- Error tracking
- User analytics

## 🚀 Future Enhancements

### Planned Features
- [ ] Advanced analytics dashboard
- [ ] IoT device integration
- [ ] Machine learning predictions
- [ ] Multi-language support
- [ ] Advanced reporting
- [ ] Mobile app versions

### Contributing
- Fork the repository
- Create feature branch
- Submit pull request
- Follow coding standards

---

## 📞 Support & Contact

For questions, issues, or feature requests:

- **GitHub Issues**: [Create an issue](https://github.com/your-username/smartfarm/issues)
- **Email**: support@smartfarm.com
- **Documentation**: [Full Documentation](https://docs.smartfarm.com)

---

**SmartFarm Web Application** - Making farm management smarter, one field at a time! 🌾🚜 