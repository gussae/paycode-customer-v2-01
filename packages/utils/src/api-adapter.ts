/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
  InternalAxiosRequestConfig,
} from 'axios';

type ApiResponse = void | AxiosResponse<any>;
const validMethods = ['get', 'post', 'put', 'delete', 'options'];

export interface ApiMethods {
  [key: string]: any;
  getAxiosInstance: () => AxiosStatic;
}

const setupApiClient = (
  apiUrl: string,
  headersToInject: Record<string, string>,
  api: ApiMethods,
): void => {
  const apiClient = api.getAxiosInstance() as AxiosStatic;
  apiClient.defaults.baseURL = apiUrl;

  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
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
  api: ApiMethods,
): ApiMethods => {
  setupApiClient(apiUrl, headersToInject, api);

  const adapter: ApiMethods = { getAxiosInstance: api.getAxiosInstance };

  Object.keys(api).forEach(methodName => {
    if (
      validMethods.some(validMethod =>
        methodName.toLowerCase().startsWith(validMethod),
      )
    ) {
      const methodMatch = methodName.match(
        /^(get|post|put|delete|options)(.+)/i,
      );
      if (methodMatch) {
        const httpMethod = (methodMatch[1] as string).toLowerCase();
        const path = (methodMatch[2] as string).toLowerCase();

        console.debug(
          `Processing method: ${methodName} as ${httpMethod} to ${path}`,
        );

        adapter[methodName] = async (...args: any[]): Promise<ApiResponse> => {
          try {
            const [paramsOrData, axiosConfig = {}] = args;
            const config: AxiosRequestConfig = {
              method: httpMethod,
              url: `/${path}`,
              ...(httpMethod === 'get' || httpMethod === 'options'
                ? { params: paramsOrData }
                : { data: paramsOrData }),
              ...axiosConfig,
            };

            return api.getAxiosInstance().request(config);
          } catch (error) {
            console.error(`Error invoking method ${methodName}:`, error);
            throw error;
          }
        };
      }
    }
  });

  return adapter;
};
