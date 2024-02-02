class Api::PrivateApiController < ApplicationController
  before_action :authorize
  before_action :set_tenant
end