var Twit = require('twit'),
	q = require('q');


var StreamAdapter = function (stream) {

	this.listen = function (handler) {
		stream.on('tweet', function (tweet) {
			handler(tweet);
		});
	};

	this.stop = function () {
		stream.stop();
	};
};

module.exports = {

	_T : new Twit({
	    consumer_key:         'OfesDASUbdbW4iGCHeskDuMGh',
	    consumer_secret:      'HzPuURxa5nIlk3p2xPanGSUIJQSTeOlQmPB2ggcdeXkEaj5XRO',
	    access_token:         '528884064-xsHI8MorMByQQUZ5zXPZx4xWPYp7NQrvm8nRMtC7',
	    access_token_secret:  'prTDel0jJ8QY12TzxuWbZo9QTmQxctYztVZ1tjL6BDwlB'
	}),

	createTweetStream: function (tweet, forId) {
	
		var stream = this._T.stream('statuses/filter', { track: tweet });

		return new StreamAdapter(stream);
	}
}