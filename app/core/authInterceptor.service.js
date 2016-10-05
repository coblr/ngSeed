// (function(){
//     'use strict';

//     angular
//         .module('ngSeed')
//         .factory('authInterceptor', authInterceptor);

//     // @ngInject
//     function authInterceptor($q, Auth){
//         const service = {
//             request
//         };

//         return service;

//         ////////////

//         function request(config){
//             const dfr = $q.defer();
//             if(Auth.accessToken){
//                 Auth.refresh(5)
//                     .then(() => {
//                         config.headers = config.headers || {};
//                         config.headers.Authorization = 'Bearer ' + Auth.accessToken;
//                         dfr.resolve(config);
//                     })
//                     .catch(() => {
//                         dfr.reject('Failed to refresh token');
//                     });
//             }
//             else {
//                 dfr.reject('Session timed out');
//             }
//             return dfr.promise;
//         }
//     }

// })();
