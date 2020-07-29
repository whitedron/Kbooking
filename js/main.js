'use strict';
var ADS_COUNT = 8;
var ads = [];
var HOME_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATYRES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;
var MAX_PHOTO_COUNT = 8;
var MAX_PHOTO_NUM = 280;
var MAX_ROOM_COUNT = 8;
var MAX_GUEST_COUNT = 10;
var VALID_COORDINATE_LEFT = 25;
var VALID_COORDINATE_RIGHT = 1175;
var VALID_COORDINATE_TOP = 180;
var VALID_COORDINATE_BOTTOM = 700;

////////////////// функция  возврата целого числа в заданном диапазоне
var getRandomInteger = function (min, max) {
    var randomvalue = min + Math.random() * (max + 1 - min);
    return Math.floor(randomvalue);
};

var startNum = getRandomInteger(0, ADS_COUNT - 1);


////////////// Функция генерации данных объявления
var generateAd = function (numAvatar) {
    if (numAvatar < 10) {
        var avatar = 'img/avatars/user0' + numAvatar + '.png';
    } else {
        var avatar = 'img/avatars/user' + numAvatar + '.png';
    }

    var features = [];
    for (var i = 0; i < FEATYRES_LIST.length; i++) {
        if (getRandomInteger(0, 1)) {
            features.push(FEATYRES_LIST[i])
        }
    }

    var photos = [];
    var photoCount = getRandomInteger(0, MAX_PHOTO_COUNT);
    for (var i = 0; i < photoCount; i++) {
        photos[i] = 'img/photos/hotel_' + getRandomInteger(1, MAX_PHOTO_NUM) + '.jpg'
    }

    var address = {
        x: getRandomInteger(VALID_COORDINATE_LEFT, VALID_COORDINATE_RIGHT),
        y: getRandomInteger(VALID_COORDINATE_TOP, VALID_COORDINATE_BOTTOM)
    };

    return {
        author: {
            avatar: avatar,
        },
        offer: {
            title: 'Шикарное предложение',
            address: address.x + ', ' + address.y,
            price: getRandomInteger(1, 1000) * 10,
            type: HOME_TYPE[getRandomInteger(0, HOME_TYPE.length - 1)],
            rooms: getRandomInteger(0, MAX_ROOM_COUNT),
            guests: getRandomInteger(0, MAX_GUEST_COUNT),
            checkin: CHECK_TIME[getRandomInteger(0, CHECK_TIME.length - 1)],
            checkout: CHECK_TIME[getRandomInteger(0, CHECK_TIME.length - 1)],
            features: features,
            description: 'В квартире есть всё необходимое для комфортного отдыха и проживания: постельное бельё, полотенца, удобные ортопедические матрасы, бухло, бытовая техника, посуда, wi-fi, кабельное телевидение. 7 спальных мест(2+1+1+1+1). Сдаётся туристам, командированным, студентам-заочникам на период сессии, на часы, сутки.',
            photos: photos
        },
        location: {
            x: address.x,
            y: address.y
        }

    }
}

var pinTemplate = document.querySelector('#pin').content;
var fragment = document.createDocumentFragment();

var renderPin = function (ad) {
    var newPin = pinTemplate.cloneNode(true);
    newPin.querySelector('.map__pin').style = 'left: ' + (ad.location.x + PIN_OFFSET_X + 0) + 'px; top: ' + (ad.location.y + PIN_OFFSET_Y + 0) + 'px';
    newPin.querySelector('img').src = ad.author.avatar;
    newPin.querySelector('img').alt = ad.offer.title;
    return newPin;
}

///////////////////// Функция создания и вывода содержимого объявления
var renderAdCard = function (ad) {
    var homeTypeMap = new Map([
        ['flat', 'Квартира'],
        ['bungalo', 'Бунгало'],
        ['house', 'Дом'],
        ['palace', 'Дворец']
    ]);

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
  ////// добавление объявление в DOM
    document.querySelector('.map').insertBefore(adCard, document.querySelector('.map__filters-container'));
}

for (var i = 0; i < ADS_COUNT; i++) {
    ads[i] = generateAd(((i + startNum) % ADS_COUNT) + 1);
    console.log(ads[i]);
    fragment.appendChild(renderPin(ads[i]));

};
document.querySelector('.map__pins').appendChild(fragment);

renderAdCard(ads[0]);
document.querySelector('.map').classList.remove('map--faded');

