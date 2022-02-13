class BotResponse < ApplicationRecord
  belongs_to :bot
  validates :pattern, presence: true, length: { maximum: 100 }
  validates :response, presence: true, length: { maximum: 200 }
  validates :channel, presence: true, length: { maximum: 100 }, format: {
    with: /\A\#[A-Za-z0-9\-]+\z/,
    message: "Must be a valid channel name."
  }
  validates :bot, presence: true
end
