(function(){
    'use strict';

    angular
        .module('app.common')
        .factory('notifierService', notifierService);

    // @ngInject
    function notifierService(){
        const notices = [];

        const service = {
            notices,
            addNotice,
            removeNoticeByIndex,
            removeNoticeByEq,
            removeNoticeByProp,
            removeNoticeByKey,
            clearNotices
        };

        return service;

        ////////////

        function addNotice(key, error){
            notices.push({
                key: key,
                text: error.statusText
            })
            // notices.push(error);
        }

        function removeNoticeByIndex(index){
            if(index > 0 && index < notices.length){
                notices.splice(index, 1);
                return;
            }
        }

        function removeNoticeByEq(error){
            for(let a = notices.length-1; a >= 0; a--){
                if(notices[a] === error){
                    notices.splice(a, 1);
                    return;
                }
            }
        }

        function removeNoticeByProp(key, value){
            for(let a = notices.length-1; a >= 0; a--){
                if(notices[a][key] === value){
                    notices.splice(a, 1);
                    // keep looping for more matches
                }
            }
        }

        function removeNoticeByKey(key){
            for(let a = notices.length-1; a >= 0; a--){
                if(notices[a].key === key){
                    notices.splice(a, 1);
                    // keep looping for more matches
                }
            }
        }

        function clearNotices(){
            notices.length = 0;
        }
    }

})();