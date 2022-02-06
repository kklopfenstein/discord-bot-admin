require "rails_helper"

RSpec.describe Bot do
  describe "validations" do
    let(:bot) { described_class.new(name: name, token: token) }
    let(:name) { "test" }
    let(:token) { "OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z" }

    context "valid" do
      it "is valid" do
        expect(bot.save).to eq(true)
      end
    end

    context "name is missing" do
      let(:name) { nil }

      it "is not valid" do
        expect(bot.errors).not_to eq(nil)
      end
    end

    context "token format invalid" do
      let(:token) { "OTM532IwNzgyMDEzNDZhhhgwkYd6C6QmPslx7BdYAlmCsTkJDndWHv8be3z" }

      it "is not valid" do
        bot.save
        expect(bot.errors[:token]).to include("must be a valid token")
      end
    end

    context "token wrong length" do
      let(:token) { "123" }

      it "is not valid" do
        bot.save
        expect(bot.errors[:token]).to include("is the wrong length (should be 59 characters)")
      end
    end
  end
end
