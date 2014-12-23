'use strict';
angular.module('clearfund.controllers')
.controller('MyFundsController',
function($scope, UserService, User) {
  User.get(UserService.currentUser.id)
    .then(function(user){
      $scope.user = user[0];
      $scope.user.funds()
        .then(function(funds) {
          $scope.funds = funds;
        });
    });

});

