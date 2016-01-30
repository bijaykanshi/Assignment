app.factory('global', function($http, $modal, $state, $location, $rootScope) {
    var global = {};
    global.category = {};
    global.category.ios = true;
    global.showLimit = 4;
    var protocol = {
        json: {'Content-type': 'application/json'},
        urlencoded: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    var map = {
        ios: 'iOS',
        android: 'Android',
        web_development: 'Web Development',
        soft_eng: 'Software Engineering'
    }
    global.getStar = function(rating, flag) {
        rating = parseInt(rating);
        var num = flag ? rating : 5 - rating;
        return new Array(num);
    }
    global.filterItem = function(arg) {
        var arr = [];
        Object.keys(global.category).forEach(function(key) {
            if (global.category[key])
                arr.push(map[key]);
        });
        global.detailItem = global.detailItemBackUp.filter(function (el) {
            return arr.indexOf(el.category) >= 0;
            });
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
		res.error(function(data, status, headers, config) {
			global.isLoading = false;
			if (failureFn) {
				failureFn(data, status, headers, config);
			}
			alert( "failure message: " + JSON.stringify({data: data}));
		});	
    };
    global.sendRequest('/getCourseDetail',
        undefined,
        'GET',
        function (data, status, headers, config) {
        	if (data.status === 'success') {
        		global.detailItem = data.result;
                global.detailItemBackUp = angular.copy(data.result);
                global.courseLength = data.result.length;
        	}
        	console.log(data);	
        },
        function (data, status, headers, config) {
          console.log('error');
    });
    return global;
});
app.run(function($rootScope, $state, global) {
    $rootScope.global = global;
	global.sendRequest('./webdata/routing.json',
        undefined,
        'GET',
        function (data, status, headers, config) {
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
            $state.go("courseDetail");
          	console.log('success');
        },
        function (data, status, headers, config) {
          console.log('error');
    });
});