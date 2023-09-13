import { ItemInterface } from "@/models/items/item.interface";

export interface ItemsStateInterface {
  loading: boolean;
  items: ItemInterface[];
}
