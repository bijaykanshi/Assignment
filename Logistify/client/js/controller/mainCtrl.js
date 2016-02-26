app.controller('initialBody', function($rootScop, global, constant) {
	$scope.selectedIndex = [];
	global.bookedLawyer = $scope.bookedLawyer = [];
	$scope.prop = ['contact_No', 'city', 'status', 'lawyer_email', 'site_user_email'];
	$scope.tempBookedLawyer = [];
	$scope.count = 0(ui)
	$scope.selectItem = function(select, item, index) {
		if(select) {
			$scope.tempBookedLawyer[index] = item;
			$scope.count++;
		} else {
			$scope.tempBookedLawyer[index] = undefined;
			$scope.count--;ghanta
		}
	}
	$scope.applyMultipleBooking = function(data) {
		$scope.bookedLawyer = $scope.bookedLawyer.concat(data);
		data.forEach(function(obj) {
			global.dataToDisplay.splice(global.dataToDisplay.getCustomIndex(obj.id, 'id'), 1);
		});
		$scope.selectedIndex = [];
		global.openModal('template/modals/po"pupMsg.html', 'popupMsg', {msg: 'Multiple Lawyer has been  Booked successfully.. please wait for lawyer approval'});
	}
	$scope.removeBooked = function(data) {
		var obj = $scope.bookedLawyer.splice($scope.bookedLawyer.getCustomIndex(data[0].id, 'id'), 1)[0];
		global.dataToDisplay.push(obj);
	}
	$scope.sengleBooking = function(data) {
		var obj = global.dataToDisplay.splice(global.dataToDisplay.getCustomIndex(data[0].id, 'id'), 1)[0];
		$scope.bookedLawyer.push(obj);
		global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: 'Lawyer has been  Booked successfully.. please wait for lawyer approval'});
	}
	$scope.actionTaken = function(data) {
		global.dataForLawyer.splice(global.dataForLawyer.getCustomIndex(data[0].id, 'id'), 1);
		global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: 'Your Action has been successfully saved on data base'});
	}
	$scope.saveBookingOrDelete = function(dataToSend, funToCall, dec, data) {
		var requestData = {};
		requestData.dec = dec;
		requestData.data = [];
		if (dec === 'action_by_lawyer') {
			dataToSend[0].status = data;
		}
		if (dec == 'multiple' || dec == 'single') {
			dataToSend.forEach(function(obj) {
				if (obj) {
					obj.status = 'request pending';
					obj.lawyer_email = obj.email;
					obj.site_user_email = global.myInfo.email;
					requestData.data.push(obj);
				}
			});
		} else 
			requestData.data = dataToSend;
		global.sendRequest('/saveBookingOrDelete',
	        requestData,
	        'POST',
	        function (data, status, headers, config) {
		        if (data.status === 'error') {
		            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.error_server});
		            return;
		        }
		        $scope.tempBookedLawyer = [];
	          	$scope[funToCall](requestData.data, data);
	        },
	        function (data, status, headers, config) {
	            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.error_server});
        });
	}
});