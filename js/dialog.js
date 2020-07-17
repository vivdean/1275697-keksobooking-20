'use strict';

(function () {
  var ESC_BTN = 27;
  var MAX_PINS_COUNT = 5;

  var mainContainer = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var onLoadSuccess = function (data) {
    data.forEach(function (offerItem, index) {
      offerItem.id = (index + 1);
    });
    window.offers = data;
    window.pin.render(window.offers.slice(0, MAX_PINS_COUNT));
    window.util.removeDisabledAttribute(window.map.formElements);
  };

  var onUploadSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    mainContainer.appendChild(successElement);

    document.addEventListener('keydown', onSuccessEscPress);
    successElement.addEventListener('click', onSuccessCloseClick);
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === ESC_BTN) {
      evt.preventDefault();
      removeSuccessElement();
    }
  };

  var onSuccessCloseClick = function (evt) {
    if (!evt.target.classList.contains('success__message')) {
      removeSuccessElement();
    }
  };

  var removeSuccessElement = function () {
    var successElement = document.querySelector('.success');
    successElement.remove();
    window.main.deactivatePage();
    document.removeEventListener('keydown', onSuccessEscPress);
    successElement.removeEventListener('click', onSuccessCloseClick);
  };

  var onError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorBtn = errorElement.querySelector('.error__button');
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = message;
    mainContainer.appendChild(errorElement);
    errorBtn.addEventListener('click', onErrorCloseBtnPress);
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('mousedown', onErrorCloseClick);
  };

  var removeErrorElement = function () {
    var errorElement = document.querySelector('.error');
    var errorBtn = errorElement.querySelector('.error__button');
    errorElement.remove();
    window.main.deactivatePage();
    errorBtn.removeEventListener('click', onErrorCloseBtnPress);
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('mousedown', onErrorCloseClick);
  };

  var onErrorCloseBtnPress = function (evt) {
    if (evt.target.classList.contains('error__button')) {
      removeErrorElement();
    }
  };

  var onErrorCloseClick = function (evt) {
    if (!evt.target.classList.contains('error__message')) {
      removeErrorElement();
    }
  };


  var onErrorEscPress = function (evt) {
    if (evt.keyCode === ESC_BTN) {
      removeErrorElement();
    }
  };

  window.dialog = {
    onLoadSuccess: onLoadSuccess,
    onError: onError,
    onUploadSuccess: onUploadSuccess,
    MAX_PINS_COUNT: MAX_PINS_COUNT,
  };
})();
