'use strict';
(function () {
    var filterForm = document.querySelector('.map__filters');
    var typeFilter = filterForm.querySelector('#housing-type');
    var roomsFilter = filterForm.querySelector('#housing-rooms');
    var guestsFilter = filterForm.querySelector('#housing-guests');
    var priceFilter = filterForm.querySelector('#housing-price');
    var featuresFilter = filterForm.querySelectorAll('.map__checkbox');

var filterData = function(){
    var filteredData = window.ads.filter(function (item) {

        var priceFlag;
        switch (priceFilter.value) {
            case 'any':
                priceFlag = true;
                break;
            case 'low':
                priceFlag = item.offer.price < 10000;
                break;
            case 'high':
                priceFlag = item.offer.price > 50000;
                break;
            case 'middle':
                priceFlag = (item.offer.price <= 50000) && (item.offer.price >= 10000);
                break;
        }

        var typeFlag = typeFilter.value === 'any' ? true : item.offer.type == typeFilter.value;
        var roomsFlag = roomsFilter.value === 'any' ? true : item.offer.rooms == roomsFilter.value;
        var guestsFlag = guestsFilter.value === 'any' ? true : item.offer.guests == guestsFilter.value;

        var featuresFlag = true;
        featuresFilter.forEach(function (feature) {
            if (feature.checked) {
                if (item.offer.features.includes(feature.value)) {
                    featuresFlag = featuresFlag && true
                } else {
                    featuresFlag = false
                }
            }
        })

        return typeFlag && roomsFlag && guestsFlag && priceFlag && featuresFlag
    })
    window.pins.remove();
    window.pins.render(filteredData);
}


    var onFilterChange = window.debounce(filterData);

    filterForm.addEventListener('change', onFilterChange);

    window.filterData = filterData;

})()