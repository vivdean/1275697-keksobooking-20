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

    if (ad.offer.photos.length !== 0) {
      var photoCard = photoList.querySelector('.popup__photo').cloneNode(true);
      photoList.innerHTML = '';

      ad.offer.photos.forEach(function (photo) {
        var photoElement = photoCard.cloneNode(true);
        photoElement.src = photo;
        photoList.appendChild(photoElement);
      });
    } else {
      photoList.style.display = 'none';
    }
  };

  var renderAdCardFeatures = function (ad, adCardElement) {
    var featuresList = adCardElement.querySelector('.popup__features');

    if (ad.offer.features.length !== 0) {
      featuresList.innerHTML = '';

      ad.offer.features. forEach(function (feature) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature');
        featureElement.classList.add('popup__feature--' + feature);
        featuresList.appendChild(featureElement);
      });
    } else {
      featuresList.style.display = 'none';
    }
  };

  var renderTextAdCardBlock = function (block, adOffer) {
    if (adOffer) {
      block.textContent = adOffer;
    } else {
      block.style.display = 'none';
    }
  };

  var renderImgAdCardBlock = function (block, adOffer) {
    if (adOffer) {
      block.src = adOffer;
    } else {
      block.style.display = 'none';
    }
  };

  var createAdCard = function (ad) {
    var adCardElement = adCard.cloneNode(true);
    var adCardPrice = adCardElement.querySelector('.popup__text--price');
    var adCardCapacity = adCardElement.querySelector('.popup__text--capacity');
    var adCardTime = adCardElement.querySelector('.popup__text--time');

    renderTextAdCardBlock(adCardElement.querySelector('.popup__title'), ad.offer.title);
    renderTextAdCardBlock(adCardElement.querySelector('.popup__text--address'), ad.offer.address);
    renderTextAdCardBlock(adCardElement.querySelector('.popup__description'), ad.offer.description);
    renderTextAdCardBlock(adCardElement.querySelector('.popup__type', ACCOMODATION_TYPES[ad.offer.type].title));
    renderImgAdCardBlock(adCardElement.querySelector('.popup__avatar'), ad.author.avatar);
    renderAdCardPhotos(ad, adCardElement);
    renderAdCardFeatures(ad, adCardElement);

    if (ad.offer.price) {
      adCardPrice.textContent = ad.offer.price + ' ₽/ночь';
    } else {
      adCardPrice.style.display = 'none';
    }

    if (ad.offer.rooms) {
      adCardCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    } else {
      adCardCapacity.style.display = 'none';
    }

    if (ad.offer.checkin && ad.offer.checkout) {
      adCardTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    } else {
      adCardTime.style.display = 'none';
    }

    return adCardElement;
  };

  window.card = {
    create: createAdCard,
    ACCOMODATION_TYPES: ACCOMODATION_TYPES,
  };
})();
