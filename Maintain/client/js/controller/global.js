app.factory('global', function($http, $modal, $state, $location, $rootScope) {
    var global = {};
    global.currentPage = 0;
    global.itemsPerPage = 10;
    global.getPaination = function(filteredItems) {
        global.currentPage = 0;
        global.currentItem = filteredItems;
        filteredItems = filteredItems.data;
        var itemsPerPage = global.itemsPerPage,
            pagination = [],
            j = 0;
        for (var i = itemsPerPage; i < filteredItems.length; i += itemsPerPage) {
            pagination[j++] = filteredItems.slice(i - itemsPerPage, i);
        }
        pagination[j++] = filteredItems.slice(i - itemsPerPage, i);
        return pagination;
    };
    var protocol = {
        json: {'Content-type': 'application/json'},
        urlencoded: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    global.defaultErrFun = function (data, status, headers, config) {
        global.isLoading = false;
        global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: JSON.stringify(data)});
    }
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
		res.error(failureFn || global.defaultErrFun);	
    };
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
   /* global.sendRequest('/getData',
        undefined,
        'GET',
        function (data, status, headers, config) {
        	if (data.status === 'success') {
        		console.log();
        	}
        	console.log(data);	
        },
        function (data, status, headers, config) {
          console.log('error');
    });*/
    return global;
});
app.run(function($rootScope, $state, global, constant) {
    $rootScope.global = global;
    $rootScope.constant = constant;
	global.sendRequest('./webdata/routing.json',
        undefined,
        'GET',
        function (data, status, headers, config) {
        	angular.forEach(data.route, function (value, key) {
	          	var state = {
	            	"url": value.url,
	            	"views": {}
	          	};
                var enter;
                if (value.onEnter) {
                    enter = function($modal) {
                        global.openModal(value.onEnter.templateUrl, value.onEnter.controller, value.onEnter.parameter, value.onEnter.windowClass, value.onEnter.extra, true);
                    }
                    state.onEnter = ["$modal", enter];
                }
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
            $state.go("home");
          	console.log('success');
        },
        function (data, status, headers, config) {
          console.log('error');
    });
});