class Api::V1::MetricsController < Api::PrivateApiController

  before_action :set_metric, only: %i[ show update destroy ]
  before_action :set_page, only: %i[ index average ]
  before_action

  # GET /metrics
  def index
    @metrics = Metric.page(@page)

    # TODO: Serializers are more powerful (e.g. jsonapi, active_model_serializers, etc.)
    render json: @metrics
  end

  def average
    @metrics = ::MetricAverageCalculator.call(period: time_period).page(@page)

    # TODO: Serializers are more powerful (e.g. jsonapi, active_model_serializers, etc.)
    render json: @metrics
  end

  # GET /metrics/1
  def show
    render json: @metric
  end

  # POST /metrics
  def create
    @metric = Metric.new(metric_params)

    if @metric.save
      render json: @metric, status: :created, location: @metric
    else
      render json: @metric.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /metrics/1
  def update
    if @metric.update(metric_params)
      render json: @metric
    else
      render json: @metric.errors, status: :unprocessable_entity
    end
  end

  # DELETE /metrics/1
  def destroy
    @metric.destroy!
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_metric
    @metric = Metric.find(params[:id])
  end

  def set_page
    @page = params[:page]
  end

  def time_period
    params[:time_period]
  end

  # Only allow a list of trusted parameters through.
  def metric_params
    params.require(:metric).permit(:name, :value, :timestamp)
  end
end
