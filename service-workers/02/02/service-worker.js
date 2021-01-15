var version = 1;
var cacheName = 'static-' + version;

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll([
        'index.html',
        'packt-logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function (event) {
  //event.respondWith(caches.match(event.request));
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        } else {
          //キャッシュされていない？？
        };
        return fetch(event.response);
      })
  );
});
