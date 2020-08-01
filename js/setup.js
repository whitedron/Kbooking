'use strict';
(function () {
    var ENTER_KEY = 'Enter';
    var MAIN_PIN_OFFSET_X = 32;
    var MAIN_PIN_OFFSET_Y = 83;

    ////// перевод страницы в неактивный режим
    var newAdForm = document.querySelector('.ad-form');
    var newAdFormFieldsets = newAdForm.querySelectorAll('fieldset');
    var mainPin = document.querySelector('.map__pin--main');

    newAdFormFieldsets.forEach(function (item) {
        item.disabled = true;
    })

    var getMainPinAddress = function () {
        console.log(mainPin.offsetLeft + MAIN_PIN_OFFSET_X);
        console.log(mainPin.offsetTop + MAIN_PIN_OFFSET_Y);
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
        console.log(mainPin.clientHeight);

        console.log(mainPin.clientWidth);

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