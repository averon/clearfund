json.(@stock, :id, :ticker, :company, :price)
json.funds @funds do |(fund, holding)|
  json.id         fund.id
  json.symbol     fund.symbol
  json.name       fund.name
  json.percentage holding.percentage
end
