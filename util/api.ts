import Config from 'react-native-config';
import servers from './servers';
import {SearchAndRetreive} from 'types/apiTypes';
import {FullDetailsParams} from 'store/actions/caches';

const defaultServer: string = servers[0];
const okapiKey: string = Config.OKAPI_KEY;
const okapiSecret: string = Config.OKAPI_CONSUMER_SECRET;
const server: string = defaultServer; //FIXME when created changing server, change

const api = {
  nearestCaches: (params: Object) =>
    createApiUrl('services/caches/search/nearest', params),
  searchAndRetreiveNearestCaches: (params: SearchAndRetreive) =>
    createApiUrl('services/caches/shortcuts/search_and_retrieve', params),
  searchAndRetreiveByBounds: (params: SearchAndRetreive) =>
    createApiUrl('services/caches/shortcuts/search_and_retrieve', params),
  getCache: (params: FullDetailsParams) =>
    createApiUrl('services/caches/geocache', params),
  oauth: {
    requestToken: (params: Object) =>
      createApiUrl('services/oauth/request_token', params),
    authorizeToken: () => createApiUrl('services/oauth/authorize'),
    callbackScreen: 'opencacheapp://afterLogin',
  },
};

const encodeQueryData = (data: any) => {
  const parameters = [];
  for (let parameter in data) {
    parameters.push(
      encodeURIComponent(parameter) +
        '=' +
        encodeURIComponent(
          typeof data[parameter] === 'object'
            ? JSON.stringify(data[parameter])
            : data[parameter],
        ),
    );
  }
  return parameters.join('&');
};

const createApiUrl = (path: string, params?: any) => {
  if (params) {
    return `${server}${path}?${encodeQueryData(
      params,
    )}&consumer_key=${okapiKey}`;
  } else {
    return `${server}${path}?consumer_key=${okapiKey}`;
  }
};

const makeRequest = async (apiRequest: string, options?: any) => {
  let params: any = {
    method: 'GET',
  };
  if (options !== undefined) {
    params = {...params, ...options};
  }

  const apiCall = await fetch(apiRequest, params);
  return apiCall.json();
};

const makeLevelTwoRequest = async (url: string) => {
  const headers = {
    Authorization: `OAuth oauth_version="1.0", oauth_signature_method="PLAINTEXT", oauth_consumer_key="${okapiKey}", oauth_signature="${okapiSecret}&"`,
  };

  const options = {
    headers,
  };
  try {
    const response = await fetch(url, options);
    return {
      status: response.status,
      body: await response.text(),
    };
  } catch (e) {
    console.error(e);
  }
};

export default api;
export {api, makeRequest, makeLevelTwoRequest};
