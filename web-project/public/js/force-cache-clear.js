/**
 * Force Cache Clear Script
 * Clears service worker cache and forces fresh API calls
 */

(function() {
    'use strict';
    
    console.log('🧹 Force Cache Clear Script - Starting...');
    
    // Clear service worker cache
    if ('caches' in window) {
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    console.log('🗑️ Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(function() {
            console.log('✅ All caches cleared');
        }).catch(function(error) {
            console.error('❌ Error clearing caches:', error);
        });
    }
    
    // Unregister service workers
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for (let registration of registrations) {
                console.log('🗑️ Unregistering service worker:', registration.scope);
                registration.unregister();
            }
        }).then(function() {
            console.log('✅ All service workers unregistered');
        }).catch(function(error) {
            console.error('❌ Error unregistering service workers:', error);
        });
    }
    
    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    console.log('✅ localStorage and sessionStorage cleared');
    
    // Force reload after a short delay
    setTimeout(function() {
        console.log('🔄 Reloading page to apply changes...');
        window.location.reload(true);
    }, 2000);
    
    console.log('🎉 Force Cache Clear Script - Complete!');
    
})();
