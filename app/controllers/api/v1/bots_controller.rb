class Api::V1::BotsController < ApiController
  before_action :_set_bot, only: [:show, :edit, :update, :destroy]

  def index
    @bots = Bot.all.order(created_at: :desc)
    render json: @bots
  end

  def create
    @bot = Bot.new(_bot_params)

    if @bot.save
      render json: { success: true, id: @bot.id }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def update
    @bot.assign_attributes(_bot_params)

    if @bot.save
      render json: { success: true }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def show
    if @bot.present?
      render json: @bot
    else
      render json: { success: false }, status: :not_found
    end
  end

  private

  def _bot_params
    params.require(:bot).permit(:name, :token)
  end

  def _set_bot
    @bot = Bot.find(params.require(:id))
  end
end
