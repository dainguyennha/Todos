import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {TaskService} from "./task.service";
import {Store, select} from "@ngrx/store";
import {Task} from "../models/task.model";
import {AppState} from "../reducers";
import {Observable} from "rxjs";
import {selectTaskPage} from "../task.selectors";
import {TaskRequested, TasksRequested } from "../task.actions";
import {filter, first, tap} from "rxjs/operators";

@Injectable()
export class TaskResolver implements Resolve<Task> {
  constructor(
    private taskService: TaskService,
    private store: Store<AppState>
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
    const taskId = route.params['id'];
    return this.store
      .pipe(
        select(selectTaskPage(taskId)),
        tap(task => {
          if(!task){
            this.store.dispatch(new TasksRequested())
          }
        }),
        filter(task => !!task),
        first()

      )

  }
}
