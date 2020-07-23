'use strict';

(function () {

  var ANY_VALUE = 'any';

  var price = {
    low: 10000,
    high: 50000,
  };

  var mapForm = window.map.form;
  var housingType = mapForm.querySelector('#housing-type');
  var housingPrice = mapForm.querySelector('#housing-price');
  var housingRooms = mapForm.querySelector('#housing-rooms');
  var housingGuests = mapForm.querySelector('#housing-guests');
  var housingFeatures = mapForm.querySelector('#housing-features');

  var getType = function (ad) {
    return housingType.value === ANY_VALUE ? true : housingType.value === ad.offer.type;
  };

  var getPrice = function (ad) {
    var checkedPrice = true;
    if (housingPrice.value !== ANY_VALUE) {
      switch (housingPrice.value) {
        case 'low':
          checkedPrice = ad.offer.price < price.low;
          break;
        case 'middle':
          checkedPrice = ad.offer.price >= price.low && ad.offer.price <= price.high;
          break;
        case 'high':
          checkedPrice = ad.offer.price > price.high;
          break;
      }
    } return checkedPrice;
  };

  var getRooms = function (ad) {
    return housingRooms.value === ANY_VALUE ? true : Number(housingRooms.value) === Number(ad.offer.rooms);
  };

  var getGuests = function (ad) {
    return housingGuests.value === ANY_VALUE ? true : Number(housingGuests.value) === Number(ad.offer.guests);
  };

  var getFeatures = function (ad) {
    var checkedFeatures = Array.from(housingFeatures.querySelectorAll('input:checked'));

    return checkedFeatures.every(function (feature) {
      return ad.offer.features.indexOf(feature.value) !== -1;
    });
  };

  var updateOffers = function () {
    window.map.removeCard();
    window.pin.remove();
    var filteredOffers = [];
    for (var i = 0; i < window.offers.length; i++) {
      var ad = window.offers[i];
      if (getType(ad) && getPrice(ad) && getRooms(ad) && getGuests(ad) && getFeatures(ad)) {
        filteredOffers.push(ad);
        if (filteredOffers.length >= window.main.MAX_PINS_COUNT) {
          break;
        }
      }
    }
    window.pin.render(filteredOffers);
  };

  var onFilterChange = window.debounce(updateOffers);

  mapForm.addEventListener('change', onFilterChange);

})();
