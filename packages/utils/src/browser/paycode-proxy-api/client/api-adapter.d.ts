import { AxiosStatic } from 'axios';
export interface ApiMethods {
    [key: string]: any;
    getAxiosInstance: () => AxiosStatic;
}
export declare const apiAdapter: (apiUrl: string, jwtToken: string, api: ApiMethods) => Promise<ApiMethods>;
//# sourceMappingURL=api-adapter.d.ts.map