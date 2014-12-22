class CreatePortfolioStocks < ActiveRecord::Migration
  def change
    create_table :portfolio_stocks do |t|
      t.integer :stock_id
      t.integer :user_id

      t.timestamps
    end

    add_index :portfolio_stocks, :stock_id
    add_index :portfolio_stocks, :user_id
  end
end
