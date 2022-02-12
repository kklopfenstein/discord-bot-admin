require "rails_helper"

RSpec.describe "Api::V1::BotManageController", type: :request do
  describe "GET /bot_manage/:id" do
    subject do
      headers = { "ACCEPT": "application/json" }
      get "/api/v1/bot_manage/#{bot.id}", headers: headers
    end

    let(:name) { "test" }
    let(:token) { "OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z" }
    let!(:bot) { Bot.create(name: name, token: token) }

    it "succeeds" do
      subject
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(:ok)
    end

    context "with data" do
      it "returns data" do
        subject
        expect(response).not_to eq(nil)
        result_bot = JSON.parse(response.body)

        expect(result_bot["started"]).to eq(false)
      end
    end
  end

  describe "PUT /bot_manage/:id/start" do
    subject do
      headers = { "ACCEPT": "application/json" }
      put "/api/v1/bot_manage/#{bot_id}/start", headers: headers
    end

    let(:bot_id) { "1" }

    it "succeeds and calls BotService.start" do
      expect(BotService).to receive(:start).with(bot_id).and_return(success: true)
      subject
      expect(response).to have_http_status(:ok)
    end

    it "returns not_found if bot id not found" do
      expect(BotService).to receive(:start).with(bot_id).and_return(success: false, message: "Not found.")
      subject
      expect(response).to have_http_status(:not_found)
    end

    it "returns bad_request if bot already started" do
      expect(BotService).to receive(:start).with(bot_id).and_return(success: false, message: "Already started.")
      subject
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe "PUT /bot_manage/:id/stop" do
    subject do
      headers = { "ACCEPT": "application/json" }
      put "/api/v1/bot_manage/#{bot_id}/stop", headers: headers
    end

    let(:bot_id) { "1" }

    it "succeeds and calls BotService.stop" do
      expect(BotService).to receive(:stop).with(bot_id).and_return(success: true)
      subject
      expect(response).to have_http_status(:ok)
    end

    it "returns not_found if bot id not found" do
      expect(BotService).to receive(:stop).with(bot_id).and_return(success: false, message: "Not found.")
      subject
      expect(response).to have_http_status(:not_found)
    end

    it "returns bad_request if bot already stopped" do
      expect(BotService).to receive(:stop).with(bot_id).and_return(success: false, message: "Already started.")
      subject
      expect(response).to have_http_status(:bad_request)
    end
  end
end
