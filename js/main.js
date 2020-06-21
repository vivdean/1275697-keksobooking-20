'use strict';

var FEATURES = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADS_TIME = ['12:00', '13:00', '14:00'];
/* var OFFER_TYPES = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};*/
var ADS_COUNT = 8;
var PIN_WIDTH = 50;
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

var map = document.querySelector('.map');
// var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapPinsContainer = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var mapForm = map.querySelector('.map__filters');
var mapFormChildrenCollection = mapForm.children;
var adForm = document.querySelector('.ad-form');
var adFormChildrenCollection = adForm.children;
var adFormAddress = adForm.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var roomCapacity = adForm.querySelector('#capacity');

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
      }
    });
  }
  return ads;
};

var createMapPin = function (ad) {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = mapPin.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';

  pinImg.setAttribute('src', ad.author.avatar);
  pinImg.setAttribute('alt', ad.offer.title);

  return pinElement;
};

/* var renderAdCardPhotos = function (ad, adCardElement) {
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
  var adCardChildCollection = adCardElement.children;
  for (var i = 0; i < adCardChildCollection.length; i++) {
    if (adCardChildCollection[i].innerHTML === '') {
      adCardElement.removeChild(adCardChildCollection[i]);
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

  hideEmptyAdCardBlocks(adCardElement);
};*/

var ads = generateAds(ADS_COUNT);

var renderMapPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createMapPin(ads[i]));
  }

  mapPinsContainer.appendChild(fragment);
};

/* var renderAds = function (ads) {
  renderMapPins(ads);
  renderAdCard(ads[0]);
};

renderAds(ads);*/

var setDisabledAttribute = function (childrenCollection) {
  for (var i = 0; i < childrenCollection.length; i++) {
    childrenCollection[i].setAttribute('disabled', true);
  }
};

var setMapPinMainPosition = function (mapPinMainWidth, mapPinMainHeight) {
  var mapPinMainLocationX = Math.floor(MAIN_PIN_LOCATION_X - mapPinMainWidth) + 'px';
  mapPinMain.style.left = mapPinMainLocationX;
  var mapPinMainLocationY = Math.floor(MAIN_PIN_LOCATION_Y - mapPinMainHeight) + 'px';
  mapPinMain.style.top = mapPinMainLocationY;
  var mapPinMainPosition = mapPinMainLocationX + ', ' + mapPinMainLocationY;
  adForm.querySelector('input[name="address"]').value = mapPinMainPosition;
};

var deactivatePage = function () {
  setDisabledAttribute(adFormChildrenCollection);
  setDisabledAttribute(mapFormChildrenCollection);
  setMapPinMainPosition(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
};

deactivatePage();

var removeDisabledAttribute = function (childrenCollection) {
  for (var i = 0; i < childrenCollection.length; i++) {
    childrenCollection[i].removeAttribute('disabled', true);
  }
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormAddress.setAttribute('readonly', true);

  renderMapPins(ads);
  removeDisabledAttribute(adFormChildrenCollection);
  removeDisabledAttribute(mapFormChildrenCollection);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activatePage();
    setMapPinMainPosition(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_ACT);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_BTN) {
    activatePage();
    setMapPinMainPosition(MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT_ACT);
  }
});

var validateRoomCapacity = function () {
  var roomNumberValue = roomNumber.value;
  var roomCapacityValue = roomCapacity.value;
  switch (roomNumberValue) {
    case '1':
      if (roomCapacityValue !== '1') {
        roomCapacity.setCustomValidity('Только для 1го гостя');
      } else {
        roomCapacity.setCustomValidity('');
      }
      break;
    case '2':
      if (roomCapacityValue !== '1' && roomCapacityValue !== '2') {
        roomCapacity.setCustomValidity('Только для 1го или 2х гостей');
      } else {
        roomCapacity.setCustomValidity('');
      }
      break;
    case '3':
      if (roomCapacityValue === '0') {
        roomCapacity.setCustomValidity('Только для 1го, 2х или 3х гостей');
      } else {
        roomCapacity.setCustomValidity('');
      }
      break;
    case '100':
      if (roomCapacityValue !== '0') {
        roomCapacity.setCustomValidity('Не для гостей');
      } else {
        roomCapacity.setCustomValidity('');
      }
      break;
  }
};

adForm.addEventListener('change', function (evt) {
  if (!evt.target.closest('#capacity') && !evt.target.closest('#room_number')) {
    return;
  }
  validateRoomCapacity();
});
