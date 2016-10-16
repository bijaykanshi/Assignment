app.directive('confirmClick', ['$q', 'dialogModal', function($q, dialogModal) {
    return {
        link: function(scope, element, attrs) {
            
            scope.confirmClick = function(msg) {
                var ngClick = attrs.ngClick.replace('confirmClick()', 'true')
                    .replace('confirmClick(', 'confirmClick(true,');
                if (msg === true) {
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
app.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i += 1) {
            input.push(i);
        }

        return input;
    };
});


app.service('dialogModal', ['$modal', function($modal) {
    return function(message, title, okButton, cancelButton) {
        okButton = okButton === false ? false : (okButton || 'Confirm');
        cancelButton = cancelButton === false ? false : (cancelButton || 'Cancel');
        var ModalInstanceCtrl = function($scope, $modalInstance, settings) {
            angular.extend($scope, settings);
            $scope.ok = function() {
                $modalInstance.close(true);
            };
            $scope.cancel = function() {
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
app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);
Array.prototype.getCustomIndex = function(toSearch, key) {
    for (var i = 0; i < this.length; i += 1) {
        if (this[i][key] == toSearch)
            return i;
    }
    return -1;
}