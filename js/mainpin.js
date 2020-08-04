'use strict';
(function () {
    var MAIN_PIN_OFFSET_X = 32;
    var MAIN_PIN_OFFSET_Y = 83;
    var VALID_COORDINATE_LEFT = 25;
    var VALID_COORDINATE_RIGHT = 1175;
    var VALID_COORDINATE_TOP = 180;
    var VALID_COORDINATE_BOTTOM = 700;

    var ENTER_KEY = 'Enter';

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

        getMainPinAddress();
        window.pins.render();
    }

    var deactivateBooking = function () {

        document.querySelector('.map').classList.add('map--faded');
        document.querySelector('.ad-form').classList.add('ad-form--disabled');
        newAdFormFieldsets.forEach(function (item) {
            item.disabled = true;
        })
        mainPin.addEventListener('keydown', onMainPinKeyDown);

        mainPin.style = 'left: 570px; top: 375px;';
        //window.renderPins();
    }


    var onMainPinMouseDown = function (evt) {
        if (!evt.button) {
            if(document.querySelector('.map').classList.contains('map--faded')) {
                activateBooking();
            }
            var startCoords = {
                x:evt.clientX,
                y:evt.clientY
            }

            var onMouseMove = function (moveEvt) {
                moveEvt.preventDefault();

                var shiftX = startCoords.x - moveEvt.clientX;
                var shiftY = startCoords.y - moveEvt.clientY;

                startCoords.x = moveEvt.clientX;
                startCoords.y = moveEvt.clientY;

                var pinCoords = {
                    x : mainPin.offsetLeft - shiftX,
                    y : mainPin.offsetTop - shiftY
                }

                if (pinCoords.x+MAIN_PIN_OFFSET_X<VALID_COORDINATE_LEFT) {
                    pinCoords.x=VALID_COORDINATE_LEFT-MAIN_PIN_OFFSET_X
                };
                if (pinCoords.x+MAIN_PIN_OFFSET_X>VALID_COORDINATE_RIGHT) {
                    pinCoords.x=VALID_COORDINATE_RIGHT-MAIN_PIN_OFFSET_X
                };
                if (pinCoords.y+MAIN_PIN_OFFSET_Y<VALID_COORDINATE_TOP) {
                    pinCoords.y=VALID_COORDINATE_TOP-MAIN_PIN_OFFSET_Y
                };
                if (pinCoords.y+MAIN_PIN_OFFSET_Y>VALID_COORDINATE_BOTTOM) {
                    pinCoords.y=VALID_COORDINATE_BOTTOM-MAIN_PIN_OFFSET_Y
                };
                
                mainPin.style.left = pinCoords.x + 'px';
                mainPin.style.top = pinCoords.y + 'px';

                newAdForm.querySelector('#title').value = (pinCoords.x) + ', ' + (pinCoords.y);
                getMainPinAddress();
            };
            var onMouseUp = function (upEvt) {
                upEvt.preventDefault();
                upEvt.stopPropagation();
               
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

        };   
    }

    var onMainPinKeyDown = function (evt) {
        if (evt.key === ENTER_KEY) {
            activateBooking();
        }
    }

    mainPin.addEventListener('mousedown', onMainPinMouseDown);
    mainPin.addEventListener('keydown', onMainPinKeyDown);


    window.mainPin = {
        getAddress: getMainPinAddress
    }

    window.booking = {
        activate : activateBooking,
        deactivate : deactivateBooking
    }

})()