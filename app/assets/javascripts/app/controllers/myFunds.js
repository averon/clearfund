'use strict';
angular.module('clearfund.controllers')
.controller('MyFundsController',
function($scope, UserService, User) {
  UserService.currentUser().then(function(u) {
    User.get(u.id).then(function(user) {
      $scope.user = user;
      $scope.user.funds()
        .then(function(funds) {
          $scope.funds = funds;
        });
    });
  });

  $scope.reverse = true;
});

