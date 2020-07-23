'use strict';

(function () {
  var MAX_ROOMS = 100;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var imgAttributes = {
    width: '45',
    height: '40',
    alt: 'Фотография',
  };

  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var roomCapacity = adForm.querySelector('#capacity');
  var accomodationPrice = adForm.querySelector('#price');
  var accomodationType = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var avatarChooser = document.querySelector('.ad-form__field  input[type=file]');
  var photoChooser = document.querySelector('.ad-form__upload  input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoPreviewContainer = document.querySelector('.ad-form__photo');
  var avararDefaultSrc = avatarPreview.src;

  var deactivateForm = function () {
    adForm.reset();
    adForm.classList.add('ad-form--disabled');
    window.util.setDisabledAttribute(fieldsets);
    deletePreviews();
  };

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.removeDisabledAttribute(fieldsets);
    addressField.setAttribute('readonly', true);
    uploadFile(avatarChooser, avatarPreview);
    uploadFile(photoChooser, photoPreviewContainer);
  };

  var createPreviewImg = function () {
    photoPreviewContainer.innerHTML = '';
    var previewImg = document.createElement('img');
    previewImg.width = imgAttributes.width;
    previewImg.height = imgAttributes.height;
    previewImg.alt = imgAttributes.alt;
    photoPreviewContainer.appendChild(previewImg);
    return previewImg;
  };

  var uploadFile = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (preview.tagName !== 'IMG') {
            preview = createPreviewImg();
          }
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var deletePreviews = function () {
    avatarPreview.src = avararDefaultSrc;
    photoPreviewContainer.innerHTML = '';
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
    window.backend.uploadData(
        new FormData(adForm),
        window.dialog.showSuccess,
        window.dialog.showError);
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
    element: adForm,
    addressField: addressField,
  };
})();
