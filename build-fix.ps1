# SmartFarm Build Fix Script
# This script helps fix common build compilation issues

param(
    [switch]$Help,
    [switch]$Clean,
    [switch]$CheckJava,
    [switch]$TestDebug,
    [switch]$TestRelease,
    [switch]$FullFix
)

function Show-Help {
    Write-Host "SmartFarm Build Fix Script" -ForegroundColor Green
    Write-Host "=========================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Yellow
    Write-Host "  .\build-fix.ps1 -Help          # Show this help" -ForegroundColor White
    Write-Host "  .\build-fix.ps1 -Clean         # Clean project and cache" -ForegroundColor White
    Write-Host "  .\build-fix.ps1 -CheckJava     # Check Java installation" -ForegroundColor White
    Write-Host "  .\build-fix.ps1 -TestDebug     # Test debug build" -ForegroundColor White
    Write-Host "  .\build-fix.ps1 -TestRelease   # Test release build" -ForegroundColor White
    Write-Host "  .\build-fix.ps1 -FullFix       # Run complete fix process" -ForegroundColor White
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  -Clean         : Clean project and Gradle cache" -ForegroundColor White
    Write-Host "  -CheckJava     : Verify Java installation and version" -ForegroundColor White
    Write-Host "  -TestDebug     : Build and test debug version" -ForegroundColor White
    Write-Host "  -TestRelease   : Build and test release version" -ForegroundColor White
    Write-Host "  -FullFix       : Run complete troubleshooting process" -ForegroundColor White
    Write-Host "  -Help          : Show this help message" -ForegroundColor White
}

function Invoke-CleanProject {
    Write-Host "Cleaning project..." -ForegroundColor Yellow
    
    try {
        Write-Host "  Cleaning Gradle build..." -ForegroundColor Gray
        .\gradlew.bat clean
        
        Write-Host "  Cleaning Gradle cache..." -ForegroundColor Gray
        .\gradlew.bat cleanBuildCache
        
        Write-Host "  Removing build directories..." -ForegroundColor Gray
        if (Test-Path "app/build") {
            Remove-Item -Recurse -Force "app/build"
        }
        if (Test-Path "build") {
            Remove-Item -Recurse -Force "build"
        }
        
        Write-Host "  ✅ Project cleaned successfully" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "  ❌ Clean failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

function Test-JavaInstallation {
    Write-Host "Checking Java installation..." -ForegroundColor Yellow
    
    try {
        $javaVersion = java -version 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Java found:" -ForegroundColor Green
            Write-Host "    $javaVersion" -ForegroundColor Gray
            
            # Check JAVA_HOME
            $javaHome = $env:JAVA_HOME
            if ($javaHome) {
                Write-Host "  ✅ JAVA_HOME set: $javaHome" -ForegroundColor Green
            } else {
                Write-Host "  ⚠️ JAVA_HOME not set" -ForegroundColor Yellow
            }
            
            return $true
        } else {
            Write-Host "  ❌ Java not found or not in PATH" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "  ❌ Java check failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

function Test-BuildConfiguration {
    Write-Host "Checking build configuration..." -ForegroundColor Yellow
    
    $buildGradlePath = "app/build.gradle.kts"
    if (Test-Path $buildGradlePath) {
        $content = Get-Content $buildGradlePath -Raw
        
        $checks = @(
            @{ Name = "Hilt Plugin"; Pattern = "dagger.hilt.android.plugin" },
            @{ Name = "Kapt Plugin"; Pattern = "org.jetbrains.kotlin.kapt" },
            @{ Name = "Hilt Dependencies"; Pattern = "com.google.dagger:hilt-android" },
            @{ Name = "Hilt Compiler"; Pattern = "hilt-android-compiler" },
            @{ Name = "ProGuard Rules"; Pattern = "proguard-rules.pro" }
        )
        
        foreach ($check in $checks) {
            if ($content -match $check.Pattern) {
                Write-Host "  ✅ $($check.Name): Found" -ForegroundColor Green
            } else {
                Write-Host "  ❌ $($check.Name): Missing" -ForegroundColor Red
            }
        }
        
        return $true
    } else {
        Write-Host "  ❌ build.gradle.kts: File not found" -ForegroundColor Red
        return $false
    }
}

function Invoke-BuildTest {
    param(
        [string]$BuildType
    )
    
    Write-Host "Testing $BuildType build..." -ForegroundColor Yellow
    
    $startTime = Get-Date
    $command = ".\gradlew.bat assemble$BuildType"
    
    try {
        Write-Host "  Building $BuildType..." -ForegroundColor Gray
        $result = Invoke-Expression $command
        $endTime = Get-Date
        $duration = $endTime - $startTime
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ $BuildType build: Successful ($($duration.TotalSeconds.ToString('F1'))s)" -ForegroundColor Green
            
            # Check for APK
            $apkPath = "app/build/outputs/apk/$BuildType.ToLower()/app-$BuildType.ToLower().apk"
            if (Test-Path $apkPath) {
                $fileInfo = Get-Item $apkPath
                $sizeMB = [math]::Round($fileInfo.Length / 1MB, 2)
                Write-Host "  📦 APK created: $sizeMB MB" -ForegroundColor Cyan
            }
            
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

function Test-ProGuardMapping {
    Write-Host "Checking ProGuard mapping..." -ForegroundColor Yellow
    
    $mappingPath = "app/build/outputs/mapping/release/mapping.txt"
    if (Test-Path $mappingPath) {
        $fileInfo = Get-Item $mappingPath
        $sizeKB = [math]::Round($fileInfo.Length / 1KB, 1)
        Write-Host "  ✅ ProGuard mapping: Generated ($sizeKB KB)" -ForegroundColor Green
        return $true
    } else {
        Write-Host "  ❌ ProGuard mapping: Not generated" -ForegroundColor Red
        return $false
    }
}

function Invoke-FullFix {
    Write-Host "Running complete build fix process..." -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host ""
    
    # Step 1: Check Java
    Write-Host "Step 1: Checking Java installation" -ForegroundColor Cyan
    $javaOk = Test-JavaInstallation
    Write-Host ""
    
    if (-not $javaOk) {
        Write-Host "❌ Java installation issue detected. Please install Java 8 or 11." -ForegroundColor Red
        return $false
    }
    
    # Step 2: Check build configuration
    Write-Host "Step 2: Checking build configuration" -ForegroundColor Cyan
    $configOk = Test-BuildConfiguration
    Write-Host ""
    
    if (-not $configOk) {
        Write-Host "❌ Build configuration issues detected." -ForegroundColor Red
        return $false
    }
    
    # Step 3: Clean project
    Write-Host "Step 3: Cleaning project" -ForegroundColor Cyan
    $cleanOk = Invoke-CleanProject
    Write-Host ""
    
    if (-not $cleanOk) {
        Write-Host "❌ Clean failed." -ForegroundColor Red
        return $false
    }
    
    # Step 4: Test debug build
    Write-Host "Step 4: Testing debug build" -ForegroundColor Cyan
    $debugOk = Invoke-BuildTest "Debug"
    Write-Host ""
    
    if (-not $debugOk) {
        Write-Host "❌ Debug build failed. Please check compilation errors." -ForegroundColor Red
        return $false
    }
    
    # Step 5: Test release build
    Write-Host "Step 5: Testing release build" -ForegroundColor Cyan
    $releaseOk = Invoke-BuildTest "Release"
    Write-Host ""
    
    if (-not $releaseOk) {
        Write-Host "❌ Release build failed. Please check the troubleshooting guide." -ForegroundColor Red
        return $false
    }
    
    # Step 6: Check ProGuard mapping
    Write-Host "Step 6: Checking ProGuard mapping" -ForegroundColor Cyan
    $mappingOk = Test-ProGuardMapping
    Write-Host ""
    
    # Summary
    Write-Host "🎉 Build fix process completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Results:" -ForegroundColor Yellow
    Write-Host "  Java Installation: $(if ($javaOk) { '✅ OK' } else { '❌ Failed' })" -ForegroundColor $(if ($javaOk) { 'Green' } else { 'Red' })
    Write-Host "  Build Configuration: $(if ($configOk) { '✅ OK' } else { '❌ Failed' })" -ForegroundColor $(if ($configOk) { 'Green' } else { 'Red' })
    Write-Host "  Project Clean: $(if ($cleanOk) { '✅ OK' } else { '❌ Failed' })" -ForegroundColor $(if ($cleanOk) { 'Green' } else { 'Red' })
    Write-Host "  Debug Build: $(if ($debugOk) { '✅ OK' } else { '❌ Failed' })" -ForegroundColor $(if ($debugOk) { 'Green' } else { 'Red' })
    Write-Host "  Release Build: $(if ($releaseOk) { '✅ OK' } else { '❌ Failed' })" -ForegroundColor $(if ($releaseOk) { 'Green' } else { 'Red' })
    Write-Host "  ProGuard Mapping: $(if ($mappingOk) { '✅ OK' } else { '❌ Failed' })" -ForegroundColor $(if ($mappingOk) { 'Green' } else { 'Red' })
    Write-Host ""
    
    if ($debugOk -and $releaseOk) {
        Write-Host "✅ Your SmartFarm app is ready for production deployment!" -ForegroundColor Green
        Write-Host "📦 Release APK: app/build/outputs/apk/release/app-release.apk" -ForegroundColor Cyan
        return $true
    } else {
        Write-Host "❌ Some issues remain. Please check the troubleshooting guide." -ForegroundColor Red
        return $false
    }
}

# Main script logic
if ($Help) {
    Show-Help
} elseif ($Clean) {
    Invoke-CleanProject
} elseif ($CheckJava) {
    Test-JavaInstallation
} elseif ($TestDebug) {
    Invoke-BuildTest "Debug"
} elseif ($TestRelease) {
    Invoke-BuildTest "Release"
} elseif ($FullFix) {
    Invoke-FullFix
} else {
    Show-Help
} 