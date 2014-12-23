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
  .factory('PortfolioStock',
     function(railsResourceFactory, $q) {
       var resource = railsResourceFactory({
         url: '/api/portfolio_stocks',
         name: 'portfolio_stock'
       });

       resource.createForUserAndStock = function(user, stock) {
         var portfolioStock = new resource({
           user_id: user.id,
           stock_id: stock.id
         });

         return portfolioStock.save();
       };

       resource.removePortfolioStock = function(user, stock) {
         var portfolioStock = resource.query({
           user_id: user.id,
           stock_id: stock.id
         });

         return portfolioStock.then(function(results) {
           if (results.length > 0) {
             portfolioStock = results[0];
             portfolioStock.delete();
           }
         });
       };

       resource.inPortfolio = function(user, stock) {
         var d = $q.defer();
         var portfolioStock = resource.query({
           user_id: user.id,
           stock_id: stock.id
         });

         portfolioStock.then(function(results) {
           d.resolve(results.length > 0);
         }, function(err) {
           d.reject(err);
         });
         return d.promise;
       };

       return resource;
   })
  .factory('PortfolioFund',
     function(railsResourceFactory, $q) {
       var resource = railsResourceFactory({
         url: '/api/portfolio_funds',
         name: 'portfolio_fund'
       });

       resource.createForUserAndFund = function(user, fund) {
         var portfolioFund = new resource({
           user_id: user.id,
           fund_id: fund.id
         });

         return portfolioFund.save();
       };

       resource.removePortfolioFund = function(user, fund) {
         var portfolioFund = resource.query({
           user_id: user.id,
           fund_id: fund.id
         });

         return portfolioFund.then(function(results) {
           if (results.length > 0) {
             portfolioFund = results[0];
             portfolioFund.delete();
           }
         });
       };

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

