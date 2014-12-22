class PortfolioFund < ActiveRecord::Base
  belongs_to :user
  belongs_to :fund

  validates_uniqueness_of :user_id, :scope => :fund_id
end
