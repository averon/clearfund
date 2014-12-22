class Fund < ActiveRecord::Base
  validates_uniqueness_of :symbol

  has_many :funds
  has_many :fund_holdings
  has_many :stocks, through: :fund_holdings
end
