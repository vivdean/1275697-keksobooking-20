'use strict';

window.map = (function () {
  var MAIN_PIN_WIDTH = 62 / 2;
  var MAIN_PIN_HEIGHT = 62 / 2;
  var MAIN_PIN_HEIGHT_FOR_ACTIVE_PAGE = 84;
  var MAIN_PIN_LOCATION_X = 570;
  var MAIN_PIN_LOCATION_Y = 375;
  var PINS_COUNT = 5;
  var ADS_COUNT = 8;
  var ENTER_BTN = 13;
  var ESC_BTN = 27;

  var map = document.querySelector('.map');
  var mapForm = map.querySelector('.map__filters');
  var mapFormElements = mapForm.querySelectorAll('fieldset, selest');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPinsContainer = map.querySelector('.map__pins');
  var addressInput = document.querySelector('input[name="address"]');

  var isMapActive = false;

  var ads = window.data.generateAds(ADS_COUNT);

  var setDisabledAttribute = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', true);
    }
  };

  var removeDisabledAttribute = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled', true);
    }
  };

  var setMainPinPosition = function (width, height) {
    var mainPinX = Math.floor(MAIN_PIN_LOCATION_X + width);
    var mainPinY = Math.floor(MAIN_PIN_LOCATION_Y + height);
    var mainPinPosition = mainPinX + ', ' + mainPinY;
    addressInput.value = mainPinPosition;
  };

  var deactivatePage = function () {
    setDisabledAttribute(window.form.adFormElements);
    setDisabledAttribute(mapFormElements);
    setMainPinPosition(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
    isMapActive = false;
  };

  var activatePage = function () {
    if (!isMapActive) {
      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.form.adFormAddress.setAttribute('readonly', true);

      removeDisabledAttribute(window.form.adFormElements);
      removeDisabledAttribute(mapFormElements);

      renderMapPins(PINS_COUNT);
      isMapActive = true;
      setMainPinPosition(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_FOR_ACTIVE_PAGE);
    }
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

  var renderMapPins = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < PINS_COUNT; i++) {
      fragment.appendChild(window.pin.createMapPin(ads[i]));
    }

    mapPinsContainer.appendChild(fragment);
  };

  var renderAdCard = function (ad) {
    var adCardElement = window.card.createAdCard(ad);
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

    var targetAd = ads.find(function (ad) {
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

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_BTN) {
      activatePage();
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      activatePage();
    }
  });

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

  return {
    renderMapPins: renderMapPins,
    deactivatePage: deactivatePage,
    activatePage: activatePage
  };
})();
