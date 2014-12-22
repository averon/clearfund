'use strict';
angular.module('clearfund.controllers')
.controller('PortfolioController',
function($scope, User, UserService) {
  User.get(UserService.currentUser.id).then(function(user) {
    $scope.funds  = user.funds;
    $scope.stocks = user.stocks;
  });
});

