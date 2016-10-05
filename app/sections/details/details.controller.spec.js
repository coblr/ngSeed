'use strict';

describe('Details Controller', () => {

    let controller;
    let $scope;
    let createController;

    beforeEach(module('seed.details'));

    beforeEach(inject(($controller, $rootScope) => {
        $scope = $rootScope.$new();
        controller = $controller('detailsController', {
            $scope: $scope
        });
        $scope.$digest();
    }));

    it('should do something', () => {
        expect(0).toBe(0);
    });
});