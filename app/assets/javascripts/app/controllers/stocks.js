'use strict';
angular.module('clearfund.controllers')
.controller('StocksController',
function($scope, Stock) {
  Stock.get().then(function(stocks) {
    $scope.stocks = stocks;
  });

  $scope.addPortfolioStock = function(stock) {
    stock.inPortfolio = true;
  }

  $scope.removePortfolioStock = function(stock) {
    stock.inPortfolio = false;
  }
});

