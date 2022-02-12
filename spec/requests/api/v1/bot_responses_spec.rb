require "rails_helper"

RSpec.describe "Api::V1::BotResponsesController", type: :request do
  let(:name) { "test" }
  let(:token) { "OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z" }

  let!(:bot) { Bot.create(name: name, token: token) }

  let!(:bot_response) do
    BotResponse.create(
      bot_id: bot.id,
      response: bot_response_response,
      pattern: bot_response_pattern,
      channel: bot_response_channel
    )
  end

  let(:bot_response_response) { "test" }
  let(:bot_response_pattern) { "pattern" }
  let(:bot_response_channel) { "#general" }
  let(:bot_response_id) { bot_response.id }

  describe "GET /api/v1/bot_responses/:id" do
    subject do
      headers = { "ACCEPT": "application/json" }
      get "/api/v1/bot_responses/#{bot_response_id}", headers: headers
    end

    it "returns data" do
      subject
      body = JSON.parse(response.body)

      expect(body["response"]).to eq(bot_response_response)
      expect(body["pattern"]).to eq(bot_response_pattern)
      expect(body["channel"]).to eq(bot_response_channel)
    end

    context "bot that does not exist" do
      let(:bot_response) { nil }
      let(:bot_response_id) { 1 }

      it "returns not_found response" do
        subject
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "POST /api/v1/bot_responses" do
    subject do
      headers = { "ACCEPT": "application/json" }
      post "/api/v1/bot_responses", params: params, headers: headers
    end

    let(:params) do
      {
        bot_response: {
          response: bot_response_response,
          pattern: bot_response_pattern,
          channel: bot_response_channel,
          bot_id: bot.id
        }
      }
    end

    it "returns successful result and creates bot" do
      subject
      body = JSON.parse(response.body)
      expect(body["success"]).to eq(true)
      expect(BotResponse.order(created_at: :desc).first).to have_attributes(params[:bot_response])
    end

    context "invalid data" do
      let(:bot_response_channel) { "invalid channel" }

      it "returns unprocessable_entity response" do
        expect { subject }.not_to(change { BotResponse.count })
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
