// ================================================
// SMART PARKING PWA - SERVICE WORKER
// Handles caching, offline support, and push notifications
// ================================================

const CACHE_NAME = 'smart-parking-v1.0.0';
const RUNTIME_CACHE = 'runtime-cache-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://checkout.razorpay.com/v1/checkout.js',
    'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching app shell');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('[Service Worker] Installed successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip chrome extensions and non-http(s) requests
    if (!request.url.startsWith('http')) {
        return;
    }
    
    // Network-first strategy for API calls
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Cache-first strategy for Google Maps API
    if (url.hostname === 'maps.googleapis.com' || url.hostname === 'maps.gstatic.com') {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Stale-while-revalidate for other assets
    event.respondWith(staleWhileRevalidate(request));
});

// Cache-first strategy
async function cacheFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
        return cached;
    }
    
    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        return new Response('Offline', { status: 503 });
    }
}

// Network-first strategy
async function networkFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    
    try {
        const response = await fetch(request);
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.error('[Service Worker] Network request failed, trying cache:', error);
        const cached = await cache.match(request);
        if (cached) {
            return cached;
        }
        return new Response('Offline', { status: 503 });
    }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);
    
    const fetchPromise = fetch(request).then((response) => {
        if (response.ok) {
            cache.put(request, response.clone());
        }
        return response;
    }).catch(() => cached || new Response('Offline', { status: 503 }));
    
    return cached || fetchPromise;
}

// Push notification event
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push notification received');
    
    let data = {};
    if (event.data) {
        data = event.data.json();
    }
    
    const title = data.title || 'Smart Parking';
    const options = {
        body: data.body || 'You have a new notification',
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72.png',
        vibrate: [200, 100, 200],
        tag: data.tag || 'notification',
        requireInteraction: data.requireInteraction || false,
        data: data.data || {},
        actions: data.actions || []
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked');
    
    event.notification.close();
    
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Check if there's already a window open
                for (let client of clientList) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Open new window
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

// Background sync event (for offline bookings)
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync triggered');
    
    if (event.tag === 'sync-bookings') {
        event.waitUntil(syncBookings());
    }
});

async function syncBookings() {
    try {
        // Get pending bookings from IndexedDB or local storage
        // Send them to server when online
        console.log('[Service Worker] Syncing bookings...');
        // Implementation would go here
        return Promise.resolve();
    } catch (error) {
        console.error('[Service Worker] Sync failed:', error);
        return Promise.reject(error);
    }
}

// Periodic background sync (for updating parking availability)
self.addEventListener('periodicsync', (event) => {
    console.log('[Service Worker] Periodic sync triggered');
    
    if (event.tag === 'update-availability') {
        event.waitUntil(updateParkingAvailability());
    }
});

async function updateParkingAvailability() {
    try {
        console.log('[Service Worker] Updating parking availability...');
        // Fetch latest parking data and update cache
        // Implementation would go here
        return Promise.resolve();
    } catch (error) {
        console.error('[Service Worker] Availability update failed:', error);
        return Promise.reject(error);
    }
}

// Message event - handle messages from the app
self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        const { urls } = event.data;
        caches.open(RUNTIME_CACHE).then((cache) => {
            cache.addAll(urls);
        });
    }
});

console.log('[Service Worker] Loaded');
