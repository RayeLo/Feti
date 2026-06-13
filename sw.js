const CACHE = 'feti-v2';
const ASSETS = [
  'Feti.dc.html',
  'support.js',
  'manifest.json',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/apple-touch-icon.png',
  'assets/feti/home-1.png','assets/feti/home-2.png','assets/feti/home-3.png',
  'assets/feti/delighted-1.png','assets/feti/delighted-2.png','assets/feti/delighted-3.png',
  'assets/feti/pleased-1.png','assets/feti/pleased-2.png','assets/feti/pleased-3.png',
  'assets/feti/annoyed-1.png','assets/feti/annoyed-2.png',
  'assets/feti/irritated-1.png','assets/feti/irritated-2.png',
  'assets/feti/furious-1.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => Promise.allSettled(ASSETS.map((a) => c.add(a)))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // network-first for Google Fonts, cache-first for everything else
  if (req.url.includes('fonts.googleapis.com') || req.url.includes('fonts.gstatic.com')) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => cached))
  );
});
