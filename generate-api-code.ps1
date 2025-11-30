# Generate API code from shared configuration
# This script generates API configuration code for both web and Android projects

param(
    [string]$ConfigFile = "shared-api-config.json",
    [ValidateSet("web", "android", "all")]
    [string]$Target = "all"
)

$ErrorActionPreference = "Stop"

# Load configuration
$config = Get-Content $ConfigFile | ConvertFrom-Json
$baseUrl = $config.api.production.baseUrl
$endpoints = $config.api.production.endpoints

# Generate web API config
function Generate-WebConfig {
    $webConfig = @"
/**
 * SmartFarm API Configuration - Single Source of Truth
 * Auto-generated from shared-api-config.json
 * DO NOT EDIT MANUALLY - Run generate-api-code.ps1 to regenerate
 */

(function() {
    'use strict';
    
    /**
     * Canonical Backend URL
     * IMPORTANT: Change shared-api-config.json to update entire frontend
     */
    const PRODUCTION_API_BASE = '$baseUrl';
    
    /**
     * Get API Base URL from environment or use production default
     */
    function getApiBaseUrl() {
        const envUrl = window.VITE_API_BASE_URL || 
                      window.VITE_API_URL || 
                      window.__SMARTFARM_API_BASE__ ||
                      null;
        
        if (envUrl) {
            console.log('[API Config] Using environment URL:', envUrl);
            return envUrl.replace(/\/$/, '');
        }
        
        console.log('[API Config] Using production URL:', PRODUCTION_API_BASE);
        return PRODUCTION_API_BASE;
    }
    
    /**
     * Build full API URL for endpoint
     */
    function buildApiUrl(path) {
        const base = getApiBaseUrl();
        const cleanBase = base.replace(/\/$/, '');
        const cleanPath = path.replace(/^\//, '');
        
        if (cleanBase.endsWith('/api')) {
            return `\${cleanBase}/\${cleanPath}`;
        }
        
        if (cleanPath.startsWith('api/')) {
            return `\${cleanBase}/\${cleanPath}`;
        }
        
        return `\${cleanBase}/api/\${cleanPath}`;
    }
    
    /**
     * Global API Configuration Object
     */
    window.SmartFarmApiConfig = {
        baseUrl: getApiBaseUrl(),
        url: buildApiUrl,
        
        // Health check endpoint
        healthUrl: buildApiUrl('$($endpoints.health)'),
        
        // Auth endpoints
        loginUrl: buildApiUrl('$($endpoints.auth.login)'),
        registerUrl: buildApiUrl('$($endpoints.auth.register)'),
        logoutUrl: buildApiUrl('$($endpoints.auth.logout)'),
        profileUrl: buildApiUrl('$($endpoints.auth.profile)'),
        refreshUrl: buildApiUrl('$($endpoints.auth.refresh)'),
        
        // Resource endpoints
        farmsUrl: buildApiUrl('$($endpoints.farms)'),
        cropsUrl: buildApiUrl('$($endpoints.crops)'),
        livestockUrl: buildApiUrl('$($endpoints.livestock)'),
        tasksUrl: buildApiUrl('$($endpoints.tasks)'),
        inventoryUrl: buildApiUrl('$($endpoints.inventory)'),
        financialUrl: buildApiUrl('$($endpoints.financial)'),
        analyticsUrl: buildApiUrl('$($endpoints.analytics)'),
        
        // Daily tips
        dailyTipsUrl: buildApiUrl('$($endpoints.dailyTips.today)'),
        personalizedTipsUrl: buildApiUrl('$($endpoints.dailyTips.personalized)'),
        
        // Debug info
        debug() {
            console.log('=== SmartFarm API Configuration ===');
            console.log('Base URL:', this.baseUrl);
            console.log('Health URL:', this.healthUrl);
            console.log('Environment:', {
                VITE_API_BASE_URL: window.VITE_API_BASE_URL,
                VITE_API_URL: window.VITE_API_URL,
                __SMARTFARM_API_BASE__: window.__SMARTFARM_API_BASE__,
            });
            console.log('===================================');
        },
        
        isValid() {
            const url = this.baseUrl;
            if (!url) {
                console.error('[API Config] Base URL is not set!');
                return false;
            }
            if (!url.startsWith('http')) {
                console.error('[API Config] Base URL must start with http:// or https://');
                return false;
            }
            return true;
        }
    };
    
    // Auto-validate on load
    if (!window.SmartFarmApiConfig.isValid()) {
        console.error('[API Config] Configuration validation failed!');
    }
    
    // Auto-debug in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.SmartFarmApiConfig.debug();
    }
    
    // Make configuration read-only
    Object.freeze(window.SmartFarmApiConfig);
    
})();
"@
    
    $outputPath = "web-project\public\js\api-config.js"
    Set-Content $outputPath $webConfig -NoNewline
    Write-Host "Generated web API config: $outputPath" -ForegroundColor Green
}

# Generate Android constants
function Generate-AndroidConstants {
    $androidConstants = @"
package com.smartfarm.shared.di

/**
 * SmartFarm API Configuration - Single Source of Truth
 * Auto-generated from shared-api-config.json
 * DO NOT EDIT MANUALLY - Run generate-api-code.ps1 to regenerate
 */

const val API_BASE_URL = "$baseUrl"

object ApiEndpoints {
    const val HEALTH = "/api/health"
    
    object Auth {
        const val LOGIN = "/api/auth/login"
        const val REGISTER = "/api/auth/register"
        const val LOGOUT = "/api/auth/logout"
        const val PROFILE = "/api/auth/profile"
        const val REFRESH = "/api/auth/refresh"
    }
    
    const val FARMS = "/api/farms"
    const val CROPS = "/api/crops"
    const val LIVESTOCK = "/api/livestock"
    const val TASKS = "/api/tasks"
    const val INVENTORY = "/api/inventory"
    const val FINANCIAL = "/api/financial"
    const val ANALYTICS = "/api/analytics"
    
    object DailyTips {
        const val TODAY = "/api/daily-tips/today"
        const val PERSONALIZED = "/api/daily-tips/personalized"
    }
}
"@
    
    $outputPath = "android-project\shared\src\commonMain\kotlin\com\smartfarm\shared\di\ApiEndpoints.kt"
    $dir = Split-Path $outputPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    Set-Content $outputPath $androidConstants -NoNewline
    Write-Host "Generated Android API constants: $outputPath" -ForegroundColor Green
}

# Main execution
Write-Host "Generating API code from shared configuration..." -ForegroundColor Cyan

if ($Target -eq "web" -or $Target -eq "all") {
    Generate-WebConfig
}

if ($Target -eq "android" -or $Target -eq "all") {
    Generate-AndroidConstants
}

Write-Host "`nCode generation complete!" -ForegroundColor Green
Write-Host "Remember to run sync-web-to-android.ps1 to sync changes" -ForegroundColor Yellow

