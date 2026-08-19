const CACHE_NAME = "minik-kasif-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./pages/harfler.html",
  "./pages/renkler.html",
  "./pages/sayilar.html",
  "./pages/hayvanlar.html",
  "./pages/sekiller.html",
  "./pages/hafiza.html",

  "./icon-192.png",
  "./icon-512.png"
];

// Kurulum
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Dosyalar önbelleğe alınıyor...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// Aktifleştirme
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// İnternet yoksa önbellekten çalıştır
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {

      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {

          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {

          if (event.request.destination === "document") {
            return caches.match("./index.html");
          }

        });

    })
  );
});