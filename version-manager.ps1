# SmartFarm Version Management Script
# This script handles semantic versioning and automated version bumping

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("patch", "minor", "major")]
    [string]$BumpType = "patch",
    
    [Parameter(Mandatory=$false)]
    [string]$BuildType = "release",
    
    [Parameter(Mandatory=$false)]
    [switch]$DryRun,
    
    [Parameter(Mandatory=$false)]
    [switch]$ShowCurrent
)

# Configuration
$versionFile = "version.properties"
$gradleFile = "app/build.gradle.kts"
$changelogFile = "CHANGELOG.md"

Write-Host "SmartFarm Version Manager" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green

# Function to read version properties
function Read-VersionProperties {
    if (-not (Test-Path $versionFile)) {
        Write-Host "Error: Version file not found: $versionFile" -ForegroundColor Red
        exit 1
    }
    
    $properties = @{}
    Get-Content $versionFile | ForEach-Object {
        if ($_ -match "^([^#][^=]+)=(.*)$") {
            $properties[$matches[1].Trim()] = $matches[2].Trim()
        }
    }
    return $properties
}

# Function to write version properties
function Write-VersionProperties {
    param($properties)
    
    $content = @"
# SmartFarm App Version Configuration
# This file centralizes version management for the app

# Current version information
version.name=$($properties['version.name'])
version.code=$($properties['version.code'])

# Version components for semantic versioning
version.major=$($properties['version.major'])
version.minor=$($properties['version.minor'])
version.patch=$($properties['version.patch'])

# Build information
build.number=$($properties['build.number'])
build.date=$($properties['build.date'])

# Version suffixes for different build types
version.suffix.debug=$($properties['version.suffix.debug'])
version.suffix.alpha=$($properties['version.suffix.alpha'])
version.suffix.beta=$($properties['version.suffix.beta'])
version.suffix.rc=$($properties['version.suffix.rc'])

# Version bump configuration
auto.increment.patch=$($properties['auto.increment.patch'])
auto.increment.minor=$($properties['auto.increment.minor'])
auto.increment.major=$($properties['auto.increment.major'])
"@
    
    $content | Out-File -FilePath $versionFile -Encoding UTF8
}

# Function to bump version
function Bump-Version {
    param($properties, $bumpType)
    
    $major = [int]$properties['version.major']
    $minor = [int]$properties['version.minor']
    $patch = [int]$properties['version.patch']
    $code = [int]$properties['version.code']
    
    switch ($bumpType) {
        "major" {
            $major++
            $minor = 0
            $patch = 0
        }
        "minor" {
            $minor++
            $patch = 0
        }
        "patch" {
            $patch++
        }
    }
    
    $code++
    $versionName = "$major.$minor.$patch"
    $buildDate = Get-Date -Format "yyyy-MM-dd"
    
    $properties['version.major'] = $major.ToString()
    $properties['version.minor'] = $minor.ToString()
    $properties['version.patch'] = $patch.ToString()
    $properties['version.name'] = $versionName
    $properties['version.code'] = $code.ToString()
    $properties['build.number'] = $code.ToString()
    $properties['build.date'] = $buildDate
    
    return $properties
}

# Function to update Gradle file
function Update-GradleFile {
    param($properties, $buildType)
    
    if (-not (Test-Path $gradleFile)) {
        Write-Host "Error: Gradle file not found: $gradleFile" -ForegroundColor Red
        return $false
    }
    
    $content = Get-Content $gradleFile -Raw
    
    # Update version code
    $content = $content -replace 'versionCode = \d+', "versionCode = $($properties['version.code'])"
    
    # Update version name with suffix for non-release builds
    $versionName = $properties['version.name']
    if ($buildType -ne "release") {
        $suffix = $properties["version.suffix.$buildType"]
        $versionName += $suffix
    }
    $content = $content -replace 'versionName = "[^"]*"', "versionName = `"$versionName`""
    
    if ($DryRun) {
        Write-Host "Would update Gradle file with:" -ForegroundColor Yellow
        Write-Host "  versionCode = $($properties['version.code'])" -ForegroundColor Cyan
        Write-Host "  versionName = `"$versionName`"" -ForegroundColor Cyan
    } else {
        $content | Out-File -FilePath $gradleFile -Encoding UTF8
        Write-Host "Updated Gradle file" -ForegroundColor Green
    }
    
    return $true
}

# Function to create changelog entry
function Add-ChangelogEntry {
    param($properties, $bumpType)
    
    if (-not (Test-Path $changelogFile)) {
        # Create new changelog file
        $changelogContent = @"
# Changelog

All notable changes to SmartFarm will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [$($properties['version.name'])] - $($properties['build.date'])

### Added
- Initial release

### Changed
- 

### Deprecated
- 

### Removed
- 

### Fixed
- 

### Security
- 

"@
        if (-not $DryRun) {
            $changelogContent | Out-File -FilePath $changelogFile -Encoding UTF8
            Write-Host "Created new changelog file" -ForegroundColor Green
        } else {
            Write-Host "Would create new changelog file" -ForegroundColor Yellow
        }
    } else {
        # Add new version entry to existing changelog
        $changelogContent = Get-Content $changelogFile -Raw
        
        $newEntry = @"

## [$($properties['version.name'])] - $($properties['build.date'])

### Added
- 

### Changed
- 

### Deprecated
- 

### Removed
- 

### Fixed
- 

### Security
- 

"@
        
        # Insert after [Unreleased] section
        $changelogContent = $changelogContent -replace '## \[Unreleased\]', "## [Unreleased]$newEntry`n## [Unreleased]"
        
        if (-not $DryRun) {
            $changelogContent | Out-File -FilePath $changelogFile -Encoding UTF8
            Write-Host "Added changelog entry for version $($properties['version.name'])" -ForegroundColor Green
        } else {
            Write-Host "Would add changelog entry for version $($properties['version.name'])" -ForegroundColor Yellow
        }
    }
}

# Function to show current version
function Show-CurrentVersion {
    param($properties)
    
    Write-Host "Current Version Information:" -ForegroundColor Cyan
    Write-Host "  Version Name: $($properties['version.name'])" -ForegroundColor White
    Write-Host "  Version Code: $($properties['version.code'])" -ForegroundColor White
    Write-Host "  Major: $($properties['version.major'])" -ForegroundColor White
    Write-Host "  Minor: $($properties['version.minor'])" -ForegroundColor White
    Write-Host "  Patch: $($properties['version.patch'])" -ForegroundColor White
    Write-Host "  Build Number: $($properties['build.number'])" -ForegroundColor White
    Write-Host "  Build Date: $($properties['build.date'])" -ForegroundColor White
}

# Main execution
try {
    $properties = Read-VersionProperties
    
    if ($ShowCurrent) {
        Show-CurrentVersion $properties
        exit 0
    }
    
    Write-Host "Current version: $($properties['version.name']) (Code: $($properties['version.code']))" -ForegroundColor Yellow
    Write-Host "Bump type: $BumpType" -ForegroundColor Yellow
    Write-Host "Build type: $BuildType" -ForegroundColor Yellow
    
    if ($DryRun) {
        Write-Host "DRY RUN MODE - No files will be modified" -ForegroundColor Red
    }
    
    # Bump version
    $newProperties = Bump-Version $properties $BumpType
    
    Write-Host "New version: $($newProperties['version.name']) (Code: $($newProperties['version.code']))" -ForegroundColor Green
    
    if (-not $DryRun) {
        # Update version properties file
        Write-VersionProperties $newProperties
        Write-Host "Updated version properties file" -ForegroundColor Green
        
        # Update Gradle file
        Update-GradleFile $newProperties $BuildType
        
        # Add changelog entry
        Add-ChangelogEntry $newProperties $BumpType
        
        Write-Host "`nVersion bump completed successfully!" -ForegroundColor Green
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Review the changes" -ForegroundColor White
        Write-Host "2. Update changelog with actual changes" -ForegroundColor White
        Write-Host "3. Commit version changes" -ForegroundColor White
        Write-Host "4. Build and test the app" -ForegroundColor White
    } else {
        Write-Host "`nDry run completed. No files were modified." -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
} 