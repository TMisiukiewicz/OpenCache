import {api, makeRequest} from './api';

export const getNearestCaches = async (params: Object) => {
  try {
    const nearestCaches = await makeRequest(api.nearestCaches(params));
    return nearestCaches;
  } catch (e) {
    console.error(e);
  }
};
