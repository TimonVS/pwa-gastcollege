const CACHE_NAME = `site-cache-v1`
const urlsToCache = [
  '/',
  '/about.html',
  '/main.css',
  '/main.js',
  '/manifest.webmanifest',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png',
  '/images/icons/apple-touch-icon-180x180.png'
]

self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install')
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(urlsToCache)
    })
  )
})

// pre-caching
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       return response || fetch(event.request)
//     })
//   )
// })

// pre-caching + dynamic caching
self.addEventListener('fetch', event => {
  console.log('[ServiceWorker] Fetch event')

  const requestURL = new URL(event.request.url)

  if (requestURL.hostname === 'cataas.com') {
    console.log('[ServiceWorker] Fetching cat image')
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200) {
            return response
          }

          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          return caches.match(event.request)
        })
    )

    return
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
