json.(@stock, :id, :ticker, :company, :price)
json.inPortfolio (@stock.in_portfolio)

json.funds @funds do |(fund, holding)|
  json.id          fund.id
  json.symbol      fund.symbol
  json.name        fund.name
  json.percentage  holding.percentage
  json.inPortfolio fund.in_portfolio
end
