// INITIALIZE CONTROLLER
// ============================================================
angular.module("app").controller("productCtrl", function($scope, productService) {


  $scope.getProduct = function(productid) {
    productService.getProduct(productid).then(function(response) {
      $scope.product = response;
    })
  }



});
