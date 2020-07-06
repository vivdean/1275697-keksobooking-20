'use strict';

(function () {
  var setDisabledAttribute = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', true);
    }
  };

  var removeDisabledAttribute = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled', true);
    }
  };

  window.util = {
    setDisabledAttribute: setDisabledAttribute,
    removeDisabledAttribute: removeDisabledAttribute,
  };
})();
