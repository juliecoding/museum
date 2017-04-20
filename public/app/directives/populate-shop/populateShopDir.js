angular.module("app").directive('populateShop', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/populate-shop/populateShopTmpl.html',
    controller: 'populateShopCtrl'
  }
});
