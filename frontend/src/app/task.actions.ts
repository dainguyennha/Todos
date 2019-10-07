import {Action} from '@ngrx/store'; 
import { Task } from "./models/task.model";
import { Update } from "@ngrx/entity";

export enum TaskActionTypes {
    TaskRequested = '[Task] Task Requested',
    TaskLoaded = '[Task] Task Load',
    TasksRequested = '[View Task Page] Tasks Requested',
    TasksLoaded = '[Task] Tasks Loaded',
    TaskAdded = '[Task] Task Added',
    TaskDeleted = '[Task] Task Deleted',
    TaskEdited = '[Task] Task Edited'
}

export class TaskRequested implements Action {
  readonly type = TaskActionTypes.TaskRequested;

  constructor(public payload:{taskId: number}){}
}

export class TaskLoaded implements Action {
  readonly type = TaskActionTypes.TaskLoaded;

  constructor(public payload: {task: Task}){}
}

export class TasksRequested implements Action {
  readonly type = TaskActionTypes.TasksRequested;
}

export class TasksLoaded implements Action {
  readonly type = TaskActionTypes.TasksLoaded;

  constructor(public payload: { tasks: Task[] }){}
}

export class TaskAdded implements Action {
  readonly type = TaskActionTypes.TaskAdded;

  constructor(public payload: {task: Task}){}
}

export class TaskDeleted implements Action {
  readonly type = TaskActionTypes.TaskDeleted;

  constructor(public payload: {taskId: number}){}
}

export class TaskEdited implements Action {
  readonly type = TaskActionTypes.TaskEdited;

  constructor(public payload: {task: Update<Task>}){};
}

export type TaskActions = 
  TasksRequested
  | TasksLoaded
  | TaskAdded
  | TaskDeleted
  | TaskEdited
  | TaskRequested
  | TaskLoaded;
