var Twitter = require('../../../server/controllers/twitter/twitter');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
describe('The twitter adapter', function (){
	var mockStream;
	
	beforeEach(function () {
		mockStream = new EventEmitter();
		mockStream.stop = jasmine.createSpy('A stop function');
		Twitter._streams = {};
		spyOn(Twitter._T, 'stream').and.returnValue(mockStream);
	});

	describe('createTweetStream', function (){
		it('It should create a new Stream', function () {
			Twitter.createTweetStream('A tweet to register', 'my id');
			expect(Twitter._T.stream).toHaveBeenCalledWith('statuses/filter', {track : 'A tweet to register'});
		});
	});

	describe('StreamAdapter', function () {
		var StreamAdapter;

		beforeEach(function () {
			StreamAdapter =	Twitter.createTweetStream('A tweet to register', 'my id');
		});

		describe('StreamAdapter.listen', function () {
			it('should listen to a stream', function () {
				var spy = jasmine.createSpy();
				StreamAdapter.listen(spy);
				mockStream.emit('tweet', 'A ciao');

				expect(spy).toHaveBeenCalledWith('A ciao');				
			});
		});

		describe('StreamAdapter.stop', function () {
			it('should stop a stream', function () {
				StreamAdapter.stop();
				expect(mockStream.stop).toHaveBeenCalled();

			})
		});
	});
	

});

