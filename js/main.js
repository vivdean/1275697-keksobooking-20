'use strict';

(function () {
  var ENTER_BTN = 13;

  var isActive = false;

  window.pin.mainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_BTN) {
      activatePage();
    }
  });

  window.pin.mainElement.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
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

  deactivatePage();

  window.main = {
    deactivatePage: deactivatePage,
    activatePage: activatePage,
  };
})();
