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


let tabMenu = document.getElementById('tab-menu');
tabMenu.addEventListener('click', function(e) {
  let target = e.target;

  if (target.className === 'filter__menu-item') {
    let data = target.dataset.type;
    let el = document.querySelectorAll('*');
    let elems = [];

    for (let i = 0; i < el.length; i++) {
      if (el[i].dataset.type === data && el[i].className !== 'filter__menu-item') {
        elems.push(el[i]);
      }
    }

    let item;
    let result;
    let name;
    let choice;

    for (let i = 0; i < elems.length; i++) {
      if (elems[i].className === 'filter__result' || elems[i].className === 'filter__result filter__result--selected') result = elems[i];
      if (elems[i].className === 'filter__name' || elems[i].className === 'filter__name filter__name--selected') name = elems[i];
      if (elems[i].className === 'filter__choice' || elems[i].className === 'filter__choice filter__choice--selected') choice = elems[i];
      if (elems[i].className === 'filter__item' || elems[i].className === 'filter__item filter__item--selected') item = elems[i];
    }

    if (target.textContent !== 'Not selected') {
      item.className = 'filter__item filter__item--selected';
      result.className = 'filter__result filter__result--selected';
      name.className = 'filter__name filter__name--selected';
      choice.textContent = target.textContent;
    } else if (target.textContent === 'Not selected') {
      item.className = 'filter__item';
      result.className = 'filter__result';
      name.className = 'filter__name';
      choice.textContent = '';
    }
  }
});