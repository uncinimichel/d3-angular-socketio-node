'use strict'

describe('SocketClientService', function () {
	var SocketClientService;

	beforeEach(module('socketClient'));

	beforeEach(inject(function (_SocketClientService_) {
		SocketClientService = _SocketClientService_;
	}));

	beforeEach(function () {
		spyOn(SocketClientService._socket, 'emit');
		spyOn(SocketClientService._socket, 'on');
	});


	describe('Emit', function (){
		it('Emit data', function () {
			SocketClientService.emitData('Che bello', { ciao : 'bello'});
			expect(SocketClientService._socket.emit).toHaveBeenCalledWith('Che bello', { ciao : 'bello'});
		});
	});

	describe('On', function (){
		it('Add handler to a channel', function () {
			SocketClientService.registerHandler('Che bello', function(){});
			expect(SocketClientService._socket.on).toHaveBeenCalledWith('Che bello', jasmine.any(Function));
		});
	});
});