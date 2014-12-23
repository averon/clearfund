class Api::UsersController < ApplicationController
  before_filter :authenticate_user_from_token!, :only => [:show, :stocks, :funds]

  def index
    @users = User.all
    render :index
  end

  def show
    return permission_denied unless params[:id].to_s == @current_user.id.to_s
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
    return permission_denied unless params[:id].to_s == @current_user.id.to_s
    
    @stocks = @current_user.stocks 
    @stocks.each { |s| s.in_portfolio = true }
    render :stocks
  end

  def funds
    return permission_denied unless params[:id].to_s == @current_user.id.to_s
    
    @funds = @current_user.funds
    @funds.each { |f| f.in_portfolio = true }
    render :funds
  end
end
