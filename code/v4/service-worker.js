const staticAssets = [
  '/',
  '/styles.css',
  '/main.js',
  '/refresh.svg',
  '/manifest.webmanifest',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('site-cache-v1').then(cache => {
      return cache.addAll(staticAssets)
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})