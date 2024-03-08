/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as API from '../.generated/paycode-proxy/client/API';
import * as MockAPI from './mock-api';

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
    (    config: { method: string; headers: { [x: string]: string; }; }) => {
      console.debug(8880, 'Intercepted request: ', config);
      if (config.method && config.method.toLowerCase() !== 'options') {
        if (headersToInject && typeof headersToInject == 'object') {
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
    (    error: any) => Promise.reject(error),
  );
};

export const createApiAdapter = (
  apiUrl: string,
  headersToInject: Record<string, string>,
  isMock = false,
) => {
  setupApiClient(apiUrl, headersToInject);

  return new Proxy<ApiMethods>(API, {
    get(
      target: ApiMethods,
      prop: keyof ApiMethods | string | symbol,
      _receiver: any,
    ): (...args: any[]) => Promise<ApiResponse> {
      const actualTarget: ApiMethods = isMock ? MockAPI : target;

      if (typeof prop === 'symbol') {
        return Reflect.get(actualTarget, prop, _receiver);
      }

      // The property might be a function or something else (like a value)
      const property = actualTarget[prop];
      if (typeof property === 'function') {
        // Ensure function properties are called with the correct context
        return (...args: any[]) => {
          const axiosInstance = actualTarget.getAxiosInstance
            ? actualTarget.getAxiosInstance()
            : axios;

          const methodMatch = String(prop).match(
            /^(get|post|put|delete|options)(.+)/i,
          );
          if (!methodMatch) {
            throw new Error(
              `The API method ${String(prop)} does not follow the expected naming convention.`,
            );
          }

          const method = (methodMatch[1] as string).toLowerCase();
          const url = `/${(methodMatch[2] as string).toLowerCase()}`;
          const [paramsOrData, axiosConfig = {}] = args;

          const requestConfig: AxiosRequestConfig = {
            method: method as AxiosRequestConfig['method'],
            url: `${apiUrl}${url}`,
            ...(method === 'get' || method === 'options'
              ? { params: paramsOrData }
              : { data: paramsOrData }),
            ...axiosConfig,
          };

          console.debug(
            `Making real API call: ${method.toUpperCase()} to ${url} with config:`,
            requestConfig,
          );
          return axiosInstance.request(requestConfig);
        }; // No need for bind here due to closure scope
      } else {
        // If the property is not a function, return it directly
        return property;
      }
    },
  });
};
