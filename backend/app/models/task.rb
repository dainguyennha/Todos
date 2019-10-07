class Task < ApplicationRecord
  has_many :items, :dependent => :destroy


  def as_json
  # this example DOES NOT ignore the user's options
    super({:only => [:id, :title, :description, :checked, :total_item, :checked_item]})
  end

  def addTask title
    create(title: title).task_model
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
