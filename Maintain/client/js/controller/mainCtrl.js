app.controller('initialBody', function($scope, global, constant) {
	$scope.editSaveLink = function() {
		if (!global.showEditDelete) {
			global.showEditDelete = true;
			return;
		}
		global.sendRequest('saveJSON', {data: global.webJSON}, 'post', function(data, status, headers, config) {
	        global.showEditDelete = false;
	        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.allAdded});

	    });
	}
});
app.controller('HeaderNsidebar', function($scope, $rootScope, global, constant, formFactory) {
	global.isLoading = true;
	global.sendRequest('getJson', undefined, 'get', function(data, status, headers, config) {
		global.webJSON = data.webTemp;
		formFactory.formFieldEditDelete = data.form;
		global.profileData = data.profileData;
	});
	
	
});