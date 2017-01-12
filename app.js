// Single state object
var state = {
  items: [
    {
      checked: false,
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
  if (_.findWhere(state.items, {name: item}) == undefined) {
    state.items.push({checked: false, name: item})
  } else {
    alert("Item already listed.")
  }
};

var checkItem = function(state, item) {
  console.log($(item).children(".shopping-item"));
  var checkedName = $(item).children(".shopping-item").html();
  var checkedObject = _.findWhere(state.items, {name: checkedName})
  if (checkedObject.checked === false){
    checkedObject.checked = true
    $(item).children(".shopping-item").addClass("shopping-item__checked");
  } else {
    checkedObject.checked = false
    $(item).children(".shopping-item").removeClass("shopping-item__checked");
  };

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
};

// Render functions
var renderList = function(state, element) {
  var itemList = [];
  for (i=0; i<state.items.length; i++) {
    itemList.push(state.items[i].name)
  };
  var itemsHTML = itemList.map(function(item) {
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
