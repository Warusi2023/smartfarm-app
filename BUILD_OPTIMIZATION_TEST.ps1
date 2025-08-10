# SmartFarm Build Optimization Test Script
# This script tests and validates the build optimization configuration

param(
    [switch]$Help,
    [switch]$TestDebug,
    [switch]$TestInternal,
    [switch]$TestRelease,
    [switch]$CompareSizes,
    [switch]$FullTest
)

function Show-Help {
    Write-Host "SmartFarm Build Optimization Test Script" -ForegroundColor Green
    Write-Host "=========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\BUILD_OPTIMIZATION_TEST.ps1 -TestDebug     # Test debug build" -ForegroundColor White
    Write-Host "  .\BUILD_OPTIMIZATION_TEST.ps1 -TestInternal  # Test internal build" -ForegroundColor White
    Write-Host "  .\BUILD_OPTIMIZATION_TEST.ps1 -TestRelease   # Test release build" -ForegroundColor White
    Write-Host "  .\BUILD_OPTIMIZATION_TEST.ps1 -CompareSizes  # Compare APK sizes" -ForegroundColor White
    Write-Host "  .\BUILD_OPTIMIZATION_TEST.ps1 -FullTest      # Run all tests" -ForegroundColor White
    Write-Host "  .\BUILD_OPTIMIZATION_TEST.ps1 -Help          # Show this help" -ForegroundColor White
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  -TestDebug     : Build and test debug version" -ForegroundColor White
    Write-Host "  -TestInternal  : Build and test internal version" -ForegroundColor White
    Write-Host "  -TestRelease   : Build and test release version (optimized)" -ForegroundColor White
    Write-Host "  -CompareSizes  : Compare APK sizes between build types" -ForegroundColor White
    Write-Host "  -FullTest      : Run comprehensive build testing" -ForegroundColor White
    Write-Host "  -Help          : Show this help message" -ForegroundColor White
}

function Test-BuildConfiguration {
    Write-Host "Checking build configuration..." -ForegroundColor Yellow
    
    $buildGradlePath = "app/build.gradle.kts"
    if (Test-Path $buildGradlePath) {
        $content = Get-Content $buildGradlePath -Raw
        
        # Check release build configuration
        if ($content -match "isMinifyEnabled = true") {
            Write-Host "  ✅ Code obfuscation: Enabled for release" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Code obfuscation: Not enabled" -ForegroundColor Red
        }
        
        if ($content -match "isShrinkResources = true") {
            Write-Host "  ✅ Resource shrinking: Enabled for release" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Resource shrinking: Not enabled" -ForegroundColor Red
        }
        
        if ($content -match "proguard-android-optimize.txt") {
            Write-Host "  ✅ ProGuard optimization: Enabled" -ForegroundColor Green
        } else {
            Write-Host "  ❌ ProGuard optimization: Not enabled" -ForegroundColor Red
        }
        
        if ($content -match "proguard-rules.pro") {
            Write-Host "  ✅ Custom ProGuard rules: Configured" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Custom ProGuard rules: Not configured" -ForegroundColor Red
        }
    } else {
        Write-Host "  ❌ build.gradle.kts: File not found" -ForegroundColor Red
    }
}

function Test-ProGuardRules {
    Write-Host "Checking ProGuard rules..." -ForegroundColor Yellow
    
    $proguardPath = "app/proguard-rules.pro"
    if (Test-Path $proguardPath) {
        $content = Get-Content $proguardPath -Raw
        
        # Check for essential rules
        $essentialRules = @(
            "com.example.smartfarm.MainActivity",
            "com.example.smartfarm.SmartFarmApplication",
            "com.google.firebase",
            "androidx.room",
            "androidx.compose",
            "dagger.hilt"
        )
        
        foreach ($rule in $essentialRules) {
            if ($content -match $rule) {
                Write-Host "  ✅ ProGuard rule for $rule : Found" -ForegroundColor Green
            } else {
                Write-Host "  ❌ ProGuard rule for $rule : Missing" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "  ❌ proguard-rules.pro: File not found" -ForegroundColor Red
    }
}

function Invoke-Build {
    param(
        [string]$BuildType
    )
    
    Write-Host "Building $BuildType version..." -ForegroundColor Yellow
    
    $startTime = Get-Date
    $command = ".\gradlew.bat assemble$BuildType"
    
    try {
        $result = Invoke-Expression $command
        $endTime = Get-Date
        $duration = $endTime - $startTime
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ $BuildType build: Successful ($($duration.TotalSeconds.ToString('F1'))s)" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  ❌ $BuildType build: Failed" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "  ❌ $BuildType build: Error - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

function Get-ApkSize {
    param(
        [string]$BuildType
    )
    
    $apkPath = "app/build/outputs/apk/$BuildType/app-$BuildType.apk"
    if (Test-Path $apkPath) {
        $fileInfo = Get-Item $apkPath
        $sizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
        return $sizeMB
    }
    return $null
}

function Compare-ApkSizes {
    Write-Host "Comparing APK sizes..." -ForegroundColor Yellow
    
    $debugSize = Get-ApkSize "debug"
    $internalSize = Get-ApkSize "internal"
    $releaseSize = Get-ApkSize "release"
    
    if ($debugSize -and $releaseSize) {
        $reduction = [math]::Round((($debugSize - $releaseSize) / $debugSize) * 100, 1)
        Write-Host "  📊 APK Size Comparison:" -ForegroundColor Cyan
        Write-Host "    Debug: $debugSize MB" -ForegroundColor White
        Write-Host "    Internal: $internalSize MB" -ForegroundColor White
        Write-Host "    Release: $releaseSize MB" -ForegroundColor White
        Write-Host "    Size Reduction: $reduction%" -ForegroundColor Green
        
        if ($reduction -gt 20) {
            Write-Host "    ✅ Excellent optimization achieved!" -ForegroundColor Green
        } elseif ($reduction -gt 10) {
            Write-Host "    ✅ Good optimization achieved" -ForegroundColor Green
        } else {
            Write-Host "    ⚠️ Limited optimization - check ProGuard rules" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ❌ Could not determine APK sizes" -ForegroundColor Red
    }
}

function Test-ProGuardMapping {
    Write-Host "Checking ProGuard mapping..." -ForegroundColor Yellow
    
    $mappingPath = "app/build/outputs/mapping/release/mapping.txt"
    if (Test-Path $mappingPath) {
        $fileInfo = Get-Item $mappingPath
        $sizeKB = [math]::Round($fileInfo.Length / 1KB, 1)
        Write-Host "  ✅ ProGuard mapping: Generated ($sizeKB KB)" -ForegroundColor Green
        Write-Host "    Location: $mappingPath" -ForegroundColor Gray
    } else {
        Write-Host "  ❌ ProGuard mapping: Not generated" -ForegroundColor Red
    }
}

function Test-BuildArtifacts {
    Write-Host "Checking build artifacts..." -ForegroundColor Yellow
    
    $artifacts = @(
        "app/build/outputs/apk/debug/app-debug.apk",
        "app/build/outputs/apk/internal/app-internal.apk",
        "app/build/outputs/apk/release/app-release.apk"
    )
    
    foreach ($artifact in $artifacts) {
        if (Test-Path $artifact) {
            $fileInfo = Get-Item $artifact
            $sizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
            Write-Host "  ✅ $($fileInfo.Name): $sizeMB MB" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $artifact: Not found" -ForegroundColor Red
        }
    }
}

function Invoke-TestDebug {
    Write-Host "Testing Debug Build" -ForegroundColor Green
    Write-Host "===================" -ForegroundColor Green
    Write-Host ""
    
    $success = Invoke-Build "Debug"
    if ($success) {
        Test-BuildArtifacts
    }
}

function Invoke-TestInternal {
    Write-Host "Testing Internal Build" -ForegroundColor Green
    Write-Host "======================" -ForegroundColor Green
    Write-Host ""
    
    $success = Invoke-Build "Internal"
    if ($success) {
        Test-BuildArtifacts
    }
}

function Invoke-TestRelease {
    Write-Host "Testing Release Build (Optimized)" -ForegroundColor Green
    Write-Host "=================================" -ForegroundColor Green
    Write-Host ""
    
    $success = Invoke-Build "Release"
    if ($success) {
        Test-BuildArtifacts
        Test-ProGuardMapping
    }
}

function Invoke-CompareSizes {
    Write-Host "APK Size Comparison" -ForegroundColor Green
    Write-Host "===================" -ForegroundColor Green
    Write-Host ""
    
    Compare-ApkSizes
}

function Invoke-FullTest {
    Write-Host "Comprehensive Build Optimization Test" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host ""
    
    # Check configuration
    Test-BuildConfiguration
    Write-Host ""
    
    Test-ProGuardRules
    Write-Host ""
    
    # Build all versions
    Write-Host "Building all versions..." -ForegroundColor Yellow
    Write-Host ""
    
    $debugSuccess = Invoke-Build "Debug"
    Write-Host ""
    
    $internalSuccess = Invoke-Build "Internal"
    Write-Host ""
    
    $releaseSuccess = Invoke-Build "Release"
    Write-Host ""
    
    # Check results
    if ($debugSuccess -and $internalSuccess -and $releaseSuccess) {
        Write-Host "✅ All builds successful!" -ForegroundColor Green
        Write-Host ""
        
        Test-BuildArtifacts
        Write-Host ""
        
        Test-ProGuardMapping
        Write-Host ""
        
        Compare-ApkSizes
        Write-Host ""
        
        Write-Host "🎉 Build optimization test completed successfully!" -ForegroundColor Green
        Write-Host "Your SmartFarm app is ready for production deployment." -ForegroundColor Cyan
    } else {
        Write-Host "❌ Some builds failed. Please check the errors above." -ForegroundColor Red
    }
}

# Main script logic
if ($Help) {
    Show-Help
} elseif ($TestDebug) {
    Invoke-TestDebug
} elseif ($TestInternal) {
    Invoke-TestInternal
} elseif ($TestRelease) {
    Invoke-TestRelease
} elseif ($CompareSizes) {
    Invoke-CompareSizes
} elseif ($FullTest) {
    Invoke-FullTest
} else {
    Show-Help
} 