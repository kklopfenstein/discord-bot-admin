Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :bots, only: [:index, :create, :update, :show]
    end
  end

  root "home#index"

  get "*path", action: :index, controller: "home", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
