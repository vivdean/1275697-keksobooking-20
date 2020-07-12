'use strict';

(function () {
  var HALF_MAIN_PIN_WIDTH = 62 / 2;
  var HALF_MAIN_PIN_HEIGHT = 62 / 2;
  var MAIN_PIN_HEIGHT_FOR_ACTIVE_PAGE = 84;
  var ESC_BTN = 27;

  var map = document.querySelector('.map');
  var mapForm = map.querySelector('.map__filters');
  var mapFormElements = mapForm.querySelectorAll('fieldset, selest');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPinsContainer = map.querySelector('.map__pins');

  var deactivateMap = function () {
    window.util.setDisabledAttribute(mapFormElements);
    window.pin.setMainElementPosition(HALF_MAIN_PIN_WIDTH, HALF_MAIN_PIN_HEIGHT);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    window.util.removeDisabledAttribute(mapFormElements);
    window.backend.load(window.main.onSuccess, window.main.onError);
    window.pin.setMainElementPosition(HALF_MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_FOR_ACTIVE_PAGE);
  };

  var hideEmptyAdCardBlocks = function (adCardElement) {
    var adCardElements = adCardElement.children;
    for (var i = 0; i < adCardElements.length; i++) {
      if (adCardElements[i].hasAttribute && !adCardElements[i].innerHTML) {
        adCardElements[i].style.display = 'block';
      } else if (!adCardElements[i].innerHTML) {
        adCardElements[i].style.display = 'none';
      }
    }
  };

  var renderAdCard = function (ad) {
    var adCardElement = window.card.create(ad);
    map.insertBefore(adCardElement, mapFiltersContainer);

    closeCard();
    hideEmptyAdCardBlocks(adCardElement);

    document.addEventListener('click', onPopupCloseBtnPress);
    document.addEventListener('keydown', onPopupEscPress);
  };

  mapPinsContainer.addEventListener('click', function (evt) {
    var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (!mapPin) {
      return;
    }
    var mapPinId = Number(mapPin.dataset.id);

    var targetAd = window.offers.find(function (ad) {
      return ad.id === mapPinId;
    });

    renderAdCard(targetAd);
    mapPin.classList.add('map__pin--active');
  });

  var closeCard = function () {
    var card = map.querySelector('.map__card');
    var currentPin = document.querySelector('.map__pin--active');

    if (card && currentPin) {
      currentPin.classList.remove('map__pin--active');
      card.remove();
    }

    document.removeEventListener('click', onPopupCloseBtnPress);
    document.removeEventListener('click', onPopupEscPress);
  };

  var onPopupCloseBtnPress = function (evt) {
    var closeBtn = document.querySelector('.popup__close');
    if (evt.target === closeBtn) {
      closeCard();
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_BTN) {
      evt.preventDefault();
      closeCard();
    }
  };

  window.map = {
    deactivate: deactivateMap,
    activate: activateMap,
    mapPinsContainer: mapPinsContainer,
  };
})();
