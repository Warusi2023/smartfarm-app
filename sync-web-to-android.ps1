# SmartFarm Web-to-Android Synchronization Script
# This script monitors changes in the web project and mirrors them to the Android project
# to ensure both platforms stay in sync and users can access their accounts from any device.

param(
    [switch]$Watch = $false,
    [switch]$Force = $false,
    [string]$ConfigFile = "shared-api-config.json"
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success { Write-ColorOutput Green $args }
function Write-Info { Write-ColorOutput Cyan $args }
function Write-Warning { Write-ColorOutput Yellow $args }
function Write-Error { Write-ColorOutput Red $args }

# Load configuration
function Load-Config {
    if (-not (Test-Path $ConfigFile)) {
        Write-Error "Configuration file not found: $ConfigFile"
        exit 1
    }
    
    $config = Get-Content $ConfigFile | ConvertFrom-Json
    return $config
}

# Sync API configuration from web to Android
function Sync-ApiConfig {
    param($Config)
    
    Write-Info "🔄 Syncing API configuration..."
    
    $baseUrl = $Config.api.production.baseUrl
    $endpoints = $Config.api.production.endpoints
    
    # Update Android shared module API base URL
    $sharedKoinModule = "android-project\shared\src\commonMain\kotlin\com\smartfarm\shared\di\SharedKoinModule.kt"
    if (Test-Path $sharedKoinModule) {
        $content = Get-Content $sharedKoinModule -Raw
        $newContent = $content -replace 'const val API_BASE_URL = "[^"]*"', "const val API_BASE_URL = `"$baseUrl`""
        Set-Content $sharedKoinModule $newContent -NoNewline
        Write-Success "Updated SharedKoinModule.kt"
    }
    
    # Update Android app build.gradle.kts
    $buildGradle = "android-project\app\build.gradle.kts"
    if (Test-Path $buildGradle) {
        $content = Get-Content $buildGradle -Raw
        $newContent = $content -replace 'buildConfigField\("String", "API_BASE_URL", "[^"]*"\)', "buildConfigField(`"String`", `"API_BASE_URL`", `"`"$baseUrl`"`")"
        Set-Content $buildGradle $newContent -NoNewline
        Write-Success "Updated build.gradle.kts"
    }
    
    # Sync API endpoints in Android SmartFarmApi.kt (shared)
    Sync-ApiEndpoints -Config $Config -TargetFile "android-project\shared\src\commonMain\kotlin\com\smartfarm\shared\network\SmartFarmApi.kt"
    
    # Sync API endpoints in Android SmartFarmApi.kt (app)
    Sync-ApiEndpoints -Config $Config -TargetFile "android-project\app\src\main\java\com\smartfarm\network\SmartFarmApi.kt"
}

# Sync API endpoints
function Sync-ApiEndpoints {
    param($Config, $TargetFile)
    
    if (-not (Test-Path $TargetFile)) {
        Write-Warning "⚠ Target file not found: $TargetFile"
        return
    }
    
    $endpoints = $Config.api.production.endpoints
    $content = Get-Content $TargetFile -Raw
    
    # Update auth endpoints
    $content = $content -replace '@POST\("/api/auth/login"\)', "@POST(`"$($endpoints.auth.login)`")"
    $content = $content -replace '@POST\("/api/auth/register"\)', "@POST(`"$($endpoints.auth.register)`")"
    $content = $content -replace '@GET\("/api/auth/profile"\)', "@GET(`"$($endpoints.auth.profile)`")"
    $content = $content -replace '@POST\("/api/auth/refresh"\)', "@POST(`"$($endpoints.auth.refresh)`")"
    
    # Update resource endpoints
    $content = $content -replace '@GET\("/api/farms"\)', "@GET(`"$($endpoints.farms)`")"
    $content = $content -replace '@POST\("/api/farms"\)', "@POST(`"$($endpoints.farms)`")"
    $content = $content -replace '@PUT\("/api/farms/\{id\}"\)', "@PUT(`"$($endpoints.farms)/{id}`")"
    $content = $content -replace '@DELETE\("/api/farms/\{id\}"\)', "@DELETE(`"$($endpoints.farms)/{id}`")"
    
    $content = $content -replace '@GET\("/api/crops"\)', "@GET(`"$($endpoints.crops)`")"
    $content = $content -replace '@POST\("/api/crops"\)', "@POST(`"$($endpoints.crops)`")"
    $content = $content -replace '@PUT\("/api/crops/\{id\}"\)', "@PUT(`"$($endpoints.crops)/{id}`")"
    $content = $content -replace '@DELETE\("/api/crops/\{id\}"\)', "@DELETE(`"$($endpoints.crops)/{id}`")"
    
    $content = $content -replace '@GET\("/api/livestock"\)', "@GET(`"$($endpoints.livestock)`")"
    $content = $content -replace '@POST\("/api/livestock"\)', "@POST(`"$($endpoints.livestock)`")"
    $content = $content -replace '@PUT\("/api/livestock/\{id\}"\)', "@PUT(`"$($endpoints.livestock)/{id}`")"
    $content = $content -replace '@DELETE\("/api/livestock/\{id\}"\)', "@DELETE(`"$($endpoints.livestock)/{id}`")"
    
    $content = $content -replace '@GET\("/api/tasks"\)', "@GET(`"$($endpoints.tasks)`")"
    $content = $content -replace '@POST\("/api/tasks"\)', "@POST(`"$($endpoints.tasks)`")"
    $content = $content -replace '@PUT\("/api/tasks/\{id\}"\)', "@PUT(`"$($endpoints.tasks)/{id}`")"
    $content = $content -replace '@DELETE\("/api/tasks/\{id\}"\)', "@DELETE(`"$($endpoints.tasks)/{id}`")"
    
    $content = $content -replace '@GET\("/api/inventory"\)', "@GET(`"$($endpoints.inventory)`")"
    $content = $content -replace '@POST\("/api/inventory"\)', "@POST(`"$($endpoints.inventory)`")"
    $content = $content -replace '@PUT\("/api/inventory/\{id\}"\)', "@PUT(`"$($endpoints.inventory)/{id}`")"
    $content = $content -replace '@DELETE\("/api/inventory/\{id\}"\)', "@DELETE(`"$($endpoints.inventory)/{id}`")"
    
    $content = $content -replace '@GET\("/api/financial"\)', "@GET(`"$($endpoints.financial)`")"
    $content = $content -replace '@POST\("/api/financial"\)', "@POST(`"$($endpoints.financial)`")"
    $content = $content -replace '@PUT\("/api/financial/\{id\}"\)', "@PUT(`"$($endpoints.financial)/{id}`")"
    $content = $content -replace '@DELETE\("/api/financial/\{id\}"\)', "@DELETE(`"$($endpoints.financial)/{id}`")"
    
    $content = $content -replace '@GET\("/api/analytics"\)', "@GET(`"$($endpoints.analytics)`")"
    $content = $content -replace '@GET\("/api/health"\)', "@GET(`"$($endpoints.health)`")"
    
    # Update Ktor-based API calls (for shared module)
    $baseUrl = $Config.api.production.baseUrl
    $content = $content -replace '\$baseUrl/api/auth/login', "`$baseUrl$($endpoints.auth.login)"
    $content = $content -replace '\$baseUrl/api/auth/register', "`$baseUrl$($endpoints.auth.register)"
    $content = $content -replace '\$baseUrl/api/auth/profile', "`$baseUrl$($endpoints.auth.profile)"
    $content = $content -replace '\$baseUrl/api/auth/refresh', "`$baseUrl$($endpoints.auth.refresh)"
    $content = $content -replace '\$baseUrl/api/farms', "`$baseUrl$($endpoints.farms)"
    $content = $content -replace '\$baseUrl/api/crops', "`$baseUrl$($endpoints.crops)"
    $content = $content -replace '\$baseUrl/api/livestock', "`$baseUrl$($endpoints.livestock)"
    $content = $content -replace '\$baseUrl/api/tasks', "`$baseUrl$($endpoints.tasks)"
    $content = $content -replace '\$baseUrl/api/inventory', "`$baseUrl$($endpoints.inventory)"
    $content = $content -replace '\$baseUrl/api/financial', "`$baseUrl$($endpoints.financial)"
    $content = $content -replace '\$baseUrl/api/analytics', "`$baseUrl$($endpoints.analytics)"
    $content = $content -replace '\$baseUrl/api/health', "`$baseUrl$($endpoints.health)"
    
    Set-Content $TargetFile $content -NoNewline
    Write-Success "Updated $TargetFile"
}

# Sync web API config to shared config
function Sync-WebConfig {
    param($Config)
    
    Write-Info "🔄 Reading web API configuration..."
    
    $webApiConfig = "web-project\public\js\api-config.js"
    if (-not (Test-Path $webApiConfig)) {
        Write-Warning "⚠ Web API config not found: $webApiConfig"
        return
    }
    
    $webContent = Get-Content $webApiConfig -Raw
    
    # Extract base URL from web config
    if ($webContent -match "const PRODUCTION_API_BASE = '([^']+)'") {
        $newBaseUrl = $matches[1]
        if ($Config.api.production.baseUrl -ne $newBaseUrl) {
            Write-Info "📝 Updating base URL: $($Config.api.production.baseUrl) -> $newBaseUrl"
            $Config.api.production.baseUrl = $newBaseUrl
            $Config.lastUpdated = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
            $Config | ConvertTo-Json -Depth 10 | Set-Content $ConfigFile
            Write-Success "Updated shared configuration"
        }
    }
}

# Watch for changes
function Start-WatchMode {
    param($Config)
    
    Write-Info "👀 Starting watch mode..."
    Write-Info "Watching for changes in web-project..."
    Write-Info "Press Ctrl+C to stop"
    
    $watcher = New-Object System.IO.FileSystemWatcher
    $watcher.Path = Resolve-Path "web-project"
    $watcher.IncludeSubdirectories = $true
    $watcher.EnableRaisingEvents = $true
    
    $action = {
        $path = $Event.SourceEventArgs.FullPath
        $changeType = $Event.SourceEventArgs.ChangeType
        $name = $Event.SourceEventArgs.Name
        
        if ($name -match '\.(js|ts|html)$' -and $changeType -eq 'Changed') {
            Write-Info "`n📝 Change detected: $name"
            Start-Sleep -Milliseconds 500  # Wait for file write to complete
            $config = Load-Config
            Sync-WebConfig -Config $config
            Sync-ApiConfig -Config $config
            Write-Success "Synchronization complete`n"
        }
    }
    
    Register-ObjectEvent $watcher "Changed" -Action $action | Out-Null
    
    try {
        while ($true) {
            Start-Sleep -Seconds 1
        }
    }
    finally {
        $watcher.Dispose()
    }
}

# Main execution
Write-Info "🚀 SmartFarm Web-to-Android Synchronization"
Write-Info "=========================================="

$config = Load-Config

if ($Force -or -not $Watch) {
    Sync-WebConfig -Config $config
    Sync-ApiConfig -Config $config
    Write-Success "`nSynchronization complete!"
}

if ($Watch) {
    Start-WatchMode -Config $config
}

Write-Info "`nTip: Use -Watch flag to continuously monitor for changes"
Write-Info "Tip: Use -Force flag to force sync even if files haven't changed"

