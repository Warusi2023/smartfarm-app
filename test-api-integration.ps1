# SmartFarm API Integration Test Script
# This script tests the API integration after configuration

param(
    [switch]$TestWeather = $true,
    [switch]$TestMaps = $true,
    [switch]$TestOpenAI = $true,
    [switch]$TestBuild = $true
)

Write-Host "SmartFarm API Integration Test" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green

# Function to test weather API
function Test-WeatherAPI {
    Write-Host "Testing Weather API..." -ForegroundColor Yellow
    
    try {
        # Check if local.properties exists
        if (Test-Path "local.properties") {
            $content = Get-Content "local.properties"
            if ($content -match "WEATHER_API_KEY=") {
                Write-Host "Weather API key found in local.properties" -ForegroundColor Green
                return $true
            } else {
                Write-Host "Weather API key not found in local.properties" -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "local.properties file not found" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Weather API test failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to test Google Maps API
function Test-GoogleMapsAPI {
    Write-Host "Testing Google Maps API..." -ForegroundColor Yellow
    
    try {
        # Check if api-config.json exists
        if (Test-Path "api-config.json") {
            $config = Get-Content "api-config.json" | ConvertFrom-Json
            if ($config.googleMapsApiKey -and $config.googleMapsApiKey.Length -gt 20) {
                Write-Host "Google Maps API key found in configuration" -ForegroundColor Green
                return $true
            } else {
                Write-Host "Google Maps API key not found or invalid" -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "api-config.json file not found" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Google Maps API test failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to test OpenAI API
function Test-OpenAIAPI {
    Write-Host "Testing OpenAI API..." -ForegroundColor Yellow
    
    try {
        # Check if api-config.json exists
        if (Test-Path "api-config.json") {
            $config = Get-Content "api-config.json" | ConvertFrom-Json
            if ($config.openAIApiKey -and $config.openAIApiKey.StartsWith("sk-")) {
                Write-Host "OpenAI API key found in configuration" -ForegroundColor Green
                return $true
            } else {
                Write-Host "OpenAI API key not found or invalid" -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "api-config.json file not found" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "OpenAI API test failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to test build process
function Test-BuildProcess {
    Write-Host "Testing build process..." -ForegroundColor Yellow
    
    try {
        # Check if Gradle wrapper exists
        if (Test-Path "gradlew") {
            Write-Host "Gradle wrapper found" -ForegroundColor Green
            
            # Test Android build
            Write-Host "Testing Android build..." -ForegroundColor Cyan
            $androidResult = & "./gradlew" assembleDebug --no-daemon 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Android build successful" -ForegroundColor Green
            } else {
                Write-Host "Android build failed" -ForegroundColor Red
                Write-Host $androidResult -ForegroundColor Red
                return $false
            }
            
            # Test Web build
            Write-Host "Testing Web build..." -ForegroundColor Cyan
            $webResult = & "./gradlew" buildWeb --no-daemon 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Web build successful" -ForegroundColor Green
                return $true
            } else {
                Write-Host "Web build failed" -ForegroundColor Red
                Write-Host $webResult -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "Gradle wrapper not found" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Build test failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to generate test report
function New-TestReport {
    param([array]$Results)
    
    $reportPath = "api-integration-test-report.md"
    
    $reportContent = "# SmartFarm API Integration Test Report`n`n"
    $reportContent += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n`n"
    $reportContent += "## Test Results`n`n"
    
    foreach ($result in $Results) {
        $status = if ($result.Success) { "✅ PASS" } else { "❌ FAIL" }
        $reportContent += "### $($result.Description)`n"
        $reportContent += "- Status: $status`n"
        $reportContent += "- Notes: $($result.Notes)`n`n"
    }
    
    $successCount = ($Results | Where-Object { $_.Success }).Count
    $totalCount = $Results.Count
    
    $reportContent += "## Summary`n`n"
    $reportContent += "- Total Tests: $totalCount`n"
    $reportContent += "- Passed: $successCount`n"
    $reportContent += "- Failed: $($totalCount - $successCount)`n"
    $reportContent += "- Success Rate: $([math]::Round(($successCount / $totalCount) * 100, 1))%`n`n"
    
    if ($successCount -eq $totalCount) {
        $reportContent += "## Status: ✅ ALL TESTS PASSED`n`n"
        $reportContent += "Your API integration is working correctly!`n"
    } else {
        $reportContent += "## Status: ⚠️ SOME TESTS FAILED`n`n"
        $reportContent += "Please review the failed tests and fix the issues.`n"
    }
    
    $reportContent += "`n## Next Steps`n`n"
    $reportContent += "1. Review any failed tests above`n"
    $reportContent += "2. Check API key configuration`n"
    $reportContent += "3. Verify network connectivity`n"
    $reportContent += "4. Test the application manually`n"
    $reportContent += "5. Monitor API usage and performance`n"
    
    try {
        $reportContent | Out-File -FilePath $reportPath -Encoding UTF8
        Write-Host "Created test report: $reportPath" -ForegroundColor Green
        return $reportPath
    } catch {
        Write-Host "Failed to create test report: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Main execution
try {
    Write-Host "Starting API integration tests..." -ForegroundColor Cyan
    
    # Initialize results
    $results = @()
    
    # Test Weather API
    if ($TestWeather) {
        $weatherResult = Test-WeatherAPI
        $results += @{
            Description = "Weather API Configuration"
            Success = $weatherResult
            Notes = if ($weatherResult) { "Weather API key properly configured" } else { "Weather API key missing or invalid" }
        }
    }
    
    # Test Google Maps API
    if ($TestMaps) {
        $mapsResult = Test-GoogleMapsAPI
        $results += @{
            Description = "Google Maps API Configuration"
            Success = $mapsResult
            Notes = if ($mapsResult) { "Google Maps API key properly configured" } else { "Google Maps API key missing or invalid" }
        }
    }
    
    # Test OpenAI API
    if ($TestOpenAI) {
        $openAIResult = Test-OpenAIAPI
        $results += @{
            Description = "OpenAI API Configuration"
            Success = $openAIResult
            Notes = if ($openAIResult) { "OpenAI API key properly configured" } else { "OpenAI API key missing or invalid" }
        }
    }
    
    # Test build process
    if ($TestBuild) {
        $buildResult = Test-BuildProcess
        $results += @{
            Description = "Build Process"
            Success = $buildResult
            Notes = if ($buildResult) { "Application builds successfully" } else { "Build process failed" }
        }
    }
    
    # Generate test report
    $reportPath = New-TestReport -Results $results
    
    # Summary
    Write-Host "`nAPI Integration Test Summary:" -ForegroundColor Cyan
    $successCount = ($results | Where-Object { $_.Success }).Count
    $totalCount = $results.Count
    
    Write-Host "Total Tests: $totalCount" -ForegroundColor White
    Write-Host "Passed: $successCount" -ForegroundColor Green
    Write-Host "Failed: $($totalCount - $successCount)" -ForegroundColor Red
    
    if ($reportPath) {
        Write-Host "Test report: $reportPath" -ForegroundColor Cyan
    }
    
    if ($successCount -eq $totalCount) {
        Write-Host "`n🎉 All API integration tests passed!" -ForegroundColor Green
        Write-Host "Your SmartFarm app is ready for testing and deployment." -ForegroundColor Yellow
    } else {
        Write-Host "`n⚠️ Some tests failed. Please review the report and fix the issues." -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "API integration test failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 