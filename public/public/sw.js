/**
 * SmartFarm Service Worker
 * Comprehensive caching and offline support
 */

const CACHE_NAME = 'smartfarm-v1.0.0';
const STATIC_CACHE = 'smartfarm-static-v1.0.0';
const DYNAMIC_CACHE = 'smartfarm-dynamic-v1.0.0';
const API_CACHE = 'smartfarm-api-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/dashboard.html',
    '/login.html',
    '/register.html',
    '/css/utilities.css',
    '/js/api-service.js',
    '/js/api-config.js',
    '/js/user-roles.js',
    '/js/performance-optimizer.js',
    '/js/qr-disabled.js',
    '/images/logo/logo.png',
    '/images/favicon/favicon.ico',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// API endpoints to cache
const API_ENDPOINTS = [
    '/api/health',
    '/api/auth/profile'
];

// Install event - cache static files with error handling
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE).then(async cache => {
                console.log('Caching static files...');
                
                // Cache files individually to avoid failing if one file fails
                const cachePromises = STATIC_FILES.map(async url => {
                    try {
                        const response = await fetch(url, { mode: 'no-cors' });
                        if (response.status === 200 || response.type === 'opaque') {
                            await cache.put(url, response);
                            console.log('Cached:', url);
                        }
                    } catch (error) {
                        console.warn('Failed to cache:', url, error.message);
                        // Continue with other files even if one fails
                    }
                });
                
                await Promise.allSettled(cachePromises);
                return cache;
            }),
            caches.open(DYNAMIC_CACHE),
            caches.open(API_CACHE)
        ]).then(() => {
            console.log('Service Worker installed successfully');
            return self.skipWaiting();
        }).catch(error => {
            console.error('Service Worker installation failed:', error);
            // Still skip waiting even if caching fails
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && 
                        cacheName !== DYNAMIC_CACHE && 
                        cacheName !== API_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    
    try {
        // Handle API requests
        if (url.pathname.startsWith('/api/')) {
            return await handleApiRequest(request);
        }
        
        // Handle static files
        if (isStaticFile(url.pathname)) {
            return await handleStaticRequest(request);
        }
        
        // Handle HTML pages
        if (isHtmlRequest(request)) {
            return await handleHtmlRequest(request);
        }
        
        // Default: try cache first, then network
        return await cacheFirst(request);
        
    } catch (error) {
        console.error('Service Worker fetch error:', error);
        return await getOfflineResponse(request);
    }
}

async function handleApiRequest(request) {
    const url = new URL(request.url);
    
    // Check if this API endpoint should be cached
    const shouldCache = API_ENDPOINTS.some(endpoint => 
        url.pathname.startsWith(endpoint)
    );
    
    if (shouldCache) {
        return await networkFirst(request, API_CACHE);
    }
    
    // For other API requests, always try network first
    try {
        const response = await fetch(request);
        
        // Cache successful responses for a short time
        if (response.ok) {
            const cache = await caches.open(API_CACHE);
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        // Try to serve from cache as fallback
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

async function handleStaticRequest(request) {
    return await cacheFirst(request, STATIC_CACHE);
}

async function handleHtmlRequest(request) {
    return await networkFirst(request, DYNAMIC_CACHE);
}

async function cacheFirst(request, cacheName = DYNAMIC_CACHE) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        return await getOfflineResponse(request);
    }
}

async function networkFirst(request, cacheName = DYNAMIC_CACHE) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(cacheName);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        return await getOfflineResponse(request);
    }
}

function isStaticFile(pathname) {
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf'];
    return staticExtensions.some(ext => pathname.endsWith(ext));
}

function isHtmlRequest(request) {
    return request.headers.get('accept')?.includes('text/html');
}

async function getOfflineResponse(request) {
    const url = new URL(request.url);
    
    // Return offline page for HTML requests
    if (isHtmlRequest(request)) {
        const offlinePage = await caches.match('/offline.html');
        if (offlinePage) {
            return offlinePage;
        }
        
        // Fallback: return a simple offline message
        return new Response(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Offline - SmartFarm</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        padding: 50px; 
                        background: #f8f9fa;
                    }
                    .offline-message {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        max-width: 500px;
                        margin: 0 auto;
                    }
                    .icon { font-size: 48px; color: #6c757d; margin-bottom: 20px; }
                    h1 { color: #343a40; margin-bottom: 20px; }
                    p { color: #6c757d; line-height: 1.6; }
                </style>
            </head>
            <body>
                <div class="offline-message">
                    <div class="icon">📡</div>
                    <h1>You're Offline</h1>
                    <p>It looks like you're not connected to the internet. Please check your connection and try again.</p>
                    <p>Some features may still be available offline.</p>
                </div>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html' }
        });
    }
    
    // Return a generic offline response for other requests
    return new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable'
    });
}

// Background sync for offline actions
self.addEventListener('sync', event => {
    console.log('Background sync triggered:', event.tag);
    
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Sync any pending offline actions
        const pendingActions = await getPendingActions();
        
        for (const action of pendingActions) {
            try {
                await syncAction(action);
                await removePendingAction(action.id);
            } catch (error) {
                console.error('Failed to sync action:', action, error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

async function getPendingActions() {
    // This would typically read from IndexedDB
    return [];
}

async function syncAction(action) {
    // This would sync the action with the server
    console.log('Syncing action:', action);
}

async function removePendingAction(actionId) {
    // This would remove the action from IndexedDB
    console.log('Removing pending action:', actionId);
}

// Push notifications
self.addEventListener('push', event => {
    console.log('Push notification received:', event);
    
    const options = {
        body: event.data ? event.data.text() : 'New notification from SmartFarm',
        icon: '/images/favicon/favicon-192x192.png',
        badge: '/images/favicon/favicon-64x64.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View Details',
                icon: '/images/favicon/favicon-32x32.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/images/favicon/favicon-32x32.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('SmartFarm', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    console.log('Notification clicked:', event);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/dashboard.html')
        );
    }
});

// Message handling from main thread
self.addEventListener('message', event => {
    console.log('Service Worker received message:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(DYNAMIC_CACHE).then(cache => {
                return cache.addAll(event.data.urls);
            })
        );
    }
});

console.log('Service Worker loaded successfully');
