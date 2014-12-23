json.array! @portfolio_funds do |portfolio_fund|
  json.id       portfolio_fund.id
  json.fund_id portfolio_fund.fund_id
  json.user_id  portfolio_fund.user_id
end
