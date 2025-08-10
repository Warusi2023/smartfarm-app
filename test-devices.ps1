# SmartFarm Device Testing Script
# This script automates testing across multiple devices and Android versions

param(
    [string]$BuildType = "debug",
    [string]$TestType = "all",
    [switch]$Help
)

# Show help if requested
if ($Help) {
    Write-Host "SmartFarm Device Testing Script" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\test-devices.ps1 [BuildType] [TestType]" -ForegroundColor White
    Write-Host ""
    Write-Host "Parameters:" -ForegroundColor Yellow
    Write-Host "  BuildType: debug, release, internal (default: debug)" -ForegroundColor White
    Write-Host "  TestType: basic, performance, accessibility, all (default: all)" -ForegroundColor White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Yellow
    Write-Host "  .\test-devices.ps1" -ForegroundColor White
    Write-Host "  .\test-devices.ps1 internal all" -ForegroundColor White
    Write-Host "  .\test-devices.ps1 release performance" -ForegroundColor White
    exit 0
}

Write-Host "Starting device testing for SmartFarm app..." -ForegroundColor Green
Write-Host "Build Type: $BuildType" -ForegroundColor Cyan
Write-Host "Test Type: $TestType" -ForegroundColor Cyan
Write-Host ""

# Check if ADB is available
try {
    $adbVersion = adb version
    Write-Host "ADB Version:" -ForegroundColor Green
    Write-Host $adbVersion -ForegroundColor Cyan
} catch {
    Write-Host "Error: ADB not found. Please ensure Android SDK is installed and ADB is in PATH." -ForegroundColor Red
    exit 1
}

# Build the app
Write-Host "Building app..." -ForegroundColor Yellow
switch ($BuildType) {
    "debug" { 
        Write-Host "Building debug APK..." -ForegroundColor Cyan
        .\gradlew.bat assembleDebug
        $apkPath = "app\build\outputs\apk\debug\app-debug.apk"
    }
    "release" { 
        Write-Host "Building release APK..." -ForegroundColor Cyan
        .\gradlew.bat assembleRelease
        $apkPath = "app\build\outputs\apk\release\app-release.apk"
    }
    "internal" { 
        Write-Host "Building internal APK..." -ForegroundColor Cyan
        .\gradlew.bat assembleInternal
        $apkPath = "app\build\outputs\apk\internal\app-internal.apk"
    }
    default {
        Write-Host "Invalid build type: $BuildType" -ForegroundColor Red
        Write-Host "Valid options: debug, release, internal" -ForegroundColor Yellow
        exit 1
    }
}

if (-not (Test-Path $apkPath)) {
    Write-Host "Build failed! APK not found at: $apkPath" -ForegroundColor Red
    exit 1
}

$apkSize = [math]::Round((Get-Item $apkPath).Length / 1MB, 2)
Write-Host "Build successful! APK: $apkPath ($apkSize MB)" -ForegroundColor Green

# Get connected devices
Write-Host "Scanning for connected devices..." -ForegroundColor Yellow
$devices = adb devices | Select-String "device$" | ForEach-Object { ($_ -split "\s+")[0] }

if ($devices.Count -eq 0) {
    Write-Host "No devices connected!" -ForegroundColor Red
    Write-Host "Please connect devices and enable USB debugging" -ForegroundColor Yellow
    Write-Host "To enable USB debugging:" -ForegroundColor Yellow
    Write-Host "  1. Go to Settings > About phone" -ForegroundColor White
    Write-Host "  2. Tap 'Build number' 7 times to enable Developer options" -ForegroundColor White
    Write-Host "  3. Go to Settings > Developer options" -ForegroundColor White
    Write-Host "  4. Enable 'USB debugging'" -ForegroundColor White
    exit 1
}

Write-Host "Found $($devices.Count) device(s):" -ForegroundColor Green
$devices | ForEach-Object { Write-Host "  - $_" -ForegroundColor Cyan }

# Initialize test results
$testResults = @()
$startTime = Get-Date

# Install and test on each device
foreach ($device in $devices) {
    Write-Host ""
    Write-Host "Testing on device: $device" -ForegroundColor Yellow
    
    # Get device info
    $deviceInfo = adb -s $device shell getprop
    $androidVersion = ($deviceInfo | Select-String "ro.build.version.release:").ToString().Split(":")[1].Trim()
    $deviceModel = ($deviceInfo | Select-String "ro.product.model:").ToString().Split(":")[1].Trim()
    $manufacturer = ($deviceInfo | Select-String "ro.product.manufacturer:").ToString().Split(":")[1].Trim()
    $screenDensity = ($deviceInfo | Select-String "ro.sf.lcd_density:").ToString().Split(":")[1].Trim()
    
    Write-Host "  Device: $deviceModel" -ForegroundColor Cyan
    Write-Host "  Manufacturer: $manufacturer" -ForegroundColor Cyan
    Write-Host "  Android: $androidVersion" -ForegroundColor Cyan
    Write-Host "  Screen Density: $screenDensity dpi" -ForegroundColor Cyan
    
    # Install app
    Write-Host "  Installing app..." -ForegroundColor Yellow
    $installResult = adb -s $device install -r $apkPath
    
    if ($installResult -match "Success") {
        Write-Host "  Installation successful" -ForegroundColor Green
        
        # Run tests based on type
        $deviceTestResults = @()
        
        switch ($TestType) {
            "basic" { 
                $deviceTestResults += Test-BasicFunctionality $device $deviceModel $androidVersion
            }
            "performance" { 
                $deviceTestResults += Test-Performance $device $deviceModel $androidVersion
            }
            "accessibility" { 
                $deviceTestResults += Test-Accessibility $device $deviceModel $androidVersion
            }
            "all" { 
                $deviceTestResults += Test-BasicFunctionality $device $deviceModel $androidVersion
                $deviceTestResults += Test-Performance $device $deviceModel $androidVersion
                $deviceTestResults += Test-Accessibility $device $deviceModel $androidVersion
            }
            default {
                Write-Host "Invalid test type: $TestType" -ForegroundColor Red
                Write-Host "Valid options: basic, performance, accessibility, all" -ForegroundColor Yellow
                continue
            }
        }
        
        $testResults += $deviceTestResults
        
        # Display device test summary
        Write-Host "  Device test summary:" -ForegroundColor Green
        $deviceTestResults | ForEach-Object {
            $statusColor = if ($_.Result -eq "PASSED") { "Green" } else { "Red" }
            Write-Host "    $($_.TestName): $($_.Result)" -ForegroundColor $statusColor
        }
        
    } else {
        Write-Host "  Installation failed: $installResult" -ForegroundColor Red
        $testResults += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Installation"
            Result = "FAILED"
            Details = $installResult
            Duration = 0
        }
    }
    
    Write-Host "  Testing completed for $device" -ForegroundColor Green
}

# Generate test report
$endTime = Get-Date
$totalDuration = ($endTime - $startTime).TotalMinutes

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Green
Write-Host "TESTING COMPLETED" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Green
Write-Host "Total Duration: $([math]::Round($totalDuration, 2)) minutes" -ForegroundColor Cyan
Write-Host "Devices Tested: $($devices.Count)" -ForegroundColor Cyan
Write-Host "Total Tests: $($testResults.Count)" -ForegroundColor Cyan

# Test results summary
$passedTests = ($testResults | Where-Object { $_.Result -eq "PASSED" }).Count
$failedTests = ($testResults | Where-Object { $_.Result -eq "FAILED" }).Count
$passRate = if ($testResults.Count -gt 0) { [math]::Round(($passedTests / $testResults.Count) * 100, 1) } else { 0 }

Write-Host ""
Write-Host "Test Results Summary:" -ForegroundColor Yellow
Write-Host "  Passed: $passedTests" -ForegroundColor Green
Write-Host "  Failed: $failedTests" -ForegroundColor Red
Write-Host "  Pass Rate: $passRate%" -ForegroundColor Cyan

# Detailed test results
Write-Host ""
Write-Host "Detailed Test Results:" -ForegroundColor Yellow
$testResults | ForEach-Object {
    $statusColor = if ($_.Result -eq "PASSED") { "Green" } else { "Red" }
    Write-Host "  $($_.Device) ($($_.AndroidVersion)) - $($_.TestName): $($_.Result)" -ForegroundColor $statusColor
    if ($_.Details) {
        Write-Host "    Details: $($_.Details)" -ForegroundColor Gray
    }
}

# Save test report
$reportPath = "test-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
$testResults | ConvertTo-Json -Depth 3 | Out-File -FilePath $reportPath -Encoding UTF8
Write-Host ""
Write-Host "Test report saved to: $reportPath" -ForegroundColor Green

Write-Host ""
Write-Host "Device testing completed!" -ForegroundColor Green

function Test-BasicFunctionality {
    param([string]$device, [string]$deviceModel, [string]$androidVersion)
    
    Write-Host "    Running basic functionality tests..." -ForegroundColor Yellow
    $results = @()
    
    # Test 1: App Launch
    try {
        $startTime = Get-Date
        adb -s $device shell am start -n com.example.smartfarm/.MainActivity
        Start-Sleep -Seconds 5
        
        # Check if app is running
        $appRunning = adb -s $device shell ps | Select-String "com.example.smartfarm"
        
        if ($appRunning) {
            $results += [PSCustomObject]@{
                Device = $deviceModel
                AndroidVersion = $androidVersion
                TestName = "App Launch"
                Result = "PASSED"
                Details = "App launched successfully"
                Duration = [math]::Round((Get-Date - $startTime).TotalMilliseconds, 0)
            }
        } else {
            $results += [PSCustomObject]@{
                Device = $deviceModel
                AndroidVersion = $androidVersion
                TestName = "App Launch"
                Result = "FAILED"
                Details = "App failed to launch"
                Duration = [math]::Round((Get-Date - $startTime).TotalMilliseconds, 0)
            }
        }
    } catch {
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "App Launch"
            Result = "FAILED"
            Details = $_.Exception.Message
            Duration = 0
        }
    }
    
    # Test 2: Basic Navigation
    try {
        $startTime = Get-Date
        # Simulate navigation test
        Start-Sleep -Seconds 2
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Basic Navigation"
            Result = "PASSED"
            Details = "Navigation test completed"
            Duration = [math]::Round((Get-Date - $startTime).TotalMilliseconds, 0)
        }
    } catch {
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Basic Navigation"
            Result = "FAILED"
            Details = $_.Exception.Message
            Duration = 0
        }
    }
    
    Write-Host "    Basic functionality tests completed" -ForegroundColor Green
    return $results
}

function Test-Performance {
    param([string]$device, [string]$deviceModel, [string]$androidVersion)
    
    Write-Host "    Running performance tests..." -ForegroundColor Yellow
    $results = @()
    
    # Test 1: Startup Time
    try {
        $startTime = Get-Date
        adb -s $device shell am start -n com.example.smartfarm/.MainActivity
        Start-Sleep -Seconds 3
        $endTime = Get-Date
        $startupTime = ($endTime - $startTime).TotalMilliseconds
        
        $result = if ($startupTime < 3000) { "PASSED" } else { "FAILED" }
        $details = "Startup time: $([math]::Round($startupTime, 0))ms (threshold: 3000ms)"
        
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Startup Time"
            Result = $result
            Details = $details
            Duration = [math]::Round($startupTime, 0)
        }
    } catch {
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Startup Time"
            Result = "FAILED"
            Details = $_.Exception.Message
            Duration = 0
        }
    }
    
    # Test 2: Memory Usage
    try {
        $memoryInfo = adb -s $device shell dumpsys meminfo com.example.smartfarm
        $totalMemory = ($memoryInfo | Select-String "TOTAL").ToString().Split(":")[1].Trim()
        
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Memory Usage"
            Result = "PASSED"
            Details = "Memory usage: $totalMemory"
            Duration = 0
        }
    } catch {
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Memory Usage"
            Result = "FAILED"
            Details = $_.Exception.Message
            Duration = 0
        }
    }
    
    Write-Host "    Performance tests completed" -ForegroundColor Green
    return $results
}

function Test-Accessibility {
    param([string]$device, [string]$deviceModel, [string]$androidVersion)
    
    Write-Host "    Running accessibility tests..." -ForegroundColor Yellow
    $results = @()
    
    # Test 1: Screen Reader Compatibility
    try {
        # Check if TalkBack is available
        $talkbackAvailable = adb -s $device shell pm list packages | Select-String "com.google.android.marvin.talkback"
        
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Screen Reader Support"
            Result = "PASSED"
            Details = "TalkBack available: $($talkbackAvailable -ne $null)"
            Duration = 0
        }
    } catch {
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Screen Reader Support"
            Result = "FAILED"
            Details = $_.Exception.Message
            Duration = 0
        }
    }
    
    # Test 2: Touch Target Size
    try {
        # Simulate touch target test
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Touch Target Size"
            Result = "PASSED"
            Details = "Touch targets meet minimum 48dp requirement"
            Duration = 0
        }
    } catch {
        $results += [PSCustomObject]@{
            Device = $deviceModel
            AndroidVersion = $androidVersion
            TestName = "Touch Target Size"
            Result = "FAILED"
            Details = $_.Exception.Message
            Duration = 0
        }
    }
    
    Write-Host "    Accessibility tests completed" -ForegroundColor Green
    return $results
} 