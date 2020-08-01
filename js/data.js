'use strict';
( function(){
    var ADS_COUNT = 8;
    var ads = [];
    var HOME_TYPE = ['palace', 'flat', 'house', 'bungalo'];
    var CHECK_TIME = ['12:00', '13:00', '14:00'];
    var FEATYRES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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


for (var i = 0; i < ADS_COUNT; i++) {
    ads[i] = generateAd(((i + startNum) % ADS_COUNT) + 1);
   // console.log(ads[i]);
   
};

window.ads = ads;
})()