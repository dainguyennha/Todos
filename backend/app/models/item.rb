class Item < ApplicationRecord
  belongs_to :task


  def update( checked, description)
    update_attribute :checked, checked
    update_attribute :description, description
  end
end
