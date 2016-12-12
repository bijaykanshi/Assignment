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
	$scope.deleteLink = function (where, whichProp, index) {
		var dataToSend = {unset: {$unset : {}}};
		dataToSend.unset.$unset[whichProp + "." + index] = 1;
		dataToSend.pull = {$pull : {}};
		dataToSend.pull.$pull = null;
		global.sendRequest('deleteLink', {data: dataToSend}, 'post', function(data, status, headers, config) {
	        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.linkDeletedSucc});
	        global[where][whichProp].splice($index, 1);
	    });
	}
});