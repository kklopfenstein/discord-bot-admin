require "rails_helper"

RSpec.describe "Api::V1::Bots", type: :request do
  let(:name) { "test" }
  let(:token) { "OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z" }

  let!(:bot) { Bot.create(name: name, token: token) }

  describe "GET /api/v1/bots" do
    subject do
      headers = { "ACCEPT": "application/json" }
      get "/api/v1/bots", headers: headers
    end

    it "succeeds" do
      subject
      expect(response.content_type).to eq("application/json; charset=utf-8")
      expect(response).to have_http_status(:ok)
    end

    context "with data" do
      it "returns data" do
        subject
        expect(response).not_to eq(nil)
        json = JSON.parse(response.body)
        expect(json.length).to eq(1)

        result_bot = json[0]
        expect(result_bot["id"]).to eq(bot.id)
        expect(result_bot["name"]).to eq(name)
        expect(result_bot["token"]).to eq(token)
      end
    end
  end

  describe "POST /api/v1/bots" do
    subject do
      headers = { "ACCEPT": "application/json" }
      post "/api/v1/bots", params: params, headers: headers
    end

    let(:params) do
      {
        bot: {
          name: name,
          token: token
        }
      }
    end

    it "creates bot" do
      subject
      last_bot = Bot.order(created_at: :desc).first
      expect(last_bot).to have_attributes(params[:bot])
    end

    context "with invalid data" do
      let(:params) do
        {
          bot: {
            name: name,
            token: "invalid"
          }
        }
      end

      it "returns unprocessable_entity" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "does not create a record" do
        expect { subject }.not_to(change { Bot.count })
      end
    end
  end

  describe "PUT /api/v1/bots/:id" do
    subject do
      headers = { "ACCEPT": "application/json" }
      put "/api/v1/bots/#{bot.id}", params: params, headers: headers
    end

    let(:new_name) { "new name" }
    let(:new_token) { "BTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z" }

    let(:params) do
      {
        bot: {
          id: bot.id,
          name: new_name,
          token: new_token
        }
      }
    end

    it "updates the bot" do
      subject
      bot.reload
      expect(bot).to have_attributes(params[:bot])
    end

    context "with invalid data" do
      let(:params) do
        {
          bot: {
            id: bot.id,
            name: name,
            token: "invalid"
          }
        }
      end

      it "returns unprocessable_entity" do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "does not create a record" do
        expect { subject }.not_to(change { Bot.count })
      end
    end
  end

  describe "GET /api/v1/bots/:id" do
    subject do
      headers = { "ACCEPT": "application/json" }
      get "/api/v1/bots/#{bot.id}", headers: headers
    end

    let(:expected_data) do
      {
        id: bot.id,
        name: name,
        token: token
      }
    end

    it "returns result" do
      subject
      response_data = JSON.parse(response.body).symbolize_keys
      expect(response_data[:id]).to eq(expected_data[:id])
      expect(response_data[:name]).to eq(expected_data[:name])
      expect(response_data[:token]).to eq(expected_data[:token])
    end
  end
end
