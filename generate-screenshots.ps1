# SmartFarm Screenshot Generation Script
# Generate actual app store screenshots using browser automation

param(
    [string]$Url = "http://localhost:8080",
    [string]$OutputDir = "app-store-screenshots",
    [switch]$GenerateAll,
    [switch]$GenerateiPhone,
    [switch]$GenerateiPad,
    [switch]$GenerateAndroid
)

Write-Host "SmartFarm Screenshot Generation" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green

# Device configurations
$devices = @{
    "iPhone" = @(
        @{ name = "iPhone-4.7-inch"; width = 750; height = 1334 },
        @{ name = "iPhone-6.5-inch"; width = 1242; height = 2688 },
        @{ name = "iPhone-6.7-inch"; width = 1284; height = 2778 },
        @{ name = "iPhone-5.5-inch"; width = 1242; height = 2208 }
    )
    "iPad" = @(
        @{ name = "iPad-Pro-11-inch"; width = 1668; height = 2388 },
        @{ name = "iPad-Mini"; width = 1488; height = 2266 },
        @{ name = "iPad-Pro-12.9-inch"; width = 2048; height = 2732 },
        @{ name = "iPad-10.2-inch"; width = 1620; height = 2160 }
    )
    "Android" = @(
        @{ name = "Phone-1440x2560"; width = 1440; height = 2560 },
        @{ name = "Phone-1080x1920"; width = 1080; height = 1920 },
        @{ name = "Tablet-1200x1920"; width = 1200; height = 1920 },
        @{ name = "Tablet-1600x2560"; width = 1600; height = 2560 }
    )
}

# Screenshots to generate
$screenshots = @(
    @{ name = "home-dashboard"; path = "/" },
    @{ name = "livestock-management"; path = "/livestock" },
    @{ name = "crop-management"; path = "/crops" },
    @{ name = "weather-monitoring"; path = "/weather" },
    @{ name = "inventory-tracking"; path = "/inventory" },
    @{ name = "employee-scheduling"; path = "/employees" },
    @{ name = "market-prices"; path = "/market-prices" },
    @{ name = "document-management"; path = "/documents" },
    @{ name = "financial-analytics"; path = "/financial" },
    @{ name = "expert-chat"; path = "/expert-chat" }
)

# Create output directory
if (!(Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
    Write-Host "✅ Created output directory: $OutputDir" -ForegroundColor Green
}

# Check if Playwright is installed
function Test-PlaywrightInstalled {
    try {
        $playwrightVersion = npx playwright --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Playwright found" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Playwright not found. Installing..." -ForegroundColor Yellow
            npm install -g playwright
            npx playwright install
            return $true
        }
    } catch {
        Write-Host "❌ Playwright not found. Installing..." -ForegroundColor Yellow
        npm install -g playwright
        npx playwright install
        return $true
    }
}

# Generate screenshots for a specific device
function Generate-DeviceScreenshots {
    param(
        [string]$DeviceType,
        [array]$DeviceConfigs
    )
    
    Write-Host "Generating $DeviceType screenshots..." -ForegroundColor Cyan
    
    foreach ($device in $DeviceConfigs) {
        $deviceDir = Join-Path $OutputDir $device.name
        if (!(Test-Path $deviceDir)) {
            New-Item -ItemType Directory -Path $deviceDir | Out-Null
        }
        
        Write-Host "  📱 $($device.name) ($($device.width)x$($device.height))" -ForegroundColor White
        
        foreach ($screenshot in $screenshots) {
            $outputPath = Join-Path $deviceDir "$($screenshot.name).png"
            
            # Create Playwright script for screenshot
            $playwrightScript = @"
const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: $($device.width), height: $($device.height) },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    
    const page = await context.newPage();
    
    try {
        await page.goto('$Url$($screenshot.path)', { waitUntil: 'networkidle' });
        
        // Wait for content to load
        await page.waitForTimeout(2000);
        
        // Take screenshot
        await page.screenshot({ 
            path: '$outputPath',
            fullPage: true 
        });
        
        console.log('Screenshot saved: $outputPath');
    } catch (error) {
        console.error('Error taking screenshot: ', error);
    } finally {
        await browser.close();
    }
})();
"@
            
            $scriptPath = "temp-screenshot-script.js"
            $playwrightScript | Out-File -FilePath $scriptPath -Encoding UTF8
            
            try {
                node $scriptPath
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "    ✅ $($screenshot.name).png" -ForegroundColor Green
                } else {
                    Write-Host "    ❌ $($screenshot.name).png" -ForegroundColor Red
                }
            } catch {
                Write-Host "    ❌ $($screenshot.name).png - Error: $($_.Exception.Message)" -ForegroundColor Red
            } finally {
                if (Test-Path $scriptPath) {
                    Remove-Item $scriptPath
                }
            }
        }
    }
}

# Generate screenshot manifest
function Generate-ScreenshotManifest {
    $manifest = @{
        generated = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        totalScreenshots = 0
        devices = @()
        screenshots = @()
    }
    
    foreach ($deviceType in $devices.Keys) {
        foreach ($device in $devices[$deviceType]) {
            $deviceDir = Join-Path $OutputDir $device.name
            if (Test-Path $deviceDir) {
                $screenshotCount = (Get-ChildItem $deviceDir -Filter "*.png").Count
                $manifest.totalScreenshots += $screenshotCount
                
                $manifest.devices += @{
                    name = $device.name
                    type = $deviceType
                    width = $device.width
                    height = $device.height
                    screenshotCount = $screenshotCount
                }
            }
        }
    }
    
    foreach ($screenshot in $screenshots) {
        $manifest.screenshots += @{
            name = $screenshot.name
            path = $screenshot.path
            description = "SmartFarm $($screenshot.name.Replace('-', ' ').ToTitleCase()) screen"
        }
    }
    
    $manifestPath = Join-Path $OutputDir "screenshot-manifest.json"
    $manifest | ConvertTo-Json -Depth 10 | Out-File -FilePath $manifestPath -Encoding UTF8
    
    Write-Host "✅ Generated screenshot manifest: $manifestPath" -ForegroundColor Green
}

# Generate HTML preview
function Generate-HTMLPreview {
    $htmlContent = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartFarm App Store Screenshots</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { color: #2C3E50; text-align: center; margin-bottom: 30px; }
        .device-section { margin-bottom: 40px; }
        .device-title { font-size: 24px; font-weight: bold; color: #34495E; margin-bottom: 20px; }
        .screenshots-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .screenshot-item { background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .screenshot-item img { width: 100%; height: auto; border-radius: 4px; }
        .screenshot-name { font-weight: bold; margin-top: 10px; color: #2C3E50; }
        .screenshot-desc { color: #7F8C8D; font-size: 14px; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>SmartFarm App Store Screenshots</h1>
        <p style="text-align: center; color: #7F8C8D; margin-bottom: 30px;">
            Generated on $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
        </p>
"@
    
    foreach ($deviceType in $devices.Keys) {
        $htmlContent += @"
        <div class="device-section">
            <div class="device-title">$deviceType Screenshots</div>
            <div class="screenshots-grid">
"@
        
        foreach ($device in $devices[$deviceType]) {
            $deviceDir = Join-Path $OutputDir $device.name
            if (Test-Path $deviceDir) {
                foreach ($screenshot in $screenshots) {
                    $imagePath = Join-Path $device.name "$($screenshot.name).png"
                    if (Test-Path (Join-Path $deviceDir "$($screenshot.name).png")) {
                        $htmlContent += @"
                <div class="screenshot-item">
                    <img src="$imagePath" alt="$($screenshot.name)">
                    <div class="screenshot-name">$($screenshot.name.Replace('-', ' ').ToTitleCase())</div>
                    <div class="screenshot-desc">$($device.name) - $($device.width)x$($device.height)</div>
                </div>
"@
                    }
                }
            }
        }
        
        $htmlContent += @"
            </div>
        </div>
"@
    }
    
    $htmlContent += @"
    </div>
</body>
</html>
"@
    
    $htmlPath = Join-Path $OutputDir "screenshots-preview.html"
    $htmlContent | Out-File -FilePath $htmlPath -Encoding UTF8
    
    Write-Host "✅ Generated HTML preview: $htmlPath" -ForegroundColor Green
}

# Main execution
if (!(Test-PlaywrightInstalled)) {
    Write-Host "❌ Failed to install Playwright. Exiting." -ForegroundColor Red
    exit 1
}

if ($GenerateAll -or $GenerateiPhone) {
    Generate-DeviceScreenshots "iPhone" $devices["iPhone"]
}

if ($GenerateAll -or $GenerateiPad) {
    Generate-DeviceScreenshots "iPad" $devices["iPad"]
}

if ($GenerateAll -or $GenerateAndroid) {
    Generate-DeviceScreenshots "Android" $devices["Android"]
}

Generate-ScreenshotManifest
Generate-HTMLPreview

Write-Host "`nScreenshot Generation Complete!" -ForegroundColor Green
Write-Host "Output directory: $OutputDir" -ForegroundColor Yellow
Write-Host "Total screenshots generated: $((Get-ChildItem $OutputDir -Recurse -Filter "*.png").Count)" -ForegroundColor Yellow
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Review screenshots in the output directory" -ForegroundColor White
Write-Host "2. Open screenshots-preview.html to see all screenshots" -ForegroundColor White
Write-Host "3. Upload screenshots to app stores" -ForegroundColor White
Write-Host "4. Update app store listings with new screenshots" -ForegroundColor White 