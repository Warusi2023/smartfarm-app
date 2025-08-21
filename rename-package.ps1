# SmartFarm Package Rename Script
# This script renames the package from com.example.smartfarm to com.smartfarm.app

Write-Host "🌾 SmartFarm Package Rename Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Configuration
$oldPackage = "com.example.smartfarm"
$newPackage = "com.yourcompany.smartfarm"
$oldPackagePath = "com\example\smartfarm"
$newPackagePath = "com\yourcompany\smartfarm"

Write-Host "📦 Package Configuration:" -ForegroundColor Yellow
Write-Host "   Old Package: $oldPackage" -ForegroundColor Gray
Write-Host "   New Package: $newPackage" -ForegroundColor Gray
Write-Host ""

# Function to backup files before modification
function Backup-Files {
    Write-Host "🔒 Creating backup..." -ForegroundColor Blue
    
    $backupDir = "package-rename-backup-$(Get-Date -Format 'yyyy-MM-dd_HH-mm-ss')"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    
    # Backup main app source
    if (Test-Path "app\src\main\java\com\example\smartfarm") {
        Copy-Item -Path "app\src\main\java\com\example\smartfarm" -Destination "$backupDir\main-app" -Recurse -Force
    }
    
    # Backup test source
    if (Test-Path "app\src\test\java\com\example\smartfarm") {
        Copy-Item -Path "app\src\test\java\com\example\smartfarm" -Destination "$backupDir\test-app" -Recurse -Force
    }
    
    # Backup androidTest source
    if (Test-Path "app\src\androidTest\java\com\example\smartfarm") {
        Copy-Item -Path "app\src\androidTest\java\com\example\smartfarm" -Destination "$backupDir\android-test" -Recurse -Force
    }
    
    # Backup shared module
    if (Test-Path "shared\src\main\java\com\example\smartfarm") {
        Copy-Item -Path "shared\src\main\java\com\example\smartfarm" -Destination "$backupDir\shared" -Recurse -Force
    }
    
    Write-Host "   ✅ Backup created in: $backupDir" -ForegroundColor Green
    Write-Host ""
}

# Function to rename package directories
function Rename-PackageDirectories {
    Write-Host "📁 Renaming package directories..." -ForegroundColor Blue
    
    # Create new directory structure
    $newMainPath = "app\src\main\java\com\yourcompany\smartfarm"
    $newTestPath = "app\src\test\java\com\yourcompany\smartfarm"
    $newAndroidTestPath = "app\src\androidTest\java\com\yourcompany\smartfarm"
    $newSharedPath = "shared\src\main\java\com\yourcompany\smartfarm"
    
    # Create directories
    New-Item -ItemType Directory -Path $newMainPath -Force | Out-Null
    New-Item -ItemType Directory -Path $newTestPath -Force | Out-Null
    New-Item -ItemType Directory -Path $newAndroidTestPath -Force | Out-Null
    New-Item -ItemType Directory -Path $newSharedPath -Force | Out-Null
    
    # Move main app files
    if (Test-Path "app\src\main\java\com\example\smartfarm") {
        Copy-Item -Path "app\src\main\java\com\example\smartfarm\*" -Destination $newMainPath -Recurse -Force
        Remove-Item -Path "app\src\main\java\com\example\smartfarm" -Recurse -Force
    }
    
    # Move test files
    if (Test-Path "app\src\test\java\com\example\smartfarm") {
        Copy-Item -Path "app\src\test\java\com\example\smartfarm\*" -Destination $newTestPath -Recurse -Force
        Remove-Item -Path "app\src\test\java\com\example\smartfarm" -Recurse -Force
    }
    
    # Move androidTest files
    if (Test-Path "app\src\androidTest\java\com\example\smartfarm") {
        Copy-Item -Path "app\src\androidTest\java\com\example\smartfarm\*" -Destination $newAndroidTestPath -Recurse -Force
        Remove-Item -Path "app\src\androidTest\java\com\example\smartfarm" -Recurse -Force
    }
    
    # Move shared files
    if (Test-Path "shared\src\main\java\com\example\smartfarm") {
        Copy-Item -Path "shared\src\main\java\com\example\smartfarm\*" -Destination $newSharedPath -Recurse -Force
        Remove-Item -Path "shared\src\main\java\com\example\smartfarm" -Recurse -Force
    }
    
    # Clean up empty directories
    $emptyDirs = @(
        "app\src\main\java\com\example",
        "app\src\test\java\com\example",
        "app\src\androidTest\java\com\example",
        "shared\src\main\java\com\example"
    )
    
    foreach ($dir in $emptyDirs) {
        if (Test-Path $dir -and (Get-ChildItem $dir -Recurse | Measure-Object).Count -eq 0) {
            Remove-Item -Path $dir -Force
        }
    }
    
    Write-Host "   ✅ Package directories renamed" -ForegroundColor Green
    Write-Host ""
}

# Function to update package declarations in Kotlin files
function Update-PackageDeclarations {
    Write-Host "📝 Updating package declarations..." -ForegroundColor Blue
    
    $kotlinFiles = @(
        "app\src\main\java\com\yourcompany\smartfarm\**\*.kt",
        "app\src\test\java\com\yourcompany\smartfarm\**\*.kt",
        "app\src\androidTest\java\com\yourcompany\smartfarm\**\*.kt",
        "shared\src\main\java\com\yourcompany\smartfarm\**\*.kt"
    )
    
    $updatedFiles = 0
    foreach ($pattern in $kotlinFiles) {
        $files = Get-ChildItem -Path $pattern -Recurse -ErrorAction SilentlyContinue
        foreach ($file in $files) {
            $content = Get-Content $file.FullName -Raw
            if ($content -match $oldPackage) {
                $newContent = $content -replace $oldPackage, $newPackage
                Set-Content -Path $file.FullName -Value $newContent -NoNewline
                $updatedFiles++
            }
        }
    }
    
    Write-Host "   ✅ Updated $updatedFiles Kotlin files" -ForegroundColor Green
    Write-Host ""
}

# Function to update import statements
function Update-ImportStatements {
    Write-Host "🔗 Updating import statements..." -ForegroundColor Blue
    
    $kotlinFiles = @(
        "app\src\main\java\com\yourcompany\smartfarm\**\*.kt",
        "app\src\test\java\com\yourcompany\smartfarm\**\*.kt",
        "app\src\androidTest\java\com\yourcompany\smartfarm\**\*.kt",
        "shared\src\main\java\com\yourcompany\smartfarm\**\*.kt"
    )
    
    $updatedFiles = 0
    foreach ($pattern in $kotlinFiles) {
        $files = Get-ChildItem -Path $pattern -Recurse -ErrorAction SilentlyContinue
        foreach ($file in $files) {
            $content = Get-Content $file.FullName -Raw
            if ($content -match "import $oldPackage") {
                $newContent = $content -replace "import $oldPackage", "import $newPackage"
                Set-Content -Path $file.FullName -Value $newContent -NoNewline
                $updatedFiles++
            }
        }
    }
    
    Write-Host "   ✅ Updated import statements in $updatedFiles files" -ForegroundColor Green
    Write-Host ""
}

# Function to update AndroidManifest.xml
function Update-AndroidManifest {
    Write-Host "📱 Updating AndroidManifest.xml..." -ForegroundColor Blue
    
    $manifestFile = "app\src\main\AndroidManifest.xml"
    if (Test-Path $manifestFile) {
        $content = Get-Content $manifestFile -Raw
        $newContent = $content -replace $oldPackage, $newPackage
        Set-Content -Path $manifestFile -Value $newContent -NoNewline
        Write-Host "   ✅ AndroidManifest.xml updated" -ForegroundColor Green
    }
    
    Write-Host ""
}

# Function to update ProGuard rules
function Update-ProGuardRules {
    Write-Host "🛡️ Updating ProGuard rules..." -ForegroundColor Blue
    
    $proguardFile = "app\proguard-rules.pro"
    if (Test-Path $proguardFile) {
        $content = Get-Content $proguardFile -Raw
        $newContent = $content -replace $oldPackage, $newPackage
        Set-Content -Path $proguardFile -Value $newContent -NoNewline
        Write-Host "   ✅ ProGuard rules updated" -ForegroundColor Green
    }
    
    Write-Host ""
}

# Function to update documentation files
function Update-Documentation {
    Write-Host "📚 Updating documentation files..." -ForegroundColor Blue
    
    $docs = @(
        "*.md",
        "app\src\main\java\com\yourcompany\smartfarm\**\*.md"
    )
    
    $updatedDocs = 0
    foreach ($pattern in $docs) {
        $files = Get-ChildItem -Path $pattern -Recurse -ErrorAction SilentlyContinue
        foreach ($file in $files) {
            $content = Get-Content $file.FullName -Raw
            if ($content -match $oldPackage) {
                $newContent = $content -replace $oldPackage, $newPackage
                Set-Content -Path $file.FullName -Value $newContent -NoNewline
                $updatedDocs++
            }
        }
    }
    
    Write-Host "   ✅ Updated $updatedDocs documentation files" -ForegroundColor Green
    Write-Host ""
}

# Function to clean and rebuild
function Clean-And-Rebuild {
    Write-Host "🧹 Cleaning and rebuilding project..." -ForegroundColor Blue
    
    # Clean project
    Write-Host "   Cleaning project..." -ForegroundColor Gray
    try {
        .\gradlew clean
        Write-Host "   ✅ Project cleaned" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️ Gradle clean failed (this is normal if Gradle is not in PATH)" -ForegroundColor Yellow
    }
    
    Write-Host ""
}

# Main execution
try {
    Write-Host "🚀 Starting package rename process..." -ForegroundColor Green
    Write-Host ""
    
    # Step 1: Backup
    Backup-Files
    
    # Step 2: Rename directories
    Rename-PackageDirectories
    
    # Step 3: Update package declarations
    Update-PackageDeclarations
    
    # Step 4: Update import statements
    Update-ImportStatements
    
    # Step 5: Update AndroidManifest.xml
    Update-AndroidManifest
    
    # Step 6: Update ProGuard rules
    Update-ProGuardRules
    
    # Step 7: Update documentation
    Update-Documentation
    
    # Step 8: Clean and rebuild
    Clean-And-Rebuild
    
    Write-Host "🎉 Package rename completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Review the changes in your IDE" -ForegroundColor Gray
    Write-Host "   2. Fix any remaining import issues" -ForegroundColor Gray
    Write-Host "   3. Test the app thoroughly" -ForegroundColor Gray
    Write-Host "   4. Build and test the release version" -ForegroundColor Gray
    Write-Host ""
    Write-Host "⚠️  Important:" -ForegroundColor Red
    Write-Host "   - The old package 'com.example.smartfarm' has been renamed to 'com.yourcompany.smartfarm'" -ForegroundColor Gray
    Write-Host "   - All import statements have been updated" -ForegroundColor Gray
    Write-Host "   - A backup has been created in case you need to revert" -ForegroundColor Gray
    Write-Host ""
    
} catch {
    Write-Host "❌ Error during package rename: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   Please check the error and try again" -ForegroundColor Gray
}
