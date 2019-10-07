class Item < ApplicationRecord
  belongs_to :task

  def as_json
  # this example DOES NOT ignore the user's options
    super({:only => [:id, :description, :checked, :task_id]})
  end


  def update( checked, description)
    update_attribute :checked, checked
    update_attribute :description, description
  end
end
