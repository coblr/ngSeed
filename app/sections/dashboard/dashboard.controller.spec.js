'use strict';

describe('Dashboard Controller', () => {

    let vm;
    let $scope;

    beforeEach(module('seed.dashboard'));

    beforeEach(inject(($controller, $rootScope) => {
        $scope = $rootScope.$new();
        vm = $controller('dashboardController', {
            $scope: $scope
        });
        $scope.$digest();
    }));

    ////////////

    it('should have a list of stuff to display', () => {
        expect(vm.list.length).toBe(200);
    });
});