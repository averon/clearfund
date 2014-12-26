class Api::FundsController < ApplicationController
  respond_to :json

  def index
    if current_user
      portfolio_funds = @current_user.funds

      portfolio_ids = portfolio_funds.pluck('id')

      unheld_funds = Fund.where.not({id: portfolio_ids})
                         .each { |f| f.in_portfolio = false }

      portfolio_funds.each { |f| f.in_portfolio = true }

      @funds = portfolio_funds + unheld_funds
      render :index
    else
      @funds = Fund.all
      @funds.each { |fund| fund.in_portfolio = false }
      render :index
    end
  end

  def show
    if current_user
      @fund = @current_user.funds.find_by_id(params[:id])
      @fund && @fund.in_portfolio = true
    end

    @fund ||= Fund.find_by_id(params[:id])

    if @fund
      @fund.in_portfolio ||= false
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

