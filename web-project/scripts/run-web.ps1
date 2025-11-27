# SmartFarm Web Application Runner
# This script builds and runs the SmartFarm web application

param(
    [switch]$BuildOnly = $false,
    [switch]$SkipBuild = $false
)

Write-Host "SmartFarm Web Application Runner" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Function to check prerequisites
function Test-Prerequisites {
    Write-Host "Checking prerequisites..." -ForegroundColor Yellow
    
    # Check if Java is installed
    try {
        $javaVersion = java -version 2>&1
        Write-Host "Java found: $($javaVersion[0])" -ForegroundColor Green
    } catch {
        Write-Host "Java not found. Please install Java 11 or higher." -ForegroundColor Red
        return $false
    }
    
    # Check if Gradle is available
    if (Test-Path "gradlew") {
        Write-Host "Gradle wrapper found" -ForegroundColor Green
    } else {
        Write-Host "Gradle wrapper not found. Please ensure you're in the project root." -ForegroundColor Red
        return $false
    }
    
    return $true
}

# Function to build the web application
function Build-WebApplication {
    Write-Host "Building web application..." -ForegroundColor Yellow
    
    try {
        & "./gradlew" buildWeb --no-daemon
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Web application built successfully" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Build failed with exit code: $LASTEXITCODE" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Build failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to run the web application
function Start-WebApplication {
    Write-Host "Starting web application..." -ForegroundColor Yellow
    
    try {
        & "./gradlew" runWeb --no-daemon
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Web application started successfully" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Failed to start web application. Exit code: $LASTEXITCODE" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Failed to start web application: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Main execution
try {
    # Check prerequisites
    if (-not (Test-Prerequisites)) {
        Write-Host "Prerequisites check failed. Please fix the issues above." -ForegroundColor Red
        exit 1
    }
    
    # Build the application
    if (-not $SkipBuild) {
        if (-not (Build-WebApplication)) {
            Write-Host "Build failed. Cannot continue." -ForegroundColor Red
            exit 1
        }
    }
    
    # Run the application
    if (-not $BuildOnly) {
        if (-not (Start-WebApplication)) {
            Write-Host "Failed to start web application." -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "Build completed. Use -BuildOnly:$false to run the application." -ForegroundColor Green
    }
    
} catch {
    Write-Host "Web application runner failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 