import {Task} from './models/task.model';
import {EntityAdapter, createEntityAdapter, EntityState} from '@ngrx/entity';
import { TaskActionTypes, TaskActions } from './task.actions'

export interface TasksState extends EntityState<Task>{
  allTasksLoaded: boolean;

}

export const adapter: EntityAdapter<Task> = 
  createEntityAdapter<Task>()

export const initialTasksState: TasksState = adapter.getInitialState({
  allTasksLoaded: false
})

export function tasksReducer(state=initialTasksState, action: TaskActions): TasksState {

  switch(action.type){
    case TaskActionTypes.TaskLoaded:
      return adapter.addOne(action.payload.task, state);

    case TaskActionTypes.TasksLoaded:
      return adapter.addAll(action.payload.tasks, {...state, allTasksLoaded: true});
    
    case TaskActionTypes.TaskAdded:
      return adapter.addOne(action.payload.task, state);

    case TaskActionTypes.TaskDeleted:
      return adapter.removeOne(action.payload.taskId, state);

    case TaskActionTypes.TaskEdited:
      return adapter.updateOne(action.payload.task, state);

    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
