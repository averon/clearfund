class Api::FundsController < ApplicationController
  respond_to :json

  def index
    @funds = Fund.all

    if @funds
      render :index
    else
      render status: :not_found,
        json: {
          error: "Funds not found"
        }
    end
  end

  def show
    @fund = Fund.find_by_id(params[:id])

    if @fund
      @stocks = @fund.stocks.zip(@fund.fund_holdings)
      render :show
    else
      render status: :not_found,
        json: {
          error: "Fund #{params[:id]} not found"
        }
    end
  end
end
