'use strict';

(function () {

  window.offers = [];

  var ENTER_BTN = 13;
  var ESC_BTN = 27;

  var mainContainer = document.querySelector('main');

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
      window.map.activate();
      window.form.activate();
    }
  };

  var deactivatePage = function () {
    isActive = false;
    window.map.deactivate();
    window.form.deactivate();
  };

  var onSuccess = function (data) {
    window.offers = data;
    window.pin.render(window.offers);
  };

  var onError = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorBtn = errorElement.querySelector('.error__button');
    errorMessage.textContent = message;

    errorBtn.addEventListener('click', function () {
      errorElement.remove();
      window.backend.load(onSuccess, onError);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_BTN) {
        errorElement.remove();
      }
    });

    mainContainer.appendChild(errorElement);
  };

  deactivatePage();

  window.main = {
    onSuccess: onSuccess,
    onError: onError
  };
})();
