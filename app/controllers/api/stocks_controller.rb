class Api::StocksController < ApplicationController
  respond_to :json

  def index
    @stocks = Stock.all

    if @stocks
      render :index
    else
      render status: :not_found,
        json: {
          error: "Stocks not found"
        }
    end
  end

  def show
    @stock = Stock.find_by_id(params[:id])

    if @stock
      @funds = @stock.funds.zip(@stock.fund_holdings)
      render :show
    else
      render status: :not_found,
        json: {
          error: "Stock #{params[:id]} not found"
        }
    end
  end
end
