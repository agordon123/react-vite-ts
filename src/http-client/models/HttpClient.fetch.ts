// file: src/http-client/models/HttpClient.fetch.ts
import { HttpRequestParamsInterface } from "./HttpRequestParams.interface";
import {
  HttpClientInterface,
  HttpClientConfigInterface,
} from "./HttpClient.interface";
import {
  HttpRequestType,
  HttpRequestMethods,
  HttpContentTypes,
} from "./Constants";
import { UrlUtils } from "./UrlUtils";
/**
 * @name HttpClientFetch
 * @description
 * Wraps http client functionality to avoid directly using fetch
 * and simplify replacement in the future if such npm package would stop being developed or other reasons
 */
export class HttpClientFetch implements HttpClientInterface {
  constructor() {
    // OPTIONAL for now: Add request interceptor to handle errors or other things for each request in one place
  }
  async request<R, P = void>(
    parameters: HttpRequestParamsInterface<P>
  ): Promise<R> {
    const {
      requestType,
      endpoint,
      requiresToken,
      payload,
      headers,
      mockDelay,
    } = parameters;
    const fullUrl = UrlUtils.getFullUrlWithParams(endpoint, payload as any);
    console.log("HttpClientFetch: fullUrl: ", fullUrl, payload);
    // set fetch options
    const options: RequestInit = {
      credentials: "include",
      redirect: "follow",
      headers: {},
    };
    if (headers) {
      options.headers = {
        ...headers,
      };
    }
    if (!options.headers?.hasOwnProperty("Content-Type")) {
      // default to content-type json
      options.headers = {
        ...headers,
        "Content-Type": HttpContentTypes.applicationJson,
      };
    }
    // Set Headers Authorization
    if (requiresToken && options.headers) {
      // optional: you could add coded here to set the Authorization header with a bearer token
      // options.headers.Authorization = `bearer ${ JwtHelpers.getJwtToken() }`
      let result!: R;
      const checkRedirect = async (resp: any) => {
        if (resp.redirected) {
          // if so, redirect to response url
          document.location = resp.url;
          return true;
        }
        return false;
      };
      try {
        switch (requestType) {
          // TODO: implement a case statement for each request type
          case HttpRequestType.get: {
            options.method = HttpRequestMethods.get;
            const response = (await fetch(fullUrl, options)) as any;
            const redirected = await checkRedirect(response);
            if (!redirected) {
              result = (await response.json()) as R;
            }
            break;
          }
          case HttpRequestType.post: {
            options.method = HttpRequestMethods.post;
            options.body =
              typeof payload === "string" ? payload : JSON.stringify(payload);
            const response = (await fetch(fullUrl, options)) as any;
            const redirected = await checkRedirect(response);
            if (!redirected) {
              result = (await response.json()) as R;
            }
            break;
          }
          case HttpRequestType.put: {
            options.method = HttpRequestMethods.put;
            options.body =
              typeof payload === "string" ? payload : JSON.stringify(payload);
            const response = (await fetch(fullUrl, options)) as any;
            const redirected = await checkRedirect(response);
            if (!redirected) {
              result = (await response.json()) as R;
            }
            break;
          }
          case HttpRequestType.delete: {
            options.method = HttpRequestMethods.delete;
            const response = (await fetch(fullUrl, options)) as any;
            const redirected = await checkRedirect(response);
            if (!redirected) {
              result = (await response.json()) as R;
            }
            break;
          }
          case HttpRequestType.patch: {
            options.method = HttpRequestMethods.patch;
            options.body =
              typeof payload === "string" ? payload : JSON.stringify(payload);
            const response = (await fetch(fullUrl, options)) as any;
            const redirected = await checkRedirect(response);
            if (!redirected) {
              result = (await response.json()) as R;
            }
            break;
          }

          default: {
            console.warn(
              "HttpClientFetch: invalid requestType argument or request typ\
        e not implemented"
            );
          }
        }
      } catch (e) {
        //console.error('HttpClientFetch: exception', e)
        throw Error("HttpClientFetch: exception");
      }
      if ((mockDelay || 0) > 0) {
        return new Promise<R>((resolve) => {
          setTimeout(() => {
            resolve(result);
          }, mockDelay);
        });
      }
      return result;
    }
  }
}
