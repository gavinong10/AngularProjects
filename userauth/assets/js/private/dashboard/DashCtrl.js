var app = angular.module('DashMod');

app.controller('DashCtrl', ['$scope', '$http', function($scope, $http) {
		console.log('Dash controller initialized...');

		$scope.getUser = function() {
			console.log('Getting User...');

			$http.get('/getUser').then(function onSuccess(user) {
				//console.log(user);

				$scope.user = user.data;
			}).catch(function onError(err) {
				console.log(err);
			});
		};

}]);