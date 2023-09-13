
import React from "react";
import { ItemInterface } from "../../models/items/item.interface";
import { ItemComponent } from "./children/Item.component";
import { Loader } from "../shared/Loader.Component";

type Props = {
  items: ItemInterface[];
  onItemSelect: (item: ItemInterface) => void;
  loading: boolean;
};

export const ItemsListComponent: React.FC<Props> = ({ loading, items, onItemSelect }: Props) => {
  const handleItemClick = (item: ItemInterface) => {
    onItemSelect(item);
  };

  let element: JSX.Element;
  if (loading) {
    // render Loader
    element = <Loader />;
  } else {
    // render <ul>
    element = (
      <ul>
        {items.map((item, index) => (
          <ItemComponent
            testid={`item-${item.id}`}
            key={index}
            model={item}
            onItemSelect={() => handleItemClick(item)}
          />
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h3>Items: loading - {String(loading)}</h3>
      {element}
    </div>
  );
};

export default ItemsListComponent;