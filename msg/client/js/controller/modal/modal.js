app.controller('loginSignUp', function ($scope, $modalInstance, $state, global, parameter, extra, constant, chatBox, socket) {
  
   $scope.loginData = {
      email: 'bijay@gmail.com',
      password: 'new',
      ucat: 'site_user'
   };
   console.log("sdf" + socket.a);
   $scope.loginFun = function(dec) {
      socket.emit('userAuth', {authData: $scope.loginData});
      socket.on('authSuccess', function(data) {
          chatBox.myInfo = data.myInfo;
          chatBox.myInfo.name = chatBox.myInfo.email.split('@')[0];
          global.isLoading = false;
          chatBox.userData = data.userData;
          $scope.close();
      });
      socket.on('authFail', function(data) {
          global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.alert_user_not_registered});
      })
      /*global.sendRequest('/loginSignUp',
        $scope.loginData,
        'POST',
        function (data, status, headers, config) {
         
          if (!data.userData) {
              global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.alert_user_not_registered});
              return;
          }
          $scope.close();
          chatBox.myInfo = data.myInfo;
          chatBox.myInfo.name = chatBox.myInfo.email.split('@')[0];
          chatBox.userData = data.userData;
        });*/
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
