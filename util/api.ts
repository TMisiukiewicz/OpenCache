import Config from 'react-native-config';
import {servers} from 'util';

const defaultServer = servers[0];
const okapiKey: string = Config.OKAPI_KEY;

const api = {};

export default api;
