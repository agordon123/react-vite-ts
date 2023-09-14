import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ItemsApiClientOptions } from "./ItemsApiClientOptions.interface";
import { ItemsApiClientInterface } from "./ItemsApiClient.interface";
import { ItemInterface } from "@/models/items/item.interface";

/**
 * @Name ItemsApiClientModel
 * @description
 * Implements the ItemsApiClientInterface interface
 */
export class ItemsApiClientModel implements ItemsApiClientInterface {
  private readonly endpoints: ItemsApiClientOptions["endpoints"];
  private readonly mockDelay: number = 0;

  constructor(options: ItemsApiClientOptions) {
    this.endpoints = options.endpoints;
    if (options.mockDelay) {
      this.mockDelay = options.mockDelay;
    }
  }

  fetchItems(): Promise<ItemInterface[]> {
    return new Promise<ItemInterface[]>((resolve) => {
      const endpoint = this.endpoints.fetchItems;
      // axios options
      const options: AxiosRequestConfig = { headers: {} };
      axios
        .get(endpoint, options)
        .then((response: AxiosResponse<ItemInterface[]>) => {
          if (!this.mockDelay) {
            resolve(response.data);
          } else {
            setTimeout(() => {
              resolve(response.data);
            }, this.mockDelay);
          }
        })
        .catch((error: AxiosResponse) => {
          console.error("ItemsApiClient: HttpClient: Get: error", error);
        });
    });
  }
}
