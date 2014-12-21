'use strict';
angular.module('clearfund.controllers')
.controller('StockController',
  function($scope, $routeParams, StocksService) {
    $scope.stocks = StocksService.stocks();
    $scope.stock = _.find($scope.stocks,
      function(s) {
        return s.ticker == $routeParams.ticker;
      });
});
