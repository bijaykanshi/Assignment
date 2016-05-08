app.factory('global', function($http, $modal, $state, $location, $rootScope, $filter) {
    var global = {};
    global.category = {};
    global.category.ios = true;
    global.itemsPerPage = 10;
    global.currentPage = 0;
    global.pageArr = [];
    global.iterateOverPageArr = [];
    global.selectArr = [10, 20, 50, 100];
    global.selectVal = 10;
    global.airportsType = ["All", "Airports", "Military Airport", "Sea Plane Base", "Other Airport", "Railway Stations", "Heliport2", "Bus Stations", "Off-line Point", "Harbours"];
    global.checkModal = {0:true};
    var protocol = {
        json: {'Content-type': 'application/json'},
        urlencoded: {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    global.searchInWhole = function() {
        global.currentPage = 0;
        global.detailItem = global.getPaination($filter('filter')(global.detailItemBackUp, global.search));
    }
    global.getStar = function(rating, flag) {
        rating = parseInt(rating) ? parseInt(rating) : 0;
        var num = flag ? rating : 5 - rating;
        return new Array(num);
    }
    global.managePagination = function() {
        global.currentPage = 0;
        global.itemsPerPage = parseInt(global.selectVal);
        global.detailItem = global.getPaination(global.detailItemBackUp);
    }
    global.getPaination = function(filteredItems) {
        global.pageArr = [];
        var itemsPerPage = global.itemsPerPage,
            pagination = [],
            j = 0;
        for (var i = itemsPerPage; i < filteredItems.length; i += itemsPerPage) {
            pagination[j] = filteredItems.slice(i - itemsPerPage, i);
            global.pageArr[j] = j;
            j += 1;
        }
        pagination[j] = filteredItems.slice(i - itemsPerPage, i);
        global.pageArr[j] = j;
        global.iterateOverPageArr = global.pageArr.slice(0, global.itemsPerPage);
        return pagination;
    };
    global.filterItem = function(arg) {
        var arr = [];
        global.currentPage = 0;
        if (global.checkModal[0]) {
            global.sortAndCheck = global.detailItemBackUp;
        } else {
            Object.keys(global.checkModal).forEach(function(key) {
                if (global.checkModal[key])
                    arr.push(global.airportsType[key]);
            });
            global.sortAndCheck = global.detailItemBackUp.filter(function (el) {
                return arr.indexOf(el.type) >= 0;
            });
        }
        global.sortBy();
    }
    global.sortBy = function() {
        global.currentPage = 0;
        if (global.sort)
            global.sortAndCheck.sort(function(a, b){
              return a[global.sort] == b[global.sort] ? 0 : +(a[global.sort] > b[global.sort]) || -1;
            });
        global.detailItem = global.getPaination(global.sortAndCheck);
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
        		global.detailItem = global.getPaination(data.result);
                global.sortAndCheck = global.detailItemBackUp = angular.copy(data.result);
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
            $state.go("home");
          	console.log('success');
        },
        function (data, status, headers, config) {
          console.log('error');
    });
    global.sendRequest('./webdata/countries.json',
        undefined,
        'GET',
        function (data, status, headers, config) {
            global.countries = {};
            Object.keys(data).forEach(function(val, index) {
                global.countries[data[val]] = val;
            });
        },
        function (data, status, headers, config) {
          console.log('error');
    });
});