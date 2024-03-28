import * as API from './API';
import { apiAdapter } from './api-adapter';
import { getCurrentUserToken } from './get-current-user-token';
export const getApiAdapter = async () => {
    const token = await getCurrentUserToken("us-west-2_BPOoztfqv", "4d3gr2pcdjict043vrsd1pguug");
    return apiAdapter("https://qf3aqz9bf0.execute-api.us-west-2.amazonaws.com/dev", token, API);
};
