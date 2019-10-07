import { Item } from "../models/item.model";
import {EntityAdapter, EntityState, createEntityAdapter} from "@ngrx/entity";
import {ItemActions, ItemActionTypes } from "./item.actions";

export interface ItemsState extends EntityState<Item>{
}

export const adapter: EntityAdapter<Item> =
  createEntityAdapter<Item>();

export const initialItemsState: ItemsState = adapter.getInitialState({
})


export function itemsReducer(state=initialItemsState, action: ItemActions): ItemsState {
  switch(action.type){


    case ItemActionTypes.ItemsLoaded:
      return adapter.addMany(action.payload.items, state);

    case ItemActionTypes.ItemAdded:
      return adapter.addOne(action.payload.item, state);

    case ItemActionTypes.ItemEditted:
      return adapter.updateOne(action.payload.item, state);

    case ItemActionTypes.ItemDeleted:
      return adapter.removeOne(action.payload.itemId, state);

    default:
      return state;
  }
}

export const {
  selectAll,
  selectIds,
  selectEntities,
  selectTotal

} = adapter.getSelectors();
