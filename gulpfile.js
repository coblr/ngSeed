'use strict';

const del = require('del');
const clone = require('clone');
const extend = require('extend');

const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const templateCache = require('gulp-angular-templatecache');
const ngAnnotate = require('gulp-ng-annotate');
const sourceMaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const strReplace = require('gulp-replace');

const karmaServer = require('karma').Server;
const karmaConfig = require('./karma.conf.js');

const paths = require('./paths.js');

////////////

// default tasks
let buildTasks = [
    'clean',
    'copy:assets',
    'copy:fonts',
    'copy:vendor:js',
    'copy:vendor:css',
    'build:core:js',
    'build:core:css'
];
let watchTasks = ['watch:core:js', 'watch:core:css'];

// Generate Gulp tasks based on path information. Each path should
// correspond to a separate component. Generating tasks using directory
// lists (see ./paths.js) helps us create granular builds and watches.
const sectionBuildTasks = generateBuildTasks(paths.sections);
const featureBuildTasks = generateBuildTasks(paths.features);
buildTasks = buildTasks.concat(sectionBuildTasks, featureBuildTasks);

const sectionWatchTasks = generateWatchTasks(paths.sections);
const featureWatchTasks = generateWatchTasks(paths.features);
watchTasks = watchTasks.concat(sectionWatchTasks, featureWatchTasks);

const sectionTestTasks = generateTestTasks(paths.sections);
const featureTestTasks = generateTestTasks(paths.features);

////////////

gulp.task('default', buildTasks);
gulp.task('build', buildTasks);

// helper tasks for building all sections or features at once.
gulp.task('build:sections', sectionBuildTasks);
gulp.task('build:features', featureBuildTasks);

////////////

gulp.task('build:core', ['build:core:js', 'build:core:css']);

gulp.task('build:core:js', () => {
    getJSBuild(paths.core.js, 'core');
});

gulp.task('build:core:css', () => {
    getCSSBuild(paths.core.css, 'core');
});

////////////

/**
 * WATCH SHOULD BE RESTARTED WHEN FILES ARE ADDED OR DELETED
 * There are some cases where this could be unnecessary, but
 * most of the time it's a good habit to get into.
 */

gulp.task('watch', watchTasks);

gulp.task('watch:core:js', () => {
    gulp.watch(paths.core.js, ['build:core:js']);
});

// if the core css is changed, it might affect the import values in
// any of the css files that have been generated. By grabbing a list
// of the css build tasks, we can create a special task to rebuild
// all css when any of the core css is changed.
gulp.task('watch:core:css', () => {
    const cssTasks = buildTasks.filter(el => el.match(/build\:[^:]+:css/, 'gi'));
    gulp.watch(paths.core.css, cssTasks);
});

// helper tasks for watching all of sections or features at once.
gulp.task('watch:sections', sectionWatchTasks);
gulp.task('watch:features', featureWatchTasks);

////////////

gulp.task('test', ['build'], (done) => {
    const everything = extend({app:`${paths.app}core`}, paths.features, paths.sections);
    const config = getTestConfig(everything);
    new karmaServer(config, done).start();
});

// helper tasks for running all sections or features tests at once.
gulp.task('test:sections', ['build:sections'], (done) => {
    const config = getTestConfig(paths.sections);
    new karmaServer(config, done).start();
});
gulp.task('test:features', ['build:features'], (done) => {
    const config = getTestConfig(paths.features);
    new karmaServer(config, done).start();
});

////////////

gulp.task('clean', () => {
    return del.sync(paths.build);
});

gulp.task('copy:assets', () => {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(`${paths.build}assets`));
});

gulp.task('copy:fonts', () => {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(`${paths.build}fonts`));
});

gulp.task('copy:vendor:js', () => {
    return gulp.src(paths.vendor.js)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.build));
});

gulp.task('copy:vendor:css', () => {
    return gulp.src(paths.vendor.css)
        .pipe(strReplace(/\.\.\/fonts\/fontawesome/g, './fonts/fontawesome'))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(paths.build));
});

////////////

/**
 * Generates Gulp tasks based on an path object where the
 * key is the component name, and the value is the source path.
 * As each task is created it's added to a new array and returned.
 * @param  {object} srcPaths    A list of component:sourcePaths
 * @return {array}              The final array of tasks to be run
 */
function generateBuildTasks(srcPaths){
    const buildTasks = [];
    for (let componentName in srcPaths) {
        if (!srcPaths.hasOwnProperty(componentName)) {
            continue;
        }

        const componentSrc = srcPaths[componentName];
        const allTaskName = `build:${componentName}`;
        const jsTaskName = `build:${componentName}:js`;
        const cssTaskName = `build:${componentName}:css`;
        const tplTaskName = `build:${componentName}:tpl`;

        // use this array to make sure that if this component
        // sets up its own module, that the module files are
        // built in the right order. Not all components will
        // have these files.
        const jsSrcGlobs = [
            `${componentSrc}/${componentName}.module.js`,
            `${componentSrc}/${componentName}.config.js`,
            `${componentSrc}/${componentName}.routes.js`,
            `${componentSrc}/**/!(*.spec|*.e2e).js`
        ];

        gulp.task(jsTaskName, () => {
            return getJSBuild(jsSrcGlobs, componentName);
        });
        buildTasks.push(jsTaskName);

        gulp.task(cssTaskName, () => {
            return getCSSBuild(`${componentSrc}/**/*.scss`, componentName);
        });
        buildTasks.push(cssTaskName);

        gulp.task(tplTaskName, () => {
            return getTplBuild(`${componentSrc}/**/*.html`, componentName);
        });
        buildTasks.push(tplTaskName);

        // combine all above into a single component build-all task
        gulp.task(allTaskName, [jsTaskName, cssTaskName, tplTaskName]);
    }
    return buildTasks;
}

/**
 * Generates Gulp tasks based on a path object where the
 * key is the component name, and the value is the source path.
 * Each task instanciates a new gulp.watch on the component
 * directory which invokes the corresponding build.
 * As each task is created it's added to a new array and returned.
 * @param  {object} srcPaths    A list of component:sourcePaths
 * @return {array}              The final array of tasks to be run
 */
function generateWatchTasks(srcPaths){
    const watchTasks = [];
    for (let componentName in srcPaths) {
        if (!srcPaths.hasOwnProperty(componentName)) {
            continue;
        }
        const componentSrc = srcPaths[componentName];
        const jsTask = `${componentName}:js`;
        const cssTask = `${componentName}:css`;
        const tplTask = `${componentName}:tpl`;

        gulp.task(`watch:${jsTask}`, () => {
            // running test will also run build, but will do it
            // consecutively. Running build and test together would
            // run them in parallel.
            return gulp.watch(`${componentSrc}/**/*.js`, [`test:${componentName}`]);
        });
        watchTasks.push(`watch:${jsTask}`);

        gulp.task(`watch:${cssTask}`, () => {
            return gulp.watch(`${componentSrc}/**/*.scss`, [`build:${cssTask}`]);
        });
        watchTasks.push(`watch:${cssTask}`);

        gulp.task(`watch:${tplTask}`, () => {
            return gulp.watch(`${componentSrc}/**/*.html`, [`build:${tplTask}`]);
        });
        watchTasks.push(`watch:${tplTask}`);
    }
    return watchTasks;
}

/**
 * Generates gulp tasks for testing each component. Each component
 * is given it's own karma config so that only that components tests run.
 * TODO: detect a components own config file and use that instead.
 * @param {object} srcPaths     A list of component:sourcePaths
 * @return {array}              The final array of tasks to be run
 */
function generateTestTasks(srcPaths){
    const testTasks = [];
    for (let componentName in srcPaths) {
        if (!srcPaths.hasOwnProperty(componentName)) {
            continue;
        }
        const componentSrc = srcPaths[componentName];
        const buildTaskName = `build:${componentName}:js`;
        const testTaskName = `test:${componentName}`;

        gulp.task(testTaskName, [buildTaskName], (done) => {
            const src = {};
            src[componentName] = componentSrc;

            const config = getTestConfig(src);
            new karmaServer(config, done).start();
        });
        testTasks.push(testTaskName);
    }
    return testTasks;
}

/**
 * Returns the Gulp stream for turning JS files into a build file.
 * @param  {string} src  The source path of the files to process.
 * @param  {string} name The name of the component
 * @return {object}      A Gulp stream
 */
function getJSBuild(src, name){
    return gulp.src(src)
        .pipe(sourceMaps.init())
            .pipe(eslint())
            .pipe(eslint.formatEach())
            .pipe(babel({presets: ['es2015']}))
            .pipe(ngAnnotate())
            .pipe(concat(`${name}.js`))
            .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(paths.build));
}

/**
 * Creates the Gulp stream for turning SASS files into a build file.
 * @param  {string} src  The source path of the files to process.
 * @param  {string} name The name of the component
 * @return {object}      A Gulp stream
 */
function getCSSBuild(src, name){
    return gulp.src(src)
        .pipe(sass({includePaths:paths.sassInclude}).on('error', sass.logError))
        .pipe(concat(`${name}.css`))
        .pipe(gulp.dest(paths.build));
}

/**
 * Creates the Gulp stream for turning HTML files into a build file.
 * @param  {string} src  The source path of the files to process.
 * @param  {string} name The name of the component
 * @return {object}      A Gulp stream
 */
function getTplBuild(src, name){
    return gulp.src(src)
        .pipe(templateCache(`${name}.tpls.js`,{
            base: `${__dirname}/app`,
            module: `${name}.templates`,
            moduleSystem: 'IIFE',
            standalone: true
        }))
        .pipe(gulp.dest(paths.build));
}

/**
 * Generates a karma config object for testing a set of source paths.
 * Can be used at any granularity level.
 * @param  {object} srcPaths    example: {ComponentName: ComponentPath}
 * @return {object}             A karma config object
 */
function getTestConfig(srcPaths){
    const config = clone(karmaConfig);
    for (let a in srcPaths) {
        if (!srcPaths.hasOwnProperty(a)) {
            continue;
        }

        // easiest way to get templates is just use the cache we built
        config.files.push(`${paths.build}${a}.tpls.js`);

        // we need to keep files in order. use original files so that
        // we can get an accurate coverage report.
        config.files.push(`${srcPaths[a]}/${a}.module.js`);
        if(srcPaths[a].indexOf('/features/') === -1){
            config.files.push(`${srcPaths[a]}/${a}.config.js`);
            config.files.push(`${srcPaths[a]}/${a}.routes.js`);
        }
        config.files.push(`${srcPaths[a]}/**/!(*.spec|*.e2e).js`);
        config.files.push(`${srcPaths[a]}/**/*.spec.js`);

        // since we're using raw source, don't forget to transpile
        config.preprocessors[`${srcPaths[a]}/**/!(*.spec|*.e2e).js`] = ['babel', 'coverage'];
        config.preprocessors[`${srcPaths[a]}/**/*.spec.js`] = ['babel'];
    }
    return config;
}