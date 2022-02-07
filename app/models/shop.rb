# frozen_string_literal: true
class Shop < ActiveRecord::Base
  include ShopifyApp::ShopSessionStorageWithScopes

  has_one :notification, dependent: :destroy

  def api_version
    ShopifyApp.configuration.api_version
  end
end
