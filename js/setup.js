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
      /*   console.log(mainPin.offsetLeft + MAIN_PIN_OFFSET_X);
        console.log(mainPin.offsetTop + MAIN_PIN_OFFSET_Y); */
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

    var onTitleInputKeyPress = function(){
        window.verifyTitle();
    };

    mainPin.addEventListener('mousedown', onMainPinMouseDown);
    mainPin.addEventListener('keydown', onMainPinKeyDown);



    var roomNumerInput = document.querySelector('#room_number');
    var capacityInput = document.querySelector('#capacity');
    var titleInput = document.querySelector('#title');
    var checkinTimeInput = document.querySelector('#timein');
    var checkoutTimeInput = document.querySelector('#timeout');
    var priceInput = document.querySelector('#price');
    var typeInput = document.querySelector('#type');

    roomNumerInput.addEventListener('change',window.verifyCapacity);
    capacityInput.addEventListener('change',window.verifyCapacity);

    titleInput.addEventListener('input',onTitleInputKeyPress);

    checkinTimeInput.addEventListener('change', function(){
        window.checkinCheckoutSync(checkinTimeInput, checkoutTimeInput) 
    });
    checkoutTimeInput.addEventListener('change', function(){
        window.checkinCheckoutSync(checkoutTimeInput, checkinTimeInput) 
    });

    typeInput.addEventListener('change',window.changeType);

    /* priceInput.addEventListener('keydown',function(evt){
        console.log(evt.key);
        //this.value=this.value.replace(/[^0-9]/g,'');
    }) */

    priceInput.addEventListener('input',window.priceVerify);

    titleInput.minLength = 0;
    titleInput.required = false;
    priceInput.required = false;
})()