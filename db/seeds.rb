# This file should contain all the record creation needed to seed the database with its default values.  # The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
require 'csv'

def create_stocks
  stock_batch = []

  CSV.foreach(File.dirname(__FILE__) + "/seed_data/All Stocks.csv") do |row|
    stock = row[0].split("\t")[1..2]
    stock_batch << { ticker: stock[1], company: stock[0] }    
    puts "#{stock[1]} created!"
    
    if stock_batch.size > 99
      Stock.create(stock_batch)
      stock_batch.clear
      puts "--Batch shipped!"
    end
  end
end

def create_funds
  remove_header = true

  current_fund = Fund.new 
  CSV.foreach(File.dirname(__FILE__) + "/seed_data/Vanguard Base Funds.csv") do |row|
    if remove_header
      remove_header = false
      next
    end

    unless current_fund.name == row[0]
      current_fund = Fund.create!(symbol: row[1], name: row[0])
      puts "#{current_fund.name} created!"
    end

    current_stock = Stock.find_by_ticker(row[4])
    current_stock && current_stock.update!(price: row[6])
    current_stock ||= Stock.create!(ticker: row[4], company: row[3], price: row[6])

    new_holding = current_fund.fund_holdings.create!(stock_id: current_stock.id)
    new_holding.update!(percentage: row[5])
    puts "#{current_stock.ticker} added to #{current_fund.symbol}!"
  end
end

#create_stocks
create_funds
