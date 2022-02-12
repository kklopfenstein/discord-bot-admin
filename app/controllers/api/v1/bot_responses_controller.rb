class Api::V1::BotResponsesController < ApiController
  before_action :_set_bot_response, only: [:show, :edit, :update, :destroy]

  def create
    @bot_response = BotResponse.new(_bot_params)

    if @bot_response.save
      render json: { success: true, id: @bot_response.id }
    else
      render json: @bot_response.errors, status: :unprocessable_entity
    end
  end

  def update
    @bot_response.assign_attributes(_bot_params)

    if @bot_response.save
      render json: { success: true }
    else
      render json: @bot_response.errors, status: :unprocessable_entity
    end
  end

  def show
    if @bot_response.present?
      render json: @bot_response
    else
      render json: { success: false }, status: :not_found
    end
  end

  def destroy
    if @bot_response.present?
      if @bot_response.destroy
        render json: { success: true }
      else
        render json: @bot_response.errors, status: :unprocessable_entity
      end
    else
      render json: { success: false }, status: :not_found
    end
  end

  private

  def _bot_params
    params.require(:bot_response).permit(:bot_id, :response, :pattern, :channel)
  end

  def _set_bot_response
    @bot_response = BotResponse.find_by(id: params.require(:id))
  end
end
