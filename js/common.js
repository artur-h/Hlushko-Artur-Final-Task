'use strict';

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