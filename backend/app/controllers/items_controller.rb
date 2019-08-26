class ItemsController < ApplicationController
  def create
    @task = Task.find_by id: params[:id]
    if @task.items.create description: params[:description]
      if @task.updateStatus @task.items.where(checked: true).count, @task.items.count
        render json: @task.items.last
      end
    else
      render json: {status: false}
    end
  end

  def update
    @item = Item.find_by id: params[:id]
    if @item.update params[:checked], params[:detail]
      @task = @item.task
      if @task.updateStatus @task.items.where(checked: true).count, @task.items.count
        render json: @item
      end
    end
  end

  def destroy
    @item = Item.find_by id: params[:id]
    if @item.destroy
      @task = @item.task
      if @task.updateStatus @task.items.where(checked: true).count, @task.items.count
        render json: {status: true, deletedItem: @item}
      end
    else
      render json: {status: false}
    end
  end
end
