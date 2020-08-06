'use strict';
(function(){
    var newAdForm = document.querySelector('.ad-form');
    var roomNumerInput = document.querySelector('#room_number');
    var capacityInput = document.querySelector('#capacity');
    var titleInput = document.querySelector('#title');
    var priceInput = document.querySelector('#price');
    var typeInput = document.querySelector('#type');
    var newAdFormFieldsets = newAdForm.querySelectorAll('fieldset');
    var filterForm = document.querySelector('.map__filters');
    var filterFormItems = filterForm.querySelectorAll('select, fieldset');
    var mainPin = document.querySelector('.map__pin--main');
    var avatarImg=newAdForm.querySelector('.ad-form-header__preview img');
    var imagesContainer = newAdForm.querySelector('.ad-form__photo');

    var clearForm = function(){
        newAdForm.reset();
        window.mainPin.getAddress();
        priceInput.min = '1000';
        priceInput.placeholder = '1000';
        priceInput.required = false;
        titleInput.required = false;
        priceInput.setCustomValidity('');
        titleInput.setCustomValidity('');
        capacityInput.setCustomValidity('');
        imagesContainer.innerHTML='';
        avatarImg.src = 'img/muffin-grey.svg';
    }



    var activateBooking = function () {

        document.querySelector('.map').classList.remove('map--faded');
        document.querySelector('.ad-form').classList.remove('ad-form--disabled');
        newAdFormFieldsets.forEach(function (item) {
            item.disabled = false
        });
        filterFormItems.forEach(function(item){
            item.disabled = false
        });
        mainPin.removeEventListener('keydown', window.mainPin.keyDown);

        window.mainPin.getAddress();
        window.pins.render(window.ads);
    }

    var deactivateBooking = function () {

        document.querySelector('.map').classList.add('map--faded');
        document.querySelector('.ad-form').classList.add('ad-form--disabled');
        filterForm.reset();
        newAdFormFieldsets.forEach(function (item) {
            item.disabled = true
        })
        filterFormItems.forEach(function(item){
            item.disabled = true
        });
        mainPin.addEventListener('keydown', window.mainPin.keyDown);

        mainPin.style = 'left: 570px; top: 375px;';

        titleInput.minLength = 0;
        titleInput.required = false;
        priceInput.required = false;
        //window.renderPins();
    }



    window.form = {
        reset: clearForm,
        activate: activateBooking,
        deactivate: deactivateBooking
    }
})()