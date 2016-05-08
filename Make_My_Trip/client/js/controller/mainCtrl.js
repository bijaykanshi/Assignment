app.controller('initialBody', function($scope, $rootScope, $http, global) {
	$scope.selectArr = [10, 20, 50, 100];

	$scope.setArr = function(argu) {
		var start;
		var end;
		if (argu) {
			start = global.currentPage - global.itemsPerPage > 0 ? global.currentPage - global.itemsPerPage : 0;
			end = start + global.itemsPerPage + 1;
		} else {
			end = global.currentPage + global.itemsPerPage > global.detailItem.length ? global.detailItem.length : global.currentPage + global.itemsPerPage;
			start = end - global.itemsPerPage;
		}
		global.iterateOverPageArr = global.pageArr.slice(start, end);
	}
});