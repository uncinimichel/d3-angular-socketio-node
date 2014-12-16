angular.module('d3', []).factory('d3Service', function($window){
    return {
    	d3 : function () { 
			return $window.d3;
    	}
    }
});