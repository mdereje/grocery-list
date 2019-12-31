const items = document.querySelector('.items');  //larger div inside index.html

document.addEventListener('DOMContentLoaded', function() {
  console.log("init happening")
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
  //init select
  var elems = document.querySelectorAll('.unit');
  M.FormSelect.init(elems, {dropdownOptions: ['text', 'text2']});
});

// render recipe data
const renderRecipe = (data, id) => {

  const html = `
    <div class="card-panel item white row" data-id="${id}">
      <img src="/img/dish.png" alt="recipe thumb">
      <div class="item-details">
        <div class="item-title">${data.quantity}</div>
        <div class="item-title">${data.item}</div>
        <div class="item-ingredients">${data.size} ${data.unit}</div>
      </div>
      <div class="item-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;

  items.innerHTML += html
}

//remove recipe from DOM
const removeRecipe = (id) => {
  const item = document.querySelector(`.item[data-id=${id}]`) // square brackets looks for specific attribute
  item.remove();  //dom method that removes an element from the dom
}