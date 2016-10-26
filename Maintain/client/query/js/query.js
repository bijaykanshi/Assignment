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
app.controller('rowSelector', function ($scope, $modalInstance, parameter, formFactory, global) {
    $scope.header = parameter.header || 'Alert Message';
    $scope.map = {
        "=": {
            desc: "equal to"
        },
        ">": {
            desc: "greater than",
            mongo: "$gt"
        },
        "<": {
            desc: "less than",
            mongo: "$lt"
        },
        ">=": {
            desc: "greater than equal to",
            mongo: "$gte"
        },
        "<=": {
            desc: "less than equal to",
            mongo: "$lte"
        },
        "!=": {
            desc: "not equal to",
            mongo: "$ne"
        }
    }
    $scope.arrOpt = ['=', '<', '>', '<=', '>='];
    $scope.queryInd = {};
    $scope.countAdd = {};
    $scope.addOrNotOpt = function(opt, index) {
        return !(opt in $scope.queryInd[index])
    }
    $scope.addCond = function(index) {
        $scope.countAdd[index] += 1;
        $scope.queryInd[index]['index' + $scope.countAdd[index]] = {}
    }
    $scope.selectEval = function(opt, index) {
        if (opt == "=") {
            $scope.queryInd[index] = {};
            scope.queryInd[index]["="] = {};
            return
        }
        scope.queryInd[index][opt] = {}; 


    }
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});
