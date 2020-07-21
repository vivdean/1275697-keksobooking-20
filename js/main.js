'use strict';

(function () {

  window.offers = [];

  var ENTER_BTN = 13;
  var MAX_PINS_COUNT = 5;

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
      window.backend.loadData(onLoadSuccess, window.dialog.showError);
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

  var onLoadSuccess = function (data) {
    data.forEach(function (offerItem, index) {
      offerItem.id = (index + 1);
    });
    window.offers = data;
    window.pin.render(window.offers.slice(0, MAX_PINS_COUNT));
    window.util.removeDisabledAttribute(window.map.formElements);
  };

  deactivatePage();

  window.main = {
    deactivatePage: deactivatePage,
    MAX_PINS_COUNT: MAX_PINS_COUNT,
  };
})();
