'use strict';

const paths = require('./paths.js');

module.exports = {
    basePath: '',
    browsers: ['PhantomJS'],
    files: [
        `${paths.build}vendor.js`,
        `./node_modules/angular-mocks/angular-mocks.js`
    ],
    frameworks: ['jasmine'],
    plugins: [
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-babel-preprocessor',
        'karma-coverage'
    ],
    preprocessors: {},
    babelPreprocessor: {
        options: {
            presets: ['es2015']
        }
    },
    reporters: ['dots', 'coverage'],
    coverageReporter: {
        type: 'lcov',
        dir: './coverage',
        subdir: '.'
    },
    singleRun: true,
    autoWatch: false,
    failOnEmptyTestSuite: false
};