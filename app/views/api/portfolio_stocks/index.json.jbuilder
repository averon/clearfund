json.array! @portfolio_stocks do |portfolio_stock|
  json.id       portfolio_stock.id
  json.stock_id portfolio_stock.stock_id
  json.user_id  portfolio_stock.user_id
end
