import { ApiClientInterface } from "../models/ApiClient.interface"; // import module instances
import { itemsApiClient } from "../mock";
// create an instance of our main ApiClient that wraps the live child clients
const apiLiveClient: ApiClientInterface = { items: itemsApiClient };
// export our instance
export { apiLiveClient };
