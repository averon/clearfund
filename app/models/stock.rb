class Stock < ActiveRecord::Base
  validates_uniqueness_of :ticker
  validates_uniqueness_of :company

  has_many :fund_holdings
  has_many :funds, through: :fund_holdings
end
