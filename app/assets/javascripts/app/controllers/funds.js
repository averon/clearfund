'use strict';
angular.module('clearfund.controllers')
.controller('FundsController',
function($scope, $q, Fund, UserService) {
  $scope.$on('user:unset', function() {
    $scope.currentUser = null;
  });

  $q.all([
    UserService.currentUser(),
    Fund.get()
  ]).then(function(values) {
    $scope.currentUser = values[0];
    $scope.funds = values[1];
  });

  $scope.reverse = true;
});

