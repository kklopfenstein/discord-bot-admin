class Bot < ApplicationRecord
  has_many :bot_responses

  validates :name, presence: true, length: { maximum: 100 }
  validates :token, presence: true, length: { is: 59 }, format: {
    with: /\A[A-Za-z0-9]{24}\.[A-Za-z0-9]{6}\.[A-Za-z0-9]{27}\z/,
    message: "must be a valid token"
  }

  validates_associated :bot_responses
end
