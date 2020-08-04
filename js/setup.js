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

  

    var onTitleInputKeyPress = function(){
        window.verifyTitle();
    };


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

    priceInput.addEventListener('input',window.priceVerify);

    titleInput.minLength = 0;
    titleInput.required = false;
    priceInput.required = false;
})()