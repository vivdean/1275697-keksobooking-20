'use strict';

(function () {

  window.offers = [];

  var ENTER_BTN = 13;
  var ESC_BTN = 27;

  var mainContainer = document.querySelector('main');
  var reserBtn = document.querySelector('.ad-form__reset');

  var isActive = false;

  window.pin.mainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_BTN) {
      activatePage();
    }
  });

  window.pin.mainElement.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  });

  var activatePage = function () {
    if (!isActive) {
      isActive = true;
      window.backend.loadData(onLoadSuccess, onError);
      window.map.activate();
      window.form.activate();
      reserBtn.addEventListener('click', deactivatePage);
    }
  };

  var deactivatePage = function () {
    isActive = false;
    window.map.deactivate();
    window.form.deactivate();
    reserBtn.removeEventListener('click', deactivatePage);
  };

  var onLoadSuccess = function (data) {
    data.forEach(function (offerItem, index) {
      offerItem.id = (index + 1);
    });
    window.offers = data;
    window.pin.render(window.offers);
  };

  var onUploadSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
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
    deactivatePage();
    document.removeEventListener('keydown', onSuccessEscPress);
    successElement.removeEventListener('click', onSuccessCloseClick);
  };

  var onError = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorBtn = errorElement.querySelector('.error__button');
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = message;
    mainContainer.appendChild(errorElement);
    errorBtn.addEventListener('click', onErrorCloseBtnPress);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var removeErrorElement = function () {
    var errorElement = document.querySelector('.error');
    var errorBtn = errorElement.querySelector('.error__button');
    errorElement.remove();
    deactivatePage();
    errorBtn.removeEventListener('click', onErrorCloseBtnPress);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onErrorCloseBtnPress = function (evt) {
    if (evt.target.classList.contains('error__button')) {
      removeErrorElement();
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === ESC_BTN) {
      removeErrorElement();
    }
  };

  deactivatePage();

  window.main = {
    onLoadSuccess: onLoadSuccess,
    onError: onError,
    onUploadSuccess: onUploadSuccess,
  };
})();
