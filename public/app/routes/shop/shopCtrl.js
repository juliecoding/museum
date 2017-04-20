// INITIALIZE CONTROLLER
// ============================================================
angular.module("app").controller("shopCtrl", function($scope, productService, incartService, orderService, $state) {

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

});
