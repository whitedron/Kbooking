'use strict';

(function () {
    var DEBOUNCE_INTERVAL = 500;

    window.debounce = function (cb) {
        var lastTimeout = null;
        var func = function () {
            var parameters = arguments;
            if (lastTimeout) {
                window.clearTimeout(lastTimeout);
            }
            lastTimeout = window.setTimeout(function () {
                cb.apply(null, parameters);
            }, DEBOUNCE_INTERVAL)
        }
        return func
    }




    /*         function debounce(func, immediate) {
                let timeout;
                var executedFunction = function(){
                 console.log('r');
                  const context = this;
                  const args = arguments;
              
                  const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                  };
                  const callNow = immediate && !timeout;
                  clearTimeout(timeout);
                  timeout = setTimeout(later, DEBOUNCE_INTERVAL);
                  if (callNow) func.apply(context, args);
                };
                return executedFunction
              };
    
              window.debounce = debounce; */





    /*
      var lastTimeout;
       window.debounce = function(cb) {
        if (lastTimeout) {
            window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(cb,DEBOUNCE_INTERVAL);
    } */

})()