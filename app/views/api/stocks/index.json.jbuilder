json.array! @stocks do |stock|
  json.id      stock.id
  json.ticker  stock.ticker
  json.company stock.company
  json.price   stock.price
end
