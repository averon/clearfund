class CreateFundHoldings < ActiveRecord::Migration
  def change
    create_table :fund_holdings do |t|
      t.integer :stock_id
      t.integer :fund_id
      t.float :percentage

      t.timestamps
    end

    add_index :fund_holdings, :stock_id
    add_index :fund_holdings, :fund_id
  end
end
