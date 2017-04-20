angular.module("app").service("productService", function($http) {

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

});
