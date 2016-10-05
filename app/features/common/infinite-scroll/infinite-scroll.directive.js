(function(){
    'use strict';

    angular
        .module('app.common')
        .directive('infiniteScroll', infiniteScroll);

    // @ngInject
    function infiniteScroll($document, $rootScope){
        return {
            restrict: 'A',
            link: link
        }

        function link(scope, el, attrs){
            $document.bind('wheel', function(e){
                const scrollTop = $document.scrollTop();
                const scrollHeight = $document.find('body')[0].scrollHeight;
                const scrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight;
                const scrollingDown = e.originalEvent.deltaY > 0;

                // only consider when the user is at the bottom scrolling down.
                // this prevents actions when user is at bottom scrolling back up.
                if(scrolledToBottom && scrollingDown){
                    $rootScope.$broadcast('infiniteScroll');
                }
            });
        }
    }
})();