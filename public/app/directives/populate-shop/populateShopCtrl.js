angular.module("app").controller("populateShopCtrl", function($scope, mainService) {

  $scope.product = mainService.product;

  $scope.message = mainService.message;

  $scope.newMessage = "Hi from the controller!"

});
