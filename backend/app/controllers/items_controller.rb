class ItemsController < ApplicationController
  def create
    @task = Task.find_by id: params[:id]
    @item = @task.items.create description: params[:description]
    if @item
      if @task.updateStatus @task.items.where(checked: true).count, @task.items.count
        render json: {item: @item.as_json, task: @task.as_json}
      end
    else
      render json: {status: false}
    end
  end

  def update
    @item = Item.find_by id: params[:id]
    if @item.update params[:checked], params[:description]
      @task = @item.task
      if @task.updateStatus @task.items.where(checked: true).count, @task.items.count
        render json: { item: @item.as_json, task: @task.as_json }
      end
    end
  end

  def destroy
    @item = Item.find_by id: params[:id]
    if @item.destroy
      @task = @item.task
      if @task.updateStatus @task.items.where(checked: true).count, @task.items.count
        render json: {status: true, task: @task.as_json, deletedItem: @item.as_json}
      end
    else
      render json: {status: false}
    end
  end
end
