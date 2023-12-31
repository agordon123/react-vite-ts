// src/store/items/Items.store.ts
// import hooks useSelector and useDispatch from react-redux
import { useSelector } from "react-redux";
import { Dispatch } from "react";
// import a reference to our RootStateInterface
import { RootStateInterface } from "../root";// import a reference to our ItemInterface
import { ItemInterface } from "@/models/items/item.interface";
// import a refence to our itemsStoreSlice
import { itemsStoreSlice } from "./Items.slice";
//Root State and Root Store interface are confusing as fuck
import { apiClient } from '../../api-client'

/**
 * @name useItemsActions
 * @description
 * Actions hook that allows us to invoke the Items store actions from our components
 */
export function useItemsActions(commit: Dispatch<any>) {
  // get a reference to our slice actions (which are really our mutations/commits)
  const mutations = itemsStoreSlice.actions;
  // our items store actions implementation:
  const actions = {
    // action that we invoke to load the items from an api:
    loadItems: async () => {
    // set loading to true
    commit(mutations.setLoading(true))
    // begin: remove code
    const data = await apiClient.items.fetchItems();
    commit(mutations.setItems(data))

    },
    toggleItemSelected: async (item: ItemInterface) => {
      console.log("ItemsStore: action: toggleItemSelected", item);
      commit(mutations.setItemSelected(item));
    },
  };
  // return our store actions
  return actions;
}
// hook to allows us to consume read-only state properties from our components
export function useItemsGetters() {
  // return our store getters
  return {
    loading: useSelector((s: RootStateInterface) => s.itemsState.loading),
    items: useSelector((s: RootStateInterface) => s.itemsState.items),
  };
}
/**
 * @name ItemsStoreInterface
 * @description Interface represents our Items store module */
export interface ItemsStoreInterface {
  actions: ReturnType<typeof useItemsActions>; // use TS type inference
  getters: ReturnType<typeof useItemsGetters>; // use TS type inference
}

