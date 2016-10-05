
[![Build Status](https://travis-ci.org/coblr/ngSeed.svg?branch=master)](https://travis-ci.org/coblr/ngSeed)

[![Coverage Status](https://coveralls.io/repos/github/coblr/ngSeed/badge.svg?branch=master)](https://coveralls.io/github/coblr/ngSeed?branch=master)

### Installation

Make sure you have Node and NPM installed.

```
git clone https://github.com/coblr/ngSeed.git
npm install
npm run build
npm run test
```

Building and testing should've gone off without any issues.

### Building/Testing/Watching

The gulp tasks for building, testing and watching have been made available through NPM scripts. This allows Gulp and other dependencies to be installed locally to avoid conflicts, yet still be accessible.

_*E2E testing also requires a WebDriver server to be available. Please see [Running Tests](https://github.com/coblr/ngSeed/wiki/Running-Tests) for more information._

```
npm run build    // does a complete build, runs `gulp build` locally
npm run watch    // starts all watch tasks, runs `gulp watch` locally
npm run test     // runs all the unit tests, runs `gulp test` locally
npm run e2e      // starts protractor and runs all the e2e tests*
npm run gulp     // provides an interface to directly run any gulp task(s)
```

See [Gulp Task Generation](https://github.com/coblr/ngSeed/wiki/Gulp-Task-Generation) for more information on available tasks and how to run more granular tasks.

For additional information on this application, please visit the [wiki](https://github.com/coblr/ngSeed/wiki).
