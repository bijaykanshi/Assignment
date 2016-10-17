app.controller('initialBody', function($scope) {
});
app.controller('HeaderNsidebar', function($scope, $rootScope, global) {
	global.isLoading = true;
	global.sendRequest('getJson', undefined, 'get', function(data, status, headers, config) {
		global.webJSON = data;
	})
	
});