// file: src/api-client/mock/items/index.ts
import {
  ItemsApiClientOptions,
  ItemsApiClientModel,
  ItemsApiClientInterface,
} from "../models/items";

const options: ItemsApiClientOptions = {
  endpoints: {
   fetchItems: '/jsonserver/items',
  },
  mockDelay: 1000,
};
// instantiate the ItemsApiClient pointing at the url that returns static json mock data
const itemsApiClient: ItemsApiClientInterface = new ItemsApiClientModel(
  options
);
// export our instance
export { itemsApiClient };
