class Api::PortfolioFundsController < ApplicationController
  before_filter :authenticate_user_from_token!
  respond_to :json

  def index
    @portfolio_stocks = PortfolioStock.where(params.permit(:stock_id, :user_id))
    render :index
  end

  def show
    @portfolio_stock = PortfolioStock.find_by_id(params[:id])
    render :show
  end

  def create
    @portfolio_fund = PortfolioFund.new(portfolio_fund_params)

    if @portfolio_fund.save
      render :show
    else
      render status: :unprocessable_entity,
        json: {
          success: false,
          info: @portfolio_fund.errors, data: {}
        }
    end
  end

  def destroy
    @portfolio_fund = PortfolioFund.find_by_id(params[:id])

    if @portfolio_fund && @portfolio_fund.delete
      render :show
    else
      render status: :unprocessable_entity,
        json: {
          success: false,
          info: @portfolio_fund.errors, data: {}
        }
    end
  end

  private

  def portfolio_fund_params
    params.require(:portfolio_fund).permit(:user_id, :fund_id)
  end
end
