app.factory('global', function($http, $modal, $state, $location, $rootScope) {
    var global = {};
    global.myInfo = {
        country: 'India',
        pin_code: 201301,
        state: 'Uttar Pradesh',
        contact_No: 9910430419,
        city: 'Noida'
    };
    var protocol = {
        json: {'Content-type': 'application/json'},
        urlencoded: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    global.getStar = function(rating, flag) {
        var rating = parseInt(rating);
        var num = flag ? rating : 10 - rating;
        return new Array(num);
    }
    global.defaultErrFun = function (data, status, headers, config) {
        global.isLoading = false;
        console.log("Error on http request :- " + JSON.stringify(data));
        alert( "failure message: " + JSON.stringify({data: data}));
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
    
    global.getTimestampDiff = function(preDate) {
        var time = {
            sec: {
                divide: 60
            },
            min: {
                divide: 60
            },
            hour: {
                divide: 24
            },
            day: {
                divide: 30
            },
            month: {
                divide: 12
            },
            year: {
                divide: 1000
            }
        }
        var currentDate = new Date();
        var data = Math.floor((currentDate - preDate)/1000);
        Object.keys(time).forEach(function(key) {
            time[key].val = data % time[key].divide;
            data = Math.floor(data/time[key].divide)
        });
        var got;
        var keys = ['year', 'month', 'day', 'hour', 'min', 'sec'];
        var str = '';
        keys.forEach(function(key) {
            if (time[key].val || got) {
                got = true;
                str += time[key].val + ' ' + key + '  ';
            }
        });
        return str;
    }
    
    console.log('ksldfljjlsdfjl..jlsjdflkjsdlfk');
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