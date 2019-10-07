import {Action} from '@ngrx/store';
import {Item} from '../models/item.model';
import { Update } from "@ngrx/entity";

export enum ItemActionTypes {
    ItemsRequested = '[Item] Items Requested',
    ItemsLoaded = '[Item] Items Loaded',
    ItemAdded = '[Item] Item Added',
    ItemEditted = '[Item] Item Editted',
    ItemDeleted = '[Item] Item Deleted'
}

export class ItemsRequested implements Action {
  readonly type = ItemActionTypes.ItemsRequested;
   
  constructor(public payload: {taskId: number}){}
}

export class ItemsLoaded implements Action {
  readonly type = ItemActionTypes.ItemsLoaded;

  constructor(public payload: {items: Item[]}){}
}

export class ItemAdded implements Action {
  readonly type = ItemActionTypes.ItemAdded;

  constructor(public payload: {item: Item}){}
}

export class ItemEditted implements Action {
  readonly type = ItemActionTypes.ItemEditted;

  constructor(public payload: {item: Update<Item>}){}
}

export class ItemDeleted implements Action {
  readonly type = ItemActionTypes.ItemDeleted;

  constructor(public payload: {itemId: number}){}
}

export type ItemActions =
  ItemsRequested
  | ItemsLoaded
  | ItemEditted
  | ItemAdded
  | ItemDeleted;

