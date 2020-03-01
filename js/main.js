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


let selectedTabletFilterElements = {
  'fashion': [],
  'productType': [],
  'color': [],
  'brand': [],
  'size': [],
  'priceRange': []
};

let tabletTabMenu = document.getElementById('tablet-tab-menu');
tabletTabMenu.addEventListener('click', function(e) {
  let target = e.target;
  let menu = document.getElementById('tablet-menu');
  let closeIcon = document.getElementById('close-filter-menu');
  let showIcon = document.getElementById('show-filter-menu');

  if (target.className === 'tablet-filter__inner' ||
      target.className === 'tablet-filter__options' ||
      target.className === 'tablet-filter__arrow-icon' ||
      target.className === 'tablet-filter__wrapper') {

    if (menu.className === 'tablet-filter__menu display-none') {
      closeIcon.className = 'tablet-filter__close-icon';
      showIcon.className = 'tablet-filter__arrow-icon display-none';
      menu.className = 'tablet-filter__menu';
    }
  } else if (target.className === 'tablet-filter__close-icon') {
    menu.className = 'tablet-filter__menu display-none';
    showIcon.className = 'tablet-filter__arrow-icon';
    closeIcon.className = 'tablet-filter__close-icon display-none';
  }

  if (target.className === 'tablet-filter__list-item') {
    target.className = 'tablet-filter__list-item tablet-filter__list-item--selected';

    let data = target.dataset.type;
    let el = document.querySelectorAll('*');
    let elems = [];

    for (let key in selectedTabletFilterElements) {
      if (key === data) {
        selectedTabletFilterElements[key].push(target);

        if (selectedTabletFilterElements[key].length === 2) {
          selectedTabletFilterElements[key][0].className = 'tablet-filter__list-item';
          selectedTabletFilterElements[key][1].className = 'tablet-filter__list-item tablet-filter__list-item--selected';
          selectedTabletFilterElements[key].shift();
        }
      }
    }

    for (let i = 0; i < el.length; i++) {
      if (el[i].dataset.type === data && el[i].className !== 'tablet-filter__list-item') {
        elems.push(el[i]);
      }
    }

    let result;
    let sectionName;
    let notSelected;

    for (let i = 0; i < elems.length; i++) {
      if (elems[i].className === 'tablet-filter__options' || elems[i].className === 'tablet-filter__options tablet-filter__options--selected') result = elems[i];
      if (elems[i].className === 'tablet-filter__heading') sectionName = elems[i];
      if (elems[i].className === 'tablet-filter__list-item tablet-filter__list-item--not-selected' || elems[i].className === 'tablet-filter__list-item') notSelected = elems[i];
    }

    if (target.textContent !== 'Not selected') {
      result.className = 'tablet-filter__options tablet-filter__options--selected';
      result.textContent = target.textContent;

      if (notSelected !== undefined) {
        notSelected.className = 'tablet-filter__list-item';
      }
    } else if (target.textContent === 'Not selected') {
      target.className = 'tablet-filter__list-item tablet-filter__list-item--not-selected';
      result.className = 'tablet-filter__options';
      result.textContent = sectionName.textContent;
    }
  }
});