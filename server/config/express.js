'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    session = require('express-session');

function _commonConfig(app) {
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(express.static(path.join(config.root, 'app')));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(session({
            secret: config.session.secret,
            saveUninitialized: true,
            resave: true
        }
    ));
}
function _setProdConfig(app) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
}
function _setDevConfig(app) {
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
        if (req.url.indexOf('/scripts/') === 0) {
            res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            res.header('Expires', 0);
        }
        next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(errorHandler());

}
/**
 * Express configuration
 */
module.exports = function (app) {

    var env = process.env.NODE_ENV;

    _commonConfig(app);
    if (env === 'production') {
        _setProdConfig(app);
    } else {
        _setDevConfig(app);
    }


};