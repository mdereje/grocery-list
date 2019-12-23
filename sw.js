// Service worker
// Not every browser supports service workers.
const staticCacheName = 'site-static-v3'; //changing this refereshes cache
const dynamicCacheName = 'site-dynamic-v1';
const assets = [  // resources(requests) we want to cache
  '/',
  '/index.html',
  '/pages/fallback.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

// Install service worker
self.addEventListener('install', evt => {   //self refers to the sw itself  //changing the file will force it to be reinstalled 
  // console.log('service worker has been installed'); // one way is to close all the tabs and re do them.

  // Adding caching here so that it only caches when we are installing service workers.
  evt.waitUntil(  //makes sure the install event is not finished until the caching is done
     // opens as specific cache or crates it. this returns a promise
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assets');
      cache.addAll(assets); //reaches out to a server/s and grabs resource/s
    })
  );
});

//activate event(acually listening)
//new activated services will only be active after all instances of the application are closed in the browser (new activations are when you change the sw.js file)
//touch `skip waiting` to make it active
self.addEventListener('activate', evt => {  //callback function
  // console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then(keys=> {
      return Promise.all(keys
        .filter( key => key !== staticCacheName && key !== dynamicCacheName)  //remove all non matching names
        .map(key => caches.delete(key))  
      )
    })
  );
});

//  cache size limit function
const limitCacheSize = (name, size) => {  //recurssive function! for deleting oldest cache
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    })
  })
};

//fetch events
//service calls go through this (this will later be used for caching)
self.addEventListener('fetch', evt => {
  //intercept request
  // console.log('fetch event', evt);
  evt.respondWith( //pause that fetch event and respond with your own aka check if its already cached
    caches.match(evt.request) //async that returns a promise
    .then(cacheRes => {    //if cache is empty return the initial fetch or fallback page if offline
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());  //cant use fetchRes twice so we need to make a copy
          limitCacheSize(dynamicCacheName, 15);
          return fetchRes;
        })
      }).catch(() =>{
        //can do this for multiple types of resources. aka fall back images.
        if(evt.request.url.indexOf('.html') > -1){
          return caches.match('/pages/fallback.html');
        }
      })
    })
  );
});
