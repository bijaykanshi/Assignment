app.controller('permissionCtrl', ['$scope', '$modalInstance', 'parameter', 'constant', 'global', 'formFactory', function ($scope, $modalInstance, parameter, constant, global, formFactory) {
    $scope.header = parameter.header || 'Alert Message';
    $scope.upperOpt = [{disp: "Form Link", key: "formLink"}, {disp: ""}]
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
}]);