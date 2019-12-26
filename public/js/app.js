
//registering the service worker
if('serviceWorker' in navigator) { //navigator is an object in javascript that represents it.
  navigator.serviceWorker.register('/sw.js')  //returns a promise, its a way to do asynchronous tasks.
  .then((reg) => console.log(' service worker registered', reg))
  .catch((err) => console.log('service worker not registered', err))
}