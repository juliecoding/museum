// INITIALIZE SERVICE
// ============================================================
angular.module("app").service("incartService", function($http) {

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



});
