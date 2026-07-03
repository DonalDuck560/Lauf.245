const CACHE_NAME = 'runai-v6';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// Installieren des Service Workers und Cachen der Dateien
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Aktivieren und alte Caches aufräumen
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Netzwerk-Anfragen abfangen
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    }).catch(() => {
      return new Response("Netzwerkverbindung unterbrochen.");
    })
  );
});
