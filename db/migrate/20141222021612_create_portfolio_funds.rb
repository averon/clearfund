class CreatePortfolioFunds < ActiveRecord::Migration
  def change
    create_table :portfolio_funds do |t|
      t.integer :fund_id
      t.integer :user_id

      t.timestamps
    end

    add_index :portfolio_funds, :fund_id
    add_index :portfolio_funds, :user_id
  end
end
