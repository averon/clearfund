'use strict';
angular.module('clearfund.controllers')
.controller('MyStocksController',
function($scope, UserService, User) {
  UserService.currentUser().then(function(u) {
    User.get(u.id).then(function(user) {
      $scope.user = user;
      $scope.user.stocks()
        .then(function(stocks) {
          $scope.stocks = stocks;
        });
    });
  });

  $scope.reverse = true;
});

