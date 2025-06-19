const CACHE_NAME = 'tic-tac-toe-cache-v1';
const urlsToCache = [
    '/pwa-tic-tac-toe/', // Cache the root of the PWA
    '/pwa-tic-tac-toe/index.html',
    '/pwa-tic-tac-toe/style.css', // Although CSS is inline, good practice to include if it were external
    '/pwa-tic-tac-toe/script.js', // Although JS is inline, good practice to include if it were external
    '/pwa-tic-tac-toe/manifest.json',
    '/pwa-tic-tac-toe/icon-192x192.png', // Assuming you will add these icons
    '/pwa-tic-tac-toe/icon-512x512.png'  // Assuming you will add these icons
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
