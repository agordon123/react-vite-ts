import { ApiClientInterface } from "./models/ApiClient.interface";
import { apiMockClient } from "./mock/items";
import { apiLiveClient } from "./live";

let env: string = "mock";
if (import.meta.env && import.meta.env.VITE_API_CLIENT) {
  env = import.meta.env.VITE_API_CLIENT.trim();
}
// return either the live or the mock client
let apiClient: ApiClientInterface;
if (env === "live") {
  apiClient = apiLiveClient;
} else {
  // default is always apiMockClient
  apiClient = apiMockClient;
}
export { apiClient };
