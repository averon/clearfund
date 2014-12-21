'use strict';
angular.module('clearfund.services', [])
.service('StocksService', function() {
  this.stocks = function(name) {
    var stocks = [
      {
        ticker: "MSFT",
        company: "Microsoft Corp.",
        price: 47
      },
      {
        ticker: "JPM",
        company: "JPMorgan Chase & Co.",
        price: 61
      },
      {
        ticker: "PFE",
        company: "Pfizer Inc.",
        price: 31
      },
      {
        ticker: "WFC",
        company: "Wells Fargo & Co.",
        price: 54
      },
      {
        ticker: "INTC",
        company: "Intel Corp.",
        price: 36
      },
      {
        ticker: "MDT",
        company: "Medtronic Inc.",
        price: 73
      },
      {
        ticker: "C",
        company: "Citigroup Inc.",
        price: 54
      }
    ];

    return stocks;
  };
})
.service('UserService',
  function($rootScope, $q, $cookieStore) {
    var service = this;
    this._user = null;
    this.setCurrentUser = function(u) {
      service._user = u;
      $cookieStore.put('user', u);
      $rootScope.$broadcast("user:set", u);
    };
    this.currentUser = function() {
      var d = $q.defer();
      if (service._user) {
        d.resolve(service._user);
      } else if ($cookieStore.get('user')) {
        service.setCurrentUser($cookieStore.get('user'));
        d.resolve(service._user);
      } else {
        d.resolve(null);
      }
      return d.promise;
    };
    this.login = function(email) {
      var d = $q.defer();
      var user = {
        email: email,
        id: 1
      };
      service.setCurrentUser(user);
      d.resolve(user);
      return d.promise;
    };
    this.logout = function() {
      var d = $q.defer();
      service._user = null;
      $cookieStore.remove('user');
      $rootScope.$broadcast("user:unset");
      d.resolve();
      return d.promise;
    };
  });
