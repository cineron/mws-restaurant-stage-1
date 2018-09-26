let cacheID = "mws-restaurant-001";

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheID).then(cache => {
            return cache
            .addAll([
                "/",
                "/index.html",
                "/restaurant.html",
                "/css/styles.css",
                "/data/restaurants.json",
                "/js/",
                "/js/dbhelper.js",
                "/js/main.js",
                "/js/register.js",
                "/js/restaurant_info.js"
                "/img/na.png"
            ])
            .catch(error => {
                console.log(`caches open failed!: ${error}`);
            });
        })
    );
});

self.addEventListener("fetch")