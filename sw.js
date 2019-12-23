// Service worker
// Not every browser supports service workers.
// Install service worker
self.addEventListener('install', evt => {   //self refers to the sw itself  //changing the file will force it to be reinstalled 
  console.log('service worker has been installed'); // one way is to close all the tabs and re do them.
});

//activate event(acually listening)
//new activated services will only be active after all instances of the application are closed in the browser (new activations are when you change the sw.js file)
//touch `skip waiting` to make it active
self.addEventListener('activate', evt => {  //callback function
  console.log('service worker has been activated');
});

//fetch events
//service calls go through this (this will later be used for caching)
self.addEventListener('fetch', evt => {
  console.log('fetch event', evt);
});