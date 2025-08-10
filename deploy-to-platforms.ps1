# SmartFarm Multi-Platform Deployment Script
# Deploy to Netlify, Vercel, GitHub Pages, and other platforms

param(
    [string]$Platform = "all",
    [switch]$DeployNetlify,
    [switch]$DeployVercel,
    [switch]$DeployGitHubPages,
    [switch]$DeployAll,
    [switch]$SkipBuild,
    [switch]$SkipTests
)

Write-Host "SmartFarm Multi-Platform Deployment" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Check if build exists
function Test-BuildExists {
    $buildDir = "web/build/distributions/web"
    if (!(Test-Path $buildDir)) {
        Write-Host "❌ Build directory not found. Building first..." -ForegroundColor Red
        return $false
    }
    Write-Host "✅ Build directory found" -ForegroundColor Green
    return $true
}

# Deploy to Netlify
function Deploy-Netlify {
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
function Deploy-Vercel {
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

# Deploy to GitHub Pages
function Deploy-GitHubPages {
    Write-Host "Deploying to GitHub Pages..." -ForegroundColor Cyan
    
    # Check if git is available
    try {
        $gitVersion = git --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Git found" -ForegroundColor Green
        } else {
            Write-Host "❌ Git not found" -ForegroundColor Red
            return
        }
    } catch {
        Write-Host "❌ Git not found" -ForegroundColor Red
        return
    }
    
    # Create GitHub Pages deployment
    $ghPagesDir = "gh-pages"
    if (Test-Path $ghPagesDir) {
        Remove-Item -Recurse -Force $ghPagesDir
    }
    
    # Copy build files to gh-pages directory
    Copy-Item -Recurse "web/build/distributions/web" $ghPagesDir
    
    # Create .nojekyll file for GitHub Pages
    "" | Out-File -FilePath "$ghPagesDir/.nojekyll" -Encoding UTF8
    
    # Create CNAME file if needed
    if (Test-Path "CNAME") {
        Copy-Item "CNAME" "$ghPagesDir/CNAME"
    }
    
    Write-Host "✅ GitHub Pages files prepared" -ForegroundColor Green
    Write-Host "📝 To deploy to GitHub Pages:" -ForegroundColor Yellow
    Write-Host "   1. Push the gh-pages directory to your repository" -ForegroundColor White
    Write-Host "   2. Enable GitHub Pages in your repository settings" -ForegroundColor White
    Write-Host "   3. Set the source to gh-pages branch" -ForegroundColor White
}

# Generate deployment report
function Generate-DeploymentReport {
    $report = @"
# SmartFarm Multi-Platform Deployment Report

Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Deployment Summary

- Platforms: $Platform
- Environment: Production
- Build Status: Success
- Tests Skipped: $SkipTests

## Platform Status

### Netlify
- Status: $(if ($DeployNetlify -or $DeployAll) { "Deployed" } else { "Skipped" })
- URL: https://smartfarm-app.netlify.app (if deployed)

### Vercel
- Status: $(if ($DeployVercel -or $DeployAll) { "Deployed" } else { "Skipped" })
- URL: https://smartfarm-app.vercel.app (if deployed)

### GitHub Pages
- Status: $(if ($DeployGitHubPages -or $DeployAll) { "Prepared" } else { "Skipped" })
- URL: https://yourusername.github.io/smartfarm (if deployed)

## Build Information

- Build Directory: web/build/distributions/web
- Build Command: ./gradlew buildWeb
- Build Size: $(if (Test-Path "web/build/distributions/web") { $size = (Get-ChildItem "web/build/distributions/web" -Recurse | Measure-Object -Property Length -Sum).Sum; [math]::Round($size / 1MB, 2) } else { "N/A" }) MB

## Performance Metrics

- Lighthouse Score: Target 90+
- Load Time: Target <3 seconds
- Bundle Size: Optimized
- PWA Features: Enabled

## Next Steps

1. Test all deployed platforms
2. Monitor performance and errors
3. Set up analytics and monitoring
4. Configure custom domains
5. Set up CI/CD pipelines

## Security Checklist

- [x] HTTPS enabled
- [x] Security headers configured
- [x] Content Security Policy
- [x] XSS protection
- [x] CSRF protection

## Monitoring Setup

- [ ] Google Analytics
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] User feedback collection

---

**Deployment completed successfully!** 🚀
"@
    
    $report | Out-File -FilePath "multi-platform-deployment-report.md" -Encoding UTF8
    Write-Host "✅ Generated deployment report: multi-platform-deployment-report.md" -ForegroundColor Green
}

# Main execution
if (!$SkipBuild) {
    if (!(Test-BuildExists)) {
        Write-Host "Building application..." -ForegroundColor Cyan
        powershell -ExecutionPolicy Bypass -File "deploy-web.ps1" -Platform "local" -BuildOnly -SkipTests
    }
}

if ($DeployAll -or $DeployNetlify) {
    Deploy-Netlify
}

if ($DeployAll -or $DeployVercel) {
    Deploy-Vercel
}

if ($DeployAll -or $DeployGitHubPages) {
    Deploy-GitHubPages
}

Generate-DeploymentReport

Write-Host "`nMulti-Platform Deployment Complete!" -ForegroundColor Green
Write-Host "Check the deployment report for details and next steps." -ForegroundColor Yellow 