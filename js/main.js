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

var getRandomInteger = function (min, max) {
    var randomvalue = min + Math.random() * (max + 1 - min);
    return Math.floor(randomvalue);
};

var startNum = getRandomInteger(0, ADS_COUNT - 1);

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
      x:getRandomInteger(VALID_COORDINATE_LEFT, VALID_COORDINATE_RIGHT),
      y:getRandomInteger(VALID_COORDINATE_TOP, VALID_COORDINATE_BOTTOM)  
    } ;

    return {
        author: {
            avatar: avatar,
        },
        offer: {
            title: 'Шикарное предложение',
            address: address.x + ', ' + address.y,
            price: getRandomInteger(1, 1000) * 10,
            type: HOME_TYPE[getRandomInteger(0, HOME_TYPE.length - 1)],
            rooms: getRandomInteger(1, MAX_ROOM_COUNT),
            guests: getRandomInteger(1, MAX_GUEST_COUNT),
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

var renderPoint = function (ad) {
    var node = document.createElement('div');
  
    node.style = 'z-index:100; margin: 0 auto; text-align: center; background-color: red';
    node.style.position = 'absolute';
    node.style.left = ad.location.x+'px';
    node.style.width = '1px';
    node.style.height= '25px';
    node.style.top=ad.location.y+'px';
    node.style.fontSize = '0px';
    node.style.boxSizing='border-box';
  
    return node;
}
var renderAdCard = function (ad) {
    var cardTemplate = document.querySelector('#card').content;
    var adCard = cardTemplate.cloneNode(true);
    adCard.querySelector('.popup__title').textContent = ad.offer.title;
    adCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    adCard.querySelector('.popup__text--price').textContent = ad.offer.price + '\u20bd/ночь';

    switch (ad.offer.type) {
        case 'flat':
            adCard.querySelector('.popup__type').textContent = 'Квартира';
            break;
        case 'bungalo':
            adCard.querySelector('.popup__type').textContent = 'Бунгало';
            break;
        case 'house':
            adCard.querySelector('.popup__type').textContent = 'Дом';
            break;
        case 'palace':
            adCard.querySelector('.popup__type').textContent = 'Дворец';
            break;
        default: adCard.querySelector('.popup__type').classList.add('hidden');
            break;
    }
    adCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    adCard.querySelector('.popup__description').textContent = ad.offer.description;
    adCard.querySelector('.popup__avatar').src = ad.author.avatar;

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
    document.querySelector('.map').insertBefore(adCard, document.querySelector('.map__filters-container'));
}

for (var i = 0; i < ADS_COUNT; i++) {
    ads[i] = generateAd(((i + startNum) % ADS_COUNT) + 1);
    console.log(ads[i]);
    fragment.appendChild(renderPin(ads[i]));
  //  fragment.appendChild(renderPoint(ads[i]));
};
document.querySelector('.map__pins').appendChild(fragment);

//renderAdCard(ads[0]);
document.querySelector('.map').classList.remove('map--faded');

