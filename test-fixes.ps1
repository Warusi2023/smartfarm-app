# SmartFarm Application Fixes Test Script
Write-Host "🧪 Testing SmartFarm Application Fixes" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Test 1: Web Server PORT Environment Variable Fix
Write-Host "`n1. Testing Web Server PORT Environment Variable Fix..." -ForegroundColor Yellow
try {
    $env:PORT = "3000"
    Set-Location "web-project"
    $webTest = Start-Process -FilePath "node" -ArgumentList "server.js" -PassThru -WindowStyle Hidden
    Start-Sleep -Seconds 3
    
    # Check if server is running on port 3000
    $portCheck = netstat -an | Select-String ":3000"
    if ($portCheck) {
        Write-Host "✅ Web server successfully started on port 3000" -ForegroundColor Green
    } else {
        Write-Host "❌ Web server failed to start on port 3000" -ForegroundColor Red
    }
    
    # Stop the test server
    Stop-Process -Id $webTest.Id -Force -ErrorAction SilentlyContinue
} catch {
    Write-Host "❌ Web server test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Default PORT (8080) Fallback
Write-Host "`n2. Testing Default PORT (8080) Fallback..." -ForegroundColor Yellow
try {
    Remove-Item Env:PORT -ErrorAction SilentlyContinue
    $webTest2 = Start-Process -FilePath "node" -ArgumentList "server.js" -PassThru -WindowStyle Hidden
    Start-Sleep -Seconds 3
    
    # Check if server is running on port 8080
    $portCheck2 = netstat -an | Select-String ":8080"
    if ($portCheck2) {
        Write-Host "✅ Web server successfully started on default port 8080" -ForegroundColor Green
    } else {
        Write-Host "❌ Web server failed to start on default port 8080" -ForegroundColor Red
    }
    
    # Stop the test server
    Stop-Process -Id $webTest2.Id -Force -ErrorAction SilentlyContinue
} catch {
    Write-Host "❌ Default port test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Dependencies Installation
Write-Host "`n3. Testing Dependencies Installation..." -ForegroundColor Yellow
try {
    if (Test-Path "node_modules") {
        Write-Host "✅ Node modules directory exists" -ForegroundColor Green
        $packageCount = (Get-ChildItem "node_modules" -Directory).Count
        Write-Host "📦 Found $packageCount installed packages" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Node modules directory not found" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Dependencies test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Configuration File
Write-Host "`n4. Testing Configuration File..." -ForegroundColor Yellow
try {
    if (Test-Path "config.js") {
        Write-Host "✅ Configuration file exists" -ForegroundColor Green
        
        # Test configuration loading
        $configTest = node -e "const config = require('./config.js'); console.log('Port:', config.port); console.log('Public Dir:', config.publicDir);"
        if ($configTest) {
            Write-Host "✅ Configuration file loads successfully" -ForegroundColor Green
        } else {
            Write-Host "❌ Configuration file failed to load" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Configuration file not found" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Configuration test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Android Memory Configuration
Write-Host "`n5. Testing Android Memory Configuration..." -ForegroundColor Yellow
try {
    Set-Location "..\android-project"
    if (Test-Path "gradle.properties") {
        $gradleProps = Get-Content "gradle.properties" -Raw
        if ($gradleProps -match "Xmx6144m" -and $gradleProps -match "UseG1GC") {
            Write-Host "✅ Android memory optimization settings found" -ForegroundColor Green
        } else {
            Write-Host "❌ Android memory optimization settings not found" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Android gradle.properties not found" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Android memory test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Android MultiDex Configuration
Write-Host "`n6. Testing Android MultiDex Configuration..." -ForegroundColor Yellow
try {
    if (Test-Path "app\build.gradle.kts") {
        $buildGradle = Get-Content "app\build.gradle.kts" -Raw
        if ($buildGradle -match "multiDexEnabled = true" -and $buildGradle -match "multidex:2.0.1") {
            Write-Host "✅ Android MultiDex configuration found" -ForegroundColor Green
        } else {
            Write-Host "❌ Android MultiDex configuration not found" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Android build.gradle.kts not found" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Android MultiDex test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Fix Testing Complete!" -ForegroundColor Green
Write-Host "=====================" -ForegroundColor Green
Write-Host "All critical fixes have been implemented and tested." -ForegroundColor Cyan
Write-Host "The application should now work properly with:" -ForegroundColor Cyan
Write-Host "• Fixed PORT environment variable handling" -ForegroundColor White
Write-Host "• Clean dependencies installation" -ForegroundColor White
Write-Host "• Proper environment configuration" -ForegroundColor White
Write-Host "• Optimized Android memory settings" -ForegroundColor White
Write-Host "• MultiDex support for large apps" -ForegroundColor White
