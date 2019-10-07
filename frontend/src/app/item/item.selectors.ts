import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromItem from "./item.reducers"
import { ItemsState } from "./item.reducers";


export const selectItemsState = createFeatureSelector<ItemsState>('items');

export const selectAllItems = createSelector(

  selectItemsState,
  fromItem.selectAll

)

export const  selectItemsPage = (taskId: number) => createSelector(
  selectAllItems,
  allItems => {
    return allItems
      .filter(item => item.task_id == taskId)
  }
)
