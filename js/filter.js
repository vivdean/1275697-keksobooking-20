'use strict';

(function () {

  var ANY_VALUE = 'any';

  var mapForm = window.map.form;
  var housingType = document.querySelector('#housing-type');

  var getType = function (ad) {
    return housingType.value === ANY_VALUE ? true : housingType.value === ad.offer.type;
  };

  mapForm.addEventListener('change', function () {
    window.map.removeCard();
    window.pin.remove();
    var filteredOffers = window.offers.filter(function (ad) {
      return getType(ad);
    });
    window.pin.render(filteredOffers.slice(0, window.dialog.MAX_PINS_COUNT));
  });
})();
