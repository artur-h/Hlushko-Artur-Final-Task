'use strict';

let bagInner = document.getElementById('bag-inner');
bagInner.addEventListener('mouseover', function(e) {
  let target = e.target;

  if (target.className === 'product__overlay-text' || target.className === 'product__overlay') {
    let overlayId = target.dataset.hover;

    let el = document.querySelectorAll('*');

    for (let i = 0; i < el.length; i++) {
      if (el[i].dataset.hover === overlayId && el[i].className === 'bag__item-name') {
        el[i].className = 'bag__item-name bag__item-name--hover';
      }
    }
  }
});

bagInner.addEventListener('mouseout', function(e) {
  let target = e.target;

  if (target.className === 'product__overlay-text' || target.className === 'product__overlay') {
    let overlayId = target.dataset.hover;

    let el = document.querySelectorAll('*');

    for (let i = 0; i < el.length; i++) {
      if (el[i].dataset.hover === overlayId && el[i].className === 'bag__item-name bag__item-name--hover') {
        el[i].className = 'bag__item-name';
      }
    }
  }
});