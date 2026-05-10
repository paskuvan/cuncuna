// ============================================================
// CUNCUNA · Service Worker
// Estrategia de cache "Network First, Fall Back to Cache"
// para que la app funcione offline una vez visitada.
// ============================================================

const CACHE_VERSION = 'cuncuna-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

// Recursos esenciales que se pre-cachean al instalar la PWA
const RECURSOS_PRECARGAR = [
  '/',
  '/login',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
];

// ─── INSTALL: pre-cachear recursos esenciales ───
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(RECURSOS_PRECARGAR);
    })
  );
  self.skipWaiting();
});

// ─── ACTIVATE: limpiar caches viejos al actualizar ───
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !name.startsWith(CACHE_VERSION))
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// ─── FETCH: estrategia network-first con fallback a cache ───
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo cachear GET requests del mismo origen
  if (request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  // No cachear:
  //  - Llamadas a Supabase (necesitan datos frescos)
  //  - API routes (Next.js)
  //  - Auth callbacks
  if (
    url.hostname.includes('supabase.co') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/auth/')
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Si la respuesta es exitosa, guardarla en cache
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, devolver del cache
        return caches.match(request).then((cached) => {
          if (cached) return cached;

          // Si no está en cache y es una página HTML, mostrar fallback
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/');
          }
        });
      })
  );
});

// ─── PUSH: notificaciones (preparado para el futuro) ───
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/app',
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Cuncuna', options)
  );
});

// ─── NOTIFICATIONCLICK: abrir la app al tocar la notificación ───
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/app')
  );
});
