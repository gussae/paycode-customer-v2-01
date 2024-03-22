const validMethods = ['get', 'post', 'put', 'delete', 'options'];
const setupApiClient = (apiUrl, headersToInject, api) => {
    const apiClient = api.getAxiosInstance();
    apiClient.defaults.baseURL = apiUrl;
    apiClient.interceptors.request.use((config) => {
        console.debug(8880, 'Intercepted request: ', config);
        if (config.method && config.method.toLowerCase() !== 'options') {
            if (headersToInject && typeof headersToInject === 'object') {
                console.debug(8882, headersToInject);
                Object.assign(config.headers, headersToInject);
            }
            else {
                throw new Error(`Received invalid headersToInject ${JSON.stringify(headersToInject)}`);
            }
            if (['get', 'post', 'put', 'delete', 'patch'].includes(config.method.toLowerCase())) {
                config.headers['Content-Type'] = 'application/json';
            }
        }
        console.debug(8883, config.headers);
        return config;
    }, (error) => Promise.reject(error));
};
export const apiAdapter = async (apiUrl, jwtToken, api) => {
    const headersToInject = { Authorization: `Bearer ${jwtToken}` };
    setupApiClient(apiUrl, headersToInject, api);
    const adapter = { getAxiosInstance: api.getAxiosInstance };
    Object.keys(api).forEach(methodName => {
        if (validMethods.some(validMethod => methodName.toLowerCase().startsWith(validMethod))) {
            const methodMatch = methodName.match(/^(get|post|put|delete|options)(.+)/i);
            if (methodMatch) {
                const httpMethod = methodMatch[1].toLowerCase();
                const path = methodMatch[2].toLowerCase();
                console.log(`Processing method: ${methodName} as ${httpMethod} to ${path}`);
                adapter[methodName] = async (...args) => {
                    try {
                        const [paramsOrData, axiosConfig = {}] = args;
                        const config = {
                            method: httpMethod,
                            url: `/${path}`,
                            ...(httpMethod === 'get' || httpMethod === 'options'
                                ? { params: paramsOrData }
                                : { data: paramsOrData }),
                            ...axiosConfig,
                        };
                        return api.getAxiosInstance().request(config);
                    }
                    catch (error) {
                        console.error(`Error invoking method ${methodName}:`, error);
                        throw error;
                    }
                };
            }
        }
    });
    return adapter;
};
