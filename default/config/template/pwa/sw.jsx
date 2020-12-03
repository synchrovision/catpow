const cacheName='catpow-pwa';
self.addEventListener('install', (e) => {
	const contentToCache=['index.html'];
	e.waitUntil(
		caches.open(cacheName).then((cache) => cache.addAll(contentToCache))
	);
});
self.addEventListener('fetch', (e) => {
	if (e.request.mode !== 'navigate') {
	  return;
	}
	e.respondWith(
		fetch(e.request).catch(() => {
		  return caches.open(cacheName).then((cache) => {
			return cache.match('index.html');
		  });
		})
	);

});