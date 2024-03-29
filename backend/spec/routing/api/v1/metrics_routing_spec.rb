require "rails_helper"

RSpec.describe Api::V1::MetricsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/api/v1/metrics").to route_to("api/v1/metrics#index")
    end

    it "routes to #average" do
      expect(get: "/api/v1/metrics/average").to route_to("api/v1/metrics#average")
    end

    it "routes to #show" do
      expect(get: "/api/v1/metrics/1").to route_to("api/v1/metrics#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/api/v1/metrics").to route_to("api/v1/metrics#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/api/v1/metrics/1").to route_to("api/v1/metrics#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/api/v1/metrics/1").to route_to("api/v1/metrics#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/api/v1/metrics/1").to route_to("api/v1/metrics#destroy", id: "1")
    end
  end
end
