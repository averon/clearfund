class CreateStocks < ActiveRecord::Migration
  def change
    create_table :stocks do |t|
      t.string :ticker
      t.string :company
      t.integer :price

      t.timestamps
    end

    add_index :stocks, :ticker
  end
end
