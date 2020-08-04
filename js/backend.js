'use strict';

(function()  {

var URL_LOAD='https://javascript.pages.academy/keksobooking/data';
var URL_SAVE='https://javascript.pages.academy/keksobooking';
var XHR_TIMEOUT=10000;

    var load = function (onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('GET', URL_LOAD);
        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            } else {
                onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            };
        });
        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения!')
        });
        xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс')
        });
        xhr.timeout = XHR_TIMEOUT;

        xhr.send();
    };

var save = function (data, onLoad, onError){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            onLoad(xhr.response);
        } else {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        };
    });
    xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения!')
    });
    xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс')
    });
    xhr.timeout = XHR_TIMEOUT;

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
}

var showRequestStatus = function (Message, color, timeout) {
    var node = document.createElement('div');
    var hideErrorMessage = function () {
        var errorMessage = document.getElementsByClassName('XHRStatus');
        while (errorMessage[0]) {
            errorMessage[0].remove();
        }
    }
    node.style = 'z-index:100; margin: 0 auto; text-align: center; background-color: '+color;
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.classList.add('XHRStatus')

    node.textContent = Message;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(hideErrorMessage, timeout);

};


window.backend = {
    load: load,
    save: save,
    show:showRequestStatus
}

})()