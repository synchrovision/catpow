var cacheName = 'catpow-pwa';
self.addEventListener('install', function (e) {
	var contentToCache = ['index.html'];
	e.waitUntil(caches.open(cacheName).then(function (cache) {
		return cache.addAll(contentToCache);
	}));
});
self.addEventListener('fetch', function (e) {
	if (e.request.mode !== 'navigate') {
		return;
	}
	e.respondWith(fetch(e.request).catch(function () {
		return caches.open(cacheName).then(function (cache) {
			return cache.match('index.html');
		});
	}));
});
