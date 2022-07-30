/*var staticCacheName = "VGame";

self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll(["/"]);
        })
    );
});

self.addEventListener("fetch", function (event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
*/
importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.NetworkFirst()
);