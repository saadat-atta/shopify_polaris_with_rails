class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.string :title
      t.string :color
      t.string :background_color
      t.references :shop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
