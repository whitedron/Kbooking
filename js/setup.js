'use strict';
(function(){
    
 ////// перевод страницы в неактивный режим
var newAdForm = document.querySelector('.ad-form');
var newAdFormFieldsets = newAdForm.querySelectorAll('fieldset');
newAdFormFieldsets.forEach(function(item){
 item.disabled = true;
}) 




})()