class ShopifyProxyController < ActionController::Base
  skip_before_action :verify_authenticity_token

  before_action :validate_request_from_shopify
  before_action :find_current_shop

  private

  # See this article for shopify proxy: https://shopify.dev/apps/online-store/app-proxies
  def validate_request_from_shopify
    query_string = request.query_string
    query_hash = Rack::Utils.parse_query(query_string)
    signature = query_hash.delete("signature")
    sorted_params = query_hash.collect { |k, v| "#{k}=#{Array(v).join(',')}" }.sort.join
    calculated_signature = OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha256'), ENV['SHOPIFY_API_SECRET'], sorted_params)
    render json: {message: 'Invalid signature'}, status: :unauthorized unless ActiveSupport::SecurityUtils.secure_compare(signature, calculated_signature)
  end

  def find_current_shop
    @current_shop = Shop.find_by(shopify_domain: params[:shop])
    render json: {message: 'Shop does not exist'}, status: :unauthorized unless @current_shop.present?
  end

end
