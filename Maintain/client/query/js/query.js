app.controller('madeQueryAndDisp', function ($scope, $modalInstance, parameter, formFactory, global, constant) {
    $scope.header = parameter.header || 'Alert Message';
    $scope.collectionArr = ['users', 'abc', 'xyz'];
    formFactory.isPopOverOpen = false;
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.setColl = function(opt) {
    	$scope.queryStr = opt;
    }
    $scope.setInitialVal = function () {
        formFactory.isPopOverOpen = true;
        formFactory.queryOwn = (formFactory.rowSelector && JSON.stringify(formFactory.rowSelector)) || "";
    }
    $scope.projectionObj = {};
    /*$scope.buildProjection = function() {
        formFactory.projectionObj = $scope.projectionObj;

    }*/
    $scope.setRowSelect = function() {
        var parsed;
        try {
            parsed = JSON.parse(formFactory.queryOwn)
        } catch (e) {
            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.plzEnterValidJSON});
            return;
        }
        formFactory.isPopOverOpen =false;
        formFactory.rowSelector = parsed;
        delete formFactory.queryOwn;
        console.log();
    }
    formFactory.rowSelector = {};
});
app.controller('rowSelector', function ($scope, $modalInstance, parameter, formFactory, global, constant) {
    $scope.header = parameter.header || 'Alert Message';
    $scope.popOverObj = {};
    $scope.step = "step1";
    $scope.map = {
        "=": {
            desc: "equal to",
            mongo: "$eq"
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
    formFactory.projection = false;
    $scope.step1Next = function () {
    	$scope.queryObj = {};
    	$scope.step='step2';
    	for (var i = 0; i < formFactory.formFieldEditDelete.length; i += 1) {
    		if ($scope.queryInd[i]) {
    			var itemInfo = formFactory.formFieldEditDelete[i];
    			for (var j = 0; j < $scope.queryInd[i].length; j += 1) {
    				if (!$scope.queryObj[itemInfo.key])
    					$scope.queryObj[itemInfo.key] = {};
    				var condRef = $scope.queryInd[i][j];
    				if (condRef.opt == "$eq") {
    					$scope.queryObj[itemInfo.key] = {};
    					$scope.queryObj[itemInfo.key][condRef.opt] = condRef.value;
    					break;
    				} else {
    					$scope.queryObj[itemInfo.key][condRef.opt] = condRef.value;
    				}
    				
    			}
    		}
    	}
    }
    $scope.addCond = function(index) {
    	if ($scope.queryInd[index].length >= $scope.arrOpt.length) {
            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.alrPut});
            return;
    	}
    	$scope.queryInd[index].push({opt: '$lt'});    
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

/*property need to be delete
formFactory.isPopOverOpen
formFactory.projection
*/
