var app = angular.module("app", ['ui.router', 'angular-stripe'])

.config(["$stateProvider", "$urlRouterProvider", "stripeProvider", function($stateProvider, $urlRouterProvider, stripeProvider) {

  stripeProvider.setPublishableKey('pk_test_buXe8Kr3ohMMAv4KnFoTztiu');

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./app/routes/home/homeTmpl.html",
      controller: 'homeCtrl'
    })
    .state('art', {
      url: "/explore",
      templateUrl: "./app/routes/art/artTmpl.html",
      controller: 'artCtrl'
    })
    .state('visit', {
      url: "/visit",
      templateUrl: "./app/routes/visit/visitTmpl.html",
      controller: 'visitCtrl'
    })
    .state('shop', {
      url: "/shop",
      templateUrl: './app/routes/shop/shopTmpl.html',
      controller: 'shopCtrl'
    })
    .state('account', {
      url: '/account',
      templateUrl: './app/routes/account/accountTmpl.html',
      controller: 'accountCtrl'
    })
    .state('products', {
      url: '/products',
      templateUrl: './app/routes/products/productsTmpl.html',
      controller: 'productsCtrl'
    })
    .state('orders', {
      url: '/orders',
      templateUrl: './app/routes/orders/ordersTmpl.html',
      controller: 'ordersCtrl'
    })
    .state('payment', {
      url: '/payment',
      templateUrl: './app/routes/payment/payment.html',
      controller: 'paymentCtrl'
    })
    .state('congrats', {
      url: '/congrats',
      templateUrl: './app/routes/congrats/congrats.html',
      controller: 'paymentCtrl'
    })
    .state('acknowledgements', {
      url: '/acknowledgements',
      templateUrl: './app/routes/acknowledgements/acknowledgementsTmpl.html'
    })


  // .state('profile', {
  // 	url: '/profile',
  // 	templateUrl: './app/routes/profile/profileTmpl.html',
  // 	controller: 'profileCtrl',
  // 	resolve: {
  // 		user: function(authService, $state) {
  // 			return authService.getCurrentUser()
  // 				.then(function(response) {
  // 					if (!response.data)
  // 						$state.go('login');
  // 					return response.data;
  // 				})
  // 				.catch(function(err) {
  // 					$state.go('login');
  // 				});
  // 		}
  // 	}
  // });

}]);
angular.module("app")
	.service("authService", ["$http", function($http) {

	this.logout = function() {  //MAKE SURE THIS FUNCTION WORKS!!!!!
		return $http({
				method: 'get',
				url: '/api/logout'
			})
			.then(function(response) {
				return response;
			});
	};


	this.getCurrentUser = function() {
		return $http({
				method: 'GET',
				url: '/api/user'
			})
			.then(function(response) {
				return response;
			});
	};


	this.editUser = function(user) {
	return $http({
			method: 'PUT',
			url: "/api/user/update",
			data: user
		})
	};

	
}]);

// INITIALIZE SERVICE
// ============================================================
angular.module("app").service("incartService", ["$http", function($http) {

  this.addToCart = function(productid, qty) {
    return $http({
      method: 'POST',
      url: '/api/cart/add',
      data: {
        productid: productid,
        qty: qty
      }
    });
  };

  this.updateQuantity = function(qty) {
    return $http({
      method: 'PUT',
      url: '/api/cart/qty',
      data: {
        qty: qty
      }
    });
  };

  this.deleteFromCart = function(incartid) {
    return $http({
      method: 'DELETE',
      url: '/api/cart/delete/' + incartid
    });
  };



}]);

// INITIALIZE SERVICE
// ============================================================
angular.module("app").service("orderService", ["$http", function($http) {

  // this.calculateTotal = function() {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/order'
  //   }).then(function() {
  //     for (var i = 0; i < )
  //   })
  // }

  this.getOrder = function() {
    return $http({
      method: 'GET',
      url: '/api/order'
    });
  };

  this.submitOrder = function(amount, order) {
    order.amount = amount;
    return $http({
      method: 'PUT',
      url: '/api/order/complete',
      data: order
    });
  };

  this.deleteItem = function() {
    return $http({
      method: 'DELETE',
      url: '/api/cart/delete'
    })
  }

  this.getOrdersByUser = function() {
    return $http({
      method: 'GET',
      url: 'api/orders/'
    })
  }


}]);

angular.module("app").service("productService", ["$http", function($http) {

  this.getProducts = function() {
    return $http({
      method: 'GET',
      url: '/api/products'
    })
  }

  this.getProduct = function(productid) {
    return $http({
      method: 'GET',
      url: '/api/product/' + productid
    })
  }

}]);

angular.module("app").service("userService", ["$http", function($http) {

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


	}]);

angular.module("app").controller("footerCtrl", ["$scope", "authService", "$state", function($scope, authService, $state) {
  $scope.logout = function() {
    authService.logout().then(function(response) {
      $state.go('login');
    });
  };
}]);

angular.module('app').directive('footerDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/footer/footerTmpl.html',
    controller: 'footerCtrl'
  };
});

angular.module("app").controller("mapCtrl", ["$scope", "visitService", function($scope, visitService) {




  $scope.hello = "hello from the map controller"


  // $scope.getMap();
  // $scope.initMap();



}]);

angular.module('app')
.directive('mapDir', function(){
    return{
        restrict: 'E',
        template: '<div></div>',
        link: function(scope, element, attrs) {
            var myLatLng = new google.maps.LatLng(42.3386, -71.0941);
            var mapOptions = {
                center: myLatLng,
                zoom: 14,
                mapTypeId: 'roadmap'
            };
            var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Museum of Eastern Art'
            });
            marker.setMap(map);
        }
    };
});

//
//             var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
//
//             var marker = new google.maps.Marker({
//                 position: myLatLng,
//                 map: map,
//                 title: 'You Are Here'
//             });
//             marker.setMap(map);
//         }
//     };
// });

angular.module("app").controller("navCtrl", ["$scope", "authService", "$state", function($scope, authService, $state) {
  $scope.logout = function() {
    authService.logout().then(function(response) {
      $state.go('login');
    });
  };
}]);

angular.module('app').directive('navDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/nav/navTmpl.html',
    controller: 'navCtrl'
  };
});

angular.module("app").controller("populateShopCtrl", ["$scope", "mainService", function($scope, mainService) {

  $scope.product = mainService.product;

  $scope.message = mainService.message;

  $scope.newMessage = "Hi from the controller!"

}]);

angular.module("app").directive('populateShop', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/populate-shop/populateShopTmpl.html',
    controller: 'populateShopCtrl'
  }
});

angular.module("app").controller("accountCtrl", ["$scope", "userService", "orderService", function($scope, userService, orderService) {


  $scope.getUser = function() {
    userService.getUser()
    .catch(function(err) {
      alert('Please log in before continuing')
    })
    .then(function(response) {
      console.log(response);
      $scope.user = response.data;
      $scope.updateuser = {};
    })
  }

  $scope.getUser();

  $scope.updateUser = function(updateuser) {
    console.log(updateuser)
    userService.updateUser(updateuser)
    .then(function() {
      $scope.getUser();
    })

  }

  orderService.getOrdersByUser().then(function(response) {
    console.log(response);
    $scope.userOrders = response.data;
  })

  // $scope.addToCart = function(productid, qty) {
  //   console.log(productid, qty);
  //   incartService.addToCart(productid, qty)
  //   .catch(function(err) {
  //       console.log(err);
  //       alert('Please log in before continuing');
  //       $state.go('auth')
  //   })

}]);

// INITIALIZE CONTROLLER
// ============================================================
angular.module("app").controller("artCtrl", ["$scope", function($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
}]);

angular.module("app").controller("ordersCtrl", ["$scope", "stripe", "$http", "$state", "orderService", "incartService", function($scope, stripe, $http, $state, orderService, incartService) {

  $scope.getTotal = function() {
    var total = 0;
    for (var i = 0; i < $scope.orderData.products.length; i++) {
      total += $scope.orderData.products[i].price; /** $scope.orderData.products[i].qty*/
      $scope.tax = total * .07;
      $scope.shipping = 7; 
    }
    $scope.total = total;
    $scope.totalInPennies = ($scope.total * 100);
  }

  $scope.getOrder = function() {
    orderService.getOrder().then(function(response) {
      $scope.orderData = response.data;
      $scope.getTotal();
    });
  };

  $scope.getOrder();   //Is it a good idea to invoke this here?

  $scope.updateItem = function(id, qty) {
    orderService.updateItem(id, qty).then(function(response) {
      $scope.getTotal();
    });
  };

  $scope.deleteItem = function(incartid) {
    incartService.deleteFromCart(incartid).then(function(response) {
      $scope.getOrder();
    });
  };

  $scope.submit = function(amount, order) { //Do not call until payment step (line 67 below)
    console.log('Submitting order', amount, order);
    orderService.submitOrder(amount, order).then(function(response) {
      $scope.getOrder();
      $state.go('congrats');
    });
  };

  //==========STRIPE==================

    $scope.payment = {};

    $scope.charge = function (payment, price) {
      return stripe.card.createToken($scope.payment.card)
      .then(function (response) {
        console.log('token created for card ending in ', response.card.last4);
        var payment = angular.copy($scope.payment);
        payment.card = void 0;
        payment.token = response.id;

        return $http({
          method: 'POST',
          url: '/api/payment',
          data: {
            amount: price,
            payment: payment
          }
        })
      })
      .then(function(payment) {
        console.log('successfully submitted payment for $', payment);
        $scope.submit($scope.total, $scope.order); //This calls the submit function
      })
      .catch(function (err) {
         if (err.type && /^Stripe/.test(err.type)) {
           console.log('Stripe error: ', err.message);
           alert(err.message)
         }
         else {
           console.log('Other error occurred, possibly with your API', err.message);
           alert(err.message)
         }
       });
   };

}]);

angular.module("app").controller("homeCtrl", ["$scope", function($scope) {
  $scope.hello = 'Hello World!';
  
}]);

angular.module('app')
.controller('paymentCtrl', ["$scope", "stripe", "$http", "$state", function($scope, stripe, $http, $state) {



//==========STRIPE==================



  $scope.payment = {};

  $scope.charge = function (payment, price) {
    return stripe.card.createToken($scope.payment.card)
    .then(function (response) {
      console.log('token created for card ending in ', response.card.last4);
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;

      return $http({
        method: 'POST',
        url: '/api/payment',
        data: {
          amount: price,
          payment: payment
        }
      })
    })
    .then(function(payment) {
      console.log('successfully submitted payment for $', payment);
      $state.go('congrats');
    })
    .catch(function (err) {
       if (err.type && /^Stripe/.test(err.type)) {
         console.log('Stripe error: ', err.message);
         alert(err.message)
       }
       else {
         console.log('Other error occurred, possibly with your API', err.message);
         alert(err.message)
       }
     });
 };





 //===END CTRL=======
}])

// INITIALIZE CONTROLLER
// ============================================================
angular.module("app").controller("productCtrl", ["$scope", "productService", function($scope, productService) {


  $scope.getProduct = function(productid) {
    productService.getProduct(productid).then(function(response) {
      $scope.product = response;
    })
  }



}]);

angular.module("app")
	.controller("profileCtrl", ["$scope", "user", "authService", function($scope, user, authService) {
		$scope.user = user;

		$scope.updateUser = function(user) {
			authService.editUser(user)
				.then(function(response) {
					$scope.user = response.data;
				});
		};
	}]);

// INITIALIZE CONTROLLER
// ============================================================
angular.module("app").controller("shopCtrl", ["$scope", "productService", "incartService", "orderService", "$state", function($scope, productService, incartService, orderService, $state) {

  $scope.hideModal = true;
  $scope.hideM = function() {
    $scope.hideModal = !$scope.hideModal;
  }

  $scope.getProduct = function(productid) {
    productService.getProduct(productid).then(function(response) {
      console.log(response.data);
      $scope.singleProduct = response.data[0];
    })
  }

  productService.getProducts().then(function(response) {
    $scope.products = response.data;
  })

  $scope.addToCart = function(productid, qty) {
    console.log(productid, qty);
    incartService.addToCart(productid, qty)
    .catch(function(err) {
        console.log(err);
        alert('Please log in before continuing');
        $state.go('auth')
    })
    .then(function(response) {
      if (response) {
        console.log(response);
        //$state.go('orders');
      }
    })
    .then(orderService.getOrder().then(function(response) {
        console.log(response);
        $scope.cartExtent = response.data.products.length;
      })
    )
  }


  $scope.categoryFilter = function(product) {
    if (product.category === $scope.category || !$scope.category) {
      return product;
    }
    return false;
  }

}]);

angular.module("app").controller("visitCtrl", ["$scope", function($scope) {

}]);
