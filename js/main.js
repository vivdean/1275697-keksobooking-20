'use strict';

var FEATURES = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADS_TIME = ['12:00', '13:00', '14:00'];
var OFFER_TYPES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};
var ACCOMODATION_TYPES = {
  'palace': {
    title: 'Дворец',
    minPrice: 10000,
  },
  'flat': {
    title: 'Квартира',
    minPrice: 1000,
  },
  'house': {
    title: 'Дом',
    minPrice: 5000,
  },
  'bungalo': {
    title: 'Бунгало',
    minPrice: 0,
  }
};
var ADS_COUNT = 8;
var PIN_WIDTH = 50 / 2;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 62 / 2;
var MAIN_PIN_HEIGHT = 62 / 2;
var MAIN_PIN_LOCATION_X = 570;
var MAIN_PIN_LOCATION_Y = 375;
var MAIN_PIN_HEIGHT_ACT = 84;
var X_MIN = 0;
var X_MAX = 1200;
var Y_MIN = 130;
var Y_MAX = 630;
var PRICE_MIN = 0;
var PRICE_MAX = 1000000;
var ROOM_MIN = 1;
var ROOM_MAX = 100;
var FEATURES_MIN = 1;
var PHOTOS_MIN = 1;
var GUESTS_MIN = 1;
var GUESTS_MAX = 3;
var ENTER_BTN = 13;
var ESC_BTN = 27;
var PINS_COUNT = 5;

var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapPinsContainer = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var mapForm = map.querySelector('.map__filters');
var mapFormElements = mapForm.querySelectorAll('fieldset, selest');
var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('fieldset');
var adFormAddress = adForm.querySelector('#address');
var addressInput = adForm.querySelector('input[name="address"]');
var roomNumber = adForm.querySelector('#room_number');
var roomCapacity = adForm.querySelector('#capacity');
var accomodationPrice = adForm.querySelector('#price');
var accomodationType = adForm.querySelector('#type');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

var getRandomElement = function (arr) {
  var rand = arr[Math.floor(Math.random() * arr.length)];
  return rand;
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (arr, length) {
  var randomArray = arr.slice().sort(getRandomElement);
  return randomArray.slice(0, length);
};

var generateAds = function (adsCount) {
  var ads = [];
  for (var i = 0; i < adsCount; i++) {
    var locationX = getRandomInRange(X_MIN, X_MAX);
    var locationY = getRandomInRange(Y_MIN, Y_MAX);
    ads.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': 'Заголовок ' + (i + 1),
        'address': locationX + ', ' + locationY,
        'price': getRandomInRange(PRICE_MIN, PRICE_MAX),
        'type': getRandomElement(ADS_TYPE),
        'rooms': getRandomInRange(ROOM_MIN, ROOM_MAX),
        'guests': getRandomInRange(GUESTS_MIN, GUESTS_MAX),
        'checkin': getRandomElement(ADS_TIME),
        'checkout': getRandomElement(ADS_TIME),
        'features': getRandomArray(FEATURES, getRandomInRange(FEATURES_MIN, FEATURES.length)),
        'description': 'Описание ' + (i + 1),
        'photos': getRandomArray(PHOTOS, getRandomInRange(PHOTOS_MIN, PHOTOS.length))
      },
      'location': {
        'x': locationX,
        'y': locationY,
      },
    });
    ads[i].id = i;
  }
  return ads;
};

var createMapPin = function (ad) {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = mapPin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style.left = ad.location.x - PIN_WIDTH + 'px';
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';

  pinElement.setAttribute('data-ID', ad.id);

  pinImg.setAttribute('src', ad.author.avatar);
  pinImg.setAttribute('alt', ad.offer.title);

  return pinElement;
};

var renderAdCardPhotos = function (ad, adCardElement) {
  var photoList = adCardElement.querySelector('.popup__photos');
  var photoCard = photoList.querySelector('.popup__photo').cloneNode(true);
  photoList.innerHTML = '';

  for (var i = 0; i < ad.offer.photos.length; i++) {
    var photoElement = photoCard.cloneNode(true);
    photoElement.src = ad.offer.photos[i];
    photoList.appendChild(photoElement);
  }
};

var renderAdCardFeatures = function (ad, adCardElement) {
  var featuresList = adCardElement.querySelector('.popup__features');
  var features = featuresList.querySelectorAll('.popup__feature');

  for (var i = 0; i < features.length; i++) {
    if (ad.offer.features[i]) {
      features[i].textContent = ad.offer.features[i];
    } else {
      featuresList.removeChild(features[i]);
    }
  }
};

var renderAdCardType = function (ad, adCardElement) {
  var adCardType = adCardElement.querySelector('.popup__type');
  adCardType.textContent = OFFER_TYPES[ad.offer.type];
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

var createAdCard = function (ad) {
  var adCard = document.querySelector('#card').content.querySelector('.map__card');
  var adCardElement = adCard.cloneNode(true);

  adCardElement.querySelector('.popup__title').textContent = ad.offer.title;
  adCardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adCardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
  adCardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  adCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  adCardElement.querySelector('.popup__description').textContent = ad.offer.description;
  adCardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  renderAdCardType(ad, adCardElement);
  renderAdCardPhotos(ad, adCardElement);
  renderAdCardFeatures(ad, adCardElement);

  return adCardElement;
};

var renderAdCard = function (ad) {
  var adCardElement = createAdCard(ad);
  map.insertBefore(adCardElement, mapFiltersContainer);

  closeCard();
  hideEmptyAdCardBlocks(adCardElement);

  document.addEventListener('click', onPopupCloseBtnPress);
  document.addEventListener('keydown', onPopupEscPress);
};

var ads = generateAds(ADS_COUNT);

var renderMapPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PINS_COUNT; i++) {
    fragment.appendChild(createMapPin(ads[i]));
  }

  mapPinsContainer.appendChild(fragment);
};


var setDisabledAttribute = function (formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', true);
  }
};

var setMainPinPosition = function (width, height) {
  var mainPinX = Math.floor(MAIN_PIN_LOCATION_X - width) + 'px';
  var mainPinY = Math.floor(MAIN_PIN_LOCATION_Y - height) + 'px';
  var mainPinPosition = mainPinX + ', ' + mainPinY;
  mainPin.style.left = mainPinX;
  mainPin.style.top = mainPinY;
  addressInput.value = mainPinPosition;
};

var deactivatePage = function () {
  setDisabledAttribute(adFormElements);
  setDisabledAttribute(mapFormElements);
  setMainPinPosition(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
};

deactivatePage();

var removeDisabledAttribute = function (formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled', true);
  }
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormAddress.setAttribute('readonly', true);
  var mapPin = map.querySelector('.map__pin:not(.map__pin--main)');

  removeDisabledAttribute(adFormElements);
  removeDisabledAttribute(mapFormElements);

  if (!mapPin) {
    renderMapPins(PINS_COUNT);
  } return;
};

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BTN) {
    activatePage();
    setMainPinPosition(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_ACT);
  }
});

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activatePage();
    setMainPinPosition(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_ACT);
  }
});

mapPinsContainer.addEventListener('click', function (evt) {
  var mapPin = evt.target.closest('.map__pin:not(.map__pin--main)');
  if (!mapPin) {
    return;
  }
  var mapPinID = Number(mapPin.dataset.id);

  var targetAd = ads.find(function (ad) {
    return ad.id === mapPinID;
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

var validateRoomCapacity = function () {
  var roomNumberValue = Number(roomNumber.value);
  var roomCapacityValue = Number(roomCapacity.value);

  if (roomNumberValue === 100 && roomCapacityValue !== 0 || roomNumberValue !== 100 && roomCapacityValue === 0) {
    roomCapacity.setCustomValidity('Не для гостей');
    return;
  }

  if (roomCapacityValue > roomNumberValue) {
    roomCapacity.setCustomValidity('Количество гостей не должно превышать ' + roomNumberValue);
  } else {
    roomCapacity.setCustomValidity('');
  }
};

adForm.addEventListener('change', function (evt) {
  if (!evt.target.closest('#capacity') && !evt.target.closest('#room_number')) {
    return;
  }
  validateRoomCapacity();
});

var addTypeChangeHandler = function (evt) {
  var minPrice = ACCOMODATION_TYPES[evt.target.value].minPrice;

  setMinPrice(minPrice);
};

var setMinPrice = function (minPrice) {
  accomodationPrice.min = minPrice;
  accomodationPrice.placeholder = minPrice;
};

accomodationType.addEventListener('change', addTypeChangeHandler);

var setChangeTime = function (first, second) {
  first.addEventListener('change', function () {
    second.selectedIndex = first.selectedIndex;
  });
};

setChangeTime(timeIn, timeOut);
setChangeTime(timeOut, timeIn);
