# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::Authenticated

  def current_shop
    shop_domain = ShopifyAPI::Shop.current.domain
    Shop.find_by(shopify_domain: shop_domain)
  end
end
