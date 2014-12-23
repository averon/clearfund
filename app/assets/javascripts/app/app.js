'use strict'
angular.module('clearfund', [
  'ngRoute',
  'ngCookies',
  'clearfund.controllers',
  'clearfund.services',
  'clearfund.directives',
  'clearfund.resources',
  'clearfund.interceptors'
])
.config(function($routeProvider, $locationProvider) {

  var requireCurrentUser = function($q, $route, $location, AuthService) {
    var d = $q.defer();
    AuthService.currentUser().then(function(user) {
      if (user) {
        d.resolve();
      } else {
        $location.path('/');
      }
    });
  };

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
    .when('/my/home',
      {
        templateUrl: '/templates/myHome.html',
        resolve: {
          user: requireCurrentUser
        }
      })
    .when('/my/stocks',
      {
        templateUrl: '/templates/stocks.html',
        controller: 'MyStocksController',
        resolve: {
          user: requireCurrentUser
        }
      })
    .when('/my/funds',
      {
        templateUrl: '/templates/funds.html',
        controller: 'MyFundsController',
        resolve: {
          user: requireCurrentUser
        }
      })
    .when('/login',
      {
        templateUrl: '/templates/login.html',
        controller: 'LoginController'
      })
    .otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
})
.config(function($httpProvider) {
  $httpProvider.interceptors.push('UserAuthInterceptor');
});


