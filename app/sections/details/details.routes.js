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
                templateUrl: 'sections/details/details.html',
                controller: 'detailsController',
                controllerAs: 'details',
                data: {
                    css: ['common.css', 'details.css'],
                    title: 'Details'
                }
            });


        for(let a=2; a<=5; a++){
            $stateProvider.state('details.' + a, {
                url: '/details/' + a,
                template: `<div>A different view (${a})</div>`,
                controller: 'detailsController',
                controllerAs: 'details',
                data: {
                    css: ['common.css', 'details.css'],
                    title: 'Details'
                }
            });
        }
    }

})();