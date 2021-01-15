function timeout(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(new Response('', {
                status: 408,
                statusText: 'Request timed out.'
            }));
        }, delay);
    });
}

self.addEventListener('install', function(event) {
    self.skipWaiting();//待機中のサービスワーカーを強制的にアクティブにします
});

self.addEventListener('activate', function(event) {
    if (self.clients && clients.claim) {
        clients.claim();
    }
});

self.addEventListener('fetch', function(event) {
  if (/\.js$/.test(event.request.url)) {
    event.respondWith(Promise.race([timeout(400), fetch(event.request.url)]));//パラメータ１と２で早く終わったほうが採用される。なので400ミリ秒まって応答がないと、timeout(400)となる。
  } else {
    event.respondWith(fetch(event.request));
  }
});
