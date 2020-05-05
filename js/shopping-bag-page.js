'use strict';

function renderBagItemList(checkout) {
  const bag = getBagItems();
  const calcData = calculateTotalPriceAndQuantity(bag);

  renderMainBagInfo(calcData);
  renderBagInfoInHeader(calcData);

  const productTemplate = document.getElementById('bag-item-template').innerHTML,
    productTemplateFn = _.template(productTemplate),
    productContainer = document.getElementById('bag-inner'),
    checkoutSection = document.getElementById('checkout-section'),
    afterCheckoutText = 'Thank you for your purchase',
    emptyBagTextBlock = document.querySelector('.bag__empty-text');


  if (checkout === true) {
    emptyBagTextBlock.textContent = afterCheckoutText;
  } else if (checkout === false && bag.length !== 0) {
    if (productContainer.textContent !== '') productContainer.textContent = '';

    checkoutSection.className = 'bag-promo';
    productContainer.innerHTML = bag.map(function(item) { return productTemplateFn(item) }).join('');
  }
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

function getBagItems() {
  return JSON.parse(localStorage.getItem('shoppingBag') || '[]');
}

function setBagItems(elem) {
  localStorage.setItem('shoppingBag', JSON.stringify(elem));
}

// isSameItem func can be used in conditionals to compare certain item object props with DOM Element's dataset attributes.
function isSameItem(elemA, elemB, compareType) {
  if (compareType === 'obj-elem') {
    if (elemA.id === elemB.dataset.identifier 
      && String(elemA.chosenColor) === elemB.dataset.chosencolor 
      && String(elemA.chosenSize) === elemB.dataset.chosensize) {
      return true;
    }
  } else if (compareType === 'elem-elem') {
    if (elemA.dataset.identifier  === elemB.dataset.identifier 
      && elemA.dataset.chosencolor === elemB.dataset.chosencolor 
      && elemA.dataset.chosensize === elemB.dataset.chosensize) {
      return true;
    }
  }
}

function renderMainBagInfo(total) {
  const emptyBagTextHtml = 'Your shopping bag is empty. Use <a href="catalog.html" class="bag__back-to-catalog">Catalog</a> to add new items',
    checkoutSection = document.getElementById('checkout-section'),
    priceInfo = document.getElementById('total-price-checkout'),
    bagInner = document.getElementById('bag-inner');

  if (total === null) {
    const emptyText = document.createElement('div');

    emptyText.className = 'bag__empty-text';
    emptyText.innerHTML = emptyBagTextHtml;
    bagInner.textContent = '';
    bagInner.appendChild(emptyText);
    
    checkoutSection.className = 'bag-promo display-none';
    priceInfo.textContent = '0';
  } else {
    priceInfo.textContent = total.price
  }
}

function renderItemQuantity(clickedElem, change) {
  if (getClosest(clickedElem, '[data-quantity=' + change + ']')) {
    const btn = getClosest(clickedElem, '[data-quantity=' + change + ']');
    const quantityIndicators = document.querySelectorAll('.bag__quantity');
    let bag = getBagItems();
    
    bag.forEach(function(item) {
      if (isSameItem(item, btn, 'obj-elem')) {
        change === 'increase' ? item.quantity++ : item.quantity--;
      }
    });

    const lengthBefore = bag.length;

    bag = bag.filter(function(item) {return item.quantity > 0;});
    setBagItems(bag);

    const lenghtAfter = bag.length;

    if (lengthBefore > lenghtAfter) renderBagItemList(false);
    
    for (let i = 0; i < quantityIndicators.length; i++) {
      if (isSameItem(quantityIndicators[i], btn, 'elem-elem')) {
        let quantity = Number(quantityIndicators[i].textContent);
        change === 'increase' ? quantityIndicators[i].textContent = ++quantity : quantityIndicators[i].textContent = --quantity;
      }
    }
    
    const calcData = calculateTotalPriceAndQuantity(bag);
    renderBagInfoInHeader(calcData);
    renderMainBagInfo(calcData);
  }
}

document.addEventListener('click', function(event) {
  const target = event.target;

  renderItemQuantity(target, 'increase');
  renderItemQuantity(target, 'decrease');

  if (target.dataset.action === 'removeItem') {
    const bag = getBagItems();
    
    const withoutRemovedItem = bag.filter(function(item) {
      return isSameItem(item, target, 'obj-elem') ? false : true;
    })

    setBagItems(withoutRemovedItem);
    renderBagItemList(false);
  }

  if (target.dataset.action === 'removeAllItems' || target.dataset.action === 'checkout') {
    const bag = getBagItems();
    bag.length = 0;
    setBagItems(bag);
    
    target.dataset.action === 'checkout' ? renderBagItemList(true) : renderBagItemList(false);
  }

  if (target.className.indexOf('product__') === 0) addToItemDetailLocalStorage(event);
});

addItemHoverEffect();
renderBagItemList(false);