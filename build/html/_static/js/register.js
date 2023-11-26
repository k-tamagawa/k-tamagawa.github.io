const registerServiceWorker = async() => {
  if ('serviceWorker' in navigator) {
    // Service Worker を新規に登録
    // registerに相対パス指定しかできないのでパスから判断
    const hierarchy = location.pathname.split('/');
    const path = ('../').repeat(hierarchy.length - 4) + 'service-worker.js'
    navigator.serviceWorker
      .register(path, { scope: '/sphinx/html/' ,updateViaCache: 'none'})  //none → ブラウザキャッシュを経由しない
      .then(registration => {
        registration.onupdatefound = function() {
          console.log("サービスワーカーの更新版が見つかりました。");
          registration.update();  //サービスワーカーの更新を試みる
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
};

registerServiceWorker();