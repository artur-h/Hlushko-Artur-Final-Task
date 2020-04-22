'use strict';

function createItemDetailPage() {
  const item = JSON.parse(localStorage.getItem('itemDetailPage'));
  const itemTemplate = document.getElementById('item-template').innerHTML;
  const itemTemplateFn = _.template(itemTemplate);
  const itemContainer = document.getElementById('item-container');
  itemContainer.innerHTML = itemTemplateFn(item);

  const info = document.querySelector('[data-container="item-info"]');
  info.addEventListener('click', updateChosenItem);

}

function renderItemInfo(allInfo, type) {
  return allInfo.map(function(info, index) {
    let input;

    index !== 0
      ? input = '<input data-chosen="' + type + '" type="radio" id="radio' + info + '" name="radio' + type + '" value="' + info + '" class="item__input">'
      : input = '<input checked data-chosen="'+ type + '" type="radio" id="radio' + info + '" name="radio' + type + '" value="' + info + '" class="item__input">';

    const label = '<label for="radio' + info + '" class="item__detailed-info"> <span class="item__detailed-text">' + info + '</span> </label>';

    return input + label;
  }).join('');
}

createItemDetailPage();

function updateChosenItem(event) {
  const target = event.target;

  if (target.hasAttribute('data-chosen')) {
    const item = JSON.parse(localStorage.getItem('itemDetailPage'));
    const prop = 'chosen' + target.dataset.chosen;
    item[prop] = target.value;
    localStorage.setItem('itemDetailPage', JSON.stringify(item));
  }

  if (target.id === 'addToBag') {
    const item = JSON.parse(localStorage.getItem('itemDetailPage'));

    const shoppingBag = JSON.parse(localStorage.getItem('shoppingBag') || '[]');
    const itemIndexInShoppingBag = shoppingBag.findIndex(function(bagItem) {
      if (bagItem.id === item.id && bagItem.chosenColor === item.chosenColor && bagItem.chosenSize === item.chosenSize) return true;
    })
    console.log(itemIndexInShoppingBag)
    if (itemIndexInShoppingBag !== -1) {
      shoppingBag[itemIndexInShoppingBag].quantity++
    } else {
      item.quantity = 1;
      shoppingBag.push(item)
    }

    localStorage.setItem('shoppingBag', JSON.stringify(shoppingBag));
  }
}