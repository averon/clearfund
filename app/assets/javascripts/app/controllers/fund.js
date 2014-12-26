'use strict';
angular.module('clearfund.controllers')
.controller('FundController',
  function($scope, $routeParams, Fund) {
    Fund.get($routeParams.id)
      .then(function(fund) {
        $scope.fund = fund;
      });

    $scope.reverse = true;
});
