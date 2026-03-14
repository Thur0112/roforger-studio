// ═══════════════════════════════════════════════
//  ROFORGER STUDIO — Service Worker (sw.js)
//  Cache + offline support para PWA
// ═══════════════════════════════════════════════

// ── VERSÃO ATUALIZADA: v3 (adicionados arquivos src/) ──
const CACHE_NAME    = 'roforger-v3';
const CACHE_STATIC  = 'roforger-static-v3';

const STATIC_FILES = [
  // ── Páginas ──
  '/home.html',
  '/error.html',
  '/manifest.json',
  '/updates.js',

  // ── Editor (arquivos novos) ──
  '/editor.html',
  '/editor.js',

  // ── src/core ──
  '/src/core/firebase.js',
  '/src/core/errors.js',

  // ── src/editor ──
  '/src/editor.css',
  '/src/editor/canvas.js',
  '/src/editor/nodes.js',
  '/src/editor/connections.js',

  // ── src/ui ──
  '/src/ui/explorer.js',
  '/src/ui/toolbar.js',
  '/src/ui/panels.js',

  // ── src/utils ──
  '/src/utils/storage.js',
  '/src/utils/helpers.js',

  // ── src/modules ──
  '/src/modules/gen.js',

  // ── Assets ──
  '/icons/pwa/icon-192.png',
  '/icons/pwa/icon-512.png',
  '/apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=JetBrains+Mono:wght@400;600&family=Rajdhani:wght@600;700&display=swap',
];

// ── Install ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      return cache.addAll(STATIC_FILES).catch(err => {
        console.warn('[SW] Some files failed to cache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: limpa caches antigos ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_STATIC)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Nunca interceptar Firebase / Google APIs
  if (
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('gstatic') ||
    url.hostname.includes('firestore') ||
    event.request.method !== 'GET'
  ) return;

  // HTML: Network First (sempre tenta pegar versão mais nova)
  if (event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() =>
          caches.match(event.request)
            .then(r => r || caches.match('/home.html'))
        )
    );
    return;
  }

  // JS/CSS/Fonts/Imagens: Cache First
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return res;
      }).catch(() => null);
      return cached || networkFetch;
    })
  );
});

// ── Push notifications ──
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'RoForger Studio', {
      body: data.body || '',
      icon: '/icons/pwa/icon-192.png',
      badge: '/icons/pwa/icon-192.png',
      tag: 'roforger-notif',
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/home.html'));
});
