json.array! @funds do |fund|
  json.id          fund.id
  json.symbol      fund.symbol
  json.name        fund.name
  json.inPortfolio fund.in_portfolio
end
