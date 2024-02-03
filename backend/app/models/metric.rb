class Metric < ApplicationRecord

  validates_presence_of :name, :timestamp, :value

end
