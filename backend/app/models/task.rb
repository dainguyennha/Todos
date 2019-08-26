class Task < ApplicationRecord
  has_many :items, :dependent => :destroy

  def updateTask title, description
    update_attribute :title,  title
    update_attribute :description, description
  end

  def updateStatus checked_item, total_item
    if checked_item == total_item && checked_item != 0
      update_attribute :checked, true
    else
      update_attribute :checked, false
    end
    update_attribute :checked_item, checked_item
    update_attribute :total_item, total_item
  end
end
