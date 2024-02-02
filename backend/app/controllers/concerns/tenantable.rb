module Tenantable
  extend ActiveSupport::Concern

  private

  def set_tenant
    ActiveRecord::Base.establish_connection(request.headers['HTTP_TENANT_ID'].to_sym)
  end

end