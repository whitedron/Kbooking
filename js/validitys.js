'use strict';
(function () {
var MAX_TITLE_LENGTH = 100;
var MIN_TITLE_LENGTH = 30;
var homeTypeMap = new Map([
    ['flat', 'Квартира'],
    ['bungalo', 'Бунгало'],
    ['house', 'Дом'],
    ['palace', 'Дворец']
]);


var roomNumerInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');

////////////////// проверка соответствия числа гостей и числа комнат
var capacityVeriry = function(){
  if ((roomNumerInput.value<=3 && roomNumerInput.value>=capacityInput.value && capacityInput.value>0) || (roomNumerInput.value==="100" && capacityInput.value==="0")) {
      capacityInput.setCustomValidity('');
  } else {
    capacityInput.setCustomValidity('Несоответствие числе комнат и гостей');
    capacityInput.checkValidity();
    capacityInput.reportValidity();
  }
}
//////////////////////////// функция очистки ошибки
var titleInput = document.querySelector('#title');
var clearTitleValidity = function(){
    titleInput.setCustomValidity('');
}
///////////////////////////////// Проверка заголовка на допустимую длину
var titleVerify = function(){
    clearTitleValidity();
    setTitleLimits();
  //  titleInput.checkValidity();
    if (titleInput.validity.tooLong || titleInput.value.length > titleInput.maxLength) {
        titleInput.setCustomValidity('Заголовок должен содержать максимум ' + titleInput.maxLength + ' символов, сейчас ' + titleInput.value.length)
    }
    if (titleInput.validity.tooShort || titleInput.value.length < titleInput.minLength) {
        titleInput.setCustomValidity('Заголовок должен содержать минимум ' + titleInput.minLength + ' символов, сейчас ' + titleInput.value.length)
    }
    titleInput.reportValidity();
}

////////////////////////////////// синхронизация полей времени
var checkinCheckoutSync = function(first, second){
    second.value = first.value;
}

///////////////////////////////// установка минимальной длины заголовка
var setTitleLimits = function(){
    titleInput.minLength = MIN_TITLE_LENGTH;
    titleInput.required = true;
}
var priceInput = document.querySelector('#price');
var typeInput = document.querySelector('#type');
///////////////////////////////// установки минимальной цены от типа квартиры
var changeType = function(){
    priceInput.required= true;
    switch(typeInput.value){
        case 'bungalo': 
        priceInput.min = 0;
        priceInput.placeholder = 0;
        break;
        case 'flat': 
        priceInput.min = 1000;
        priceInput.placeholder = 1000;
        break;
        case 'house': 
        priceInput.min = 5000;
        priceInput.placeholder = 5000;
        break;
        case 'palace': 
        priceInput.min = 10000;
        priceInput.placeholder = 10000;
        break;
    }
   // priceInput.reportValidity();
   priceVerify();
}

//////////////////////// проверки допустимой цены
var priceVerify = function(){
    priceInput.setCustomValidity('');
    if (priceInput.validity.rangeOverflow) {
        priceInput.setCustomValidity('Цена за ночь не более '+ priceInput.max);
    };
    if (priceInput.validity.rangeUnderflow) {
        priceInput.setCustomValidity('Цена за ночь для жилья типа ' + homeTypeMap.get(typeInput.value) + ' не менее '+ priceInput.min);
    };
    if (priceInput.validity.valueMissing) {
        priceInput.setCustomValidity('Введено не натуральное число');
    };
    if (priceInput.validity.badInput) {
        priceInput.setCustomValidity('Введено не натуральное число');
    };
    priceInput.reportValidity();
}



window.verifyCapacity = capacityVeriry;
window.verifyTitle = titleVerify;
window.clearTitleValidity = clearTitleValidity;
window.checkinCheckoutSync = checkinCheckoutSync;
window.setTitleLimits = setTitleLimits;
window.changeType = changeType;
window.priceVerify = priceVerify;
})()