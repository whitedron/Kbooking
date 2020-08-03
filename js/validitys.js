'use strict';
(function () {
var MAX_TITLE_LENGTH = 100;
var MIN_TITLE_LENGTH = 30;

var roomNumerInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');
var startingTitleLettersCount=0;


var capacityVeriry = function(){
  if ((roomNumerInput.value<=3 && roomNumerInput.value>=capacityInput.value && capacityInput.value>0) || (roomNumerInput.value==="100" && capacityInput.value==="0")) {
     /*  if (capacityInput.classList.contains('ad-form__element--invalid')) {
          capacityInput.classList.remove('ad-form__element--invalid');
      }  */
      capacityInput.setCustomValidity('');
  } else {
   /*  if (!capacityInput.classList.contains('ad-form__element--invalid')) {
        capacityInput.classList.add('ad-form__element--invalid')
    }  */
 
    capacityInput.setCustomValidity('Несоответствие числе комнат и гостей');
    capacityInput.checkValidity();
    capacityInput.reportValidity();
  }
}

var titleInput = document.querySelector('#title');
var clearTitleValidity = function(){
    titleInput.setCustomValidity('');
   /*  if (titleInput.classList.contains('ad-form__element--invalid')) {
        titleInput.classList.remove('ad-form__element--invalid')
    }   */
}

var titleVerify = function(){
    clearTitleValidity();
/*     if (titleInput.value.length > MAX_TITLE_LENGTH) {
        titleInput.setCustomValidity('Слишком длинный заголовок (не больше 100 символов)');
        titleInput.reportValidity();
        if (!titleInput.classList.contains('ad-form__element--invalid')) {
            titleInput.classList.add('ad-form__element--invalid')
        } 
    };
    if (titleInput.value.length < MIN_TITLE_LENGTH && startingTitleLettersCount>=MIN_TITLE_LENGTH) {
        titleInput.setCustomValidity('Слишком короткий заголовок (не менее 30 символов)');
        titleInput.reportValidity();
        if (!titleInput.classList.contains('ad-form__element--invalid')) {
            titleInput.classList.add('ad-form__element--invalid')
        } 
    }
 */
    titleInput.checkValidity();
    if (titleInput.validity.tooLong || titleInput.value.length > titleInput.maxLength) {
        titleInput.setCustomValidity('Заголовок должен содержать максимум ' + titleInput.maxLength + ' символов, сейчас ' + titleInput.value.length)
    }
    if (titleInput.validity.tooShort || titleInput.value.length < titleInput.minLength) {
        titleInput.setCustomValidity('Заголовок должен содержать максимум ' + titleInput.minLength + ' символов, сейчас ' + titleInput.value.length)
    }
    titleInput.reportValidity();
    startingTitleLettersCount=titleInput.value.length;
}



window.verifyCapacity = capacityVeriry;
window.verifyTitle = titleVerify;
window.clearTitleValidity = clearTitleValidity;
})()