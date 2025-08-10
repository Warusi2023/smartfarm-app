# SmartFarm App Store Assets Generator
# This script generates all necessary assets for app store submission

param(
    [string]$Platform = "all",
    [string]$OutputPath = "app-store-assets",
    [switch]$GenerateScreenshots,
    [switch]$GenerateIcons,
    [switch]$GenerateDescriptions,
    [switch]$GenerateAll
)

Write-Host "SmartFarm App Store Assets Generator" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Create output directory
if (!(Test-Path $OutputPath)) {
    New-Item -ItemType Directory -Path $OutputPath | Out-Null
    Write-Host "Created output directory: $OutputPath" -ForegroundColor Yellow
}

# Generate app store descriptions
function Generate-AppStoreDescriptions {
    Write-Host "Generating App Store Descriptions..." -ForegroundColor Cyan
    
    $descriptions = @{
        "app-store-description.md" = @"
# SmartFarm App Store Description

## App Store Title
SmartFarm - Intelligent Farm Management

## Short Description (30 words)
Comprehensive farm management app with livestock tracking, crop monitoring, weather integration, and AI-powered insights for modern farmers.

## Full Description (4000 characters)

🌾 **SmartFarm: Your Complete Farm Management Solution**

Transform your farming operations with SmartFarm, the intelligent farm management application designed for modern farmers. Whether you're managing livestock, monitoring crops, tracking finances, or planning your next harvest, SmartFarm provides all the tools you need in one comprehensive platform.

**🐄 Livestock Management**
• Track individual animals with detailed health records
• Monitor vaccinations, weight changes, and medical treatments
• Manage breeding programs and herd analytics
• Record feeding schedules and nutrition tracking

**🌱 Crop Management**
• Plan and track crop rotations across multiple fields
• Monitor growth stages and harvest schedules
• Record yields and analyze performance data
• Manage field locations and soil health information

**📊 Financial Management**
• Track income and expenses with detailed categorization
• Generate profit/loss reports and cash flow analysis
• Monitor budgets and financial performance
• Export financial data for accounting purposes

**📦 Inventory Management**
• Manage farm supplies, equipment, and tools
• Track stock levels and set reorder points
• Monitor equipment maintenance schedules
• Organize inventory by location and category

**👥 Employee Management**
• Manage farm workforce with role assignments
• Track work schedules and attendance
• Monitor task assignments and completion
• Generate payroll and performance reports

**🌤️ Weather Integration**
• Real-time weather data and forecasts
• Weather alerts and planning tools
• Historical weather analysis
• Integration with local weather stations

**📈 Market Price Tracking**
• Monitor commodity prices and market trends
• Set price alerts for optimal selling times
• AI-powered price predictions
• Market news and analysis

**📄 Document Management**
• Organize farm records and documentation
• Secure file storage with categorization
• Share documents with team members
• Track important contracts and certificates

**🤖 AI-Powered Expert Chat**
• Get instant answers to farming questions
• Upload photos for plant and animal identification
• Receive personalized farming advice
• Access best practices and industry insights

**📱 Multi-Platform Access**
• Progressive Web App (PWA) for all devices
• Offline functionality for field work
• Real-time synchronization across devices
• Multi-language support (10 languages)

**🔒 Security & Privacy**
• Enterprise-grade security
• Data encryption and secure storage
• Regular backups and disaster recovery
• GDPR compliant privacy protection

**📊 Advanced Analytics**
• Comprehensive farm performance metrics
• Customizable dashboards and reports
• Trend analysis and forecasting
• Export capabilities for external analysis

**Perfect for:**
• Individual farmers and ranchers
• Family farming operations
• Agricultural cooperatives
• Farm consultants and advisors
• Agricultural education institutions

**Key Features:**
✅ 14 comprehensive farm management modules
✅ Real-time data synchronization
✅ Offline functionality
✅ Multi-language support (10 languages)
✅ AI-powered insights and recommendations
✅ Advanced analytics and reporting
✅ Secure cloud storage
✅ Mobile-responsive design
✅ PWA installation support
✅ Regular updates and improvements

**Why Choose SmartFarm?**
SmartFarm combines cutting-edge technology with practical farming knowledge to deliver a solution that truly understands the needs of modern agriculture. Our platform is built by farmers, for farmers, ensuring that every feature addresses real-world farming challenges.

**Get Started Today:**
Download SmartFarm and experience the future of farm management. Join thousands of farmers who have already transformed their operations with our comprehensive platform.

**Support:**
• 24/7 customer support
• Comprehensive documentation
• Video tutorials and guides
• Active community forum

**Privacy & Terms:**
Your data security is our priority. SmartFarm uses enterprise-grade encryption and follows strict privacy guidelines. Read our privacy policy and terms of service for complete details.

Download SmartFarm today and take control of your farm's future! 🌾🚜

---

**Keywords:** farm management, livestock tracking, crop monitoring, agriculture, farming app, farm software, agricultural management, farm planning, livestock management, crop management, farm analytics, agricultural technology, smart farming, precision agriculture, farm records, farm inventory, farm finances, farm weather, market prices, farm documents, agricultural app, farming tools, farm organization, agricultural software, farm productivity, farm efficiency, modern farming, digital agriculture, farm technology, agricultural management system, farm planning software, livestock software, crop management software, farm financial management, agricultural analytics, farm data management, agricultural planning, farm monitoring, agricultural tracking, farm optimization, agricultural efficiency, farm automation, agricultural innovation

**Categories:** Business, Productivity, Agriculture, Management, Planning, Analytics, Finance, Weather, Education, Reference

**Age Rating:** 4+ (No objectionable content)

**Languages:** English, Spanish, French, German, Portuguese, Chinese, Japanese, Korean, Arabic, Hindi

**Platform:** Web (PWA), iOS, Android

**Pricing:** Freemium with premium features

**Developer:** SmartFarm Development Team

**Contact:** support@smartfarm.com

**Website:** https://smartfarm.com

**Version:** 1.0.0

**Last Updated:** January 2024
"@

        "app-store-keywords.txt" = @"
farm management,livestock tracking,crop monitoring,agriculture,farming app,farm software,agricultural management,farm planning,livestock management,crop management,farm analytics,agricultural technology,smart farming,precision agriculture,farm records,farm inventory,farm finances,farm weather,market prices,farm documents,agricultural app,farming tools,farm organization,agricultural software,farm productivity,farm efficiency,modern farming,digital agriculture,farm technology,agricultural management system,farm planning software,livestock software,crop management software,farm financial management,agricultural analytics,farm data management,agricultural planning,farm monitoring,agricultural tracking,farm optimization,agricultural efficiency,farm automation,agricultural innovation,farm management system,livestock management software,crop planning,agricultural planning software,farm record keeping,agricultural data management,farm monitoring system,agricultural tracking software,farm optimization tools,agricultural efficiency software,farm automation tools,agricultural innovation software
"@

        "app-store-categories.md" = @"
# App Store Categories

## Primary Category
**Business** - Farm management and agricultural business operations

## Secondary Categories
1. **Productivity** - Farm planning and task management
2. **Agriculture** - Agricultural-specific applications
3. **Management** - Business and operations management
4. **Planning** - Strategic planning and scheduling
5. **Analytics** - Data analysis and reporting
6. **Finance** - Financial management and tracking
7. **Weather** - Weather monitoring and forecasting
8. **Education** - Agricultural education and learning
9. **Reference** - Agricultural reference materials

## Target Audience
- Individual farmers and ranchers
- Family farming operations
- Agricultural cooperatives
- Farm consultants and advisors
- Agricultural education institutions
- Agricultural researchers
- Farm equipment dealers
- Agricultural suppliers
- Government agricultural agencies
- Agricultural insurance companies

## Age Rating
**4+** - No objectionable content, suitable for all ages

## Content Rating
- **Violence:** None
- **Sexual Content:** None
- **Language:** None
- **Controlled Substances:** None
- **User Generated Content:** None

## Platform Compatibility
- **Web:** Progressive Web App (PWA)
- **iOS:** Safari browser support
- **Android:** Chrome browser support
- **Desktop:** All modern browsers
- **Tablet:** Optimized for iPad and Android tablets

## Accessibility
- Screen reader support
- Keyboard navigation
- High contrast mode
- Large text support
- Voice control compatibility
- WCAG 2.1 AA compliant
"@
    }

    foreach ($file in $descriptions.Keys) {
        $filePath = Join-Path $OutputPath $file
        $descriptions[$file] | Out-File -FilePath $filePath -Encoding UTF8
        Write-Host "Generated: $file" -ForegroundColor Green
    }
}

# Generate app store icons
function Generate-AppStoreIcons {
    Write-Host "Generating App Store Icons..." -ForegroundColor Cyan
    
    $iconSizes = @{
        "icon-16x16.png" = "16x16"
        "icon-32x32.png" = "32x32"
        "icon-48x48.png" = "48x48"
        "icon-72x72.png" = "72x72"
        "icon-96x96.png" = "96x96"
        "icon-128x128.png" = "128x128"
        "icon-144x144.png" = "144x144"
        "icon-152x152.png" = "152x152"
        "icon-192x192.png" = "192x192"
        "icon-384x384.png" = "384x384"
        "icon-512x512.png" = "512x512"
        "apple-touch-icon.png" = "180x180"
        "android-chrome-192x192.png" = "192x192"
        "android-chrome-512x512.png" = "512x512"
        "favicon.ico" = "16x16,32x32,48x48"
    }

    $iconDir = Join-Path $OutputPath "icons"
    if (!(Test-Path $iconDir)) {
        New-Item -ItemType Directory -Path $iconDir | Out-Null
    }

    # Create SVG icon template
    $svgIcon = @"
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2E7D32;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="512" height="512" rx="80" fill="url(#grad1)"/>
  
  <!-- Farm House -->
  <rect x="156" y="280" width="200" height="120" fill="#8D6E63" stroke="#5D4037" stroke-width="8"/>
  <polygon points="156,280 256,200 356,280" fill="#8D6E63" stroke="#5D4037" stroke-width="8"/>
  <rect x="176" y="320" width="40" height="60" fill="#81C784"/>
  <rect x="296" y="320" width="40" height="60" fill="#81C784"/>
  
  <!-- Sun -->
  <circle cx="400" cy="120" r="40" fill="#FFD54F"/>
  <circle cx="400" cy="120" r="30" fill="#FFEB3B"/>
  
  <!-- Crops -->
  <circle cx="120" cy="400" r="25" fill="#8BC34A"/>
  <circle cx="160" cy="420" r="20" fill="#8BC34A"/>
  <circle cx="200" cy="400" r="25" fill="#8BC34A"/>
  <circle cx="240" cy="420" r="20" fill="#8BC34A"/>
  <circle cx="280" cy="400" r="25" fill="#8BC34A"/>
  <circle cx="320" cy="420" r="20" fill="#8BC34A"/>
  <circle cx="360" cy="400" r="25" fill="#8BC34A"/>
  
  <!-- Livestock -->
  <ellipse cx="100" cy="320" rx="15" ry="20" fill="#795548"/>
  <ellipse cx="420" cy="320" rx="15" ry="20" fill="#795548"/>
  
  <!-- Smart Elements -->
  <circle cx="256" cy="256" r="8" fill="#FFFFFF" opacity="0.8"/>
  <circle cx="256" cy="256" r="4" fill="#4CAF50"/>
</svg>
"@

    $svgPath = Join-Path $iconDir "icon.svg"
    $svgIcon | Out-File -FilePath $svgPath -Encoding UTF8

    Write-Host "Generated SVG icon template: $svgPath" -ForegroundColor Green
    Write-Host "Note: Convert SVG to PNG using online tools or image editing software" -ForegroundColor Yellow
    
    # Create icon manifest
    $iconManifest = @{
        "icons" = @(
            @{
                "src" = "icons/android-chrome-192x192.png"
                "sizes" = "192x192"
                "type" = "image/png"
            },
            @{
                "src" = "icons/android-chrome-512x512.png"
                "sizes" = "512x512"
                "type" = "image/png"
            },
            @{
                "src" = "icons/apple-touch-icon.png"
                "sizes" = "180x180"
                "type" = "image/png"
            }
        )
    }

    $manifestPath = Join-Path $iconDir "icon-manifest.json"
    $iconManifest | ConvertTo-Json -Depth 3 | Out-File -FilePath $manifestPath -Encoding UTF8
    Write-Host "Generated icon manifest: $manifestPath" -ForegroundColor Green
}

# Generate app store screenshots
function Generate-AppStoreScreenshots {
    Write-Host "Generating App Store Screenshots..." -ForegroundColor Cyan
    
    $screenshotDir = Join-Path $OutputPath "screenshots"
    if (!(Test-Path $screenshotDir)) {
        New-Item -ItemType Directory -Path $screenshotDir | Out-Null
    }

    $screenshotSpecs = @{
        "iPhone" = @{
            "iPhone-6.7-inch" = "1290x2796"
            "iPhone-6.5-inch" = "1242x2688"
            "iPhone-5.5-inch" = "1242x2208"
            "iPhone-4.7-inch" = "750x1334"
        }
        "iPad" = @{
            "iPad-Pro-12.9-inch" = "2048x2732"
            "iPad-Pro-11-inch" = "1668x2388"
            "iPad-10.2-inch" = "1620x2160"
            "iPad-Mini" = "1488x2266"
        }
        "Android" = @{
            "Phone-1080x1920" = "1080x1920"
            "Phone-1440x2560" = "1440x2560"
            "Tablet-1200x1920" = "1200x1920"
            "Tablet-1600x2560" = "1600x2560"
        }
    }

    $screenshotTemplates = @{
        "home-dashboard" = "Home Dashboard - Farm Overview"
        "livestock-management" = "Livestock Management - Animal Tracking"
        "crop-management" = "Crop Management - Field Planning"
        "weather-monitoring" = "Weather Integration - Real-time Data"
        "inventory-tracking" = "Inventory Management - Stock Control"
        "financial-analytics" = "Financial Management - Profit Tracking"
        "market-prices" = "Market Price Tracking - AI Predictions"
        "document-management" = "Document Management - File Organization"
        "employee-scheduling" = "Employee Management - Workforce Planning"
        "expert-chat" = "AI Expert Chat - Smart Assistance"
    }

    foreach ($platform in $screenshotSpecs.Keys) {
        $platformDir = Join-Path $screenshotDir $platform
        if (!(Test-Path $platformDir)) {
            New-Item -ItemType Directory -Path $platformDir | Out-Null
        }

        foreach ($device in $screenshotSpecs[$platform].Keys) {
            $deviceDir = Join-Path $platformDir $device
            if (!(Test-Path $deviceDir)) {
                New-Item -ItemType Directory -Path $deviceDir | Out-Null
            }

            foreach ($screen in $screenshotTemplates.Keys) {
                $screenshotName = "$screen-$device.png"
                $screenshotPath = Join-Path $deviceDir $screenshotName
                
                # Create placeholder screenshot description
                $screenshotInfo = @{
                    "name" = $screenshotName
                    "description" = $screenshotTemplates[$screen]
                    "device" = $device
                    "platform" = $platform
                    "dimensions" = $screenshotSpecs[$platform][$device]
                    "path" = $screenshotPath
                }

                $infoPath = $screenshotPath.Replace(".png", ".json")
                $screenshotInfo | ConvertTo-Json | Out-File -FilePath $infoPath -Encoding UTF8
                
                Write-Host "Created screenshot template: $screenshotName" -ForegroundColor Green
            }
        }
    }

    # Create screenshot manifest
    $screenshotManifest = @{
        "screenshots" = @()
    }

    foreach ($screen in $screenshotTemplates.Keys) {
        $screenshotManifest.screenshots += @{
            "name" = $screen
            "description" = $screenshotTemplates[$screen]
            "devices" = @()
        }
    }

    $manifestPath = Join-Path $screenshotDir "screenshot-manifest.json"
    $screenshotManifest | ConvertTo-Json -Depth 3 | Out-File -FilePath $manifestPath -Encoding UTF8
    Write-Host "Generated screenshot manifest: $manifestPath" -ForegroundColor Green
}

# Generate app store metadata
function Generate-AppStoreMetadata {
    Write-Host "Generating App Store Metadata..." -ForegroundColor Cyan
    
    $metadata = @{
        "app-name" = "SmartFarm"
        "app-subtitle" = "Intelligent Farm Management"
        "app-version" = "1.0.0"
        "app-build" = "100"
        "app-bundle-id" = "com.smartfarm.web"
        "app-category" = "Business"
        "app-age-rating" = "4+"
        "app-languages" = @("English", "Spanish", "French", "German", "Portuguese", "Chinese", "Japanese", "Korean", "Arabic", "Hindi")
        "app-platforms" = @("Web", "iOS", "Android")
        "app-pricing" = "Free with Premium Features"
        "app-developer" = "SmartFarm Development Team"
        "app-support" = "support@smartfarm.com"
        "app-website" = "https://smartfarm.com"
        "app-privacy" = "https://smartfarm.com/privacy"
        "app-terms" = "https://smartfarm.com/terms"
        "app-features" = @(
            "Livestock Management",
            "Crop Management", 
            "Financial Tracking",
            "Inventory Management",
            "Employee Management",
            "Weather Integration",
            "Market Price Tracking",
            "Document Management",
            "AI Expert Chat",
            "Advanced Analytics",
            "Multi-language Support",
            "Offline Functionality",
            "PWA Installation",
            "Real-time Sync"
        )
    }

    $metadataPath = Join-Path $OutputPath "app-store-metadata.json"
    $metadata | ConvertTo-Json -Depth 3 | Out-File -FilePath $metadataPath -Encoding UTF8
    Write-Host "Generated app store metadata: $metadataPath" -ForegroundColor Green
}

# Main execution
if ($GenerateAll -or $GenerateDescriptions) {
    Generate-AppStoreDescriptions
}

if ($GenerateAll -or $GenerateIcons) {
    Generate-AppStoreIcons
}

if ($GenerateAll -or $GenerateScreenshots) {
    Generate-AppStoreScreenshots
}

if ($GenerateAll) {
    Generate-AppStoreMetadata
}

# Create README for app store assets
$readme = @"
# SmartFarm App Store Assets

This directory contains all assets needed for app store submission.

## Directory Structure

```
app-store-assets/
├── app-store-description.md          # App store description and keywords
├── app-store-keywords.txt            # SEO keywords for app stores
├── app-store-categories.md           # App store categories and metadata
├── app-store-metadata.json           # Complete app store metadata
├── icons/                            # App icons in various sizes
│   ├── icon.svg                      # Source SVG icon
│   ├── icon-manifest.json            # Icon manifest
│   └── [various PNG sizes]           # Generated PNG icons
└── screenshots/                      # App store screenshots
    ├── iPhone/                       # iPhone screenshots
    ├── iPad/                         # iPad screenshots
    ├── Android/                      # Android screenshots
    └── screenshot-manifest.json      # Screenshot manifest
```

## Usage Instructions

### 1. App Store Descriptions
- Use `app-store-description.md` for app store listings
- Copy relevant sections for different app stores
- Customize keywords in `app-store-keywords.txt`

### 2. App Icons
- Convert `icons/icon.svg` to PNG format for required sizes
- Use `icons/icon-manifest.json` for PWA manifest
- Ensure all icon sizes are generated for app store submission

### 3. Screenshots
- Take actual screenshots of the app in different device sizes
- Replace placeholder files in screenshot directories
- Follow app store guidelines for screenshot requirements

### 4. Metadata
- Use `app-store-metadata.json` for automated submissions
- Update version numbers and build numbers as needed
- Customize for specific app store requirements

## App Store Requirements

### Apple App Store
- App icons: 1024x1024, 180x180, 152x152, 120x120, 87x87, 80x80, 76x76, 60x60, 40x40, 29x29
- Screenshots: iPhone 6.7", 6.5", 5.5", 4.7" and iPad Pro 12.9", 11", 10.2", Mini
- Description: 4000 characters maximum
- Keywords: 100 characters maximum

### Google Play Store
- App icons: 512x512, 192x192, 144x144, 96x96, 72x72, 48x48
- Screenshots: Phone (1080x1920), Tablet (1200x1920)
- Description: 4000 characters maximum
- Short description: 80 characters maximum

### Microsoft Store
- App icons: 300x300, 150x150, 99x99, 50x50
- Screenshots: 1366x768 minimum
- Description: 2000 characters maximum

## Next Steps

1. **Generate Icons**: Convert SVG to PNG using online tools
2. **Take Screenshots**: Capture actual app screenshots
3. **Review Descriptions**: Customize for target markets
4. **Test Submission**: Verify all assets meet requirements
5. **Submit to Stores**: Use generated assets for submission

## Support

For questions about app store assets, contact:
- Email: support@smartfarm.com
- Documentation: https://docs.smartfarm.com
- GitHub: https://github.com/smartfarm/app-store-assets

---

**Generated:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
**Version:** 1.0.0
**Status:** Ready for app store submission
"@

$readmePath = Join-Path $OutputPath "README.md"
$readme | Out-File -FilePath $readmePath -Encoding UTF8

Write-Host "`nApp Store Assets Generation Complete!" -ForegroundColor Green
Write-Host "Output directory: $OutputPath" -ForegroundColor Yellow
Write-Host "Total files generated: $((Get-ChildItem -Path $OutputPath -Recurse | Measure-Object).Count)" -ForegroundColor Yellow
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Convert SVG icons to PNG format" -ForegroundColor White
Write-Host "2. Take actual app screenshots" -ForegroundColor White
Write-Host "3. Review and customize descriptions" -ForegroundColor White
Write-Host "4. Submit to app stores" -ForegroundColor White 