class TasksController < ApplicationController
  def index
    render json: Task.all
  end

  def show
    task = Task.find_by id: params[:id]
    items = task.items
    render json: {task: task,items: items}
  end

  def update
    @task = Task.find_by id: params[:id]
    if @task.nil?
      render nothing: true, status: 404
    elsif @task.update_attributes task_params 
      render json: @task 
    else 
      render {}
    end 
  end
  
  def create
    newTask = Task.create title: params[:title]
    if newTask
      render json: {status: true, data:newTask}
    else
      render json: {status: false}
    end
  end

  def destroy
    @task = Task.find_by id: params[:id]
    if @task.destroy
      render json: {status: true, deletedTask: @task}
    else
      render json: {status: false}
    end
  end

  private
  def task_params
    params.require(:task).permit :title, :description
  end
end 
