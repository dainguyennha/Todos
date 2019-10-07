import {TaskService} from '../services/task.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Item} from "../models/item.model";
import {AppState} from '../reducers';
import {ItemActionTypes, ItemsLoaded, ItemsRequested } from './item.actions';
import { Injectable } from "@angular/core";
import { mergeMap, map } from "rxjs/operators";

@Injectable()
export class ItemsEffects {
  @Effect()
  loadItems$ = this.actions$
    .pipe(
      ofType<ItemsRequested>(ItemActionTypes.ItemsRequested),
      mergeMap(({payload}) => this.taskService.getTask(payload.taskId) ),
      map(res => new ItemsLoaded({items: res['items']}))
    )


  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store<AppState>
  ){}
}
