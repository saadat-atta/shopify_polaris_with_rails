# frozen_string_literal: true

class ShopifyProxy::NotificationsController < ShopifyProxyController

  def index
    notification = @current_shop.notification
    render json: {notification: notification.as_json}, status: :ok
  end
end
