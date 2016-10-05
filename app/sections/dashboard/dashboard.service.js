'use strict';

(function(){

    angular
        .module('seed.dashboard')
        .factory('dashboardService', dashboardService);

    // @ngInject
    function dashboardService(){
        const service = {};

        return service;
    }
})();