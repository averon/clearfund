class Api::PortfolioStocksController < ApplicationController
  respond_to :json

  def index
    @portfolio_stocks = PortfolioStock.where(params.permit(:stock_id, :user_id))
    render :index
  end

  def show
    @portfolio_stock = 
      PortfolioStock.where(ticker: params[:ticker]).first ||
      PortfolioStock.where(id: params[:id]).first
    render :show
  end

  def create
    @portfolio_stock = PortfolioStock.new(portfolio_stock_params)

    if @portfolio_stock.save
      render :show
    else
      render status: :unprocessable_entity,
        json: {
          success: false,
          info: @portfolio_stock.errors, data: {}
        }
    end
  end

  def destroy
    @portfolio_stock = PortfolioStock.find_by_id(params[:id])

    if @portfolio_stock && @portfolio_stock.delete
      render :show
    else
      render status: :unprocessable_entity,
        json: {
          success: false,
          info: @portfolio_stock.errors, data: {}
        }
    end
  end

  private

  def portfolio_stock_params
    params.require(:portfolio_stock).permit(:user_id, :stock_id)
  end
end
