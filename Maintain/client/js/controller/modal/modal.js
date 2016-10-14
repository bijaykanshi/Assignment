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
app.controller('addEditTemplate', function ($scope, $modalInstance, parameter, global, constant) {
    $scope.header = parameter.header;
    $scope.rdObj = {val: 'panelTemp', nestedLink: 'tabTemp'};
    $scope.panelArr = [];
    $scope.panelClass = {};
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.removeItem = function (item, index, parIndex) {
        item.splice(index, 1);
        $scope.panelClass[parIndex] = "col-sm-" + (12 / item.length);
    };
});
app.controller('editContent', function ($scope, $modalInstance, parameter, global, constant) {
    $scope.header = parameter.header;
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});
app.controller('addLink', function ($scope, $modalInstance, parameter, global, constant) {
    $scope.header = parameter.header;
    $scope.rdObj = {val: 'leftSideBar', nestedLink: 'no'};
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.nestedLinkArr = [];
    $scope.add = function () {
      if ($scope.questAns.quest == 'Add Question' || $scope.questAns.ans == 'Add Answer' || 
          !($scope.pass && $scope.uname)) {
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.AddBothQD});
        return;
      }
      $scope.QArr.push($scope.questAns);
      $scope.questAns = {quest: 'Add Question', ans: 'Add Answer'};
      global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.AddedSucessfully});
    };
    $scope.submit = function () {
      if (!($scope.pass && $scope.uname)) {
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.mustPresent});
        return;
      }
      //angular.extend(global.currentItem.data, $scope.QArr);
      [].push.apply(global.currentItem.data, $scope.QArr);
      global.sendRequest('submitQA', global.sidebarLink, 'post', function(data, status, headers, config) {$scope.close();
        $scope.close();
        [].push.apply(global.dispData[global.dispData.length - 1], $scope.QArr);
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.allAdded});

      });
    };
});
