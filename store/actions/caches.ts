import {api, makeRequest} from 'util/api';
import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {SearchAndRetreive} from 'types/apiTypes';
import {RootState} from 'store/reducers';
import {CacheList, FullDetailsParams} from '../reducers/caches';

const SET_NEARBY_CACHES = 'SET_NEARBY_CACHES';
const SET_SELECTED_CACHE_ID = 'SET_SELECTED_CACHE_ID';
const SET_CACHES_BY_BOUNDS = 'SET_CACHES_BY_BOUNDS';
const SET_FETCHING = 'SET_FETCHING';
const SET_CACHE_DETAILS = 'SET_CACHE_DETAILS';

export interface SetNearbyCachesAction
  extends Action<typeof SET_NEARBY_CACHES> {
  nearby: CacheList;
}

export interface SetSelectedCacheIdAction
  extends Action<typeof SET_SELECTED_CACHE_ID> {
  selectedId: string | null;
}

export interface SetCachesByBoundsAction
  extends Action<typeof SET_CACHES_BY_BOUNDS> {
  byBounds: CacheList;
}

export interface SetFetchingAction extends Action<typeof SET_FETCHING> {
  fetching: boolean;
}

export interface SetCacheDetailsAction
  extends Action<typeof SET_CACHE_DETAILS> {
  selectedCacheDetails: any;
}

export type CacheAction =
  | SetNearbyCachesAction
  | SetSelectedCacheIdAction
  | SetCachesByBoundsAction
  | SetFetchingAction
  | SetCacheDetailsAction;

export function setNearbyCaches(nearby: CacheList): SetNearbyCachesAction {
  return {
    type: SET_NEARBY_CACHES,
    nearby,
  };
}

export function setCachesByBounds(caches: CacheList): SetCachesByBoundsAction {
  return {
    type: SET_CACHES_BY_BOUNDS,
    byBounds: caches,
  };
}

export function setSelectedCacheId(
  selectedId: string | null,
): SetSelectedCacheIdAction {
  return {
    type: SET_SELECTED_CACHE_ID,
    selectedId,
  };
}

export function setFetching(fetching: boolean): SetFetchingAction {
  return {
    type: SET_FETCHING,
    fetching,
  };
}

export function setCacheDetails(details: any): SetCacheDetailsAction {
  return {
    type: SET_CACHE_DETAILS,
    selectedCacheDetails: details,
  };
}

export function getNearbyCaches(
  params: object,
): ThunkAction<void, RootState, undefined, CacheAction> {
  return async dispatch => {
    try {
      const nearestCaches = await makeRequest(api.nearestCaches(params));
      dispatch(setNearbyCaches(nearestCaches));
    } catch (e) {
      console.error(e);
    }
  };
}

export function searchAndRetreiveNearestCaches(
  params: SearchAndRetreive,
): ThunkAction<void, RootState, undefined, CacheAction> {
  return async dispatch => {
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

export function searchAndRetreiveByBounds(
  bounds: Array<Array<number>>,
): ThunkAction<void, RootState, undefined, CacheAction> {
  const bbox = {
    n: bounds[0][1],
    e: bounds[0][0],
    s: bounds[1][1],
    w: bounds[1][0],
  };
  const params: SearchAndRetreive = {
    search_method: 'services/caches/search/bbox',
    search_params: {
      bbox: `${bbox.s}|${bbox.w}|${bbox.n}|${bbox.e}`,
      limit: 500,
    },
    wrap: false,
    retr_method: 'services/caches/geocaches',
    retr_params: {
      fields:
        'name|location|type|code|status|owner|terrain|difficulty|short_description|last_found',
    },
  };

  return async dispatch => {
    try {
      const byBounds = await makeRequest(api.searchAndRetreiveByBounds(params));
      if (Object.keys(byBounds).length > 0) {
        dispatch(setCachesByBounds(byBounds));
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export function getCacheFullDetails(): ThunkAction<
  void,
  RootState,
  undefined,
  CacheAction
> {
  return async (dispatch, getState) => {
    const {selectedId} = getState().caches;
    const {lang} = getState().general;
    dispatch(setFetching(true));
    if (selectedId === null) {
      dispatch(setFetching(false));
      return;
    }

    const params: FullDetailsParams = {
      cache_code: selectedId,
      langpref: lang,
      fields:
        'code|name|names|location|type|status|needs_maintenance|url|owner|founds|notfounds|willattends|watchers|size2|difficulty|terrain|trip_time|trip_distance|rating|rating_votes|recommendations|descriptions|hints2|images|attribution_note|oc_team_annotation|latest_logs|trackables_count|trackables|alt_wpts|country2|region|protection_areas|last_found|last_modified|date_created|date_hidden',
    };

    try {
      const cacheDetails = await makeRequest(api.getCache(params));
      dispatch(setCacheDetails(cacheDetails));
    } catch (e) {
      console.error(e);
    }
    dispatch(setFetching(false));
  };
}
