'use strict';

(function () {
    var FILE_TYPES = ['gif', 'jpg', 'jprg', 'png'];

    var choosePicture = function (fileInput, preview) {
        var file = fileInput.files[0];
        if (file) {
            var fileName = file.name.toLowerCase();
            var matches = FILE_TYPES.some(function (it) {
                return fileName.endsWith(it);
            })
            if (matches) {
                var reader = new FileReader();

                reader.addEventListener('load', function () {
                    var result = reader.result;

                 // chooseHandler(result);
                    preview.src = result;
                })
                reader.readAsDataURL(file);
            } else {
                return 0;
            }
        }
    }


    window.choosePicture = choosePicture;

})()