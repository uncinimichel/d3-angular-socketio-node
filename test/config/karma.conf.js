// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
var argv = require('yargs').argv,
    _ = require('lodash');

var browserOption = argv['karma-browser'],
    continuousIntegration = argv['karma-ci'] === true;


if (!_.isUndefined(browserOption)) {
    browserOption = browserOption.split(',');

}

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-cookies/angular-cookies.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/lodash/dist/lodash.compat.js',
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/socket.io-client/socket.io.js',
            'app/bower_components/d3/d3.js',
            'app/*.js',
            'app/components/**/*.js',
            'test/client/unit/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 6969,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: continuousIntegration,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: browserOption || ['PhantomJS'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: !continuousIntegration
    });
};
