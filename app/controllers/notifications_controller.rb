# frozen_string_literal: true

class NotificationsController < AuthenticatedController
  skip_before_action :verify_authenticity_token

  def index
    notification = current_shop.notification
    render json: {notification: notification.as_json}, status: :ok
  end

  def create
    notification = current_shop.create_notification(notification_params)

    if notification.save
      render json: {message: "Notification created successfully"}, status: :created
    else
      render json: {message: "Notification not created", errors: notification.errors.full_messages}, status: :bad_request
    end
  end

  private def notification_params
    params.require(:notification).permit(:title, :color, :background_color)
  end
end
