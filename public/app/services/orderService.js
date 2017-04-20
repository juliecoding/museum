// INITIALIZE SERVICE
// ============================================================
angular.module("app").service("orderService", function($http) {

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


});
