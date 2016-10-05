(function(){
    'use strict';

    angular
        .module('app.common')
        .directive('keyboardShortcuts', keyboardShortcuts);

    // @ngInject
    function keyboardShortcuts($document, $rootScope){
        return {
            restrict: 'A',
            link
        }

        function link(scope, el, attrs){
            $document.bind('keypress', event => {
                $rootScope.$broadcast('keyboardShortcut', event);
                scope.$digest();
            });
        }
    }

})();