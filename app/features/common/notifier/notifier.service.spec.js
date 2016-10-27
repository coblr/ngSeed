describe('Notifier Service', function(){
    'use strict';

    let notifierService;

    beforeEach(module('app.common'));

    beforeEach(inject(function(_notifierService_){
        notifierService = _notifierService_;
    }));

    beforeEach(() => {
        notifierService.addNotice('mock', {abc:123, statusText:456});
        notifierService.addNotice('mock', {abc:456, statusText:789});
    });

    ////////////

    it('can accumulate notices', () => {
        expect(notifierService.notices.length).toBe(2);
    });

    it('can remove all notices', () => {
        notifierService.clearNotices();
        expect(notifierService.notices.length).toBe(0);
    });

    it('can remove an error by index', () => {
        notifierService.removeNoticeByIndex(1);
        expect(notifierService.notices.length).toBe(1);
        expect(notifierService.notices[0]).toEqual({key: 'mock', text: 456});
    });

    it('ignores removal by invalid index', () => {
        notifierService.removeNoticeByIndex('a');
        expect(notifierService.notices.length).toBe(2);
    });

    it('can remove an error by checking equality', () => {
        notifierService.removeNoticeByEq(notifierService.notices[0]);
        expect(notifierService.notices.length).toBe(1);
        expect(notifierService.notices[0]).toEqual({key: 'mock', text: 789});
    });

    it('can remove an error by matching property values', () => {
        notifierService.removeNoticeByProp('text', 456);
        expect(notifierService.notices.length).toBe(1);
        expect(notifierService.notices[0]).toEqual({key: 'mock', text: 789});
    });

    it('can remove an error by key', () => {
        notifierService.removeNoticeByKey('mock');
        expect(notifierService.notices.length).toBe(0);
    });

    it('ignores removal by invalid key', () => {
        notifierService.removeNoticeByKey('foo');
        expect(notifierService.notices.length).toBe(2);
    });

});