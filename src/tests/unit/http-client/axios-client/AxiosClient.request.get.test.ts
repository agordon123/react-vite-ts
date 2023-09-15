/// <reference types="vitest" />
/// <reference types="vite/client" />


import axios from "axios";

import {
  HttpClientAxios,
  HttpRequestType,
  HttpRequestParamsInterface,
} from "@/http-client";

const mockRequestParams: HttpRequestParamsInterface<any> = {
  requestType: HttpRequestType.get,
  endpoint: "path/to/a/get/api/endpoint",
  requiresToken: false,
};
describe("HttpClient: axios-client: request: get", () => {
  const httpClient = new HttpClientAxios();
  it("should execute get request succesfully", () => {
    vitest
      .spyOn(axios, "get")
      .mockImplementation(async () =>
        Promise.resolve({
          data: `request completed: ${mockRequestParams.endpoint}`,
        })
      );
    httpClient
      .request(mockRequestParams)
      .then((response) => {
        //console.debug('response:', response)
        expect(response).toEqual(
          `request completed: ${mockRequestParams.endpoint}`
        );
      })
      .catch((error) => {
        console.info("AxiosClient.request.get.test.ts: error", error);
      });
  });
});
