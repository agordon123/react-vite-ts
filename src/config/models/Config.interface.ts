import { ItemsApiClientOptions } from "@/api-client/models/items";

export interface HttpClientConfigInterface {
  tokenKey: string;
  clientType: string;
}

/**
 * @Name ConfigInterface
 * @description
 * Describes the structure of a configuration file
 */
export interface ConfigInterface {
  global: {
    // ... things that are not specific to a single app domain
    version: number;
  };
  httpClient: HttpClientConfigInterface;
  apiClient: {
    type: string;
  };
  items: {
    apiClientOptions: ItemsApiClientOptions;
  };
}
