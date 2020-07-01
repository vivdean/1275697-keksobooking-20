'use strict';

window.data = (function () {

  var FEATURES = [' wifi', ' dishwasher', ' parking', ' washer', ' elevator', ' conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ADS_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var ADS_TIME = ['12:00', '13:00', '14:00'];
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

  var generateAds = function (count) {
    var ads = [];
    for (var i = 0; i < count; i++) {
      var locationX = getRandomInRange(X_MIN, X_MAX);
      var locationY = getRandomInRange(Y_MIN, Y_MAX);
      ads.push({
        'id': (i + 1),
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
    }
    return ads;
  };

  return {
    generateAds: generateAds,
  };
})();
