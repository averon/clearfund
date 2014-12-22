Rails.application.routes.draw do
  devise_for :users,
    :controllers => {
      registrations: "users/registrations",
      sessions: "users/sessions"
    }
  root 'clearfund#index'

  namespace :api, defaults: { format: :json } do
    resources :stocks, only: [:index, :show]
    resources :funds, only: [:index, :show]
    resources :users, only: [:index, :show]
  end
  get 'api/users/:id/stocks', :to => 'api/users#stocks'
  get 'api/users/:id/funds', :to => 'api/users#funds'

  match '*path' => "clearfund#index", :via => [:get, :post]
end
