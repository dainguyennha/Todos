import {TaskService} from './services/task.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import { Injectable } from "@angular/core";
import {AppState} from './reducers'
import {map, mergeMap, withLatestFrom, filter} from 'rxjs/operators'
import { TasksRequested, TaskLoaded, TaskActionTypes, TasksLoaded, TaskRequested } from "./task.actions";
import { select } from "@ngrx/store";
import { tasksLoaded } from "./task.selectors";

@Injectable()
export class TasksEffects {
  @Effect()
  loadTasks$ = this.actions$
    .pipe(
      ofType<TasksRequested>(TaskActionTypes.TasksRequested),
      withLatestFrom(this.store.pipe(select(tasksLoaded))),
      filter(([action, allTasksLoaded]) => !allTasksLoaded),
      mergeMap(() => this.taskService.getTasks()),
      map(tasks => new TasksLoaded({tasks: tasks}))
    )

  @Effect()
  loadTask$ = this.actions$
    .pipe(
      ofType<TaskRequested>(TaskActionTypes.TaskRequested),
      mergeMap(action => this.taskService.getTask(action.payload.taskId)),
      map(task => new TaskLoaded({task: task}))
    );



    constructor (private actions$: Actions, private taskService: TaskService, 
      private store: Store<AppState>){}
}
