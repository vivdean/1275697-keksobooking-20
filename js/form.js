'use strict';

window.form = (function () {

  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var roomCapacity = adForm.querySelector('#capacity');
  var accomodationPrice = adForm.querySelector('#price');
  var accomodationType = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

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
    var minPrice = window.card.ACCOMODATION_TYPES[evt.target.value].minPrice;

    setMinPrice(minPrice);
  };

  var setMinPrice = function (minPrice) {
    accomodationPrice.min = minPrice;
    accomodationPrice.placeholder = minPrice;
  };

  accomodationType.addEventListener('change', addTypeChangeHandler);

  var setChangeTime = function (first, second) {
    first.addEventListener('change', function () {
      second.value = first.value;
    });
  };

  setChangeTime(timeIn, timeOut);
  setChangeTime(timeOut, timeIn);

  return {
    adForm: adForm,
    adFormAddress: adFormAddress,
    adFormElements: adFormElements,
  };
})();
