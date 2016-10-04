app.controller('initialBody', function($scope, $rootScope, $http, global, constant, $interval) {
	$scope.newsFeedObj = {};
	$scope.readDelete = {};
	$scope.showComment = {};
	$scope.tempRef;
	$scope.commentedData = {};
	$scope.timeToShow = {};
	var getRandomNo = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
	$scope.newsSubmit = function(clintSideData, responseData) {
		 global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: 'News has been Successfully saved'});
		 $scope.newsFeedObj = {};
	}
	$scope.setAction = function(item, val) {
		item.action = val;
	}
	$scope.getInterval = function(id, str, prevDate, index, parentIndex) {
		var unique = index >= 0 ? id + str + index + '_'+parentIndex : id + str;
		$interval(function() {
			$scope.timeToShow[unique] = global.getTimestampDiff(new Date(prevDate));
		}, getRandomNo(2000, 3000));
	}
	$scope.saveAction = function(clintSideData, responseData) {
		global.dataToDisplay.forEach(function(obj) {
          if (obj.action === 'delete')
            obj.action = 'deleted'
      	})
		global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: 'Your Action has been Successfully saved'});
	}
	$scope.beforeSaveAction = function(dataToSend, funToCall, dec) {
		var filtered = dataToSend.filter(function(obj){
			return obj.action === 'delete' || obj.action === 'read';
		});
		filtered.forEach(function(obj) {
			obj.user_email = global.myInfo.email;
			if (obj.action === 'delete')
            	obj.action = 'deleted';
            obj.news_id_action = obj.news_id;
		})
		$scope.rootFunForSendingRequest(filtered, funToCall, dec);
	}
	$scope.doComment = function(item) {
		$scope.tempRef = item;
		var obj = {};
		obj.news_id = Number(item.news_id);
		obj.comment = $scope.commentedData[item.news_id];
		obj.comment_by = global.myInfo.name;
		$scope.rootFunForSendingRequest([obj], 'SuccessfullyCommented', 'SuccessfullyCommented');
	}
	$scope.SuccessfullyCommented = function(clintSideData, responseData) {
		$scope.tempRef.commentArr.unshift(clintSideData[0]);
		$scope.commentedData[$scope.tempRef.news_id] = '';
		console.log('Successfully submitted');
	}
	
	$scope.incUpvotes = function(clintSideData, responseData) {
		clintSideData.upvotes += 1;
	}
	$scope.rootFunForSendingRequest = function(dataToSend, funToCall, dec) {
		var requestData = {};
		requestData.dec = dec;
		if (dec === 'newsSubmit')
			$scope.newsFeedObj.inserted_by = global.myInfo.email;
		requestData.data = dataToSend;
		global.sendRequest('/homePageRequest',
	        requestData,
	        'POST',
	        function (data, status, headers, config) {
		        if (data.status === 'error') {
		            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.error_server, err: JSON.stringify(data.error)});
		            return;
		        }
	          	$scope[funToCall](requestData.data, data);
	        },
	        function (data, status, headers, config) {
	            global.openModal('template/modals/popupMsg.html', 'popupMsg', {msg: constant.msg.error_server});
        });
	}
});
app.controller('HeaderNsidebar', function($scope, $rootScope, global) {
	global.isLoading = true;
	global.sendRequest('getJson', undefined, 'get', function(data, status, headers, config) {
		console.log("i got")

	})
	
});