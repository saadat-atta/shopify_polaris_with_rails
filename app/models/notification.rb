class Notification < ApplicationRecord
  belongs_to :shop

  validates_presence_of :title, :color, :background_color

end
