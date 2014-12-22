'use strict';
angular.module('clearfund.controllers')
.controller('StockController',
  function($scope, $routeParams, Stock) {
    Stock.get($routeParams.id)
      .then(function(stock) {
        $scope.stock = stock;
        console.log(stock);
      });
});
