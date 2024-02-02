class ApplicationController < ActionController::API
  include Secured
  include Tenantable
end
