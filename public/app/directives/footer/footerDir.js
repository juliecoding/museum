angular.module('app').directive('footerDir', function() {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/footer/footerTmpl.html',
    controller: 'footerCtrl'
  };
});
