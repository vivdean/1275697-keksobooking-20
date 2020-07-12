'use strict';

(function () {
  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  var MAX_PINS_COUNT = 5;

  var pinParameters = {
    halfWidth: 50 / 2,
    height: 70,
  };

  var mainPinParameters = {
    halfWidth: 62 / 2,
    height: 84,
  };

  var bounds = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var createMapPin = function (ad) {
    var pinElement = mapPin.cloneNode(true);
    var pinImg = pinElement.querySelector('img');

    pinElement.style.left = ad.location.x - pinParameters.halfWidth + 'px';
    pinElement.style.top = ad.location.y - pinParameters.height + 'px';

    pinElement.dataset.id = ad.id;

    pinImg.setAttribute('src', ad.author.avatar);
    pinImg.setAttribute('alt', ad.offer.title);

    return pinElement;
  };

  var renderMapPins = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_PINS_COUNT; i++) {
      arr[i].id = (i + 1);
      fragment.appendChild(createMapPin(arr[i]));
    }
    window.map.mapPinsContainer.appendChild(fragment);
  };

  var setMainPinPosition = function (width, height) {
    var mainPinX = Math.floor(mainPin.offsetLeft + width);
    var mainPinY = Math.floor(mainPin.offsetTop + height);

    var mainPinPosition = mainPinX + ', ' + mainPinY;
    window.form.setAddress(mainPinPosition);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinCoordsX = mainPin.offsetLeft - shift.x;
      var mainPinCoordsY = mainPin.offsetTop - shift.y;
      var mainPinX = mainPinCoordsX + mainPinParameters.halfWidth;
      var mainPinY = mainPinCoordsY + mainPinParameters.height;
      var mainPinPosition = mainPinX + ', ' + mainPinY;

      if (mainPinX >= bounds.x.min &&
        mainPinX <= bounds.x.max &&
        mainPinY >= bounds.y.min &&
        mainPinY <= bounds.y.max) {

        mainPin.style.left = mainPinCoordsX + 'px';
        mainPin.style.top = mainPinCoordsY + 'px';
        window.form.setAddress(mainPinPosition);
      } return;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    render: renderMapPins,
    mainElement: mainPin,
    setMainElementPosition: setMainPinPosition,
  };
})();
