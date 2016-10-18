app.controller('initialBody', function($scope) {
	/*$scope.setClass = function (item) {
		$scope.classVar
	}*/
});
app.controller('HeaderNsidebar', function($scope, $rootScope, global, constant) {
	global.isLoading = true;
	global.sendRequest('getJson', undefined, 'get', function(data, status, headers, config) {
		global.webJSON = data;
		global.profileData = data.profileData;
	});
	$scope.editSaveLink = function() {
		if (!$scope.showEditDelete) {
			$scope.showEditDelete = true;
			return;
		}
		global.sendRequest('submitWebTemp', global.webJSON, 'post', function(data, status, headers, config) {
	        $scope.showEditDelete = false;
	        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.allAdded});

	    });
	}
	
});