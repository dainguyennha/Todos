Rails.application.routes.draw do
  get 'api/status', to: 'application#status'
  resources :tasks
  resources :items, only: [:update, :destroy]
  post 'items/:id', to: 'items#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
