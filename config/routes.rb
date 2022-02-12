Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :bots, only: [:index, :create, :update, :show]
      get "bot_manage/:id", to: "bot_manage#show"
      put "bot_manage/:id/start", to: "bot_manage#start"
      put "bot_manage/:id/stop", to: "bot_manage#stop"
      resources :bot_responses, only: [:create, :update, :show, :destroy]
    end
  end

  root "home#index"

  get "*path", action: :index, controller: "home", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
