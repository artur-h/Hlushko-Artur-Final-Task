'use strict';

function getClosest(elem, selector) {
  if (elem.msMatchesSelector) {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( elem.msMatchesSelector( selector ) ) return elem;
    }
  } else {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( elem.matches( selector ) ) return elem;
    }
  }

  return null;
}

function toggleInput() {
  let searchInput = document.getElementById('search-input');

  if (searchInput.className === 'search__input show') {
    searchInput.className = 'search__input';
  } else {
    searchInput.className = 'search__input show';
  }
}

function toggleMenu(elem) {
  let nav = document.getElementById('nav');
  let menu = document.getElementById('menu');
  nav.className = 'nav show-nav';
  menu.className = 'menu show-menu';

  elem.className = 'header__burger display-none';

  let close = document.getElementById('close-icon');
  close.className = 'header__close';

  menu.addEventListener('click', function(e) {
    let target = e.target;

    if (target.className === 'menu__item-link') {
      closeMenu(close);
    }
  })
}

function closeMenu(elem) {
  let nav = document.getElementById('nav');
  let menu = document.getElementById('menu');
  nav.className = 'nav';
  menu.className = 'menu';

  elem.className = 'header__close display-none';

  let burger = document.getElementById('burger-icon');
  burger.className = 'header__burger';
}

function closeMobileMenu() {
  let nav = document.getElementById('nav');
  let menu = document.getElementById('menu');
  let close = document.getElementById('close-icon');
  let burger = document.getElementById('burger-icon');
  let input = document.getElementById('search-input');

  if (nav.className === 'nav show-nav' && input.value !== '') {
    nav.className = 'nav';
    menu.className = 'menu';

    close.className = 'header__close display-none';
    burger.className = 'header__burger';
  }

  input.value = '';
}

function calculateTotalPriceAndQuantity(bag) {
  if (bag.length === 0) {
    return null;
  } else {

    let totalPrice = 0;
    for (let i = 0; i < bag.length; i++) {
      if (bag[i].discountedPrice === null || bag[i].discountedPrice === bag[i].price) {
        totalPrice += bag[i].price * bag[i].quantity;
      } else {
        totalPrice += bag[i].discountedPrice * bag[i].quantity;
      }
    }

    let totalQuantity = 0;
    for (let i = 0; i < bag.length; i++) {
      totalQuantity += bag[i].quantity;
    }

    return {
      price: totalPrice.toFixed(2),
      quantity: totalQuantity
    };
  }
}

function renderBagInfoInHeader(total) {
  const $priceWrapper = document.getElementById('total-price-header-wrapper');
  const $price = document.getElementById('total-price-header');
  const $quantity = document.getElementById('total-bag-quantity');

  if (total === null) {
    $priceWrapper.className = 'header__bag-price display-none';
    $price.innerText = '0';
    $quantity.innerText = '0';
  } else {
    $priceWrapper.className = 'header__bag-price';
    $price.innerText = total.price;
    $quantity.innerText = total.quantity;
  }
}

function updateBagInfoInHeader() {
  const shoppingBag = JSON.parse(localStorage.getItem('shoppingBag') || '[]');
  const data = calculateTotalPriceAndQuantity(shoppingBag);
  renderBagInfoInHeader(data);
}

function addToItemDetailLocalStorage(event) {
  const $item = getClosest(event.target, '[data-identifier]');

  if (!$item && $item.className.indexOf('product__') === 0) return;

  const id = $item.dataset.identifier
  let item;

  for (let i = 0; i < catalog.length; i++) {
    if (catalog[i].id === id) item = catalog[i];
  }

  item.sizes.length !== 0 ? item.chosenSize = item.sizes[0] : item.chosenSize = null;
  item.colors.length !== 0 ? item.chosenColor = item.colors[0] : item.chosenColor = null;

  localStorage.setItem('itemDetailPage', JSON.stringify(item));
}

updateBagInfoInHeader();