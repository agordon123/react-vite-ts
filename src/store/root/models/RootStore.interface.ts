import { ItemsStoreInterface } from "@/store/items/Items.store"

/**
 * @name RootStoreInterface
 * @description Interface represents our root state manager (store)
 */
export interface RootStoreInterface {
    itemsStore: ItemsStoreInterface
    // additional domain store modules will be added here as needed
    }