angular.module("app").controller("accountCtrl", function($scope, userService, orderService) {


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

});
