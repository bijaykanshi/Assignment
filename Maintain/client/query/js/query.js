app.controller('madeQueryAndDisp', function ($scope, $modalInstance, parameter) {
    $scope.header = parameter.header || 'Alert Message';
    $scope.collectionArr = ['users', 'abc', 'xyz'];

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.setColl = function(opt) {
    	$scope.queryStr = opt;
    }
});
app.controller('rowSelector', function ($scope, $modalInstance, parameter, formFactory) {
    $scope.header = parameter.header || 'Alert Message';
    var map = {
        "=": "equal",
        ">": "greaterThan",
        "<": "lessThan"
    }
    $scope.arrOpt = ['=', '<', '>'];
    $scope.checkObj = {};
    $scope.condObj = {};
    $scope.valObj = {};
    global.queryStr = {};
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});