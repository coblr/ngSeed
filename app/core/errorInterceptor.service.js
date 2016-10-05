// (function(){
//     'use strict';

//     angular
//         .module('ngSeed')
//         .factory('errorInterceptor', errorInterceptor);

//     // @ngInject
//     function errorInterceptor($q){
//         return function(promise){
//             return promise.then(res => {
//                 return res;
//             },
//             res => {
//                 if (res.status === 401) {
//                     console.log('session timeout?');
//                     logout();
//                 }
//                 else if (res.status === 403) {
//                     alert("Forbidden");
//                 }
//                 else if (res.status === 404) {
//                     alert("Not found");
//                 }
//                 else if (res.status) {
//                     if (res.data && res.data.errorMessage) {
//                         alert(res.data.errorMessage);
//                     }
//                     else {
//                         alert("An unexpected server error has occurred");
//                     }
//                 }
//                 return $q.reject(res);
//             });
//         };
//     }

// })();