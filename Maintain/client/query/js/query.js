app.controller('madeQueryAndDisp', function ($scope, $modalInstance, parameter, formFactory, global, constant) {
    //$scope.header = parameter.header || 'Alert Message';
    $scope.deleteObj = {};
    global.modifyObj = {};
    $scope.submitQuery = function () {
        if ($scope.showQ) {
            $scope.showQ = false;
            return;
        }
        global.sendRequest('submitQuery', {collection: $scope.queryStr, row: formFactory.rowSelector, col: $scope.projectionObj}, 'post', function(data, status, headers, config) {
            if (data.length)
                $scope.headerArr = Object.keys(data[0]);
            else {
                global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.noDataOnDb});
                return;
            }
            $scope.dataToDisplay = data;
            $scope.submitQnce = true;
            $scope.showQ = true;
            
        });
    }
    $scope.removeItem = function (id) {
        $scope.deleteObj[id] = true; 
    }
    $scope.saveOnServer = function () {
        var dataToSave = {};
        var removeArr = Object.keys($scope.deleteObj);
        if (removeArr.length)
            dataToSave.remove = {_id: {$in: removeArr}}
        $scope.deleteObj[id] = true; 
    }
    $scope.collectionArr = ['users', 'abc', 'xyz'];
    formFactory.isPopOverOpen = false;
    $scope.close = function () {
        delete formFactory.isPopOverOpen;
        delete formFactory.projection;
        delete global.modifyObj;
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
    					$scope.queryObj[itemInfo.key] = condRef.value;
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
app.controller('editRowData', function ($scope, $modalInstance, parameter, constant, global) {
    $scope.header = parameter.header || 'Alert Message';
    $scope.formObj = parameter.rowData;
    $scope.rowDataBackUp = angular.copy($scope.formObj);
    $scope.close = function () {
        for (var key in $scope.rowDataBackUp)
            parameter.rowData[key] = $scope.rowDataBackUp[key];
        $modalInstance.dismiss('cancel');
    };
    $scope.save = function () {
        global.modifyObj[parameter.rowData._id] = true;
        $modalInstance.dismiss('cancel');
    };
});
