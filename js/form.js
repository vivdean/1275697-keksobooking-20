'use strict';

(function () {
  var MAX_ROOMS = 100;

  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var roomCapacity = adForm.querySelector('#capacity');
  var accomodationPrice = adForm.querySelector('#price');
  var accomodationType = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');
    window.util.setDisabledAttribute(fieldsets);
    adForm.reset();
  };

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.removeDisabledAttribute(fieldsets);
    addressField.setAttribute('readonly', true);
  };

  var setAddress = function (el) {
    addressField.value = el;
  };

  var validateRoomCapacity = function () {
    var roomNumberValue = Number(roomNumber.value);
    var roomCapacityValue = Number(roomCapacity.value);

    if (roomNumberValue === MAX_ROOMS && roomCapacityValue !== 0 || roomNumberValue !== MAX_ROOMS && roomCapacityValue === 0) {
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

  var onSubmit = function (evt) {
    evt.preventDefault();
    window.backend.uploadData(new FormData(adForm), window.dialog.onUploadSuccess, window.dialog.onError);
  };

  adForm.addEventListener('submit', onSubmit);

  var onChangeAccomodationType = function (evt) {
    var minPrice = window.card.ACCOMODATION_TYPES[evt.target.value].minPrice;
    setMinPrice(minPrice);
  };

  var setMinPrice = function (minPrice) {
    accomodationPrice.min = minPrice;
    accomodationPrice.placeholder = minPrice;
  };

  accomodationType.addEventListener('change', onChangeAccomodationType);

  var setChangeTime = function (first, second) {
    first.addEventListener('change', function () {
      second.value = first.value;
    });
  };

  setChangeTime(timeIn, timeOut);
  setChangeTime(timeOut, timeIn);

  window.form = {
    deactivate: deactivateForm,
    activate: activateForm,
    setAddress: setAddress,
    element: adForm,
    addressField: addressField,
  };
})();
