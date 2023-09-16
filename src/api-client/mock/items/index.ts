import { ApiClientInterface } from "../../models/ApiClient.interface";
import { itemsApiClient } from "..";
// create an instance of our main ApiClient that wraps the mock child clients
const apiMockClient: ApiClientInterface = {
  items: itemsApiClient,
};
// export our instance\export
export { apiMockClient };
