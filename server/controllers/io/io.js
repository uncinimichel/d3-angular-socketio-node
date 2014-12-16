'use strict';

var Twit = require('../twitter/twitter.js');

var _sockets = {};
/**
 * IO routes
 */
module.exports = function (io) {
	io.on('connection', function (socket) {
		_sockets[socket.id] = {
			tweets :  {}
		};

		console.log('This guy has just connected: ', socket.id);

		socket.on('register-tweet', function (data) {
			var tweet = data.tweet;

			if (_sockets[socket.id].tweets[tweet]) {
				console.log('You already are registered');
				return;
			}
			console.log('I am going to register:', tweet);

			var stream = Twit.createTweetStream(tweet, socket.id);
			stream.listen(function (tweet) {
				socket.emit('stream-tweet', tweet);
			});

			_sockets[socket.id].tweets[tweet] = stream;
		});	

		socket.on('unregister-tweet', function (data) {
			_sockets[socket.id].tweets[data.tweet].stop();

			delete _sockets[socket.id].tweets[data.tweet];
		});
	});
};