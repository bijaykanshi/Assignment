app.controller('loginSignUp', function ($scope, $modalInstance, $state, global, parameter, extra, formFactory, constant) {
  
   $scope.loginData = {
      email: 'bijay.iit12@gmail.com',
      pass: 'new',
      ucat: 'admin'
   };
   $scope.proceed = function() {
        global.sendRequest('login', {data: $scope.loginData}, 'post', function(data, status, headers, config) {
          global.webJSON = data.webJSON;
          formFactory.formFieldEditDelete = {};
          formFactory._idFormNameMap = {};
          global.dbName = data.usersInfo.db;
          global.users = data.usersInfo.ucat;
          global.allUsersList = data.usersJSON;
          data.formJSON.forEach(function(val) {
            formFactory.formFieldEditDelete[val.formName] = val.data;
            formFactory._idFormNameMap[val.formName] = val._id;
          });
          $scope.close();
          //global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.allAdded});
        });
   }
   $scope.close = function () {
       
        $modalInstance.dismiss('cancel');
    };
 
});
app.controller('popupMsg', ['$scope', '$modalInstance', 'parameter', function ($scope, $modalInstance, parameter) {
    $scope.msg = parameter.msg || 'Something went wrong';
    $scope.header = parameter.header || 'Alert Message';
    $scope.err = parameter.err;
    var timeToShow = parameter.timeToShow || 2000;
    setTimeout(function() {
       $scope.close();
    }, timeToShow);
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('addEditTemplate', function ($scope, $modalInstance, parameter, $window, constant) {
    $scope.header = parameter.header;
    $scope.rdObj = {nestedLink: 'tabTemp'};
    $scope.itemRef = parameter.itemRef;
    
    $scope.panelArr = [];
    $scope.tabArr = [];
    $scope.panelClass = {};
    var obj = {panelTemp: 'panelArr', tabTemp: 'tabArr'};
    var tType = parameter.itemRef.templateType;
    if (tType && parameter.itemRef.templateData) {
      $scope[obj[tType]] = parameter.itemRef.templateData;
      if (tType == 'panelTemp') {
          $scope.panelArr.forEach(function(val, index) {
            $scope.panelClass[index] = "col-sm-" + (12 / val.length);
          })
      }
    }
    $scope.itemRef.templateType = 'panelTemp';
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.removeItem = function (item, index, parIndex) {
      item.splice(index, 1);
      if (!item.length) {
        $scope.panelArr.splice(parIndex, 1);
        $scope.panelClass[parIndex] = $scope.panelClass[parIndex + 1];
        return;
      }
      $scope.panelClass[parIndex] = "col-sm-" + (12 / item.length);
    };
    $scope.saveTemp = function () {
      parameter.itemRef.templateData = $scope[obj[parameter.itemRef.templateType]];
      $scope.close();
    };
    $scope.addItem = function (item, index) {
        item.push({});
        $scope.panelClass[index] = "col-sm-" + (12 / item.length);
    };
});
app.controller('editContent', function ($scope, $modalInstance, parameter, global) {
    $scope.header = parameter.header;
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});
app.controller('addLink', function ($scope, $modalInstance, parameter, global, constant, formFactory) {
    $scope.header = parameter.header;
    //$scope.rdObj = {nestedLink: 'no'};
    global.linkObj.place = parameter.place || 'leftSideBar';
    global.linkObj.nestedLink = global.linkObj.nestedLink || 'no';
    global.linkObj.formType = global.linkObj.formType || 'dispOnly'; 
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    var keyObj = {place: true, formColl: true, formType: true, linkName: true, gatherPur: true};
    
    var previousKey = global.linkObj.formColl;
    $scope.selectCollObj = previousKey ? {previousKey: true} : {};
    $scope.doSelection = function (key) {
        if (previousKey == key)
            return;
        if (previousKey)
            $scope.selectCollObj[previousKey] = false;
        previousKey = key;
    }
    $scope.selectedCollection = function () {
      if (previousKey) {
        $scope.editColShow = false;
      } else 
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.mustSelectColl});
    }
    $scope.nestedLinkArr = (global.linkObj.nestedLink == 'yes' && global.linkObj.templateData) || [];
    $scope.selectTemp = function (item) {
      if (!item.linkName || !global.linkObj.linkName) {
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.plzInsertLinkName});
        return;
      }
      global.openModal('template/modals/addEditTemplate.html', 'addEditTemplate', {header: constant.msg.addEditTemplate, itemRef: item}, 'extraLarge-Modal', undefined, true);
      
    }
    $scope.deleteTemp = function(item) {
      item.templateData = undefined;
    }
    $scope.saveTemp = function () {
      if (global.linkObj.nestedLink == 'yes' && $scope.nestedLinkArr.length)
          global.linkObj.templateData = $scope.nestedLinkArr;
      var msg = constant.msg.mustSelectTemp;
      var linkObjBack = angular.copy(global.linkObj);
      if (global.linkObj.formType == 'formLink') {
        msg = previousKey ? undefined : constant.msg.mustSelectColl;
        if (previousKey) {
            global.linkObj.formColl = previousKey;
            global.linkObj.gatherPur = $scope.isDataGather;
            $scope.editColShow = false;
            for (var key in global.linkObj) {
              if (!keyObj[key])
                delete global.linkObj[key];
            }
        }
      } else if (global.linkObj.nestedLink == 'yes' && $scope.nestedLinkArr.length) {
          global.linkObj.templateData = $scope.nestedLinkArr;
          msg = undefined;
      }
      if (msg) {
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: msg});
        return;
      }
      var updateWith = {$push: {}};
      if ($scope.position)
        updateWith.$push[global.linkObj.place] = {$each: [global.linkObj], $position: $scope.position};
      else 
        updateWith.$push[global.linkObj.place] = global.linkObj;
      global.sendRequest('saveLink', {updateWith: updateWith, click: 'addLink'}, 'post', function(data, status, headers, config) {
        var arrRef = global.webJSON[global.linkObj.place];
        if ($scope.position) {
            arrRef.splice($scope.position, 0, global.linkObj);
        } else {
            arrRef.push(global.linkObj);
        }
        $scope.close();
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.allAdded});
      }, function (data, status, headers, config) {
        global.isLoading = false;
        global.linkObj = linkObjBack;
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: JSON.stringify(data)});
    });
    };
});
