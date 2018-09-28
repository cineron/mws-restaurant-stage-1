console.log("Service Worker: Registered.");

//name the cache
let cacheID = "mws-restaurant-001";

//list the files to cache
const cacheFiles = [
    "/",
    "/index.html",
    "/restaurant.html",
    "/css/styles.css",
    "/data/restaurants.json",
    "/js/",
    "/js/dbhelper.js",
    "/js/main.js",
    "/js/register.js",
    "/js/restaurant_info.js",
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/7.jpg",
    "/img/8.jpg",
    "/img/9.jpg",
    "/img/10.jpg"
    // "/img/na.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheID).then(cache => {
            return cache.addAll(cacheFiles)
            .catch(error => {
                console.log(`caches open failed!: ${error}`);
            });
        })
    );
});

self.addEventListener("fetch", event => {
    let cacheRequest = event.request;
    let cacheURLObject = new URL(event.request.url);
    if (event.request.url.indexOf("restaurant.html") >= 0) {
        cacheRequest = new Request(cacheURL);
    }
    if (cacheURLObject.hostname !== "localhost") {
        event.request.mode = "no-cors";
    }
    
    event.respondWith(
        caches.match(cacheRequest).then(response => {
            return (
                response ||
                fetch(event.request).then(fetchResponse => {
                    return caches.open(cacheID).then(cache => {
                        cache.put(event.request.fetchResponse.clone());
                        return fetchResponse;
                    });
                })
                .catch(error => {
                    console.log(error);
                    // if (event.request.url.indexOf(".jpg") >= 0) {
                    //     return caches.match("/img/na.png");
                    // }
                    // return new Response("Application is not connected to the internet", {
                    //     status: 404, 
                    //     statusText: "Application is not connected to the internet."
                    // });
                })
            );
        })
    );
});