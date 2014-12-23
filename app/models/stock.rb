class Stock < ActiveRecord::Base
  validates_uniqueness_of :ticker
  validates_uniqueness_of :company
  attr_accessor :in_portfolio

  has_many :fund_holdings
  has_many :funds, through: :fund_holdings
end
