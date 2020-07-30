'use strict';
(function(){
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;




////////////// Функция генерации данных объявления


var pinTemplate = document.querySelector('#pin').content;
var fragment = document.createDocumentFragment();

var renderPin = function (ad) {
    var newPin = pinTemplate.cloneNode(true);
    newPin.querySelector('.map__pin').style = 'left: ' + (ad.location.x + PIN_OFFSET_X + 0) + 'px; top: ' + (ad.location.y + PIN_OFFSET_Y + 0) + 'px';
    newPin.querySelector('img').src = ad.author.avatar;
    newPin.querySelector('img').alt = ad.offer.title;
    return newPin;
}



for (var i = 0; i < window.ads.length; i++) {
    fragment.appendChild(renderPin(window.ads[i]));
};
document.querySelector('.map__pins').appendChild(fragment);


document.querySelector('.map').classList.remove('map--faded');
//renderAdCard(window.ads[0]);
})()