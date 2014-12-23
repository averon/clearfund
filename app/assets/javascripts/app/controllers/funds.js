'use strict';
angular.module('clearfund.controllers')
.controller('FundsController',
function($scope, Fund, PortfolioFund, UserService) {
  Fund.get().then(function(funds) {
    $scope.funds = funds;
  });

  $scope.addPortfolioFund = function(fund) {
      UserService.currentUser().then(function(user) {
        PortfolioFund.createForUserAndFund(user, fund).then(function() {
          fund.inPortfolio = true;
        });
      })
    }

    $scope.removePortfolioFund = function(fund) {
      UserService.currentUser().then(function(user) {
        PortfolioFund.removePortfolioFund(user, fund).then(function() {
          fund.inPortfolio = false;
        });
      });
    }

});

