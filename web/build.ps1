# SmartFarm Web Build Script
# This script prepares the web application for deployment

Write-Host "🚀 Building SmartFarm Web Application..." -ForegroundColor Green

# Create build directory
$buildDir = "dist"
if (Test-Path $buildDir) {
    Remove-Item $buildDir -Recurse -Force
}
New-Item -ItemType Directory -Path $buildDir | Out-Null

Write-Host "📁 Created build directory: $buildDir" -ForegroundColor Yellow

# Copy web files
$sourceDir = "src/main/resources"
$files = @(
    "index.html",
    "SmartFarm.js", 
    "styles.css",
    "sw.js",
    "manifest.json"
)

foreach ($file in $files) {
    $sourcePath = Join-Path $sourceDir $file
    $destPath = Join-Path $buildDir $file
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath
        Write-Host "✅ Copied: $file" -ForegroundColor Green
    } else {
        Write-Host "❌ File not found: $file" -ForegroundColor Red
    }
}

# Create _redirects file for SPA routing
$redirectsPath = Join-Path $buildDir "_redirects"
"/*    /index.html   200" | Out-File -FilePath $redirectsPath -Encoding UTF8
Write-Host "✅ Created _redirects for SPA routing" -ForegroundColor Green

Write-Host "🎉 Build completed successfully!" -ForegroundColor Green
Write-Host "📁 Build files are in: $buildDir" -ForegroundColor Yellow
Write-Host "🚀 Ready for deployment to Netlify!" -ForegroundColor Green
