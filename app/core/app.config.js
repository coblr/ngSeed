'use strict';

(function(){
    angular
        .module('ngSeed')
        .config(appConfig);

    // @ngInject
    function appConfig($httpProvider, $mdThemingProvider){
        // $httpProvider.interceptors.push('authInterceptor');
        // $httpProvider.responseInterceptors.push('errorInterceptor');

        $mdThemingProvider.theme('default')
            .primaryPalette('blue');
    }
})();