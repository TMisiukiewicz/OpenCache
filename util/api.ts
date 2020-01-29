import Config from 'react-native-config';
import servers from './servers';
import {SearchAndRetreive} from 'types/apiTypes';

const defaultServer: string = servers[0];
const okapiKey: string = Config.OKAPI_KEY;
const server: string = defaultServer; //FIXME when created changing server, change

const api = {
  nearestCaches: (params: Object) =>
    createApiUrl('services/caches/search/nearest', params),
  searchAndRetreiveNearestCaches: (params: SearchAndRetreive) =>
    createApiUrl('services/caches/shortcuts/search_and_retrieve', params),
  searchAndRetreiveByBounds: (params: SearchAndRetreive) =>
    createApiUrl('services/caches/shortcuts/search_and_retrieve', params),
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

const createApiUrl = (path: string, params: any) => {
  return (
    server + path + '?' + encodeQueryData(params) + `&consumer_key=${okapiKey}`
  );
};

const makeRequest = async (apiRequest: string, options?: any) => {
  let params: any = {
    method: 'GET',
  };
  if (options !== undefined) {
    params = {...params, ...options};
  }

  const apiCall = await fetch(apiRequest, options);
  return apiCall.json();
};

export default api;
export {api, makeRequest};
