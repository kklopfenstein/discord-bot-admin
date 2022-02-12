require "rails_helper"

RSpec.describe BotResponse, type: :model do
  describe "validations" do
    subject { described_class.new(pattern: pattern, response: response, channel: channel) }
    let(:pattern) { "a pattern" }
    let(:response) { "a response" }
    let(:channel) { "#channel" }

    context "valid" do
      it "is valid" do
        expect(subject.save).to eq(true)
      end
    end

    context "invalid pattern" do
      context "pattern too long" do
        let(:pattern) do
          (0..100).inject { |val, _n| "#{val}a" }
        end

        it "is invalid" do
          expect(subject.save).to eq(false)
        end

        it "has error message" do
          bot_response = subject
          bot_response.save
          expect(bot_response.errors[:pattern]).to include("is too long (maximum is 100 characters)")
        end
      end

      context "pattern is missing" do
        let(:pattern) { nil }

        it "is invalid" do
          expect(subject.save).to eq(false)
        end

        it "has error message" do
          bot_response = subject
          bot_response.save
          expect(bot_response.errors[:pattern]).to include("can't be blank")
        end
      end
    end

    context "invalid response" do
      context "response too long" do
        let(:response) do
          (0..200).inject { |val, _n| "#{val}a" }
        end

        it "is invalid" do
          expect(subject.save).to eq(false)
        end

        it "has error message" do
          bot_response = subject
          bot_response.save
          expect(bot_response.errors[:response]).to include("is too long (maximum is 200 characters)")
        end
      end

      context "response is missing" do
        let(:response) { nil }

        it "is invalid" do
          expect(subject.save).to eq(false)
        end

        it "has error message" do
          bot_response = subject
          bot_response.save
          expect(bot_response.errors[:response]).to include("can't be blank")
        end
      end
    end

    context "invalid channel" do
      context "channel too long" do
        let(:channel) do
          channel = (0..200).inject { |val, _n| "#{val}a" }
          "##{channel}"
        end

        it "is invalid" do
          expect(subject.save).to eq(false)
        end

        it "has error message" do
          bot_response = subject
          bot_response.save
          expect(bot_response.errors[:channel]).to include("is too long (maximum is 100 characters)")
        end
      end

      context "channel incorrect format" do
        let(:channel) { "invalid" }

        it "is invalid" do
          bot_response = subject
          bot_response.save
          expect(bot_response.save).to eq(false)
        end

        it "has error message" do
          bot_response = subject
          bot_response.save
          expect(bot_response.errors[:channel]).to include("Must be a valid channel name.")
        end
      end
    end
  end
end
