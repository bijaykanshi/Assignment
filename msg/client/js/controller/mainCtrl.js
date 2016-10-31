app.controller('initialBody', function($scope) {
});
app.controller('rightSidebar', function($scope) {
});
app.controller('HeaderNsidebar', function($scope, $rootScope, global, chatBox) {
	global.isLoading = true;
	global.sendRequest('getJson', undefined, 'get', function(data, status, headers, config) {
		chatBox.userData = data.userData;
		console.log("i got")

	})
	
});