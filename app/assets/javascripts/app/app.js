'use strict'
angular.module('clearfund', [
  'ngRoute',
  'ngCookies',
  'clearfund.controllers',
  'clearfund.services',
  'clearfund.directives',
  'clearfund.resources'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/',
      {
        templateUrl: '/templates/index.html'
      })
    .when('/stocks',
      {
        templateUrl: '/templates/stocks.html',
        controller: 'StocksController'
      })
    .when('/stock/:id',
      {
        templateUrl: '/templates/stock.html',
        controller: 'StockController'
      })
    .when('/funds',
      {
        templateUrl: '/templates/funds.html',
        controller: 'FundsController'
      })
    .when('/fund/:id',
      {
        templateUrl: '/templates/fund.html',
        controller: 'FundController'
      })
    .when('/my/stocks',
      {
        templateUrl: '/templates/stocks.html',
        controller: 'MyStocksController'
      })
    .when('/my/funds',
      {
        templateUrl: '/templates/funds.html',
        controller: 'MyFundsController'
      })
    .when('/login',
      {
        templateUrl: '/templates/login.html',
        controller: 'LoginController'
      })
    .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
})


