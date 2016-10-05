describe('Details Section E2E Tests', function(){

    it('should have the right title', function(){
        browser.get('http://localhost/Sandbox/ngSeed/index.html#/details');
        expect(browser.getTitle()).toEqual('Details | ngSeed');
    });
});