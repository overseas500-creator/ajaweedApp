// Service Worker for Ajaweed Notification App
const CACHE_NAME = "ajaweed-cache-v1";
const ASSETS = [
  "./parent.html",
  "./index.html",
  "./css/style.css",
  "./js/data.js",
  "./js/app.js",
  "./js/parent.js",
  "./ajaweed_logo_1779318974019.png",
  "./manifest.json",
  "./parent_manifest.json"
];

// Install Event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network First with Cache Fallback
self.addEventListener("fetch", (e) => {
  // Only handle standard http/https fetch requests
  if (e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          // Cache the latest copy
          if (response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(e.request);
        })
    );
  }
});
