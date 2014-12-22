class FundHolding < ActiveRecord::Base
  belongs_to :stock
  belongs_to :fund

  validates_uniqueness_of :stock_id, :scope => :fund_id
end
