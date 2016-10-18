app.controller('initialBody', function($scope) {
	/*$scope.setClass = function (item) {
		$scope.classVar
	}*/
});
app.controller('HeaderNsidebar', function($scope, $rootScope, global) {
	global.isLoading = true;
	global.sendRequest('getJson', undefined, 'get', function(data, status, headers, config) {
		global.webJSON = data;
		global.profileData = data.profileData;
	});
	
	
});