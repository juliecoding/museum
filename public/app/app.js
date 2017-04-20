var app = angular.module("app", ['ui.router', 'angular-stripe'])

.config(function($stateProvider, $urlRouterProvider, stripeProvider) {

	stripeProvider.setPublishableKey('pk_test_NptqejbBDylUODHwNCKeqnD8');

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

});
