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
	/*global.isLoading = true;
	global.sendRequest('getNecData', {}, 'get', function(data, status, headers, config) {
		global.webJSON = data.webJSON;
		formFactory.formFieldEditDelete = {};
		formFactory._idFormNameMap = {}
		data.formJSON.forEach(function(val) {
			formFactory.formFieldEditDelete[val.formName] = val.data;
			formFactory._idFormNameMap[val.formName] = val._id;
		});
		//global.profileData = data.profileData;
	});*/
	
	
});