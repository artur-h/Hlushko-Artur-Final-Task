'use strict';

let selectedItemInfo = {
  'color': [],
  'size': [],
};

let itemInfo = document.getElementById('item-info');
itemInfo.addEventListener('click', function(e) {
  let target = e.target;

  if (target.className === 'item__detailed-info') {
    target.className = 'item__detailed-info item__detailed-info--selected';

    let data = target.dataset.info;
    let el = document.querySelectorAll('*');
    let elems = [];

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