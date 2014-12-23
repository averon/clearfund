class Api::PortfolioFundsController < ApplicationController
  respond_to :json

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
end
