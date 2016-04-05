app.factory('global', function($http, $modal, $state, $location, $rootScope) {
    var global = {};
    global.category = {};
    global.category.ios = true;
    global.showLimit = 4;
    var protocol = {
        json: {'Content-type': 'application/json'},
        urlencoded: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    global.openModal = function(templateUrl, controllerName, parameter, windowClass, extra, back) {
          //global.isLoading = true;
          var obj = {
                templateUrl: templateUrl,
                resolve: {
                        parameter: function(){
                            return parameter
                        },
                        extra: function(){
                            return extra
                        }
                    },
            controller: controllerName,
            windowClass: windowClass
          }
          if (back) {
                obj.backdrop = 'static';
                obj.keyboard = false;
          }
          $modal.open(obj);
    };
    global.sendRequest = function(url, dataObj, method, successFn, failureFn, header) {
    	global.isLoading = true;
        var res = $http({
            method: method,
            url: url,
            headers: protocol[header || 'json'],
            data: dataObj
        });
		res.success(function(data, status, headers, config) {
			global.isLoading = false;
			if (successFn) {
				successFn(data, status, headers, config);
			}
		});
		res.error(function(data, status, headers, config) {
			global.isLoading = false;
			if (failureFn) {
				failureFn(data, status, headers, config);
			}
			alert( "failure message: " + JSON.stringify({data: data}));
		});	
    };
    global.sendRequest('http://jsonplaceholder.typicode.com/posts/',
        undefined,
        'GET',
        function (data, status, headers, config) {
        	if (data) {
        		global.detailItem = data;
                
        	}
        	console.log(data);	
        },
        function (data, status, headers, config) {
            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.error_server});
    });
    return global;
});
var data = {
  "route": [
    {
      "state": "body",
      "url": "/body",
      "views": [
        {
          "view": "@",
          "templateUrl": "template/viewIndex.html"
        },
        {
          "view": "header@body",
          "templateUrl": "template/header.html"
        },
        {
          "view": "body@body",
          "templateUrl": "template/body.html",
          "controller": "initialBody"
        }
      ]
    }
  ]
};
app.run(function($rootScope, $state, global) {
    $rootScope.global = global;
	angular.forEach(data.route, function (value, key) {
        var state = {
            "url": value.url,
            "views": {}
        };
        angular.forEach(value.views, function (view) {
            var obj = {};
            if (view.controller) {
                obj.controller = view.controller;
            }
            obj.templateUrl = view.templateUrl;
            state.views[view.view] = obj;
        });
        $stateProviderRef.state(value.state, state);
    });
    $state.go("body");
    console.log('success');
});
app.directive('confirmClick', ['$q', 'dialogModal', function($q, dialogModal) {
      return {
          link: function (scope, element, attrs) {
              var ngClick = attrs.ngClick.replace('confirmClick()', 'true')
                  .replace('confirmClick(', 'confirmClick(true,');
              scope.confirmClick = function(msg) {
                  if (msg===true) {
                      return true;
                  }
                  msg = msg || attrs.confirmClick || 'Are you sure You want to delete this item?';
                  dialogModal(msg).result.then(function() {
                      scope.$eval(ngClick);
                  });
                  return false;
              };
          }
      }
  }]);

  
  app.service('dialogModal', ['$modal', function($modal) {
      return function (message, title, okButton, cancelButton) {
          okButton = okButton===false ? false : (okButton || 'Confirm');
          cancelButton = cancelButton===false ? false : (cancelButton || 'Cancel');
          var ModalInstanceCtrl = function ($scope, $modalInstance, settings) {
              angular.extend($scope, settings);
              $scope.ok = function () {
                  $modalInstance.close(true);
              };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
          };
          var modalInstance = $modal.open({
              template: '<div class="dialog-modal"> \
                  <div class="modal-header" ng-show="modalTitle"> \
                      <h3 class="modal-title">{{modalTitle}}</h3> \
                  </div> \
                  <div class="modal-body">{{modalBody}}</div> \
                  <div class="modal-footer"> \
                      <button class="btn btn-primary" ng-click="ok()" ng-show="okButton">{{okButton}}</button> \
                      <button class="btn btn-warning" ng-click="cancel()" ng-show="cancelButton">{{cancelButton}}</button> \
                  </div> \
              </div>',
              controller: ModalInstanceCtrl,
              resolve: {
                  settings: function() {
                      return {
                          modalTitle: title,
                          modalBody: message,
                          okButton: okButton,
                          cancelButton: cancelButton
                      };
                  }
              }
          });
          return modalInstance;
      }
  }]);