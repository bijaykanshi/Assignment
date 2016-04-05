app.controller('initialBody', function($scope, $rootScope, $http, global, constant) {
	$scope.formData = {};
	$scope.submitForm = function(dataToSend, funToCall, dec) {
		
		global.sendRequest('http://jsonplaceholder.typicode.com/posts/',
	        $scope.formData,
	        'POST',
	        function (data, status, headers, config) {
		        if (data) {
		            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.alert_success});
		            $scope.formData = {};
		        }
	        },
	        function (data, status, headers, config) {
	            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.error_server});
        });
	}
});
app.controller('popupMsg', function ($scope, $modalInstance, parameter) {
    $scope.msg = parameter.msg || 'Something went wrong';
    $scope.header = parameter.header || 'Alert Message';
    $scope.err = parameter.err;
    setTimeout(function() {
       $scope.close();
    }, 2000);
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});