class Api::V1::BotManageController < ApiController
  def show
    started = BotService.started?(params.require(:id))

    response = {
      started: started
    }

    render json: response
  end

  def start
    response = BotService.start(params.require(:id))

    if response[:success]
      render json: response
    elsif response[:message] == "Not found."
      render json: response, status: :not_found
    else
      render json: response, status: :bad_request
    end
  end

  def stop
    response = BotService.stop(params.require(:id))

    if response[:success]
      render json: response
    elsif response[:message] == "Not found."
      render json: response, status: :not_found
    else
      render json: response, status: :bad_request
    end
  end
end
