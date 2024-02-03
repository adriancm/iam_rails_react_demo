  class MetricAverageCalculator

    TIME_PERIODS = {
      per_minute: '%Y-%m-%d %H:%M',
      per_hour: '%Y-%m-%d %H',
      per_day: '%Y-%m-%d'
    }.freeze

    attr_accessor :period
    def initialize(period:)
      @period = period&.downcase&.to_sym || TIME_PERIODS.keys.first
      @query = Metric
    end

    def call
      query
    end

    def query
      Metric.select("round(avg(value), 2) avg, strftime('#{time_format}', timestamp) period_timestamp").group('period_timestamp')
    end

    def time_format
      raise "Not valid time period: #{period}" unless TIME_PERIODS.keys.include? period
      TIME_PERIODS[period]
    end

    class << self
      def call(**kargs)
        new(**kargs).call
      end
    end

  end
