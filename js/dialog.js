'use strict';

(function () {
  var ESC_BTN = 27;

  var mainContainer = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    mainContainer.appendChild(successElement);

    document.addEventListener('keydown', onSuccessEscPress);
    successElement.addEventListener('click', onSuccessCloseClick);
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === ESC_BTN) {
      evt.preventDefault();
      removeSuccessDialog();
    }
  };

  var onSuccessCloseClick = function (evt) {
    if (!evt.target.classList.contains('success__message')) {
      removeSuccessDialog();
    }
  };

  var removeSuccessDialog = function () {
    var successElement = document.querySelector('.success');
    successElement.remove();
    window.main.deactivatePage();
    document.removeEventListener('keydown', onSuccessEscPress);
    successElement.removeEventListener('click', onSuccessCloseClick);
  };

  var showError = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorBtn = errorElement.querySelector('.error__button');
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = message;
    mainContainer.appendChild(errorElement);
    errorBtn.addEventListener('click', onErrorCloseBtnPress);
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('mousedown', onErrorCloseClick);
  };

  var removeErrorDialog = function () {
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
      removeErrorDialog();
    }
  };

  var onErrorCloseClick = function (evt) {
    if (!evt.target.classList.contains('error__message')) {
      removeErrorDialog();
    }
  };


  var onErrorEscPress = function (evt) {
    if (evt.keyCode === ESC_BTN) {
      removeErrorDialog();
    }
  };

  window.dialog = {
    showError: showError,
    showSuccess: showSuccess,
  };
})();
