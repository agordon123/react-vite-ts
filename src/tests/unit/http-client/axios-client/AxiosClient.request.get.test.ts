import axios, { AxiosResponse } from "axios";

import {
  HttpClientAxios,
  HttpRequestType,
  HttpRequestParamsInterface,
} from "@/http-client";

const mockRequestParams: HttpRequestParamsInterface<null> = {
  requestType: HttpRequestType.get,
  endpoint: "path/to/a/get/api/endpoint",
  requiresToken: false,
};

describe("HttpClient: axios-client: request: get", () => {
  const httpClient = new HttpClientAxios();
  it("should execute get request succesfully", () => {
    jest.spyOn(axios, "get").mockImplementation(async () =>
      Promise.resolve<AxiosResponse>({
        data: `request completed: ${mockRequestParams.endpoint}`,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      })
    );
    httpClient
      .request(mockRequestParams)
      .then((response) => {
        expect(response).toEqual(
          `request completed: ${mockRequestParams.endpoint}`
        );
      })
      .catch((error) => {
        console.info("AxiosClient.request.get.test.ts: error", error);
      });
  });
});
describe("HttpClient: axios-client: request: get", () => {
  it("get should throw error on rejection", () => {
    vitest
      .spyOn(axios, "get")
      .mockImplementation(async () =>
        Promise.reject({
          data: `request completed: ${mockRequestParams.endpoint}`,
        })
      );
    httpClient.request(mockRequestParams).catch((error) => {
      expect(error).toBeDefined();
      expect(error.toString()).toEqual("Error: HttpClientAxios: exception");
    });
  });
});
