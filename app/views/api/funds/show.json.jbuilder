json.(@fund, :id, :symbol, :name)
json.inPortfolio (@fund.in_portfolio)
json.sub_funds @fund.funds do |fund|
  json.id          fund.id
  json.symbol      fund.symbol
  json.name        fund.name
  json.inPortfolio fund.inPortfolio
end
json.stocks @stocks do |(stock, holding)|
  json.id          stock.id
  json.ticker      stock.ticker
  json.company     stock.company
  json.price       stock.price
  json.percentage  holding.percentage
  json.inPortfolio stock.in_portfolio
end
