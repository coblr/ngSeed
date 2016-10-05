'use strict';

(function(){
    angular
        .module('ngSeed')
        .run(routeDataConfig);

    // @ngInject
    function routeDataConfig($rootScope, $state, APP_TITLE){
        $rootScope.$on('$stateChangeSuccess', () => {
            $rootScope.$state = $state;

            const data = $state.current.data;
            const title = document.getElementsByTagName('title')[0];
            title.innerHTML = `${data.title} | ${APP_TITLE}`;

            for(let i = 0, n = data.css.length; i < n; i++){
                const css = data.css[i];

                const cssEl = document.createElement('link');
                cssEl.type = 'text/css';
                cssEl.rel = 'stylesheet';
                cssEl.href = `build/${css}`;
                document.head.appendChild(cssEl);
            }
        });
    }
})();