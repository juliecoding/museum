angular.module("app").controller("ordersCtrl", function($scope, stripe, $http, $state, orderService, incartService) {

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

});
