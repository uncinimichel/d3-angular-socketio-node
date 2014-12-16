'use strict';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./server/config/config');

// Express settings
require('./server/config/express')(app);

// Routing
require('./server/routes')(app);

// Start server
server.listen(config.port, function () {
  	console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Handle IO socket
require('./server/controllers/io/io')(io);



// Expose app
module.exports = app;