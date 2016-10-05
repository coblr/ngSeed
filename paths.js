'use strict';

const fs = require('fs');

const appPath = `app/`;
const vendorPath = `node_modules/`;
const buildPath = `build/`;

module.exports = {
    app: appPath,
    vendor: {
        js: [
            `${vendorPath}jquery/dist/jquery.min.js`,
            `${vendorPath}angular/angular.min.js`,
            `${vendorPath}angular-animate/angular-animate.min.js`,
            `${vendorPath}angular-aria/angular-aria.min.js`,
            `${vendorPath}angular-material/angular-material.min.js`,
            `${vendorPath}angular-ui-router/release/angular-ui-router.min.js`
        ],
        css: [
            `${vendorPath}angular-material/angular-material.min.css`,
            `${vendorPath}font-awesome/css/font-awesome.min.css`
        ]
    },
    build: buildPath,
    core: {
        js: [
            `${appPath}core/app.module.js`,
            `${appPath}core/app.config.js`,
            `${appPath}core/app.routes.js`,
            `${appPath}core/*.js`
        ],
        css: [
            `${appPath}core/scss/core.scss`,
            `${appPath}core/scss/!(overrides).scss`,
            `${appPath}core/scss/overrides.scss`
        ]
    },
    sections: getDirPaths(`${appPath}sections/`),
    features: getDirPaths(`${appPath}features/`),
    sassInclude: `${appPath}core/scss`,
    assets: `assets/**/*.*`,
    fonts: `${vendorPath}font-awesome/fonts/*`
};

////////////

function getDirPaths(dirSrc){
    const dirs = fs.readdirSync(dirSrc);
    const paths = {};
    for(let dir of dirs){
        const stat = fs.statSync(dirSrc + dir);
        if(stat.isDirectory()){
            paths[dir] = dirSrc + dir;
        }
    }
    return paths;
};