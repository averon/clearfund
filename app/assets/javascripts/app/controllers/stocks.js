'use strict';
angular.module('clearfund.controllers')
.controller('StocksController',
function($scope, StocksService) {
  $scope.stocks = StocksService.stocks();

  $scope.user = {
    name: "Rob"
  };
});

