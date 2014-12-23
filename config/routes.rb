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
    resources :portfolio_stocks, except: [:update, :edit]
    resources :portfolio_funds, except: [:update, :edit]
  end
  get 'api/users/:id/stocks', :to => 'api/users#stocks'
  get 'api/users/:id/funds', :to => 'api/users#funds'

  match '*path' => "clearfund#index", :via => [:get, :post]
end
