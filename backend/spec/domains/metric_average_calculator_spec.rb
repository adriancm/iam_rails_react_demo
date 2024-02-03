require 'rails_helper'

RSpec.describe MetricAverageCalculator, type: :domain do

  before(:each) do
    @metric_list = create_list :metric, 3
    @avg = (@metric_list.sum(&:value) / @metric_list.size).to_f.round(2)
  end

  let!(:klass) do
    MetricAverageCalculator
  end

  context "per_day" do
    it "returns successfully" do
      metrics = klass.call(period: :per_day)
      expect(metrics.first.avg).to eq(@avg)
      expect(metrics.first.period_timestamp).to eq("2024-02-03")
    end
  end

  context "per_minute" do
    it "returns successfully" do
      metrics = klass.call(period: :per_minute)
      expect(metrics.first.avg).to eq(@avg)
      expect(metrics.first.period_timestamp).to eq("2024-02-03 00:00")
    end
  end

  context "per_hour" do
    it "returns successfully" do
      metrics = klass.call(period: :per_hour)
      expect(metrics.first.avg).to eq(@avg)
      expect(metrics.first.period_timestamp).to eq("2024-02-03 00")
    end
  end
end