describe('IsEmpty Filter', () => {
    'use strict';

    let filter;

    beforeEach(module('app.common'));

    beforeEach(inject((_$filter_) => {
        filter = _$filter_('isEmpty');
    }));

    ////////////

    it('can detect if an array is empty', () => {
        expect(filter([])).toBe(true);
        expect(filter([1,2])).toBe(false);
    });

    it('can detect if an object is empty', () => {
        expect(filter({})).toBe(true);
        expect(filter({a:1})).toBe(false);
    });

    it('can detect if a string is empty', () => {
        expect(filter('')).toBe(true);
        expect(filter('as')).toBe(false);
    });

    it('also says falsy is empty', () => {
        expect(filter(null)).toBe(true);
        expect(filter()).toBe(true);
        expect(filter(false)).toBe(true);
        expect(filter(0)).toBe(true);
        expect(filter(undefined)).toBe(true);
    });
});