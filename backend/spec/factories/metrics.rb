FactoryBot.define do
  factory :metric do
    value { rand(0..10000)/100.00 }
    name  { Faker::Name.name }
    timestamp { DateTime.parse("2024-02-03") }
  end
end