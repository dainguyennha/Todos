class TasksController < ApplicationController
  def index
    render json: Task.all.as_json
  end

  def show
    task = Task.find_by id: params[:id]
    items = task.items
    render json: { items:items.as_json, tasks: task.as_json}
  end

  def update
    @task = Task.find_by id: params[:id]
    if @task.nil?
      render nothing: true, status: 404
    elsif @task.update_attributes task_params 
      render json: @task.as_json 
    else 
      render {}
    end 
  end
  
  def create
    newTask = Task.create title: params[:title]
    if newTask
      render json: {status: true, data: newTask.as_json}
    else
      render json: {status: false}
    end
  end

  def destroy
    @task = Task.find_by id: params[:id]
    if @task.destroy
      render json: {status: true, deletedTask: @task.as_json}
    else
      render json: {status: false}
    end
  end

  private
  def task_params
    params.require(:task).permit :title, :description
  end
end 
