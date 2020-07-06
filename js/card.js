'use strict';

(function () {
  var adCard = document.querySelector('#card').content.querySelector('.map__card');

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

  var renderAdCardType = function (ad, adCardElement) {
    var adCardType = adCardElement.querySelector('.popup__type');
    adCardType.textContent = ACCOMODATION_TYPES[ad.offer.type].title;
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

  var createAdCard = function (ad) {
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

  window.card = {
    create: createAdCard,
    ACCOMODATION_TYPES: ACCOMODATION_TYPES,
  };
})();
