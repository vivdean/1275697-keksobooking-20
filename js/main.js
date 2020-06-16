'use strict';

var FEATURES = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADS_TIME = ['12:00', '13:00', '14:00'];
var ADS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
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

document.querySelector('.map').classList.remove('map--faded');

var getRandomElement = function (arr) {
  var rand = arr[Math.floor(Math.random() * arr.length)];
  return rand;
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (arr, length) {
  var randomArrey = arr.slice();
  randomArrey.sort(getRandomElement);
  return randomArrey.slice(0, length);
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

var getAdCardPhotos = function (ad, adCardElement) {
  for (var i = 0; i < ad.offer.photos.length; i++) {
    var photoList = adCardElement.querySelector('.popup__photos');
    var photoCard = photoList.querySelector('.popup__photo');
    var photoElement = photoCard.cloneNode(true);
    photoList.appendChild(photoElement);
    photoElement.src = ad.offer.photos[i];
    var photo = photoList.querySelectorAll('.popup__photo');
    photo[i].src = ad.offer.photos[i];
  }
};

var getAdCardFeatures = function (ad, adCardElement) {
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

var getAdCardType = function (ad, adCardElement) {
  var adCardType = adCardElement.querySelector('.popup__type');
  adCardType.textContent = ad.offer.type;

  switch (ad.offer.type) {
    case 'flat':
      adCardType.textContent = 'Квартира';
      break;
    case 'bungalo':
      adCardType.textContent = 'Бунгало';
      break;
    case 'house':
      adCardType.textContent = 'Дом';
      break;
    case 'palace':
      adCardType.textContent = 'Дворец';
      break;
  }
};

var hideEmptyAdCardBlocks = function (adCardElement) {
  var AdCardChildCollection = adCardElement.children;
  for (var i = 0; i < AdCardChildCollection.length; i++) {
    if (AdCardChildCollection[i].textContent === '') {
      adCardElement.removeChild(AdCardChildCollection[i]);
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
  getAdCardType(ad, adCardElement);
  getAdCardPhotos(ad, adCardElement);
  getAdCardFeatures(ad, adCardElement);

  return adCardElement;
};

var renderAdCard = function () {
  var ads = generateAds(ADS_COUNT);
  var adCardElement = createAdCard(ads[0]);
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  map.insertBefore(createAdCard(ads[0]), filtersContainer);

  hideEmptyAdCardBlocks(adCardElement);
};

var renderMapPin = function () {
  var ads = generateAds(ADS_COUNT);
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createMapPin(ads[i]));
  }

  mapPins.appendChild(fragment);
};

var renderAds = function () {
  renderMapPin();
  renderAdCard();
};

renderAds();

