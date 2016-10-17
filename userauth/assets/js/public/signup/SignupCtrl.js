var app = angular.module('SignupMod');

app.controller('SignupCtrl', ['$scope', '$http', function($scope, $http) {
		console.log('Signup controller initialized...');

		$scope.runSignup = function() {
			console.log('Signing up ' + $scope.name);

			$http.post('/signup', {
				name: $scope.name,
				email: $scope.email,
				password: $scope.password
			}).then(function onSuccess(response) {
				window.location = '/user';
			}).catch(function onError(err) {
				console.log('Error: ' + err);
			});
		}
}]);