'use strict';
(function () {
var roomNumerInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');

var capacityVeriry = function(){
 
  if ((roomNumerInput.value<=3 && roomNumerInput.value>=capacityInput.value && capacityInput.value>0) || (roomNumerInput.value==="100" && capacityInput.value==="0")) {
      if (capacityInput.classList.contains('ad-form__element--invalid')) {
          capacityInput.classList.remove('ad-form__element--invalid');
      } 
      capacityInput.setCustomValidity('');
  } else {
    if (!capacityInput.classList.contains('ad-form__element--invalid')) {
        capacityInput.classList.add('ad-form__element--invalid')
    } 

    capacityInput.setCustomValidity('Несоответствие числе комнат и гостей');
    capacityInput.reportValidity();
  }

}


window.verifyCapacity = capacityVeriry;
})()