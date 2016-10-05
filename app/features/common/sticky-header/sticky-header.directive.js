'use strict';

(function(){

    angular
        .module('app.common')
        .directive('stickyHeader', stickyHeader);

    const template = `<app-header ng-show="stickyHeader.showStickyHeader"></app-header>`;

    function stickyHeader($document){
        return {
            restrict: 'E',
            template: template,
            controller: stickyHeaderController,
            controllerAs: 'stickyHeader',
            bindToController: true,
            scope: {
                threshold: '='
            },
            link: link
        };

        function link(scope, el, attrs, vm){
            const windowEl = angular.element(window);
            windowEl.on('wheel', scope.$apply.bind(scope, vm.toggleOnScroll))
        }
    }

    // @ngInject
    function stickyHeaderController($document){
        const vm = this;
        vm.toggleOnScroll = toggleOnScroll;
        vm.showStickyHeader = false;

        activate();

        ////////////

        function activate(){

        }

        function toggleOnScroll(){
            vm.showStickyHeader = $document.scrollTop() >= vm.threshold;
        }
    }

})();