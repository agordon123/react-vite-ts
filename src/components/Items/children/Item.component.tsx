import React from 'react'
// import reference to our interface
import { ItemInterface } from '../../../models/items/item.interface'
// component props type:
type Props = {
  testid: string
  model: ItemInterface,
  onItemSelect: (item: ItemInterface) => void
}
// example using functional component syntax
export const ItemComponent: React.FC<Props> = ({ testid, model, onItemSelect }) => {
  const cssClass = model?.selected ? 'item selected' : 'item';
  const handleItemClick = () => {
    onItemSelect(model);
  };
  return (
    <li data-testid={testid} className={cssClass} onClick={handleItemClick}>
      <div className="selected-indicator">*</div>
      <div className="name">{model.name}</div>
    </li>
  );
};
