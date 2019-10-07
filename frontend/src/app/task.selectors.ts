import * as fromTask from './task.reducers'
import {createSelector, createFeatureSelector} from '@ngrx/store'
import { TasksState } from "./task.reducers";
import { first } from "rxjs/operators";
export const selectTasksState = createFeatureSelector<TasksState> ('tasks');

export const tasksLoaded = createSelector(
  selectTasksState,
  tasksState => tasksState.allTasksLoaded
)


export const selectTasks = createSelector(
  selectTasksState,
  fromTask.selectAll
)

export const selectTaskPage = (taskId: number) => createSelector(
  selectTasks,
  allTasks => {
    return allTasks
      .find(task => task.id == taskId)
  }
)
