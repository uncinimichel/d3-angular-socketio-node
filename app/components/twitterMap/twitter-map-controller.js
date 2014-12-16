'use strict';

angular.module('Skeleton').controller('TwitterMapController', function($scope, SocketClientService) {

	$scope.map = {
		jsonFile: 'maps/world-110m2.json'
	};
	$scope.points = [{
		'long': 13.069619,
		'lat' :43.483071
	}];

	$scope.startTrackTweet = function () {
		if (!$scope.tweetToTrack) {
			throw new Error('Choose a tweet');
		}
		SocketClientService.emitData('register-tweet', { tweet : $scope.tweetToTrack});
		SocketClientService.registerHandler('stream-tweet', function (data) {
			if (data.coordinates) {
			console.log('Coordinates', data.coordinates.Coordinates);
				$scope.points.push({
					'long' : data.coordinates.x,
					'lat' : data.coordinates.y
				});
			}
		});
	};

	$scope.stopTrackTweet = function () {
		SocketClientService.emitData('unregister-tweet', { tweet : $scope.tweetToUnTrack});	
	}
	$scope.addPoints = function () {
		$scope.points.push({
			'long' : Math.random(1)* 100,
			'lat' : Math.random(1)* 100
		});
	}
});