describe('Dashboard Section E2E Tests', function(){

    it('should have the right title', function(){
        browser.get('http://localhost/Sandbox/ngSeed/index.html#/dashboard');
        expect(browser.getTitle()).toEqual('Dashboard | ngSeed');
    });

    it('should show a list of stuff', function(){
        browser.get('http://localhost/Sandbox/ngSeed/index.html#/dashboard');
        expect(element(by.repeater('name in dashboard.list').row(0)).getText()).toBe('box0');
    });
});