class CreateFunds < ActiveRecord::Migration
  def change
    create_table :funds do |t|
      t.string :symbol
      t.string :name
      t.integer :fund_id

      t.timestamps
    end

    add_index :funds, :symbol
    add_index :funds, :fund_id
  end
end
