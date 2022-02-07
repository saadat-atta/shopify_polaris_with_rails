Rails.application.routes.draw do
  root :to => 'home#index'
  get '/products', :to => 'products#index'
  namespace :shopify_proxy do

    get '/notifications',:to => 'notifications#index'
  end
  resources :notifications
  mount ShopifyApp::Engine, at: '/'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
