/**
 * API URL Fix Script
 * Forces the correct Railway backend URL and clears cached configurations
 */

(function() {
    'use strict';
    
    console.log('🔧 API URL Fix Script - Starting...');
    
    // Force the correct API URL
    const CORRECT_API_URL = 'https://smartfarm-app-production.up.railway.app';
    
    // Override any existing configuration
    window.VITE_API_BASE_URL = CORRECT_API_URL;
    window.VITE_API_URL = CORRECT_API_URL;
    window.__SMARTFARM_API_BASE__ = CORRECT_API_URL;
    
    console.log('✅ Forced API URL to:', CORRECT_API_URL);
    
    // Clear any cached API configurations
    if (window.SmartFarmApiConfig) {
        window.SmartFarmApiConfig.baseUrl = CORRECT_API_URL;
        console.log('✅ Updated SmartFarmApiConfig.baseUrl');
    }
    
    // Clear localStorage API configurations
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('api') || key.includes('url') || key.includes('backend'))) {
            keysToRemove.push(key);
        }
    }
    
    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log('🗑️ Removed cached config:', key);
    });
    
    // Clear sessionStorage API configurations
    const sessionKeysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && (key.includes('api') || key.includes('url') || key.includes('backend'))) {
            sessionKeysToRemove.push(key);
        }
    }
    
    sessionKeysToRemove.forEach(key => {
        sessionStorage.removeItem(key);
        console.log('🗑️ Removed cached session config:', key);
    });
    
    // Force update API service if it exists
    if (window.SmartFarmAPI) {
        window.SmartFarmAPI.baseURL = CORRECT_API_URL;
        console.log('✅ Updated SmartFarmAPI.baseURL');
    }
    
    // Create a global function to verify the fix
    window.verifyApiUrl = function() {
        console.log('🔍 API URL Verification:');
        console.log('  VITE_API_BASE_URL:', window.VITE_API_BASE_URL);
        console.log('  VITE_API_URL:', window.VITE_API_URL);
        console.log('  __SMARTFARM_API_BASE__:', window.__SMARTFARM_API_BASE__);
        console.log('  SmartFarmApiConfig.baseUrl:', window.SmartFarmApiConfig?.baseUrl);
        console.log('  SmartFarmAPI.baseURL:', window.SmartFarmAPI?.baseURL);
        
        const allCorrect = [
            window.VITE_API_BASE_URL,
            window.VITE_API_URL,
            window.__SMARTFARM_API_BASE__,
            window.SmartFarmApiConfig?.baseUrl,
            window.SmartFarmAPI?.baseURL
        ].every(url => url === CORRECT_API_URL);
        
        console.log(allCorrect ? '✅ All API URLs are correct!' : '❌ Some API URLs are still wrong');
        return allCorrect;
    };
    
    console.log('🎉 API URL Fix Script - Complete!');
    console.log('Run verifyApiUrl() in console to check the fix');
    
})();
