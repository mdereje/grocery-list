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
db.collection('items').onSnapshot((snapshot) => {
  // console.log(snapshot.docChanges());
  snapshot.docChanges().forEach(change => { //change.doc.data() holds the data for each change.
    if(change.type === 'added'){
      // add the document data to the web page
      renderRecipe(change.doc.data(), change.doc.id);
    }

    if(change.type === 'removed'){
      // remove the document data from the web page
      removeRecipe(change.doc.id);
    }
  })
})

// add new recipe
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();

  const item = {
    item: form.item.value,
    size: form.size.value,
    unit: form.unit.value,
    quantity: form.quantity.value
  };

  console.log('item', item)
  db.collection('items').add(item)  //async so returns a promise
    .catch(err => console.log(err));

    form.reset();
})


//delete a recipe
const recipeContainer = document.querySelector('.items')
recipeContainer.addEventListener('click', evt => {
  //console.log(evt);
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    db.collection('items').doc(id).delete();
  }
})