# SmartFarm Production Deployment Script
# Deploy to Netlify, Vercel, or GitHub Pages

param(
    [string]$Platform = "github",
    [switch]$SkipBuild
)

Write-Host "SmartFarm Production Deployment" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green

# Check if build exists
$buildDir = "web/build/distributions/web"
if (!(Test-Path $buildDir)) {
    Write-Host "❌ Build directory not found. Building first..." -ForegroundColor Red
    if (!$SkipBuild) {
        powershell -ExecutionPolicy Bypass -File "deploy-web.ps1" -Platform "local" -BuildOnly -SkipTests
    }
}

if (!(Test-Path $buildDir)) {
    Write-Host "❌ Build failed. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build directory found" -ForegroundColor Green

# Deploy to GitHub Pages
if ($Platform -eq "github" -or $Platform -eq "all") {
    Write-Host "Preparing GitHub Pages deployment..." -ForegroundColor Cyan
    
    $ghPagesDir = "gh-pages"
    if (Test-Path $ghPagesDir) {
        Remove-Item -Recurse -Force $ghPagesDir
    }
    
    # Copy build files to gh-pages directory
    Copy-Item -Recurse $buildDir $ghPagesDir
    
    # Create .nojekyll file for GitHub Pages
    "" | Out-File -FilePath "$ghPagesDir/.nojekyll" -Encoding UTF8
    
    Write-Host "✅ GitHub Pages files prepared in: $ghPagesDir" -ForegroundColor Green
    Write-Host "📝 To deploy to GitHub Pages:" -ForegroundColor Yellow
    Write-Host "   1. Push the gh-pages directory to your repository" -ForegroundColor White
    Write-Host "   2. Enable GitHub Pages in your repository settings" -ForegroundColor White
    Write-Host "   3. Set the source to gh-pages branch" -ForegroundColor White
}

# Deploy to Netlify
if ($Platform -eq "netlify" -or $Platform -eq "all") {
    Write-Host "Deploying to Netlify..." -ForegroundColor Cyan
    
    # Check if Netlify CLI is installed
    try {
        $netlifyVersion = netlify --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Netlify CLI found" -ForegroundColor Green
        } else {
            Write-Host "❌ Netlify CLI not found. Installing..." -ForegroundColor Yellow
            npm install -g netlify-cli
        }
    } catch {
        Write-Host "❌ Netlify CLI not found. Installing..." -ForegroundColor Yellow
        npm install -g netlify-cli
    }
    
    # Create netlify.toml if it doesn't exist
    if (!(Test-Path "netlify.toml")) {
        $netlifyConfig = @"
[build]
  publish = "web/build/distributions/web"
  command = "./gradlew buildWeb"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
"@
        $netlifyConfig | Out-File -FilePath "netlify.toml" -Encoding UTF8
        Write-Host "✅ Created netlify.toml" -ForegroundColor Green
    }
    
    # Deploy to Netlify
    try {
        netlify deploy --prod --dir=web/build/distributions/web
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Successfully deployed to Netlify" -ForegroundColor Green
        } else {
            Write-Host "❌ Failed to deploy to Netlify" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Error deploying to Netlify: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Deploy to Vercel
if ($Platform -eq "vercel" -or $Platform -eq "all") {
    Write-Host "Deploying to Vercel..." -ForegroundColor Cyan
    
    # Check if Vercel CLI is installed
    try {
        $vercelVersion = vercel --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Vercel CLI found" -ForegroundColor Green
        } else {
            Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
            npm install -g vercel
        }
    } catch {
        Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
        npm install -g vercel
    }
    
    # Create vercel.json if it doesn't exist
    if (!(Test-Path "vercel.json")) {
        $vercelConfig = @"
{
  "version": 2,
  "builds": [
    {
      "src": "web/build/distributions/web/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/web/build/distributions/web/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
"@
        $vercelConfig | Out-File -FilePath "vercel.json" -Encoding UTF8
        Write-Host "✅ Created vercel.json" -ForegroundColor Green
    }
    
    # Deploy to Vercel
    try {
        vercel --prod
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Successfully deployed to Vercel" -ForegroundColor Green
        } else {
            Write-Host "❌ Failed to deploy to Vercel" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Error deploying to Vercel: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Generate deployment report
$report = "SmartFarm Production Deployment Report`n"
$report += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n`n"
$report += "Platform: $Platform`n"
$report += "Build Status: Success`n"
$report += "Build Directory: $buildDir`n"

if (Test-Path $buildDir) {
    $size = (Get-ChildItem $buildDir -Recurse | Measure-Object -Property Length -Sum).Sum
    $sizeMB = [math]::Round($size / 1MB, 2)
    $report += "Build Size: $sizeMB MB`n"
}

$report += "`nDeployment Status:`n"
if ($Platform -eq "github" -or $Platform -eq "all") {
    $report += "- GitHub Pages: Prepared`n"
}
if ($Platform -eq "netlify" -or $Platform -eq "all") {
    $report += "- Netlify: Attempted`n"
}
if ($Platform -eq "vercel" -or $Platform -eq "all") {
    $report += "- Vercel: Attempted`n"
}

$report += "`nNext Steps:`n"
$report += "1. Test the deployed application`n"
$report += "2. Set up monitoring and analytics`n"
$report += "3. Configure custom domains`n"
$report += "4. Set up CI/CD pipelines`n"

$reportPath = "production-deployment-report.txt"
$report | Out-File -FilePath $reportPath -Encoding UTF8

Write-Host "`nDeployment Summary:" -ForegroundColor Green
Write-Host $report -ForegroundColor White
Write-Host "Production deployment completed!" -ForegroundColor Green 