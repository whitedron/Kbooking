'use strict';

(function () {
    var ESC_KEY = 'Escape';

    var showMessage = function (type) {
        var template = document.querySelector('#' + type).content.querySelector('div');
        var popup = template.cloneNode(true);
        var main = document.querySelector('main');
        

        var closePopup = function () {

           // popup.parentNode.removeChild(popup);
            popup.remove();
            if (type==='error') {
                var popupButton = popup.querySelector('button');
                popupButton.removeEventListener('click', closePopup);
               };
            document.removeEventListener('click', onFieldClick);
            document.removeEventListener('keydown', onKeyDown);
        }
        var onKeyDown = function (evt) {
            if (evt.key === ESC_KEY) {
                closePopup();
            }
        }


        var onFieldClick = function(evt) {
          //  if (evt.target===popup)
            closePopup();
        }

        main.appendChild(popup);
         if (type==='error') {
         var popupButton = popup.querySelector('button');
         popupButton.addEventListener('click', closePopup);
        } 
        document.addEventListener('click', onFieldClick);
        document.addEventListener('keydown', onKeyDown);

    };

    window.message = showMessage;

})()