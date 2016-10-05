(function(){
    'use strict';

    angular
        .module('app.common')
        .filter('isEmpty', isEmpty);

    // @ngInject
    function isEmpty(){
        return function(input){
            if(!input){
                return true;
            }
            else if(input.hasOwnProperty('length')){
                return input.length === 0 ? true : false;
            }
            else {
                for(let a in input){
                    if(input.hasOwnProperty(a)){
                        return false;
                    }
                }
                return true;
            }
        }
    }

})();