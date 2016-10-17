var app = angular.module('LoginMod');

app.controller('LoginCtrl', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {
		console.log('Login controller initialized...');

		$scope.runLogin = function() {
			$http.put('/login', {
					email: $scope.email,
					password: $scope.password
			}).then(function onSuccess() {
				console.log('Login passed!');
				window.location = '/dashboard';
			}).catch(function onErr(err) {
				console.log('put error: ' + err);
				if(err.status == 400 || err.status == 404) {
					toastr.error('Invalid credentials, please try again later', 'Error', {
						closeButton: true
					});
					return;
				}
				toastr.error('An error has occurred, please try again later', 'Error', {
					closeButton: true
				});
				return;
			});
		}
}]);