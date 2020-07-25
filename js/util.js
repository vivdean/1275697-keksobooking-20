'use strict';

(function () {
  var setDisabledAttribute = function (formElements) {
    formElements.forEach(function (formElement) {
      formElement.setAttribute('disabled', true);
    });
  };

  var removeDisabledAttribute = function (formElements) {
    formElements.forEach(function (formElement) {
      formElement.removeAttribute('disabled', true);
    });
  };

  window.util = {
    setDisabledAttribute: setDisabledAttribute,
    removeDisabledAttribute: removeDisabledAttribute,
  };
})();
