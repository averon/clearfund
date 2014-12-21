Rails.application.routes.draw do
  root 'clearfund#index'
  match '*path' => "clearfund#index", :via => [:get, :post]
end
