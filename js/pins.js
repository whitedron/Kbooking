'use strict';
(function () {
    var PIN_OFFSET_X = -25;
    var PIN_OFFSET_Y = -70;

    var onMapClick = function (evt) {

        //// ищем ближайшую родительскую кнопку - верхний элемент пина
        var clickedNode = evt.target.closest('button');
        /////  если кнопка не найдена или кнопка не принадлежит карте, то выходим
        if (!clickedNode || !document.querySelector('.map__pins').contains(clickedNode)) return;
        /// если нажата левая кнопка мыши и кнопка - пин и кнопка не главный пин
        if (!evt.button && clickedNode.classList.contains('map__pin') && !clickedNode.classList.contains('map__pin--main')) {

            var clickedPinNum = clickedNode.dataset.index;
            alert('clicked pin # ' + clickedPinNum);
        }
    }


    var renderPin = function (ad, index) {
        var pinTemplate = document.querySelector('#pin').content;
        var newPin = pinTemplate.cloneNode(true);
        newPin.querySelector('.map__pin').style = 'left: ' + (ad.location.x + PIN_OFFSET_X + 0) + 'px; top: ' + (ad.location.y + PIN_OFFSET_Y + 0) + 'px';
        newPin.querySelector('img').src = ad.author.avatar;
        newPin.querySelector('img').alt = ad.offer.title;
        newPin.querySelector('button').dataset.index = index;
        return newPin;
    }

    var pinsNodeList = [];
    var renderPins = function () {
        var newNodePin;
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < window.ads.length; i++) {
            newNodePin = renderPin(window.ads[i], i);
            pinsNodeList[i] = newNodePin;
            fragment.appendChild(newNodePin);

        };
        document.querySelector('.map__pins').appendChild(fragment);
        document.querySelector('.map__pins').addEventListener('mousedown', onMapClick)
        window.pinsList = pinsNodeList;
    }

    window.renderPins = renderPins;

    //document.querySelector('.map').classList.remove('map--faded');
    //renderAdCard(window.ads[0]);
})()