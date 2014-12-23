class Api::StocksController < ApplicationController
  respond_to :json

  def index
    if current_user
      portfolio_stocks = @current_user.stocks

      portfolio_ids = portfolio_stocks.pluck('id')

      unheld_stocks = Stock.where.not({id: portfolio_ids})
                        .each { |s| s.in_portfolio = false }

      portfolio_stocks.each { |s| s.in_portfolio = true }

      @stocks = portfolio_stocks + unheld_stocks
      render :index
    else
      @stocks = Stock.all
      @stocks.each { |stock| stock.in_portfolio = false }
      render :index
    end
  end

  def show
    if current_user
      @stock = @current_user.stocks.find_by_id(params[:id])
      @stock && @stock.in_portfolio = true
    end

    @stock ||= Stock.find_by_id(params[:id])

    if @stock
      @stock.in_portfolio ||= false
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
