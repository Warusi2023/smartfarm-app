# SmartFarm API Configuration Setup Script
# This script helps configure all required API keys and services

param(
    [string]$GoogleMapsApiKey = "",
    [string]$WeatherApiKey = "",
    [string]$OpenAIApiKey = "",
    [string]$FirebaseProjectId = "",
    [switch]$Interactive = $true
)

Write-Host "SmartFarm API Configuration Setup" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Function to get user input
function Get-UserInput {
    param(
        [string]$Prompt,
        [string]$DefaultValue = "",
        [switch]$Required = $false
    )
    
    if ($Interactive) {
        $input = Read-Host $Prompt
        if ($Required -and [string]::IsNullOrWhiteSpace($input)) {
            Write-Host "This field is required. Please provide a value." -ForegroundColor Red
            return Get-UserInput -Prompt $Prompt -Required $Required
        }
        return if ([string]::IsNullOrWhiteSpace($input)) { $DefaultValue } else { $input }
    } else {
        return $DefaultValue
    }
}

# Function to validate API key format
function Test-ApiKeyFormat {
    param(
        [string]$ApiKey,
        [string]$ServiceName
    )
    
    switch ($ServiceName) {
        "GoogleMaps" {
            return $ApiKey.Length -ge 20 -and $ApiKey -match "^AIza[0-9A-Za-z_-]{35}$"
        }
        "Weather" {
            return $ApiKey.Length -ge 20 -and $ApiKey -match "^[0-9a-f]{32}$"
        }
        "OpenAI" {
            return $ApiKey.Length -ge 20 -and $ApiKey -match "^sk-[0-9A-Za-z]{48}$"
        }
        default {
            return $ApiKey.Length -ge 10
        }
    }
}

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

# Function to create API configuration file
function New-ApiConfigFile {
    param(
        [string]$GoogleMapsApiKey,
        [string]$WeatherApiKey,
        [string]$OpenAIApiKey,
        [string]$FirebaseProjectId
    )
    
    $configPath = "api-config.json"
    
    $configContent = @{
        googleMapsApiKey = $GoogleMapsApiKey
        weatherApiKey = $WeatherApiKey
        openAIApiKey = $OpenAIApiKey
        firebaseProjectId = $FirebaseProjectId
        configuredAt = (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
    }
    
    try {
        $configContent | ConvertTo-Json | Out-File -FilePath $configPath -Encoding UTF8
        Write-Host "Created API configuration file: $configPath" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "Failed to create API configuration file: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Main execution
try {
    Write-Host "Starting API configuration setup..." -ForegroundColor Cyan
    
    # Get API keys from user
    $googleMapsKey = if ([string]::IsNullOrWhiteSpace($GoogleMapsApiKey)) {
        Get-UserInput -Prompt "Enter your Google Maps API key" -Required $true
    } else { $GoogleMapsApiKey }
    
    $weatherKey = if ([string]::IsNullOrWhiteSpace($WeatherApiKey)) {
        Get-UserInput -Prompt "Enter your OpenWeatherMap API key" -Required $true
    } else { $WeatherApiKey }
    
    $openAIKey = if ([string]::IsNullOrWhiteSpace($OpenAIApiKey)) {
        Get-UserInput -Prompt "Enter your OpenAI API key" -Required $true
    } else { $OpenAIApiKey }
    
    $firebaseProjectId = if ([string]::IsNullOrWhiteSpace($FirebaseProjectId)) {
        Get-UserInput -Prompt "Enter your Firebase Project ID" -Required $true
    } else { $FirebaseProjectId }
    
    # Validate API keys
    Write-Host "`nValidating API keys..." -ForegroundColor Yellow
    
    if (-not (Test-ApiKeyFormat -ApiKey $googleMapsKey -ServiceName "GoogleMaps")) {
        Write-Host "Warning: Google Maps API key format may be invalid" -ForegroundColor Yellow
    }
    
    if (-not (Test-ApiKeyFormat -ApiKey $weatherKey -ServiceName "Weather")) {
        Write-Host "Warning: OpenWeatherMap API key format may be invalid" -ForegroundColor Yellow
    }
    
    if (-not (Test-ApiKeyFormat -ApiKey $openAIKey -ServiceName "OpenAI")) {
        Write-Host "Warning: OpenAI API key format may be invalid" -ForegroundColor Yellow
    }
    
    # Configure files
    Write-Host "`nConfiguring application files..." -ForegroundColor Yellow
    
    $localPropertiesResult = Set-LocalProperties -WeatherApiKey $weatherKey
    $googleServicesResult = New-GoogleServicesTemplate -ProjectId $firebaseProjectId
    $guideResult = New-ApiConfigurationGuide
    $configResult = New-ApiConfigFile -GoogleMapsApiKey $googleMapsKey -WeatherApiKey $weatherKey -OpenAIApiKey $openAIKey -FirebaseProjectId $firebaseProjectId
    
    # Summary
    Write-Host "`nAPI Configuration Summary:" -ForegroundColor Cyan
    Write-Host "Local Properties: $(if ($localPropertiesResult) { 'OK' } else { 'Failed' })" -ForegroundColor $(if ($localPropertiesResult) { 'Green' } else { 'Red' })"
    Write-Host "Google Services: $(if ($googleServicesResult) { 'OK' } else { 'Failed' })" -ForegroundColor $(if ($googleServicesResult) { 'Green' } else { 'Red' })"
    Write-Host "Configuration Guide: $(if ($guideResult) { 'OK' } else { 'Failed' })" -ForegroundColor $(if ($guideResult) { 'Green' } else { 'Red' })"
    Write-Host "API Config File: $(if ($configResult) { 'OK' } else { 'Failed' })" -ForegroundColor $(if ($configResult) { 'Green' } else { 'Red' })"
    
    $allSuccess = $localPropertiesResult -and $googleServicesResult -and $guideResult -and $configResult
    
    if ($allSuccess) {
        Write-Host "`nAPI configuration completed successfully!" -ForegroundColor Green
        Write-Host "Please review the generated files and test the API connections." -ForegroundColor Yellow
        Write-Host "`nNext steps:" -ForegroundColor Cyan
        Write-Host "1. Test the integration by building the app" -ForegroundColor White
        Write-Host "2. Monitor API usage for optimal performance" -ForegroundColor White
        Write-Host "3. Update google-services.json with actual Firebase keys" -ForegroundColor White
    } else {
        Write-Host "`nSome configuration steps failed. Please check the errors above." -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "Setup failed with error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 