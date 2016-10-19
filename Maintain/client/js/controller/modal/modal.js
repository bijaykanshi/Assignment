app.controller('loginSignUp', function ($scope, $modalInstance, $state, global, parameter, extra, constant) {
  
   $scope.loginData = {
      email: 'bijay@gmail.com',
      password: 'new',
      ucat: 'site_user'
   };
   $scope.loginFun = function(dec) {
      var requestData = dec === 'login' ? $scope.loginData : global.myInfo;
      if (dec != 'login') {
          var dob = requestData.dob;
          if (dob)
            requestData.birthdate = dob.getDate() + '-' + (dob.getMonth() + 1) + '-' + dob.getFullYear();
      }
      requestData.dec = dec;
      global.sendRequest('/loginSignUp',
        requestData,
        'POST',
        function (data, status, headers, config) {
          if (data.status === 'error') {
              global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.error_server, err: JSON.stringify(data.error)});
              return;
          }
          var parameter = {};
          
          if (dec === 'login') {
              if (!data.result.length) {
                  parameter.msg = constant.msg.alert_user_not_registered;
                  global.openModal('template/modals/popupMsg.html', 'popupMsg', parameter);
                  return;
              }
              if (requestData.ucat === 'management'){
                  global.adminUser = true;
              } else {
                  global.dataToDisplay = data.result[0];
                  $scope.loginData.name = data.result[2][0].name;
                  var comment = data.result[3];
                  var buildArrOnId = {};
                  comment.forEach(function(obj){
                      if (!buildArrOnId[obj.news_id])
                          buildArrOnId[obj.news_id] = [];
                      buildArrOnId[obj.news_id].push(obj);
                  });
                  var map = {};
                  data.result[1].forEach(function(obj) {
                      map[obj.news_id] = obj.action;
                  })
                  global.dataToDisplay.forEach(function(obj) {
                      if (map[obj.news_id])
                        obj.action = map[obj.news_id];
                      if (buildArrOnId[obj.news_id])
                        obj.commentArr = buildArrOnId[obj.news_id];
                  });
              }
              global.myInfo = $scope.loginData;
              $scope.loginData = {};
              $scope.close();
              global.showInitial = true;
          }  else {
              parameter.msg = constant.msg.alert_siginUp_success;
              //global.myInfo = {};
              global.openModal('template/modals/popupMsg.html', 'popupMsg', parameter);
          }
        },
        function (data, status, headers, config) {
            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.error_server});
        });
     };
   
   $scope.close = function () {
       
        $modalInstance.dismiss('cancel');
    };
 
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
app.controller('addLink', function ($scope, $modalInstance, parameter, global, constant) {
    $scope.header = parameter.header;
    //$scope.rdObj = {nestedLink: 'no'};
    global.linkObj.place = parameter.place || 'leftSideBar';
    global.linkObj.nestedLink = global.linkObj.nestedLink || 'no';
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
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
      if (parameter.index) {
          $scope.close();
          return;
      }
      if (global.linkObj.nestedLink == 'yes' && $scope.nestedLinkArr.length)
          global.linkObj.templateData = $scope.nestedLinkArr;
      if (!global.linkObj.templateData) {
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.mustSelectTemp});
        return;
      }
      var dataRef = global.webJSON[global.linkObj.place];

      if ($scope.position < dataRef.length) {
        dataRef.splice($scope.position, 0, global.linkObj);
      } else {
        dataRef.push(global.linkObj);
      }
      global.sendRequest('saveJSON', {data: global.webJSON}, 'post', function(data, status, headers, config) {
        $scope.close();
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.allAdded});

      });
    };
});
