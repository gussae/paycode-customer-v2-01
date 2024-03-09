/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as API from '../.generated/paycode-proxy/client/API';

type ApiResponse = void | AxiosResponse<any>;

export interface ApiMethods {
  [key: string]: any;
  getAxiosInstance?: () => typeof axios;
}

const setupApiClient = (
  apiUrl: string,
  headersToInject: Record<string, string>,
): void => {
  const apiClient = API.getAxiosInstance();
  apiClient.defaults.baseURL = apiUrl;

  apiClient.interceptors.request.use(
    //@ts-expect-error it's not an error
    (config: { method: string; headers: { [x: string]: string } }) => {
      console.debug(8880, 'Intercepted request: ', config);
      if (config.method && config.method.toLowerCase() !== 'options') {
        if (headersToInject && typeof headersToInject === 'object') {
          console.debug(8882, headersToInject);
          Object.assign(config.headers, headersToInject);
        } else {
          throw new Error('Received invalid headersToInject', headersToInject);
        }

        if (
          ['get', 'post', 'put', 'delete', 'patch'].includes(
            config.method.toLowerCase(),
          )
        ) {
          config.headers['Content-Type'] = 'application/json';
        }
      }
      console.debug(8883, config.headers);
      return config;
    },
    (error: any) => Promise.reject(error),
  );
};

export const createApiAdapter = (
  apiUrl: string,
  headersToInject: Record<string, string>,
): ApiMethods => {
  setupApiClient(apiUrl, headersToInject);

  const adapter: ApiMethods = {};

  Object.keys(API).forEach(methodName => {
    const method = methodName.match(/^(get|post|put|delete|options)(.+)/i);
    if (method) {
      const httpMethod = (method[1] as string).toLowerCase();
      const path = (method[2] as string).toLowerCase();

      adapter[methodName] = async (...args: any[]): Promise<ApiResponse> => {
        const [paramsOrData, axiosConfig = {}] = args;
        const config: AxiosRequestConfig = {
          method: httpMethod as AxiosRequestConfig['method'],
          url: `/${path}`,
          ...(httpMethod === 'get' || httpMethod === 'options'
            ? { params: paramsOrData }
            : { data: paramsOrData }),
          ...axiosConfig,
        };

        return API.getAxiosInstance
          ? API.getAxiosInstance().request(config)
          : axios.request(config);
      };
    }
  });

  if (API.getAxiosInstance) {
    adapter.getAxiosInstance = API.getAxiosInstance;
  }

  return adapter;
};
