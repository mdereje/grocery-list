// offline data
db.enablePersistence()
  .catch(err => {
    if(err.code == 'failed-precondition'){
      // probably multiple tabs opened
      console.log('persistence failed');
    } else if(err.code == 'unimpmlemented') {
      // lack of browser support
      console.log('persistence is not available')
    }
  })

// real-time listner
db.collection('recipes').onSnapshot((snapshot) => {
  // console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => { //change.doc.data() holds the data for each change.
    if(change.type === 'added'){
      // add the document data to the web page
      renderRecipe(change.doc.data(), change.doc.id);
    }

    if(change.type === 'removed'){
      // remove the document data from the web page

    }
  })
})

// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value
  };

  db.collection('recipes').add(recipe)  //async so returns a promise
    .catch(err => console.log(err));

    form.reset();
})