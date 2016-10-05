'use strict';

(function(){

    angular
        .module('ngSeed')
        .config(ngSeedConfig);

    // @ngInject
    function ngSeedConfig($urlRouterProvider){
        $urlRouterProvider.otherwise('/dashboard');
    }

})();