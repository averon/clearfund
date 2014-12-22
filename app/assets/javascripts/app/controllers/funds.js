'use strict';
angular.module('clearfund.controllers')
.controller('FundsController',
function($scope, Fund) {
  Fund.get().then(function(funds) {
    $scope.funds = funds;
  });
});

