'use strict';

(function(){

    angular
        .module('seed.dashboard')
        .config(seedDashboardRoutes);

    // @ngInject
    function seedDashboardRoutes($stateProvider, $urlRouterProvider){
        $stateProvider
            .state({
                name: 'dashboard',
                url: '/dashboard',
                templateUrl: 'sections/dashboard/dashboard.html',
                controller: 'dashboardController',
                controllerAs: 'dashboard',
                data: {
                    css: ['common.css','dashboard.css'],
                    title: 'Dashboard'
                }
            });
    }

})();