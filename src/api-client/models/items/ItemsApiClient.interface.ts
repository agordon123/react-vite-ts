import { ItemInterface } from "../../../models/items/item.interface"
/**
 * @Name ItemsApiClientInterface
 * @description
 * Interface for the Items api client module
 */
export interface ItemsApiClientInterface {
    fetchItems: () => Promise<ItemInterface[]>
}