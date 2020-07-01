'use strict';

window.pin = (function () {

  var PIN_WIDTH = 50 / 2;
  var PIN_HEIGHT = 70;

  var createMapPin = function (ad) {
    var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = mapPin.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinElement.style.left = ad.location.x - PIN_WIDTH + 'px';
    pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';

    pinElement.dataset.id = ad.id;

    pinImg.setAttribute('src', ad.author.avatar);
    pinImg.setAttribute('alt', ad.offer.title);

    return pinElement;
  };

  return {
    createMapPin: createMapPin,
  };
})();
