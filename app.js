// Single state object
var state = {
  items: [
    {
      // whether item is checked or not
      checked: false,

      // what the item is
      name: "apples"

    },
    {
      checked: false,
      name: "banana"
    }
  ]
};

// State modification functions
var addItem = function(state, item) {
  state.items.push(item);
};

var checkItem = function(state, item) {
  var checkedName = $(item).children(".shopping-item").html();
  if (checkedName in state.checkedItems) {
    var checkIndex = state.checkedItems.indexOf(checkedName);
    console.log("index " + checkIndex);
    state.checkedItems.splice(checkIndex, 1);
    console.log("checkedItems " + state.checkedItems);
  } else {
    state.checkedItems.push(checkedName);
    console.log("checkedItems " + state.checkedItems)
  };
  console.log("items " + state.items);
};

var deleteItem = function(state, item) {
  var itemName = $(item).children(".shopping-item").html();
  var index = state.items.indexOf(itemName);
  var checkIndex = state.checkedItems.indexOf(itemName);
  if (itemName in state.checkedItems) {
    state.items.splice(index, 1);
    state.checkedItems.splice(checkIndex, 1);
  } else {
    state.items.splice(index, 1);
  }
  $(item).remove();
  console.log(state);
};

// Render functions
var renderList = function(state, element) {
  var itemsHTML = state.items.map(function(item) {
    return  '<li><span class="shopping-item">' +
      item +
      '</span> \
      <div class="shopping-item-controls"> \
      <button class="shopping-item-toggle"> \
      <span class="button-label">check</span> \
      </button> \
      <button class="shopping-item-delete"> \
      <span class="button-label">delete</span> \
      </button></div> \
      </li>'
    });
    element.html(itemsHTML);
};

// Event listeners
$('#js-shopping-list-form').submit(function(event) {
  event.preventDefault();
  addItem(state, $('#shopping-list-entry').val());
  renderList(state, $('.shopping-list'));
});

$('ul').on("click", ".shopping-item-toggle", function(event){
  checkItem(state, this.closest("li"));
});

$('ul').on("click", ".shopping-item-delete", function(event) {
  deleteItem(state, this.closest("li"));
});
