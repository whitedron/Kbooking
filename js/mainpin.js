'use strict';
(function () {
    var MAIN_PIN_OFFSET_X = 32;
    var MAIN_PIN_OFFSET_Y = 83;

    var mainPin = document.querySelector('.map__pin--main');
    var newAdForm = document.querySelector('.ad-form');
    var newAdFormFieldsets = newAdForm.querySelectorAll('fieldset');
    
    var getMainPinAddress = function () {
          newAdForm.querySelector('#address').value = (mainPin.offsetLeft + MAIN_PIN_OFFSET_X) + ', ' + (mainPin.offsetTop + MAIN_PIN_OFFSET_Y);
      }

    var activateBooking = function () {

        document.querySelector('.map').classList.remove('map--faded');
        document.querySelector('.ad-form').classList.remove('ad-form--disabled');
        newAdFormFieldsets.forEach(function (item) {
            item.disabled = false;
        })
        mainPin.removeEventListener('keydown', onMainPinKeyDown);
        mainPin.removeEventListener('mousedown', onMainPinMouseDown);

        getMainPinAddress();
        window.renderPins();
    }


    var onMainPinMouseDown = function (evt) {
        if (!evt.button) {
            activateBooking();
        }
    }

    var onMainPinKeyDown = function (evt) {
        if (evt.key === ENTER_KEY) {
            activateBooking();
        }
    }

    mainPin.addEventListener('mousedown', onMainPinMouseDown);
    mainPin.addEventListener('keydown', onMainPinKeyDown);

})()