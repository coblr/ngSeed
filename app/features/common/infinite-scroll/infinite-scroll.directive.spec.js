describe('InfiniteScroll Directive', function(){
    'use strict';

    let $element;
    let $scope;
    let vm;
    let $document;
    let $rootScope;

    beforeEach(module('app.common'));

    beforeEach(inject(function(_$rootScope_, $compile, _$document_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $element = angular.element('<div infinite-scroll></div>');

        $compile($element)($scope);
        $scope.$digest();

        $document = _$document_;

        spyOn($rootScope, '$broadcast');

        vm = $element.controller('infiniteScroll');
    }));

    ////////////

    it('should make a broadcast when user scrolls to bottom and is scrolling DOWN', function(){
        $document.trigger({
            type: 'wheel',
            originalEvent: {
                deltaY: 1
            }
        });
        expect($rootScope.$broadcast).toHaveBeenCalledWith('infiniteScroll');
    });

    it('should NOT make a broadcast when user scrolls to bottom but is scrolling UP', function(){
        $document.trigger({
            type: 'wheel',
            originalEvent: {
                deltaY: -1
            }
        });
        expect($rootScope.$broadcast).not.toHaveBeenCalled();
    });
});