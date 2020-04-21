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