const CACHE = 'scrollstream-v1';
const ASSETS = ['/', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => { }));
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return;
    // Only cache same-origin navigation/static requests; let media stream.
    const url = new URL(req.url);
    if (url.origin !== location.origin) return;

    e.respondWith(
        caches.match(req).then((cached) => {
            return (
                cached ||
                fetch(req)
                    .then((res) => {
                        const copy = res.clone();
                        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => { });
                        return res;
                    })
                    .catch(() => cached)
            );
        })
    );
});