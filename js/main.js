'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ADS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ADS_TIME = ['12:00', '13:00', '14:00'];
var AVATARS_NUM = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLE_NUM = [1, 2, 3, 4, 5, 6, 7, 8];
var DESC_NUM = [1, 2, 3, 4, 5, 6, 7, 8];
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

var getRandom = function (arr) {
  var rand = arr[Math.floor(Math.random() * arr.length)];
  return rand;
};

var getRandomInRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffle = function (arr) {
  var counter = arr.length;
  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;
    var temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

var getRandomInt = function (arr, index) {
  var rand = shuffle(arr);
  while (rand.length > 0) {
    return rand.pop();
  }
  return rand[index];
};

var getRandomArray = function (arr, length) {
  var randomArrey = arr.slice();
  randomArrey.sort(getRandom);
  return randomArrey.slice(0, length);
};

var generateAds = function (adsCount) {
  var ads = [];
  for (var i = 0; i < adsCount; i++) {
    ads.push({
      'author': {
        'avatar': 'img/avatars/user0' + getRandomInt(AVATARS_NUM) + '.png',
      },
      'offer': {
        'title': 'Заголовок ' + getRandomInt(TITLE_NUM),
        'address': getRandomInRange(X_MIN, X_MAX) + ', ' + getRandomInRange(Y_MIN, Y_MAX),
        'price': getRandomInRange(PRICE_MIN, PRICE_MAX),
        'type': getRandom(ADS_TYPE),
        'rooms': getRandomInRange(ROOM_MIN, ROOM_MAX),
        'guests': getRandomInRange(GUESTS_MIN, GUESTS_MAX),
        'checkin': getRandom(ADS_TIME),
        'checkout': getRandom(ADS_TIME),
        'features': getRandomArray(FEATURES, getRandomInRange(FEATURES_MIN, FEATURES.length)),
        'description': 'Описание ' + getRandomInt(DESC_NUM),
        'photos': getRandomArray(PHOTOS, getRandomInRange(PHOTOS_MIN, PHOTOS.length))
      },
      'location': {
        'x': getRandomInRange(X_MIN, X_MAX),
        'y': getRandomInRange(Y_MIN, Y_MAX),
      }
    });
  }
  return ads;
};

var renderMapPin = function (ad) {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var pinElement = mapPin.cloneNode(true);

  pinElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = ad.location.y - PIN_HEIGHT + 'px';

  pinElement.querySelector('img').setAttribute('src', ad.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', ad.author.title);

  mapPins.appendChild(pinElement);
};

var renderAds = function () {
  var ads = generateAds(ADS_COUNT);

  for (var i = 0; i < ads.length; i++) {
    renderMapPin(ads[i]);
  }
};

renderAds();
