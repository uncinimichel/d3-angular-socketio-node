var IO = require('../../../server/controllers/io/io');
var Twit = require('../../../server/controllers/twitter/twitter');
var EventEmitter = require('events').EventEmitter;

describe('On socket connection', function (){
	var io,
		mockIo,
		mockSocket;

	beforeEach(function () {
		spyOn(console, 'log');
		mockIo = new EventEmitter();
		mockSocket = new EventEmitter();
		mockSocket.id = 'An id';
		io = IO(mockIo);
	});
	describe('connection', function () {
		it('connection', function () {
			spyOn(mockSocket, 'on');
			mockIo.emit('connection', mockSocket);
			expect(mockSocket.on).toHaveBeenCalledWith('register-tweet', jasmine.any(Function));
			expect(mockSocket.on).toHaveBeenCalledWith('unregister-tweet', jasmine.any(Function));
		});	
	});
	

	describe('methods', function (){
		var mockStream;		

		beforeEach(function () {
			mockStream = jasmine.createSpyObj('A mock stream', ['listen', 'stop']);
			spyOn(Twit, 'createTweetStream').and.returnValue(mockStream); 
			mockIo.emit('connection', mockSocket);
		});

		describe('register-tweet', function (){
			it('call register-tweet with the right parameters', function () {
				mockSocket.emit('register-tweet', {tweet : 'a-tweet'});

				expect(Twit.createTweetStream).toHaveBeenCalledWith('a-tweet', 'An id');
			});

			it('should emit after listen', function () {
				mockSocket.emit('register-tweet', {tweet : 'a-tweet'});
				expect(mockStream.listen).toHaveBeenCalled(); 
			});

			it('should not register the same tweet for the same socket', function () {
				mockSocket.emit('register-tweet', {tweet : 'a-tweet'});
				mockSocket.emit('register-tweet', {tweet : 'a-tweet'});
				mockSocket.emit('register-tweet', {tweet : 'a-tweet'});
			});
		});

		describe('unregister-tweet', function () {
			it('should call stop ', function () {
				mockSocket.emit('register-tweet', {tweet : 'a-tweet'});
				expect(mockStream.stop).not.toHaveBeenCalled();
				mockSocket.emit('unregister-tweet', {tweet : 'a-tweet'});
				expect(mockStream.stop).toHaveBeenCalled();
			});
		});
	});
	
});

