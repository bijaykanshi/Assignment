app.controller('loginSignUp', function ($scope, $m constant) {
  
   $scope.loginData = {
      email: 'bijay@gmail.com',
      password: 'new',
      ucat: 'site_user'
   };
   $scope.loginFun = function(dec) {
      var requestData = dec === 'login' ? $scope.loginData : global.myInfo;
      if (dec != 'login') {
          var dob = requestData.dob;
          requestData.birthdate = dob.getDate() + '-' + (dob.getMonth() + 1) + '-' + dob.getFullYear();
      }
         
      dec = requestData.dec = dec === 'login' && requestData.ucat === 'lawyer' ? 'lawyer' : dec;
      global.sendRequest('/loginSignUp',
        requestData,
        'POST',
        function (data, status, headers, config) {
          if (data.status === 'error') {
              global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.error_server});
              return;
          }
          var parameter = {};
          if(dec === 'lawyer') {
              if (data.result.length) {
                  global.lawyerPage = true;
                  global.dataForLawyer = data.result;
                  $scope.close();
              } else {
                  global.openModal('template/modals/popupMsg.html', 'popupMsg', constant.msg.alert_user_not_registered);
              }
              return;
          }
          if (dec === 'login') {
              if (!data.result[0].length) {
                  parameter.msg = constant.msg.alert_user_not_registered;
                  global.openModal('template/modals/popupMsg.html', 'popupMsg', parameter);
              } else {
                  //$state.go('coachList');
                  global.myInfo = $scope.loginData;
                  global.dataToDisplay = data.result[0];
                  global.bookedLawyer.push.apply(global.bookedLawyer, data.result[1]);
                  data.result[1].forEach(function(obj) {
                      global.dataToDisplay.splice(global.dataToDisplay.getCustomIndex(obj.id, 'id'), 1);
                  });
                  $scope.close();
                  $scope.loginData = {};
              }
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
    $scope.msg = parameter.msg;
    $scope.header = parameter.header || 'Alert Message';
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});
