'use strict';

(function(){

    angular
        .module('seed.details')
        .config(seedDetailsRoutes);

    // @ngInject
    function seedDetailsRoutes($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('details', {
                url: '/details',
                templateUrl: './app/sections/details/details.html',
                controller: 'detailsController',
                controllerAs: 'details',
                data: {
                    css: ['common.css', 'details.css'],
                    title: 'Details'
                }
            });
    }

})();