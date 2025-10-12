[1mdiff --git a/backend/server-simple.cjs b/backend/server-simple.cjs[m
[1mindex 7de6084..2d81d60 100644[m
[1m--- a/backend/server-simple.cjs[m
[1m+++ b/backend/server-simple.cjs[m
[36m@@ -42,8 +42,12 @@[m [mapp.use((req, res, next) => {[m
         // If origin contains smartfarm-app, allow it (for various domains)[m
         allowedOrigin = origin;[m
     } else {[m
[31m-        // Default fallback to primary domain[m
[31m-        allowedOrigin = 'https://www.smartfarm-app.com';[m
[32m+[m[32m        // Default fallback to primary domain - but check if it's a smartfarm domain[m
[32m+[m[32m        if (origin && origin.includes('smartfarm')) {[m
[32m+[m[32m            allowedOrigin = origin; // Allow any smartfarm domain[m
[32m+[m[32m        } else {[m
[32m+[m[32m            allowedOrigin = 'https://www.smartfarm-app.com';[m
[32m+[m[32m        }[m
     }[m
     [m
     // Set CORS headers IMMEDIATELY (before any processing)[m
[1mdiff --git a/public/js/api-service.js b/public/js/api-service.js[m
[1mindex 6ba3413..6ad0010 100644[m
[1m--- a/public/js/api-service.js[m
[1m+++ b/public/js/api-service.js[m
[36m@@ -14,14 +14,19 @@[m [mclass SmartFarmAPIService {[m
     getApiBaseUrl() {[m
         // Use single source of truth from api-config.js[m
         if (window.SmartFarmApiConfig) {[m
[31m-            return window.SmartFarmApiConfig.baseUrl;[m
[32m+[m[32m            const url = window.SmartFarmApiConfig.baseUrl;[m
[32m+[m[32m            console.log('[API Service] Using SmartFarmApiConfig URL:', url);[m
[32m+[m[32m            return url;[m
         }[m
         [m
         // Fallback if api-config.js not loaded yet[m
[31m-        return window.VITE_API_BASE_URL || [m
[32m+[m[32m        const fallbackUrl = window.VITE_API_BASE_URL ||[m[41m [m
                window.VITE_API_URL || [m
                (window).__SMARTFARM_API_BASE__ ||[m
                'https://smartfarm-app-production.up.railway.app';[m
[32m+[m[41m        [m
[32m+[m[32m        console.log('[API Service] Using fallback URL:', fallbackUrl);[m
[32m+[m[32m        return fallbackUrl;[m
     }[m
 [m
     // Authentication token management[m
[1mdiff --git a/public/sw.js b/public/sw.js[m
[1mindex c11c004..db2c827 100644[m
[1m--- a/public/sw.js[m
[1m+++ b/public/sw.js[m
[36m@@ -3,10 +3,10 @@[m
  * Comprehensive caching and offline support[m
  */[m
 [m
[31m-const CACHE_NAME = 'smartfarm-v1.0.0';[m
[31m-const STATIC_CACHE = 'smartfarm-static-v1.0.0';[m
[31m-const DYNAMIC_CACHE = 'smartfarm-dynamic-v1.0.0';[m
[31m-const API_CACHE = 'smartfarm-api-v1.0.0';[m
[32m+[m[32mconst CACHE_NAME = 'smartfarm-v1.0.1';[m
[32m+[m[32mconst STATIC_CACHE = 'smartfarm-static-v1.0.1';[m
[32m+[m[32mconst DYNAMIC_CACHE = 'smartfarm-dynamic-v1.0.1';[m
[32m+[m[32mconst API_CACHE = 'smartfarm-api-v1.0.1';[m
 [m
 // Files to cache immediately[m
 const STATIC_FILES = [[m
