'use strict';

describe('AppHeader Directive', () => {

    let element;
    let scope;
    let vm;

    beforeEach(module('app.common'));

    beforeEach(inject(($rootScope, $compile) => {
        element = angular.element('<app-header></app-header>');

        scope = $rootScope.$new();
        $compile(element)(scope);
        scope.$digest();

        vm = element.controller('appHeader');
    }));

    it('should have the name of the application in the header', () => {
        expect(element.find('h1').text()).toBeDefined();
    });
});