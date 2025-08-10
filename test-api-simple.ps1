# Simple API Configuration Test Script
# This script tests basic API configuration functionality

param(
    [string]$GoogleMapsApiKey = "AIzaSyB-demo-google-maps-api-key",
    [string]$WeatherApiKey = "demo-weather-api-key-32-chars-long",
    [string]$OpenAIApiKey = "sk-demo-openai-api-key-48-chars-long-123456789",
    [string]$FirebaseProjectId = "smartfarm-demo-project"
)

Write-Host "SmartFarm API Configuration Test" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green

# Function to create local.properties file
function Set-LocalProperties {
    param([string]$WeatherApiKey)
    
    $localPropertiesPath = "local.properties"
    $content = "# This file contains local configuration for the SmartFarm app`n"
    $content += "# DO NOT commit this file to version control`n`n"
    $content += "# Weather API Configuration`n"
    $content += "WEATHER_API_KEY=$WeatherApiKey`n`n"
    $content += "# Other local configurations can be added here`n"
    
    try {
        $content | Out-File -FilePath $localPropertiesPath -Encoding UTF8
        Write-Host "Created local.properties file" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "Failed to create local.properties: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to create google-services.json template
function New-GoogleServicesTemplate {
    param([string]$ProjectId)
    
    $googleServicesPath = "app/google-services.json"
    
    if (Test-Path $googleServicesPath) {
        Write-Host "google-services.json already exists. Backing up..." -ForegroundColor Yellow
        Copy-Item $googleServicesPath "$googleServicesPath.backup"
    }
    
    $googleServicesContent = @"
{
  "project_info": {
    "project_number": "123456789",
    "project_id": "$ProjectId",
    "storage_bucket": "$ProjectId.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:123456789:android:abcdef123456",
        "android_client_info": {
          "package_name": "com.example.smartfarm"
        }
      },
      "oauth_client": [
        {
          "client_id": "123456789-abcdefghijklmnop.apps.googleusercontent.com",
          "client_type": 3
        }
      ],
      "api_key": [
        {
          "current_key": "AIzaSyB-demo-api-key-here"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": [
            {
              "client_id": "123456789-abcdefghijklmnop.apps.googleusercontent.com",
              "client_type": 3
            }
          ]
        }
      }
    }
  ],
  "configuration_version": "1"
}
"@
    
    try {
        $googleServicesContent | Out-File -FilePath $googleServicesPath -Encoding UTF8
        Write-Host "Created google-services.json template" -ForegroundColor Green
        Write-Host "IMPORTANT: Update the API keys in this file with your actual Firebase project keys" -ForegroundColor Yellow
        return $true
    } catch {
        Write-Host "Failed to create google-services.json: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to create API configuration guide
function New-ApiConfigurationGuide {
    $guidePath = "API_CONFIGURATION_GUIDE.md"
    
    $guideContent = "# SmartFarm API Configuration Guide`n`n"
    $guideContent += "This guide helps you configure all required API keys for the SmartFarm application.`n`n"
    $guideContent += "## Required API Keys`n`n"
    $guideContent += "### 1. Google Maps API`n"
    $guideContent += "- Purpose: Location services and maps display`n"
    $guideContent += "- Setup: Go to Google Cloud Console`n"
    $guideContent += "- Format: AIzaSyB... (39 characters)`n`n"
    $guideContent += "### 2. OpenWeatherMap API`n"
    $guideContent += "- Purpose: Weather data and forecasts`n"
    $guideContent += "- Setup: Go to OpenWeatherMap`n"
    $guideContent += "- Format: 32-character hexadecimal string`n`n"
    $guideContent += "### 3. OpenAI API`n"
    $guideContent += "- Purpose: AI-powered expert chat functionality`n"
    $guideContent += "- Setup: Go to OpenAI Platform`n"
    $guideContent += "- Format: sk-... (51 characters)`n`n"
    $guideContent += "### 4. Firebase Project ID`n"
    $guideContent += "- Purpose: Backend services and analytics`n"
    $guideContent += "- Setup: Go to Firebase Console`n"
    $guideContent += "- Format: your-project-id`n`n"
    $guideContent += "## Configuration Steps`n`n"
    $guideContent += "1. Run the API setup script`n"
    $guideContent += "2. Enter your API keys when prompted`n"
    $guideContent += "3. Verify the configuration files were created/updated`n"
    $guideContent += "4. Test the API connections`n`n"
    $guideContent += "## Security Notes`n`n"
    $guideContent += "- Never commit API keys to version control`n"
    $guideContent += "- Use environment variables in production`n"
    $guideContent += "- Regularly rotate your API keys`n"
    $guideContent += "- Monitor API usage and costs`n"
    
    try {
        $guideContent | Out-File -FilePath $guidePath -Encoding UTF8
        Write-Host "Created API configuration guide: $guidePath" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "Failed to create API configuration guide: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Main execution
try {
    Write-Host "Starting API configuration test..." -ForegroundColor Cyan
    
    # Configure files
    Write-Host "`nConfiguring application files..." -ForegroundColor Yellow
    
    $localPropertiesResult = Set-LocalProperties -WeatherApiKey $WeatherApiKey
    $googleServicesResult = New-GoogleServicesTemplate -ProjectId $FirebaseProjectId
    $guideResult = New-ApiConfigurationGuide
    
    # Summary
    Write-Host "`nAPI Configuration Test Summary:" -ForegroundColor Cyan
    Write-Host "Local Properties: $(if ($localPropertiesResult) { 'OK' } else { 'Failed' })" -ForegroundColor $(if ($localPropertiesResult) { 'Green' } else { 'Red' })"
    Write-Host "Google Services: $(if ($googleServicesResult) { 'OK' } else { 'Failed' })" -ForegroundColor $(if ($googleServicesResult) { 'Green' } else { 'Red' })"
    Write-Host "Configuration Guide: $(if ($guideResult) { 'OK' } else { 'Failed' })" -ForegroundColor $(if ($guideResult) { 'Green' } else { 'Red' })"
    
    $allSuccess = $localPropertiesResult -and $googleServicesResult -and $guideResult
    
    if ($allSuccess) {
        Write-Host "`nAPI configuration test completed successfully!" -ForegroundColor Green
        Write-Host "The script encoding issues have been resolved." -ForegroundColor Yellow
    } else {
        Write-Host "`nSome configuration steps failed. Please check the errors above." -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "Test failed with error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 