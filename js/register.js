// from D.Brown follow-along
// Register Service Worker(s)
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
    .register("/sw.js")
    .then(reg => {
        console.log(`Service Worker registration successful: ${reg.scope}`);
    })
    .catch(error => {
        console.log(`Service Worker registration failed: ${error}`);
    });
}