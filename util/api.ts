import Config from 'react-native-config';
import servers from './servers';

const defaultServer: string = servers[0];
const okapiKey: string = Config.OKAPI_KEY;
const server: string = defaultServer; //FIXME when created changing server, change

const api = {
  nearestCaches: (params: Object) =>
    createApiUrl('services/caches/search/nearest', params),
};

const encodeQueryData = (data: any) => {
  const parameters = [];
  for (let parameter in data) {
    parameters.push(
      encodeURIComponent(parameter) + '=' + encodeURIComponent(data[parameter]),
    );
  }

  return parameters.join('&');
};

const createApiUrl = (path: string, params: any) => {
  return (
    server + path + '?' + encodeQueryData(params) + `&consumer_key=${okapiKey}`
  );
};

export default api;
