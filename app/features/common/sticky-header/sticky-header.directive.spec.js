'use strict';

describe('Sticky Header', function(){

    let $element;
    let $scope;
    let vm;
    let $document;
    let $window;

    const mockAuth = {
        logout: function(){}
    };
    const threshold = 60;

    beforeEach(module('common.templates'));
    beforeEach(module('app.common'));

    beforeEach(module($provide => {
        $provide.factory('Auth', () => mockAuth);
    }));

    beforeEach(inject(($rootScope, $compile, _$window_, _$document_) => {
        $element = angular.element(`<sticky-header threshold="${threshold-10}"></sticky-header>`);

        $scope = $rootScope.$new();
        $compile($element)($scope);
        $scope.$digest();

        $window = _$window_;
        $document = _$document_

        vm = $element.controller('stickyHeader');
    }));

    ////////////

    it('should contain the original AppHeader directive', () => {
        expect($element.find('md-toolbar')[0].id).toBe('appHeader');
    });

    it('should not display if the user has not scrolled past the threshold', () => {
        spyOn($document, 'scrollTop').and.returnValue(threshold-30);
        expect(vm.showStickyHeader).toBeFalsy();
        window.dispatchEvent(new Event('wheel'));
        expect(vm.showStickyHeader).toBeFalsy();
    });

    it('should show up when the user has scrolled to or beyond the threshold', () => {
        spyOn($document, 'scrollTop').and.returnValue(threshold);
        expect(vm.showStickyHeader).toBeFalsy();
        window.dispatchEvent(new Event('wheel'));
        expect(vm.showStickyHeader).toBeTruthy();
    });

});