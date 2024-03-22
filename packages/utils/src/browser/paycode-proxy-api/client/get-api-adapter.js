import * as API from './API';
import { apiAdapter } from './api-adapter';
import { getCurrentUserToken } from './get-current-user-token';
export const getApiAdapter = async () => {
    const token = await getCurrentUserToken("us-west-2_GwWa3hP5B", "6rndtlsj5pkotcds0kjuqlm5il");
    return apiAdapter("https://qf3aqz9bf0.execute-api.us-west-2.amazonaws.com/dev", token, API);
};
