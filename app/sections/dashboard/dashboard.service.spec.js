'use strict';

describe('Dashboard Service', () => {

    let dashboardService;

    beforeEach(module('dashboard.templates'));
    beforeEach(module('seed.dashboard'));

    beforeEach(inject((_dashboardService_) => {
        dashboardService = _dashboardService_;
    }));

    it('should do something', () => {
        expect(0).toBe(0);
    });
});