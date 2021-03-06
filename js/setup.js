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
    var avatarInput = newAdForm.querySelector('#avatar');
    var avatarImg=newAdForm.querySelector('.ad-form-header__preview img');
    var imagesInput = newAdForm.querySelector('#images');
    var imagesContainer = newAdForm.querySelector('.ad-form__photo');


    window.form.deactivate();
  

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
        window.form.deactivate();
        window.pins.remove();
        window.form.reset();
        window.message('success');
    }
    var onSaveError = function(errorMessage){
        window.backend.show(errorMessage, 'red', 5000);
        window.message('error');
    }

    var onSubmitClick = function(evt){
        evt.preventDefault();
        window.verifyCapacity();
        window.priceVerify();
        window.setTitleLimits();
        window.verifyTitle();

        if (titleInput.checkValidity() && capacityInput.checkValidity() && priceInput.checkValidity()){

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

    var onAvatarChange=function(){
        window.choosePicture(avatarInput, avatarImg)
    }
    avatarInput.addEventListener('change', onAvatarChange);

    var onImageChange=function(){
        imagesContainer.innerHTML='';
        var imgNode = avatarImg.cloneNode(true);
        window.choosePicture(imagesInput, imgNode);
        imgNode.style.margin = '15px';
        imagesContainer.insertBefore(imgNode, null);
    }
    imagesInput.addEventListener('change', onImageChange);

})()