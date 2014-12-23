'use strict';
angular.module('clearfund.directives', [])
.directive('userPanel', function() {
  return {
    templateUrl: '/templates/user_panel.html',
    controller: function($scope, UserService) {
      UserService.currentUser().then(function(currentUser) {
        $scope.currentUser = currentUser;
      });

      $scope.$on('user:set', function(evt, currentUser) {
        $scope.currentUser = currentUser;
      });

      $scope.logout = function() {
        UserService.logout().then(function() {
          $scope.currentUser = null;
        });
      };
    }
  };
})
.directive('pfStockQuickadd', function(UserService, PortfolioStock) {
  return {
    templateUrl: '/templates/pf_stock_quickadd.html',
    link: function($scope) {
      $scope.$on('user:unset', function() {
        $scope.currentUser = null;
      });

      $scope.$watch('ngStock', function(newValue, oldValue) {
        if (newValue) {
          UserService.currentUser().then(function(user) {
            $scope.currentUser = user;
          });
          $scope.inPortfolio = $scope.ngStock.inPortfolio;
        }
      });

      $scope.addPortfolioStock = function(stock) {
        $scope.inPortfolio = true;
        UserService.currentUser().then(function(user) {
          PortfolioStock.createForUserAndStock(user, stock);
        });
      }

      $scope.removePortfolioStock = function(stock) {
        $scope.inPortfolio = false;
        UserService.currentUser().then(function(user) {
          PortfolioStock.removePortfolioStock(user, stock);
        });
      }
    },
    scope: {
      ngStock: '='
    }
  };
})
.directive('pfFundQuickadd', function(UserService, PortfolioFund) {
  return {
    templateUrl: '/templates/pf_fund_quickadd.html',
    link: function($scope) {
      $scope.$on('user:unset', function() {
        $scope.currentUser = null;
      });

      $scope.$watch('ngFund', function(newValue, oldValue) {
        if (newValue) {
          UserService.currentUser().then(function(user) {
            $scope.currentUser = user;
          });
          $scope.inPortfolio = $scope.ngFund.inPortfolio;
        }
      });

      $scope.addPortfolioFund = function(fund) {
        $scope.inPortfolio = true;
        UserService.currentUser().then(function(user) {
          PortfolioFund.createForUserAndFund(user, fund);
        })
      }

      $scope.removePortfolioFund = function(fund) {
        $scope.inPortfolio = false;
        UserService.currentUser().then(function(user) {
          PortfolioFund.removePortfolioFund(user, fund);
        });
      }
    },
    scope: {
      ngFund: '='
    }
  }
});
