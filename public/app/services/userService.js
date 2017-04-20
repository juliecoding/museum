angular.module("app").service("userService", function($http) {

		this.getUser = function(id) {
			return $http({
				method: 'GET',
				url: '/api/user'
			});
		};

		this.updateUser = function(userObj) {
			return $http({
				method: 'PUT',
				url: '/api/user/update',
				data: userObj
			})
		}

		// this.getUsers = function() {
		// 	return $http({
		// 		method: 'GET',
		// 		url: '/api/user'
		// 	});
		// };


	});
