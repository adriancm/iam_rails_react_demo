# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

if Rails.env.development?
  # Seed tenant databases with random data for demo purposes
  ActiveRecord::Base.configurations.configs_for(env_name: 'development').each do |db_config|

    # I've compared times to determine the optimal size for each slice.
    # Fewer inserts into the database reduce time, but larger arrays increase both time and memory usage.
    Benchmark.bm do |x|
      x.report("Seed DB: #{db_config.name}") do
        ActiveRecord::Base.establish_connection(db_config.name.to_sym)

        # Processes a large amount of data to observe numerous grouped metrics.
        # Generates data lazily to avoid performance issues,
        # as storing a large array in memory could crash the process.
        data = (0..10000).lazy.map do
          {
            name: Faker::Name.name,
            value: rand(0..100),
            timestamp: Faker::Time.between(from: DateTime.now - 10.days, to: DateTime.now)
          }
        end

        # At this point, we actually generate the array in slices.
        # The import library requires an array;
        # however, if we convert 'data.to_a', we lose all the benefits of laziness.
        data.each_slice(500) do |slice|
          Metric.import slice
        end
      end
    end
  end
end

