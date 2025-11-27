# SmartFarm Web Deployment Script
# This script builds and deploys the SmartFarm web application

param(
    [string]$Platform = "local",
    [switch]$BuildOnly = $false,
    [switch]$SkipTests = $false,
    [string]$Environment = "production"
)

Write-Host "SmartFarm Web Deployment" -ForegroundColor Green
Write-Host "=======================" -ForegroundColor Green

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
    
    # Check if Gradle wrapper exists
    if (Test-Path "gradlew") {
        Write-Host "Gradle wrapper found" -ForegroundColor Green
    } else {
        Write-Host "Gradle wrapper not found. Please ensure you're in the project root." -ForegroundColor Red
        return $false
    }
    
    return $true
}

# Function to run tests
function Invoke-Tests {
    if ($SkipTests) {
        Write-Host "Skipping tests as requested" -ForegroundColor Yellow
        return $true
    }
    
    Write-Host "Running tests..." -ForegroundColor Yellow
    
    try {
        & "./gradlew" test --no-daemon
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Tests passed" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Tests failed" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Test execution failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to build web application
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

# Function to deploy to local server
function Deploy-Local {
    Write-Host "Starting local development server..." -ForegroundColor Yellow
    
    try {
        Write-Host "The application will be available at: http://localhost:8080" -ForegroundColor Cyan
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
        Write-Host ""
        
        & "./gradlew" runWeb --no-daemon
    } catch {
        Write-Host "Failed to start local server: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to deploy to Netlify
function Deploy-Netlify {
    Write-Host "Deploying to Netlify..." -ForegroundColor Yellow
    
    # Check if Netlify CLI is installed
    try {
        $netlifyVersion = netlify --version 2>&1
        Write-Host "Netlify CLI found: $netlifyVersion" -ForegroundColor Green
    } catch {
        Write-Host "Netlify CLI not found. Please install it with: npm install -g netlify-cli" -ForegroundColor Red
        return $false
    }
    
    try {
        # Deploy to Netlify
        netlify deploy --prod --dir "web/build/distributions/web"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully deployed to Netlify" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Netlify deployment failed" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Netlify deployment failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to deploy to Vercel
function Deploy-Vercel {
    Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
    
    # Check if Vercel CLI is installed
    try {
        $vercelVersion = vercel --version 2>&1
        Write-Host "Vercel CLI found: $vercelVersion" -ForegroundColor Green
    } catch {
        Write-Host "Vercel CLI not found. Please install it with: npm install -g vercel" -ForegroundColor Red
        return $false
    }
    
    try {
        # Deploy to Vercel
        vercel --prod
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully deployed to Vercel" -ForegroundColor Green
            return $true
        } else {
            Write-Host "Vercel deployment failed" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "Vercel deployment failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to deploy to GitHub Pages
function Deploy-GitHubPages {
    Write-Host "Deploying to GitHub Pages..." -ForegroundColor Yellow
    
    # Check if git is available
    try {
        $gitVersion = git --version 2>&1
        Write-Host "Git found: $gitVersion" -ForegroundColor Green
    } catch {
        Write-Host "Git not found. Please install Git." -ForegroundColor Red
        return $false
    }
    
    try {
        # Create gh-pages branch and deploy
        git subtree push --prefix web/build/distributions/web origin gh-pages
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully deployed to GitHub Pages" -ForegroundColor Green
            return $true
        } else {
            Write-Host "GitHub Pages deployment failed" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "GitHub Pages deployment failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to create deployment report
function New-DeploymentReport {
    param([string]$Platform, [bool]$Success, [string]$Environment)
    
    $reportPath = "deployment-report.md"
    
    $reportContent = "# SmartFarm Web Deployment Report`n`n"
    $reportContent += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n`n"
    $reportContent += "## Deployment Summary`n`n"
    $reportContent += "- Platform: $Platform`n"
    $reportContent += "- Environment: $Environment`n"
    $reportContent += "- Status: $(if ($Success) { 'Success' } else { 'Failed' })`n`n"
    $reportContent += "## Build Information`n`n"
    $reportContent += "- Build Directory: web/build/distributions/web`n"
    $reportContent += "- Build Command: ./gradlew buildWeb`n"
    $reportContent += "- Tests Skipped: $SkipTests`n`n"
    $reportContent += "## Next Steps`n`n"
    
    if ($Success) {
        $reportContent += "1. Verify the deployment at the provided URL`n"
        $reportContent += "2. Test all functionality`n"
        $reportContent += "3. Monitor performance and errors`n"
        $reportContent += "4. Update documentation if needed`n"
    } else {
        $reportContent += "1. Review the error messages above`n"
        $reportContent += "2. Fix any build or deployment issues`n"
        $reportContent += "3. Re-run the deployment script`n"
        $reportContent += "4. Contact support if issues persist`n"
    }
    
    try {
        $reportContent | Out-File -FilePath $reportPath -Encoding UTF8
        Write-Host "Created deployment report: $reportPath" -ForegroundColor Green
        return $reportPath
    } catch {
        Write-Host "Failed to create deployment report: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Main execution
try {
    Write-Host "Starting web deployment process..." -ForegroundColor Cyan
    Write-Host "Platform: $Platform" -ForegroundColor White
    Write-Host "Environment: $Environment" -ForegroundColor White
    Write-Host "Build Only: $BuildOnly" -ForegroundColor White
    Write-Host "Skip Tests: $SkipTests" -ForegroundColor White
    
    # Check prerequisites
    if (-not (Test-Prerequisites)) {
        Write-Host "Prerequisites check failed. Cannot continue." -ForegroundColor Red
        exit 1
    }
    
    # Run tests
    if (-not (Invoke-Tests)) {
        Write-Host "Tests failed. Cannot continue with deployment." -ForegroundColor Red
        exit 1
    }
    
    # Build application
    if (-not (Build-WebApplication)) {
        Write-Host "Build failed. Cannot continue with deployment." -ForegroundColor Red
        exit 1
    }
    
    if ($BuildOnly) {
        Write-Host "Build completed successfully. Skipping deployment as requested." -ForegroundColor Green
        New-DeploymentReport -Platform "build-only" -Success $true -Environment $Environment
        exit 0
    }
    
    # Deploy based on platform
    $deploymentSuccess = $false
    
    switch ($Platform.ToLower()) {
        "local" {
            $deploymentSuccess = Deploy-Local
        }
        "netlify" {
            $deploymentSuccess = Deploy-Netlify
        }
        "vercel" {
            $deploymentSuccess = Deploy-Vercel
        }
        "github-pages" {
            $deploymentSuccess = Deploy-GitHubPages
        }
        default {
            Write-Host "Unknown platform: $Platform" -ForegroundColor Red
            Write-Host "Supported platforms: local, netlify, vercel, github-pages" -ForegroundColor Yellow
            exit 1
        }
    }
    
    # Generate deployment report
    $reportPath = New-DeploymentReport -Platform $Platform -Success $deploymentSuccess -Environment $Environment
    
    # Summary
    Write-Host "`nDeployment Summary:" -ForegroundColor Cyan
    Write-Host "Platform: $Platform" -ForegroundColor White
    Write-Host "Environment: $Environment" -ForegroundColor White
    $statusColor = if ($deploymentSuccess) { 'Green' } else { 'Red' }
    $status = if ($deploymentSuccess) { 'Success' } else { 'Failed' }
    Write-Host "Status: $status" -ForegroundColor $statusColor
    
    if ($reportPath) {
        Write-Host "Report: $reportPath" -ForegroundColor Cyan
    }
    
    if ($deploymentSuccess) {
        Write-Host "`n🎉 Web deployment completed successfully!" -ForegroundColor Green
        Write-Host "Your SmartFarm web application is now live!" -ForegroundColor Yellow
    } else {
        Write-Host "`n❌ Web deployment failed. Please check the errors above." -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "Web deployment failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 