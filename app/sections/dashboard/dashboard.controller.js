'use strict';

(function(){

    angular
        .module('seed.dashboard')
        .controller('dashboardController', dashboardController);

    // @ngInject
    function dashboardController(){
        const vm = this;
        vm.test = 2;
        vm.list = [];

        activate();

        ////////////

        function activate(){
            for(let a=0; a<20; a++){
                vm.list.push(`box${a}`);
            }
        }
    }
})();