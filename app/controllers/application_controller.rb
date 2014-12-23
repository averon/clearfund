class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  protected

  def verified_request?
    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  end

  private

  def current_user
    user_id = params[:auth_user_id].presence
    user = user_id && User.find_by_id(user_id)

    @current_user = user if user &&
      Devise.secure_compare(user.authentication_token, params[:auth_token])
  end

  def authenticate_user_from_token!
    current_user || permission_denied
  end

  def permission_denied
    render :file => "public/401.html", :status => :unauthorized, :layout => false
  end
end
