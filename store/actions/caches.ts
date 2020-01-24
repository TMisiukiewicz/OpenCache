import {api, makeRequest} from 'util/api';
import {ThunkDispatch, ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {SearchAndRetreive} from 'types/apiTypes';
import {RootState} from 'store/reducers';
import {CacheList} from '../reducers/caches';

const SET_NEARBY_CACHES = 'SET_NEARBY_CACHES';

export interface SetNearbyCachesAction
  extends Action<typeof SET_NEARBY_CACHES> {
  nearby: CacheList;
}

export type CacheAction = SetNearbyCachesAction;

export function setNearbyCaches(nearby: CacheList): SetNearbyCachesAction {
  return {
    type: SET_NEARBY_CACHES,
    nearby,
  };
}

export function getNearbyCaches(
  params: object,
): ThunkAction<void, RootState, undefined, CacheAction> {
  return async dispatch => {
    try {
      const nearestCaches = await makeRequest(api.nearestCaches(params));
      console.log(nearestCaches);
      dispatch(setNearbyCaches(nearestCaches));
    } catch (e) {
      console.error(e);
    }
  };
}

export function searchAndRetreiveNearestCaches(params: SearchAndRetreive) {
  return async (dispatch: ThunkDispatch<void, undefined, Action>) => {
    try {
      const nearestCaches = await makeRequest(
        api.searchAndRetreiveNearestCaches(params),
      );
      dispatch(setNearbyCaches(nearestCaches));
    } catch (e) {
      console.error(e);
    }
  };
}
