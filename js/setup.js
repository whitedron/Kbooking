'use strict';
(function () {
    var ENTER_KEY = 'Enter';
    var MAIN_PIN_OFFSET_X = 32;
    var MAIN_PIN_OFFSET_Y = 83;

    ////// перевод страницы в неактивный режим
    var newAdForm = document.querySelector('.ad-form');
    var newAdFormFieldsets = newAdForm.querySelectorAll('fieldset');
    var mainPin = document.querySelector('.map__pin--main');
    var roomNumerInput = document.querySelector('#room_number');
    var capacityInput = document.querySelector('#capacity');
    var titleInput = document.querySelector('#title');
    var checkinTimeInput = document.querySelector('#timein');
    var checkoutTimeInput = document.querySelector('#timeout');
    var priceInput = document.querySelector('#price');
    var typeInput = document.querySelector('#type');
    var submitButton = newAdForm.querySelector('.ad-form__submit');
    var resetFormButton = newAdForm.querySelector('.ad-form__reset');

  /*   newAdFormFieldsets.forEach(function (item) {
        item.disabled = true;
    })
    titleInput.minLength = 0;
    titleInput.required = false;
    priceInput.required = false; */
    window.form.disable();
  

    var onTitleInputKeyPress = function(){
        window.verifyTitle();
    };

    var onLoad=function(loadedAds){
        window.ads = loadedAds;
    }

    var onLoadError=function(errorMessage){
        window.generateAds();
        window.backend.show(errorMessage, 'red', 5000);
    }

    var onSave = function(){
        window.booking.deactivate();
        window.pins.remove();
        window.form.reset();
    }
    var onSaveError = function(errorMessage){
        window.backend.show(errorMessage, 'red', 5000);
    }

    var onSubmitClick = function(evt){
        evt.preventDefault();
        window.verifyCapacity();
        window.priceVerify();
        window.setTitleLimits();
        window.verifyTitle();

        if (typeInput.checkValidity() && capacityInput.checkValidity() && priceInput.checkValidity()){

        var uploadFormData = new FormData(newAdForm);
        window.backend.save(uploadFormData, onSave, onSaveError)
        }

    }

    var onResetClick = function(evt){
        evt.preventDefault();
        window.form.reset();
    }

    window.backend.load(onLoad, onLoadError); 

    submitButton.addEventListener('click', onSubmitClick);
    resetFormButton.addEventListener('click', onResetClick)
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


})()