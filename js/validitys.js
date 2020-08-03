'use strict';
(function () {
var MAX_TITLE_LENGTH = 100;
var MIN_TITLE_LENGTH = 30;

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
        titleInput.setCustomValidity('Заголовок должен содержать максимум ' + titleInput.minLength + ' символов, сейчас ' + titleInput.value.length)
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

window.verifyCapacity = capacityVeriry;
window.verifyTitle = titleVerify;
window.clearTitleValidity = clearTitleValidity;
window.checkinCheckoutSync = checkinCheckoutSync;
window.setTitleLimits = setTitleLimits;
})()