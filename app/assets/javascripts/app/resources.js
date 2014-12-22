'use strict';
angular.module('clearfund.resources', ["rails"])
  .factory('Stock',
    function(railsResourceFactory, $q) {
      var resource = railsResourceFactory({
        url: '/api/stocks',
        name: 'stock'
      });

      return resource;
    })
  .factory('Fund',
    function(railsResourceFactory, $q) {
      var resource = railsResourceFactory({
        url: '/api/funds',
        name: 'fund'
      });

      return resource;
    })
  .factory('User',
    function(railsResourceFactory, $q, Stock, Fund) {
      var resource = railsResourceFactory({
        url: '/api/users',
        name: 'user'
      });

      resource.prototype.stocks = function() {
        var self = this;
        return resource.$get(self.$url('stocks'))
                 .then(function(stocks) {
                   self.stocks = stocks;
                   return self.stocks;
                 });
      }

      resource.prototype.funds = function() {
        var self = this;
        return resource.$get(self.$url('funds'))
                 .then(function(funds) {
                   self.funds = funds;
                   return self.funds;
                 });
      }

      return resource;
    })

