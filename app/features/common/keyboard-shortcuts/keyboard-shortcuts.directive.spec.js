describe('KeyboardShortcuts Directive', function(){
    'use strict';

    let $element;
    let $scope;
    let vm;
    let $document;
    let $rootScope;

    const mockKeyboardEvent = {
        type: 'keypress',
        bubbles: true,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
        which: 106
    }

    beforeEach(module('app.common'));

    beforeEach(inject(function(_$rootScope_, $compile, _$document_){
        $element = angular.element('<div keyboard-shortcuts></div>');
        $rootScope = _$rootScope_;
        $document = _$document_;

        $scope = $rootScope.$new();
        $compile($element)($scope);
        $scope.$digest();

        spyOn($rootScope, '$broadcast');
    }));

    ////////////

    it('should broadcast when a key is pressed', function(){
        $scope.$on('keyboardShortcut', (event, data) => {
            expect(data.which).toBe(106);
        });

        $document.trigger(mockKeyboardEvent);
        expect($rootScope.$broadcast).toHaveBeenCalled();
    });

});