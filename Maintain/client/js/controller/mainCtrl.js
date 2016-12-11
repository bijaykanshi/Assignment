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
	$scope.clickLink = function (item) {
		global.clickedLink = item.nestedLink == 'yes' ? global.clickedLink : item;
		if (item.formType == "formLink") {
			global.openModal('formBuilder/takeData.html', 'takeDataCtrl', {header: constant.msg.buildForm}, 'extraLarge-Modal', undefined, true);
		}
	}
});