'use strict';

(function(){

    angular
        .module('app.common')
        .directive('appHeader', appHeader);

    const templateUrl = [
        'features',
        'common',
        'appHeader',
        'appHeader.html'
    ].join('/');

    function appHeader(){
        return {
            restrict: 'E',
            templateUrl: templateUrl,
            controller: appHeaderCtrl,
            controllerAs: 'appHeader',
            bindToController: true,
            replace: true
        };
    }

    function appHeaderCtrl($templateCache){
        const vm = this;

        activate();

        ////////////

        function activate(){

        }
    }
})();