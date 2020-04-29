'use strict';

const hoverIdGenerator = createHoverId();

function* createHoverId() {
  let id = 0;
  let iteration = 0;
  let SAME_NUM_REPETITIONS = 3;

  while (true) {
    iteration % SAME_NUM_REPETITIONS === 0 ? yield ++id : yield id;
    iteration++;
  }
}

function renderBagItemList() {
  const productTemplate = document.getElementById('bag-item-template').innerHTML;
  const productTemplateFn = _.template(productTemplate);
  const productContainer = document.getElementById('bag-inner');
  const items = JSON.parse(localStorage.getItem('shoppingBag'));

  if (productContainer.innerHTML !== '') productContainer.innerHTML = '';

  productContainer.innerHTML = items.map(function(item) { return productTemplateFn(item) }).join('');
}

function addItemHoverEffect() {
  const bagInner = document.getElementById('bag-inner');
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
}


addItemHoverEffect();
renderBagItemList();