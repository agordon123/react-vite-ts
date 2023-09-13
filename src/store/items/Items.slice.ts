import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemsStateInterface } from "./models";
import { ItemInterface } from "@/models/items/item.interface";

// create an object that represents our initial items state
const initialItemsState: ItemsStateInterface = {
  loading: false,
  items: [],
};
//
//onst setLoading: CaseReducer<ItemsStateInterface, PayloadAction<boolean>> = (state, action) => {
//   state.loading = action.payload;
//;
//
//onst setItems: CaseReducer<ItemsStateInterface, PayloadAction<ItemInterface[]>> = (state, action) => {
//   // update our state:
//   // set our items
//   state.items = action.payload || [];
//   // set loading to false so the loader will be hidden in the UI
//   state.loading = false;
//;
//
//onst setItemSelected: CaseReducer<ItemsStateInterface, PayloadAction<ItemInterface>> = (state, action) => {
//   const item = action.payload;
//   const foundItem = state.items.find((o) => o.id === item.id);
//   if (foundItem) {
//       foundItem.selected = !foundItem.selected;
//   }
//;

export const itemsStoreSlice = createSlice({
  name: "itemsStoreSlice",
  initialState: initialItemsState,
  reducers: {
    // reducers are functions that commit final mutations to the state
    // These will commit final mutation/changes to the state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setItems: (state, action: PayloadAction<ItemInterface[]>) => {
      // update our state:
      // set our items
      state.items = action.payload || [];
      // set loading to false so the loader will be hidden in the UI
      state.loading = false;
    },
    setItemSelected: (state, action: PayloadAction<ItemInterface>) => {
      const item = action.payload;
      const found = state.items.find((o) => o.id === item.id) as ItemInterface;
      found.selected = !found.selected;
    },
  },
});
