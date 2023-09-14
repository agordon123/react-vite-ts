// import hook useEffect from react
import { useEffect } from "react";
// import a reference to our ItemInterface
import { ItemInterface } from "@/models/items/item.interface";
// import a reference to your ItemsList component:
import { useAppStore } from "../store/root";
import { ItemsListComponent } from "../components/Items";
import React from 'react';

export function ItemsView() {
  // get a reference to our itemsStore instanceusing our useAppStore() hook:
  const { itemsStore } = useAppStore();
  // get a reference to the items state data through our itemsStore getters:
  const { loading, items } = itemsStore.getters;
  // item select event handler
  const onItemSelect = (item: ItemInterface) => {
    itemsStore.actions.toggleItemSelected(item);
  };

  useEffect(() => {
    itemsStore.actions.loadItems();
  }, []); // <-- empty array means 'run once'
  return (
    <div>
      <ItemsListComponent loading={loading} items={items} onItemSelect={onItemSelect} />
    </div>
  );
}
export default ItemsView;
