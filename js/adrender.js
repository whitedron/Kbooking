'use strict';
(function(){

var FEATYRES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ESC_KEY = 'Escape';

var removeAdPopup = function(){
    document.querySelector('.popup').remove();
}

var onCloseAdCardClick = function(){
    removeAdPopup();
}

var onAdEscPress = function(evt){
 if (evt.key === ESC_KEY && document.querySelector('.map').querySelector('.popup')) {
    removeAdPopup();
 }
}

///////////////////// Функция создания и вывода содержимого объявления
var renderAdCard = function (ad) {
    var homeTypeMap = new Map([
        ['flat', 'Квартира'],
        ['bungalo', 'Бунгало'],
        ['house', 'Дом'],
        ['palace', 'Дворец']
    ]);

    ///////// если открыто объявление, то закрываем его
    if (document.querySelector('.map').querySelector('.popup')) {
        removeAdPopup();
     }



    /////////////// функция простой проверки и вывода данных
    var RenderAdData = function (node, data) {
        if (data) {
            node.textContent = data
        } else {
            node.classList.add('hidden')
        }
    }

    var cardTemplate = document.querySelector('#card').content;
    var adCard = cardTemplate.cloneNode(true);

    RenderAdData(adCard.querySelector('.popup__title'), ad.offer.title);
    RenderAdData(adCard.querySelector('.popup__text--address'), ad.offer.address);
    RenderAdData(adCard.querySelector('.popup__description'), ad.offer.description);

//////// Проверка цены
    if (ad.offer.price) {
        adCard.querySelector('.popup__text--price').textContent = ad.offer.price + '\u20bd/ночь'
    } else {
        adCard.querySelector('.popup__text--price').classList.add('hidden');
    }


////////// Проверка типа жилища
    if (homeTypeMap.get(ad.offer.type)) {
        adCard.querySelector('.popup__type').textContent = homeTypeMap.get(ad.offer.type)
    } else {
        adCard.querySelector('.popup__type').classList.add('hidden')
    }
/////////// Проверка и вывод числа комнат и гостей
    var textContent = '';
    if (ad.offer.rooms) {
        textContent = ad.offer.rooms + ' комнаты ';
    }
    if (ad.offer.guests) {
        if (textContent) {
            textContent += 'для ' + ad.offer.guests + ' гостей'
        } else {
            textContent = 'Для ' + ad.offer.guests + ' гостей'
        }
    }
    if (textContent) {
        adCard.querySelector('.popup__text--capacity').textContent = textContent
    } else {
        adCard.querySelector('.popup__text--capacity').classList.add('hidden')
    }
//////////// Проверка и вывод времени заезда и выезда
    textContent = '';
    if (ad.offer.checkin) {
        textContent = 'Заезд после ' + ad.offer.checkin;
        if (ad.offer.checkout) {
            textContent += ', выезд до ' + ad.offer.checkout
        }
    } else {
        if (ad.offer.checkout) {
            textContent += 'Выезд до ' + ad.offer.checkout
        }
    }
    if (textContent) {
        adCard.querySelector('.popup__text--time').textContent = textContent
    } else {
        adCard.querySelector('.popup__text--time').classList.add('hidden')
    }
/////////// Проверка и вывод аватара пользователя
    if (ad.author.avatar) {
        adCard.querySelector('.popup__avatar').src = ad.author.avatar
    } else {
        adCard.querySelector('.popup__avatar').classList.add('hidden');
    }

////////// Проверка и вывод достоинств жилища
    for (var i = 0; i < FEATYRES_LIST.length; i++) {
        if (!ad.offer.features.includes(FEATYRES_LIST[i])) {
            adCard.querySelector('.popup__feature--' + FEATYRES_LIST[i]).remove();
        }
    };

    var photoTemplate = adCard.querySelector('.popup__photo');
    var photoList = adCard.querySelector('.popup__photos');
    while (photoList.firstChild) {
        photoList.removeChild(photoList.firstChild);
    };
    for (var i = 0; i < ad.offer.photos.length; i++) {
        var newPhoto = photoTemplate.cloneNode(true);
        newPhoto.src = ad.offer.photos[i];
        photoList.appendChild(newPhoto);
    }

 adCard.querySelector('.popup__close').addEventListener('click',onCloseAdCardClick);
 document.addEventListener('keydown', onAdEscPress);

  ////// добавление объявление в DOM
    document.querySelector('.map').insertBefore(adCard, document.querySelector('.map__filters-container'));
}

window.renderAdCard = renderAdCard;
//renderAdCard(window.ads[0]);
})()