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
    loadItems: async () => {
      // set loading to true
      commit(mutations.setLoading(true));
      // mock some data
      const mockItems: ItemInterface[] = [
        { id: 1, name: "Item 1", selected: false },
        {
          id: 2,
          name: "Item 2",
          selected: false,
        },
        {
          id: 3,
          name: "Item 3",
          selected: false,
        },
      ];

      // let's pretend we called some API end-point
      // and it takes 1 second to return the data
      // by using javascript setTimeout with 1000 for the milliseconds option
      setTimeout(() => {
        // commit our mutation by setting state.items to the data loaded
        commit(mutations.setItems(mockItems));
      }, 1000);
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
