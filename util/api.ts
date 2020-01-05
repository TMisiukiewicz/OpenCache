import Config from 'react-native-config';
import servers from './servers';

const defaultServer: string = servers[0];
const okapiKey: string = Config.OKAPI_KEY;

const api = {};

export default api;
