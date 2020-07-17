'use strict';

(function () {

  window.offers = [];

  var ENTER_BTN = 13;

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
      window.backend.loadData(window.dialog.onLoadSuccess, window.dialog.onError);
      window.map.activate();
      window.form.activate();
      reserBtn.addEventListener('click', deactivatePage);
    }
  };

  var deactivatePage = function () {
    isActive = false;
    window.form.deactivate();
    window.map.deactivate();
  };

  deactivatePage();

  window.main = {
    deactivatePage: deactivatePage,
  };
})();
