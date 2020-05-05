'use strict';

function createCatalogItemList() {
  let _currentWindowWidth = _getWindowWidth();
  let _updatedWindowWidth = _getWindowWidth();

  return {
    initialize: function() {
      const width = window.innerWidth;

      if (width >= 1025) {
        _renderCatalogItems(4);
      } else if (width <= 1024 && width >= 768) {
        _renderCatalogItems(3);
      } else if (width <= 767) {
        _renderCatalogItems(2);
      }

      window.addEventListener('resize', _updateWindowWidth);
    }
  }

  function _getWindowWidth() {
    let width = window.innerWidth;

    if (width >= 1025) {
      width = 'desktop';
    } else if (width <= 1024 && width >= 768) {
      width = 'tablet';
    } else if (width <= 767) {
      width = 'mobile';
    }

    return width;
  }

  function _updateWindowWidth() {
    _updatedWindowWidth = _getWindowWidth();
    const isSame = _currentWindowWidth === _updatedWindowWidth;
    const width = window.innerWidth;

    if (width >= 1025 && !isSame) {
      _renderCatalogItems(4);
    } else if (width <= 1024 && width >= 768 && !isSame) {
      _renderCatalogItems(3);
    } else if (width <= 767 && !isSame) {
      _renderCatalogItems(2);
    }
  }

  function _renderCatalogItems(itemsInContainer) {
    const productTemplate = document.getElementById('product-template').innerHTML;
    const productTemplateFn = _.template(productTemplate);
    const productContainer = document.querySelectorAll('.arrivals__product-container');

    for (let i = 0; i < productContainer.length; i++) {
      if (productContainer[i].innerHTML !== '') productContainer[i].innerHTML = '';
    }

    const filteredCatalog = catalog.filter(function (item) {
      return item.fashion === 'Casual style' && item.category === 'women';
    });
    filteredCatalog.sort(function (a, b) {
      return -(new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
    });

    let currentItem = 0;

    for (let containerCount = 0; containerCount < productContainer.length; containerCount++) {
      for (let counter = 0; counter < itemsInContainer && currentItem < filteredCatalog.length; counter++) {
        productContainer[containerCount].innerHTML += productTemplateFn(filteredCatalog[currentItem]);
        currentItem++;
      }
    }

    _currentWindowWidth = _getWindowWidth();
  }
}

document.addEventListener('click', addToItemDetailLocalStorage);

const catalogItemList = createCatalogItemList();
catalogItemList.initialize();