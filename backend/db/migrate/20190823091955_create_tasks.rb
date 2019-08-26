class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :description
      t.boolean :checked, default: false
      t.integer :total_item, default: 0
      t.integer :checked_item, default: 0

      t.timestamps
    end
  end
end
