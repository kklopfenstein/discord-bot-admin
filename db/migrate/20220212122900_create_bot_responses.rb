class CreateBotResponses < ActiveRecord::Migration[6.1]
  def change
    create_table :bot_responses do |t|
      t.string :pattern
      t.references :bot, foreign_key: true
      t.string :response
      t.string :channel

      t.timestamps
    end
  end
end
