'use strict';
angular.module('clearfund.controllers')
.controller('StocksController',
function($scope, $q, Stock, UserService) {
  $scope.$on('user:unset', function() {
    $scope.currentUser = null;
  });

  $q.all([
    UserService.currentUser(),
    Stock.get()
  ]).then(function(values) {
    $scope.currentUser = values[0];
    $scope.stocks = values[1];
  })
});

