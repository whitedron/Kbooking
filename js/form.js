'use strict';
(function(){
    var newAdForm = document.querySelector('.ad-form');
    var roomNumerInput = document.querySelector('#room_number');
    var capacityInput = document.querySelector('#capacity');
    var titleInput = document.querySelector('#title');
    var priceInput = document.querySelector('#price');
    var typeInput = document.querySelector('#type');
    var newAdFormFieldsets = newAdForm.querySelectorAll('fieldset');

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
    }

    var disableForm = function(){
        newAdFormFieldsets.forEach(function (item) {
            item.disabled = true;
        })
        titleInput.minLength = 0;
        titleInput.required = false;
        priceInput.required = false;
    }

    window.form = {
        reset: clearForm,
        disable: disableForm
    }
})()