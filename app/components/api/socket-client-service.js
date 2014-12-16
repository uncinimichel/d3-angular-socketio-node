'use strict';

angular.module('socketClient', []).service('SocketClientService', function ($window) {
	this._socket = $window.io();

	this.registerHandler = function (channel, handler) {
		this._socket.on(channel, handler);
	};

	this.emitData = function (channel, data) {
		this._socket.emit(channel, data);
	};
});