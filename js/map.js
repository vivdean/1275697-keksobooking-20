'use strict';

(function () {
  var MAIN_PIN_HEIGHT_FOR_ACTIVE_PAGE = 84;
  var ESC_BTN = 27;

  var map = document.querySelector('.map');
  var mapForm = map.querySelector('.map__filters');
  var mapFormElements = mapForm.querySelectorAll('fieldset, select');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPinsContainer = map.querySelector('.map__pins');

  var deactivateMap = function () {
    window.pin.setDefaultMainElementPosition();
    map.classList.add('map--faded');
    mapForm.classList.add('.map__filters--disabled');
    window.util.setDisabledAttribute(mapFormElements);
    window.pin.remove();
    removeCard();
    mapForm.reset();
  };

  var activateMap = function () {
    map.classList.remove('map--faded');
    mapForm.classList.remove('.map__filters--disabled');
    window.pin.setMainElementPosition(window.pin.HALF_MAIN_ELEMENT_WIDTH, MAIN_PIN_HEIGHT_FOR_ACTIVE_PAGE);
  };

  var renderAdCard = function (ad) {
    var adCardElement = window.card.create(ad);
    map.insertBefore(adCardElement, mapFiltersContainer);

    closeCard();

    document.addEventListener('click', onCardCloseBtnPress);
    document.addEventListener('keydown', onCardEscPress);
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
    document.removeEventListener('click', onCardCloseBtnPress);
    document.removeEventListener('keydown', onCardEscPress);
  };

  var removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
    document.removeEventListener('click', onCardCloseBtnPress);
    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardCloseBtnPress = function (evt) {
    var closeBtn = document.querySelector('.popup__close');
    if (evt.target === closeBtn) {
      closeCard();
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === ESC_BTN) {
      evt.preventDefault();
      closeCard();
    }
  };

  window.map = {
    form: mapForm,
    deactivate: deactivateMap,
    activate: activateMap,
    removeCard: removeCard,
    pinsContainer: mapPinsContainer,
    formElements: mapFormElements,
  };
})();
