'use strict'
angular.module('clearfund', [
  'ngRoute',
  'ngCookies',
  'clearfund.controllers',
  'clearfund.services',
  'clearfund.directives'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/',
      {
        templateUrl: '/templates/stocks.html',
        controller: 'StocksController'
      })
    .when('/stock/:ticker',
      {
        templateUrl: '/templates/stock.html',
        controller: 'StockController'
      })
    .when('/login',
      {
        templateUrl: '/templates/login.html',
        controller: 'LoginController'
      })
    .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
})


