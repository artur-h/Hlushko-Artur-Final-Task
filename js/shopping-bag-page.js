'use strict';

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

document.addEventListener('click', addToItemDetailLocalStorage);

addItemHoverEffect();
renderBagItemList();

let bag = {
  '8c061815-6a7d-4465-bb78-1bdc6c5adebf': 1,
  'ff665110-5e7f-435d-b1b4-651c3d5050ca': 1,
  '07cf6ce2-6eee-4e78-a441-f257fdea7ed6': 1,
  '8b300772-eee3-4ff1-b091-e89f17e0e469': 1,
};

let discount = 15.00;
let emptyText = 'Your shopping bag is empty. Use <a href="catalog.html">Catalog</a> to add new items';
let purchaseText = 'Thank you for your purchase';

let displayedBag = document.getElementById('displayed-bag');
if (displayedBag != undefined) {
  displayedBag.addEventListener('click', function(e) {
    let target = e.target;
    let identifier = target.dataset.identifier;

    if (target.className === 'bag__increase-btn' || target.className === 'bag__increase-sign') {
      bag[identifier]++;

      let elems = displayedBag.querySelectorAll('.bag__quantity');

      for (let i = 0; i < elems.length; i++) {
        if (elems[i].dataset.identifier === identifier) {
          elems[i].textContent = bag[identifier];
        }
      }

      showTotal();
    }

    if (target.className === 'bag__decrease-btn' || target.className === 'bag__decrease-sign') {
      bag[identifier]--;

      if (bag[identifier] < 1) {
        removeItem();
        showTotal();
      } else {
        let elems = displayedBag.querySelectorAll('.bag__quantity');

        for (let i = 0; i < elems.length; i++) {
          if (elems[i].dataset.identifier === identifier) {
            elems[i].textContent = bag[identifier];
          }
        }

        showTotal();
      }
    }

    if (target.className === 'bag__remove-item-btn') {
      removeItem();
      showTotal();
    }

    if (target.className === 'bag__empty-btn') {
      emptyBag();
      showTotal();
    }

    if (target.className === 'button button--checkout') {
      checkout();
      showTotal();
    }

    function removeItem() {
      let elems = displayedBag.querySelectorAll('.bag__item');
      let bagInner = document.getElementById('bag-inner');

      for (let i = 0; i < elems.length; i++) {
        if (elems[i].dataset.identifier === identifier) {
          // elems[i].remove();
          bagInner.removeChild(elems[i]);
        }
      }

      delete bag[identifier];
    }

    function showTotal() {
      let totalPrice = 0;
      let totalQuantity = 0;

      for (let key in bag) {
        let item;

        for (let i = 0; i < catalog.length; i++) {
          if (key === catalog[i].id) item = catalog[i];
        }

        let totalItemCost = item.discountedPrice * bag[key];
        totalPrice += totalItemCost;

        totalQuantity += bag[key];
      }

      totalPrice -= discount;
      totalPrice = totalPrice.toFixed(2);

      let totalCheckoutPrice = document.getElementById('total-price-checkout');
      let totalHeaderPrice = document.getElementById('total-price-header');
      let totalPriceHeaderWrapper = document.getElementById('total-price-header-wrapper');
      let totalBagQuantity = document.getElementById('total-bag-quantity');

      if (totalCheckoutPrice != undefined) {
        totalCheckoutPrice.textContent = '' + totalPrice;
      }
      totalBagQuantity.textContent = '' + totalQuantity;
      totalHeaderPrice.textContent = '' + totalPrice;

      if (Object.keys(bag).length === 0) {
        if (target.className !== 'button button--checkout') {
          emptyBag();
        }
        totalPriceHeaderWrapper.className = 'header__bag-price display-none';
      }
    }

    function emptyBag() {
      let bagInner = document.getElementById('bag-inner');
      let bagPromo = document.getElementById('bag-promo');
      let emptyText = document.createElement('div');

      emptyText.className = 'bag__empty-text';
      emptyText.innerHTML = 'Your shopping bag is empty. Use <a href="catalog.html" class="bag__back-to-catalog">Catalog</a> to add new items';
      bagInner.innerHTML = '';
      bagPromo.innerHTML = '';
      bagInner.appendChild(emptyText);

      bag = {};
    }

    function checkout() {
      let bagInner = document.getElementById('bag-inner');
      let bagPromo = document.getElementById('bag-promo');
      let emptyText = document.createElement('div');

      emptyText.className = 'bag__empty-text';
      emptyText.innerHTML = 'Thank you for your purchase';
      bagInner.innerHTML = '';
      bagPromo.innerHTML = '';
      bagInner.appendChild(emptyText);

      bag = {};
    }
  });
}