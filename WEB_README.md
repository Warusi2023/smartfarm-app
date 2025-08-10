# SmartFarm Web Application

A modern, responsive web application for comprehensive farm management built with Kotlin Multiplatform and Compose for Web.

## 🌟 Features

### 🏠 Home Dashboard
- Quick navigation to all major sections
- Overview of farm statistics
- Recent activity feed
- Quick action buttons

### 🐄 Livestock Management
- Complete animal inventory tracking
- Add, edit, and view animal details
- Health status monitoring
- Breed and type categorization
- Age tracking and management

### 🌱 Crop Management
- Comprehensive crop tracking
- Field size and yield management
- Planting date tracking
- Growth status monitoring
- Harvest readiness indicators

### 🌤️ Weather Integration
- Current weather display
- 7-day weather forecast
- Weather alerts and notifications
- Temperature, humidity, wind, and rainfall data
- Weather impact analysis

### 📊 Reports & Analytics
- Multiple report types (Livestock, Crops, Financial, Weather, Activities, Performance)
- Customizable date ranges
- Export functionality (PDF, Excel, CSV)
- Report generation and sharing
- Historical data analysis

### ⚙️ Settings & Configuration
- User profile management
- API key configuration
- Data backup and sync settings
- Notification preferences
- App theme and language settings

## 🚀 Getting Started

### Prerequisites
- Java 11 or higher
- Gradle 7.0 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SmartFarm
   ```

2. **Build the application**
   ```bash
   # Using Gradle directly
   ./gradlew buildWeb
   
   # Or using the provided script (Windows)
   .\run-web.ps1
   ```

3. **Run the application**
   ```bash
   # Using Gradle directly
   ./gradlew runWeb
   
   # Or using the provided script (Windows)
   .\run-web.ps1
   ```

4. **Access the application**
   Open your browser and navigate to: `http://localhost:8080`

## 🏗️ Project Structure

```
SmartFarm/
├── web/                          # Web application module
│   ├── src/main/kotlin/
│   │   └── com/example/smartfarm/web/
│   │       ├── Main.kt           # Application entry point
│   │       ├── App.kt            # Root composable
│   │       └── ui/
│   │           ├── theme/        # UI theme and styling
│   │           ├── navigation/   # Navigation components
│   │           └── screens/      # Screen implementations
│   └── src/main/resources/      # Static resources
├── shared/                       # Shared code module
├── build.gradle.kts             # Root build configuration
├── web/build.gradle.kts         # Web module configuration
└── run-web.ps1                  # Windows run script
```

## 🎨 UI Components

### Theme System
- Consistent color palette
- Responsive design
- Modern card-based layout
- Hover effects and transitions

### Navigation
- Top navigation bar
- Responsive mobile menu
- Active state indicators
- Smooth transitions

### Data Management
- Modal dialogs for data entry
- Form validation
- Real-time updates
- Search and filtering

## 🔧 Configuration

### API Keys
Configure the following API keys in the Settings screen:

1. **Weather API Key** - For weather data and forecasts
2. **Google Maps API Key** - For location services
3. **OpenAI API Key** - For AI-powered features

### Data Management
- Enable automatic backups
- Configure cloud synchronization
- Set notification preferences
- Manage data export/import

## 📱 Progressive Web App (PWA)

The application includes PWA features:
- Installable on mobile devices
- Offline functionality
- Push notifications
- App-like experience

## 🛠️ Development

### Building for Production
```bash
./gradlew buildWeb
```

### Development Mode
```bash
./gradlew runWeb
```

### Code Structure
- **Composable Functions**: All UI components are built using Compose for Web
- **State Management**: Uses Compose state for reactive UI updates
- **Navigation**: Custom navigation system with route management
- **Styling**: CSS-in-Kotlin approach with theme system

### Adding New Features
1. Create new screen in `web/src/main/kotlin/com/example/smartfarm/web/ui/screens/`
2. Add navigation route in `Navigation.kt`
3. Update theme if needed in `Theme.kt`
4. Add any new data models as needed

## 🧪 Testing

### Manual Testing
- Test all CRUD operations for livestock and crops
- Verify weather data display
- Check report generation
- Test settings persistence
- Verify responsive design on different screen sizes

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Static Hosting
The built application can be deployed to any static hosting service:

1. **Netlify**
   ```bash
   ./gradlew buildWeb
   # Deploy the contents of web/build/distributions/web/
   ```

2. **Vercel**
   ```bash
   ./gradlew buildWeb
   # Deploy the contents of web/build/distributions/web/
   ```

3. **GitHub Pages**
   ```bash
   ./gradlew buildWeb
   # Push the contents of web/build/distributions/web/ to gh-pages branch
   ```

### Docker Deployment
```dockerfile
FROM nginx:alpine
COPY web/build/distributions/web/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📊 Performance

### Optimization Features
- Lazy loading of components
- Efficient state management
- Optimized bundle size
- Responsive image loading
- Caching strategies

### Bundle Analysis
- Main bundle: ~2MB
- Initial load time: <3 seconds
- Time to interactive: <5 seconds

## 🔒 Security

### Data Protection
- Client-side data validation
- Secure API key storage
- HTTPS enforcement
- XSS protection
- CSRF protection

### Privacy
- No data collection without consent
- Local data storage options
- Secure data transmission
- User data control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Common Issues

**Build fails with Gradle errors**
- Ensure you have Java 11+ installed
- Update Gradle to latest version
- Clear Gradle cache: `./gradlew clean`

**Application doesn't start**
- Check if port 8080 is available
- Verify all dependencies are resolved
- Check browser console for errors

**API features not working**
- Verify API keys are configured in Settings
- Check network connectivity
- Review browser console for API errors

### Getting Help
- Check the documentation
- Review existing issues
- Create a new issue with detailed information
- Contact the development team

## 🔄 Updates

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added PWA support and offline functionality
- **v1.2.0** - Enhanced reporting and analytics
- **v1.3.0** - Improved UI/UX and performance optimizations

### Upcoming Features
- Advanced analytics dashboard
- Machine learning predictions
- Integration with IoT devices
- Mobile app companion
- Multi-language support

---

**SmartFarm Web Application** - Making farm management simple and efficient! 🌾 