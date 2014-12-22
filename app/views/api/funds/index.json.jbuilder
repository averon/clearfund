json.array! @funds do |fund|
  json.id     fund.id
  json.symbol fund.symbol
  json.name   fund.name
end
