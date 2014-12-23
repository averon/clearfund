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
            if (user) {
              $scope.currentUser = user;
              PortfolioStock.inPortfolio(user, $scope.ngStock).
                then(function(inPortfolio) {
                  $scope.inPortfolio = inPortfolio;
              });
            } else {
              $scope.inPortfolio = false;
            }
          });
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
});
