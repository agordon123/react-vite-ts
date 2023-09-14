import { HttpClientInterface } from "./models/HttpClient.interface";
//import { appConfig } from '@/app-config'
import { HttpClientAxios } from "./models/HttpClient.axios";
import { HttpClientFetch } from "./models/HttpClient.fetch";
export * from "./models";


let _httpClient: HttpClientInterface | undefined = undefined;
// export out hook
export const useHttpClient = () => {
  if (!_httpClient) {
    // export instance of HttpClientInterface
    const clientType = "fetch";
    if (clientType === "fetch") {
      _httpClient = new HttpClientFetch();
    } else if (clientType === "axios") {
      _httpClient = new HttpClientAxios();
    }
  }
  return _httpClient as HttpClientInterface;
};
