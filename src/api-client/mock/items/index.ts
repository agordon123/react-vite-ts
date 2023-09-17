import { ApiClientInterface } from "../../models/ApiClient.interface";
import { itemsApiClient } from "../../live/items";
import { localizationApiClient } from "..";
// create an instance of our main ApiClient that wraps the mock child clients
const apiMockClient: ApiClientInterface = {
  localization: localizationApiClient,
  items: itemsApiClient,
};
// export our instance
export { apiMockClient };
