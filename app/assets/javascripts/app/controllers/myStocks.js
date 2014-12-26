'use strict';
angular.module('clearfund.controllers')
.controller('MyStocksController',
function($scope, UserService, User) {
  User.query({id: UserService.currentUser.id})
    .then(function(users){
      $scope.user = users[0];
      $scope.user.stocks()
        .then(function(stocks) {
          $scope.stocks = stocks;
        });
    });

  $scope.reverse = true;
});

