'use strict';

function createItemDetailPage() {
  const item = JSON.parse(localStorage.getItem('itemDetailPage'));
  const itemTemplate = document.getElementById('item-template').innerHTML;
  const itemTemplateFn = _.template(itemTemplate);
  const itemContainer = document.getElementById('item-container');
  itemContainer.innerHTML = itemTemplateFn(item);

  let selectedItemInfo = {
    'sizes': [],
    'colors': [],
  };

  let selectedInfoElements = document.querySelectorAll('.item__detailed-info.item__detailed-info--selected');

  for (let i = 0; i < selectedInfoElements.length; i++) {
    for (let key in selectedItemInfo) {
      selectedItemInfo[key].push(selectedInfoElements[i]);
      i++;
    }
  }

  let itemInfo = document.querySelector('.item__info');
  itemInfo.addEventListener('click', function(e) {
    let target = e.target;

    if (target.className === 'item__detailed-info') {
      target.className = 'item__detailed-info item__detailed-info--selected';

      let data = target.dataset.info;

      for (let key in selectedItemInfo) {
        if (key === data) {
          selectedItemInfo[key].push(target);

          if (selectedItemInfo[key].length === 2) {
            selectedItemInfo[key][0].className = 'item__detailed-info';
            selectedItemInfo[key][1].className = 'item__detailed-info item__detailed-info--selected';
            selectedItemInfo[key].shift();
          }
        }
      }
    }
  });
}

function renderItemInfo(allInfo, type) {
  return allInfo.map(function(info) {
    return `<li class="item__detailed-info" data-info="${type}">
      <span class="item__detailed-text">${info}</span>
    </li>`
  }).join('');
}

createItemDetailPage();