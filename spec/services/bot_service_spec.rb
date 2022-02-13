require "rails_helper"

RSpec.describe BotService do
  let(:name) { "test" }
  let(:token) { "OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z" }
  let!(:bot) { Bot.create(name: name, token: token) }
  let(:response) { "test response" }
  let(:pattern) { "pattern" }
  let(:channel) { "#channel" }
  let!(:bot_response) { BotResponse.create(response: response, channel: channel, pattern: pattern, bot: bot) }
  let(:id) { bot.id }
  let(:discord_bot) { double("bot") }

  before do
    allow(Discordrb::Bot).to receive(:new).and_return(discord_bot)
  end

  describe "#start" do
    subject { described_class.start(id) }

    before do
      allow(discord_bot).to receive(:connected?).and_return(true)
      allow(discord_bot).to receive(:stop)
    end

    after do
      described_class.stop(id)
    end

    it "initializes bot and calls message, and run" do
      expect(discord_bot).to receive(:message).with(containing: pattern, channel: channel)
      expect(discord_bot).to receive(:run).once
      expect(subject).to eq(success: true)
    end

    context "bot does not exist" do
      let(:bot) { nil }
      let(:id) { 1 }

      it "returns unsuccessful result with not found message" do
        expect(discord_bot).not_to receive(:message)
        expect(subject).to eq(message: "Not found.", success: false)
      end
    end

    context "bot already started" do
      before do
        allow(discord_bot).to receive(:message)
        allow(discord_bot).to receive(:run)
        described_class.start(id)
      end

      it "returns unsuccessful result with message that bot is already started" do
        allow(discord_bot).to receive(:connected?).and_return(true)
        expect(subject).to eq(message: "Already started.", success: false)
      end
    end
  end

  describe "#started?" do
    subject { described_class.started?(id) }

    context "bot doesn't exist" do
      let(:bot) { nil }
      let(:id) { nil }

      it "returns false" do
        expect(subject).to eq(false)
      end
    end

    context "bot not already started" do
      before do
        allow(discord_bot).to receive(:message)
        allow(discord_bot).to receive(:run)
        described_class.start(id)
      end

      after do
        allow(discord_bot).to receive(:stop)
        described_class.stop(id)
      end

      it "returns true" do
        allow(discord_bot).to receive(:connected?).and_return(true)
        expect(subject).to eq(true)
      end
    end
  end

  describe "#stop" do
    subject { described_class.stop(id) }

    context "bot doesn't exist" do
      let(:bot) { nil }
      let(:id) { nil }

      it "returns false with not found message" do
        expect(subject).to eq(message: "Not found.", success: false)
      end
    end

    context "bot already stopped" do
      before do
        allow(discord_bot).to receive(:message)
        allow(discord_bot).to receive(:run)
        allow(discord_bot).to receive(:stop)
        described_class.start(id)
        described_class.stop(id)
      end

      it "returns false with already stopped message" do
        expect(subject).to eq(message: "Already stopped.", success: false)
      end
    end
  end
end
