class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find_by_id(params[:id])

    if @user
      render :show
    else
      render status: :not_found,
        json: {
          error: "User not found"
        }
    end
  end

  def stocks
    user = User.find_by_id(params[:id])
    
    if user
      @stocks = user.stocks 
      render json: @stocks
    else
      render status: :not_found,
        json: {
          error: "User not found"
        }
    end
  end

  def funds
    user = User.find_by_id(params[:id])
    
    if user
      @funds = user.funds
      render json: @funds
    else
      render status: :not_found,
        json: {
          error: "User not found"
        }
    end
  end
end
