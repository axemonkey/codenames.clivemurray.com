const staticDevCodenames = 'dev-codenames-site-v1';

const assets = [
	'/',
	'/index.html',
	'/public/css/style.css',
	'/public/data/animals.json',
	'/public/data/prefixes.json',
	'/public/js/modules/get-data.js',
	'/public/js/modules/lap-banner.js',
	'/public/js/modules/spinner-config.js',
	'/public/js/modules/tools.js',
	'/public/js/es5bundle.main.js',
	'/public/js/main.js',
	'/public/js/vendor.js',
];

self.addEventListener('install', installEvent => {
	installEvent.waitUntil(
		caches.open(staticDevCodenames).then(cache => {
			cache.addAll(assets);
		}),
	);
});

self.addEventListener('fetch', fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request);
		}),
	);
});
