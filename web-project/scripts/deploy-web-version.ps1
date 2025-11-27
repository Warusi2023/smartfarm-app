# SmartFarm Web Version Deployment Script
# This script helps deploy the web application to various hosting platforms

param(
    [string]$Platform = "local",
    [string]$BuildType = "development",
    [switch]$Optimize,
    [switch]$Help
)

# Show help if requested
if ($Help) {
    Write-Host @"
SmartFarm Web Version Deployment Script

Usage: .\deploy-web-version.ps1 [-Platform <platform>] [-BuildType <type>] [-Optimize] [-Help]

Parameters:
    -Platform     Target platform (local, netlify, vercel, github-pages, aws-s3)
    -BuildType    Build type (development, production)
    -Optimize     Enable asset optimization
    -Help         Show this help message

Examples:
    .\deploy-web-version.ps1 -Platform local
    .\deploy-web-version.ps1 -Platform netlify -BuildType production -Optimize
    .\deploy-web-version.ps1 -Platform vercel -BuildType production

"@
    exit 0
}

# Configuration
$WebSourceDir = "web\src\main\resources"
$BuildDir = "web-build"
$DeployDir = "web-deploy"

# Colors for output
$Colors = @{
    Info = "Cyan"
    Success = "Green"
    Warning = "Yellow"
    Error = "Red"
}

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Colors[$Color]
}

function Test-Prerequisites {
    Write-ColorOutput "Checking prerequisites..." "Info"
    
    # Check if web source directory exists
    if (-not (Test-Path $WebSourceDir)) {
        Write-ColorOutput "Error: Web source directory not found: $WebSourceDir" "Error"
        exit 1
    }
    
    # Check for required files
    $requiredFiles = @("index.html", "styles.css", "SmartFarm.js", "manifest.json")
    foreach ($file in $requiredFiles) {
        if (-not (Test-Path "$WebSourceDir\$file")) {
            Write-ColorOutput "Error: Required file not found: $file" "Error"
            exit 1
        }
    }
    
    Write-ColorOutput "✓ Prerequisites check passed" "Success"
}

function New-BuildDirectory {
    Write-ColorOutput "Creating build directory..." "Info"
    
    # Remove existing build directory
    if (Test-Path $BuildDir) {
        Remove-Item $BuildDir -Recurse -Force
    }
    
    # Create new build directory
    New-Item -ItemType Directory -Path $BuildDir | Out-Null
    New-Item -ItemType Directory -Path "$BuildDir\assets" | Out-Null
    
    Write-ColorOutput "✓ Build directory created: $BuildDir" "Success"
}

function Copy-WebFiles {
    Write-ColorOutput "Copying web files..." "Info"
    
    # Copy HTML file
    Copy-Item "$WebSourceDir\index.html" $BuildDir
    
    # Copy CSS file
    Copy-Item "$WebSourceDir\styles.css" $BuildDir
    
    # Copy JavaScript file
    Copy-Item "$WebSourceDir\SmartFarm.js" $BuildDir
    
    # Copy manifest and service worker
    Copy-Item "$WebSourceDir\manifest.json" $BuildDir
    Copy-Item "$WebSourceDir\sw.js" $BuildDir
    
    # Copy any additional assets
    if (Test-Path "$WebSourceDir\assets") {
        Copy-Item "$WebSourceDir\assets\*" "$BuildDir\assets\" -Recurse -Force
    }
    
    Write-ColorOutput "✓ Web files copied successfully" "Success"
}

function Optimize-Assets {
    if (-not $Optimize) {
        Write-ColorOutput "Skipping asset optimization..." "Info"
        return
    }
    
    Write-ColorOutput "Optimizing assets..." "Info"
    
    # Read CSS file
    $cssPath = "$BuildDir\styles.css"
    $css = Get-Content $cssPath -Raw
    
    # Remove comments and extra whitespace
    $css = $css -replace '/\*.*?\*/', '' -replace '\s+', ' '
    $css = $css.Trim()
    
    # Write optimized CSS
    Set-Content $cssPath $css -NoNewline
    
    # Read JavaScript file
    $jsPath = "$BuildDir\SmartFarm.js"
    $js = Get-Content $jsPath -Raw
    
    # Remove comments and extra whitespace (basic optimization)
    $js = $js -replace '//.*$', '' -replace '\s+', ' '
    $js = $js.Trim()
    
    # Write optimized JavaScript
    Set-Content $jsPath $js -NoNewline
    
    Write-ColorOutput "✓ Assets optimized" "Success"
}

function Update-Manifest {
    Write-ColorOutput "Updating manifest for deployment..." "Info"
    
    $manifestPath = "$BuildDir\manifest.json"
    $manifest = Get-Content $manifestPath | ConvertFrom-Json
    
    # Update manifest for production
    if ($BuildType -eq "production") {
        $manifest.name = "SmartFarm - Farm Management"
        $manifest.short_name = "SmartFarm"
        $manifest.description = "Professional farm management application"
        $manifest.theme_color = "#4CAF50"
        $manifest.background_color = "#FFFFFF"
    }
    
    # Convert back to JSON and save
    $manifest | ConvertTo-Json -Depth 10 | Set-Content $manifestPath
    
    Write-ColorOutput "✓ Manifest updated" "Success"
}

function Deploy-Local {
    Write-ColorOutput "Setting up local development server..." "Info"
    
    # Create deployment directory
    if (Test-Path $DeployDir) {
        Remove-Item $DeployDir -Recurse -Force
    }
    New-Item -ItemType Directory -Path $DeployDir | Out-Null
    
    # Copy files to deployment directory
    Copy-Item "$BuildDir\*" $DeployDir -Recurse -Force
    
    # Create start script
    $startScript = @"
@echo off
echo Starting SmartFarm Web Application...
echo.
echo Open your browser and navigate to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
"@
    
    Set-Content "$DeployDir\start.bat" $startScript
    
    # Create PowerShell start script
    $startScriptPs = @"
Write-Host "Starting SmartFarm Web Application..." -ForegroundColor Green
Write-Host ""
Write-Host "Open your browser and navigate to:" -ForegroundColor Yellow
Write-Host "http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
python -m http.server 8000
"@
    
    Set-Content "$DeployDir\start.ps1" $startScriptPs
    
    Write-ColorOutput "✓ Local deployment ready" "Success"
    Write-ColorOutput "Navigate to: $DeployDir" "Info"
    Write-ColorOutput "Run 'start.bat' or 'start.ps1' to start the server" "Info"
}

function Deploy-Netlify {
    Write-ColorOutput "Preparing Netlify deployment..." "Info"
    
    # Create netlify.toml configuration
    $netlifyConfig = @"
[build]
  publish = "."
  command = ""

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "16"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
"@
    
    Set-Content "$BuildDir\netlify.toml" $netlifyConfig
    
    # Create deployment instructions
    $instructions = @"
# Netlify Deployment Instructions

1. Drag and drop the entire folder to Netlify
2. Or use Netlify CLI:
   npm install -g netlify-cli
   netlify deploy --dir . --prod

3. Configure custom domain (optional)
4. Set up environment variables if needed

Your app will be available at: https://your-app-name.netlify.app
"@
    
    Set-Content "$BuildDir\NETLIFY_DEPLOYMENT.md" $instructions
    
    Write-ColorOutput "✓ Netlify deployment ready" "Success"
    Write-ColorOutput "Upload the contents of: $BuildDir" "Info"
}

function Deploy-Vercel {
    Write-ColorOutput "Preparing Vercel deployment..." "Info"
    
    # Create vercel.json configuration
    $vercelConfig = @"
{
  "version": 2,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
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
        }
      ]
    }
  ]
}
"@
    
    Set-Content "$BuildDir\vercel.json" $vercelConfig
    
    # Create deployment instructions
    $instructions = @"
# Vercel Deployment Instructions

1. Install Vercel CLI:
   npm install -g vercel

2. Deploy to Vercel:
   vercel --prod

3. Follow the prompts to configure your project
4. Your app will be deployed to Vercel's global network

Alternative: Connect your GitHub repository to Vercel for automatic deployments
"@
    
    Set-Content "$BuildDir\VERCEL_DEPLOYMENT.md" $instructions
    
    Write-ColorOutput "✓ Vercel deployment ready" "Success"
    Write-ColorOutput "Use Vercel CLI to deploy from: $BuildDir" "Info"
}

function Deploy-GitHubPages {
    Write-ColorOutput "Preparing GitHub Pages deployment..." "Info"
    
    # Create GitHub Actions workflow
    $workflowDir = "$BuildDir\.github\workflows"
    New-Item -ItemType Directory -Path $workflowDir -Force | Out-Null
    
    $workflow = @"
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Build
        run: |
          echo "Building SmartFarm Web Application..."
          # Add build steps here if needed
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './web/src/main/resources'
          
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
"@
    
    Set-Content "$workflowDir\deploy.yml" $workflow
    
    # Create deployment instructions
    $instructions = @"
# GitHub Pages Deployment Instructions

1. Push this code to your GitHub repository
2. Go to Settings > Pages
3. Select 'GitHub Actions' as source
4. The workflow will automatically deploy on push to main/master

Your app will be available at: https://yourusername.github.io/your-repo-name

Note: Make sure your repository is public or you have GitHub Pro for private repos
"@
    
    Set-Content "$BuildDir\GITHUB_PAGES_DEPLOYMENT.md" $instructions
    
    Write-ColorOutput "✓ GitHub Pages deployment ready" "Success"
    Write-ColorOutput "Push to GitHub to trigger automatic deployment" "Info"
}

function Deploy-AWSS3 {
    Write-ColorOutput "Preparing AWS S3 deployment..." "Info"
    
    # Create AWS deployment script
    $awsScript = @"
# AWS S3 Deployment Script

# Prerequisites:
# 1. Install AWS CLI
# 2. Configure AWS credentials: aws configure
# 3. Create S3 bucket for your website
# 4. Enable static website hosting on the bucket

BUCKET_NAME="your-smartfarm-bucket"
REGION="us-east-1"

echo "Deploying SmartFarm Web Application to S3..."

# Sync files to S3
aws s3 sync . s3://\$BUCKET_NAME --delete

# Set cache headers for static assets
aws s3 cp s3://\$BUCKET_NAME s3://\$BUCKET_NAME --recursive --metadata-directive REPLACE --cache-control "max-age=31536000" --exclude "*.html" --exclude "*.json"

# Set cache headers for HTML files
aws s3 cp s3://\$BUCKET_NAME s3://\$BUCKET_NAME --recursive --metadata-directive REPLACE --cache-control "max-age=0,no-cache" --include "*.html"

echo "Deployment complete!"
echo "Your website is available at: http://\$BUCKET_NAME.s3-website-\$REGION.amazonaws.com"
"@
    
    Set-Content "$BuildDir\deploy-aws.sh" $awsScript
    
    # Create CloudFormation template
    $cloudFormation = @"
AWSTemplateFormatVersion: '2010-09-09'
Description: 'SmartFarm Web Application S3 Website'

Parameters:
  BucketName:
    Type: String
    Description: Name for the S3 bucket
    Default: smartfarm-web-app

Resources:
  WebsiteBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BucketName
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: index.html
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
        BlockPublicPolicy: false
        IgnorePublicAcls: false
        RestrictPublicBuckets: false

  WebsiteBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref WebsiteBucket
      PolicyDocument:
        Statement:
          - Sid: PublicReadGetObject
            Effect: Allow
            Principal: '*'
            Action: 's3:GetObject'
            Resource: !Sub 'arn:aws:s3:::\${WebsiteBucket}/*'

Outputs:
  WebsiteURL:
    Description: 'URL of the website'
    Value: !GetAtt WebsiteBucket.WebsiteURL
  BucketName:
    Description: 'Name of the S3 bucket'
    Value: !Ref WebsiteBucket
"@
    
    Set-Content "$BuildDir\cloudformation.yml" $cloudFormation
    
    # Create deployment instructions
    $instructions = @"
# AWS S3 Deployment Instructions

1. Install AWS CLI and configure credentials
2. Create S3 bucket and enable static website hosting
3. Run the deployment script: ./deploy-aws.sh
4. Or use CloudFormation: aws cloudformation create-stack --template-body file://cloudformation.yml

Alternative: Use AWS Amplify for automatic deployments from GitHub

Your website will be available at the S3 website endpoint
"@
    
    Set-Content "$BuildDir\AWS_S3_DEPLOYMENT.md" $instructions
    
    Write-ColorOutput "✓ AWS S3 deployment ready" "Success"
    Write-ColorOutput "Use AWS CLI or CloudFormation to deploy from: $BuildDir" "Info"
}

function Show-DeploymentSummary {
    Write-ColorOutput "`n=== Deployment Summary ===" "Info"
    Write-ColorOutput "Platform: $Platform" "Info"
    Write-ColorOutput "Build Type: $BuildType" "Info"
    Write-ColorOutput "Optimization: $($Optimize.IsPresent)" "Info"
    Write-ColorOutput "Build Directory: $BuildDir" "Info"
    
    if ($Platform -eq "local") {
        Write-ColorOutput "Deployment Directory: $DeployDir" "Info"
    }
    
    Write-ColorOutput "`nNext Steps:" "Info"
    switch ($Platform) {
        "local" {
            Write-ColorOutput "1. Navigate to: $DeployDir" "Success"
            Write-ColorOutput "2. Run start.bat or start.ps1" "Success"
            Write-ColorOutput "3. Open http://localhost:8000 in your browser" "Success"
        }
        "netlify" {
            Write-ColorOutput "1. Upload contents of $BuildDir to Netlify" "Success"
            Write-ColorOutput "2. Follow NETLIFY_DEPLOYMENT.md instructions" "Success"
        }
        "vercel" {
            Write-ColorOutput "1. Use Vercel CLI from $BuildDir" "Success"
            Write-ColorOutput "2. Follow VERCEL_DEPLOYMENT.md instructions" "Success"
        }
        "github-pages" {
            Write-ColorOutput "1. Push code to GitHub repository" "Success"
            Write-ColorOutput "2. Follow GITHUB_PAGES_DEPLOYMENT.md instructions" "Success"
        }
        "aws-s3" {
            Write-ColorOutput "1. Use AWS CLI or CloudFormation from $BuildDir" "Success"
            Write-ColorOutput "2. Follow AWS_S3_DEPLOYMENT.md instructions" "Success"
        }
    }
}

# Main execution
try {
    Write-ColorOutput "🚀 SmartFarm Web Version Deployment Script" "Success"
    Write-ColorOutput "=========================================" "Info"
    
    # Check prerequisites
    Test-Prerequisites
    
    # Create build directory
    New-BuildDirectory
    
    # Copy web files
    Copy-WebFiles
    
    # Optimize assets if requested
    Optimize-Assets
    
    # Update manifest
    Update-Manifest
    
    # Deploy based on platform
    switch ($Platform.ToLower()) {
        "local" { Deploy-Local }
        "netlify" { Deploy-Netlify }
        "vercel" { Deploy-Vercel }
        "github-pages" { Deploy-GitHubPages }
        "aws-s3" { Deploy-AWSS3 }
        default {
            Write-ColorOutput "Unknown platform: $Platform" "Error"
            Write-ColorOutput "Supported platforms: local, netlify, vercel, github-pages, aws-s3" "Info"
            exit 1
        }
    }
    
    # Show deployment summary
    Show-DeploymentSummary
    
    Write-ColorOutput "`n✅ Deployment preparation completed successfully!" "Success"
    
} catch {
    Write-ColorOutput "❌ Deployment failed: $($_.Exception.Message)" "Error"
    exit 1
}
