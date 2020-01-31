import {RootAction, RootState} from '.';
import {Reducer} from 'redux';
import {Coordinates} from 'types/generalTypes';
import {FullDetailsResponse} from 'store/actions/caches';

export interface CachesState {
  nearby: CacheList;
  allIds: string[];
  selectedId: string | null;
  fetching: boolean;
  selectedCacheDetails: CacheDetails;
}

export type CacheList = {[id: string]: Cache};
export type CacheDetails = FullDetailsResponse | null;

const initialState = {
  nearby: {},
  allIds: [],
  selectedId: null,
  fetching: false,
  selectedCacheDetails: null,
};

export interface CacheRetreivalFields {
  code: string;
  name: string;
  location: string;
  type: CacheTypes;
  status: CacheStatus;
  owner: any; //TODO: UserInterface
  difficulty: number;
  terrain: number;
  short_description: string;
  last_found: string;
}

export interface Cache extends CacheRetreivalFields {}

export enum CacheTypes {
  Traditional = 'Traditional',
  Multi = 'Multi',
  Quiz = 'Quiz',
  Moving = 'Moving',
  Virtual = 'Virtual',
  Webcam = 'Webcam',
  Event = 'Event',
  Other = 'Other',
  Own = 'Own',
}

export enum CacheStatus {
  'Available',
  'Temporary unavailable',
  'Archived',
}

const caches: Reducer<CachesState, RootAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'SET_FETCHING':
      return {
        ...state,
        fetching: action.fetching,
      };
    case 'SET_NEARBY_CACHES':
      return {
        ...state,
        nearby: action.nearby,
        allIds: Object.keys(action.nearby),
      };
    case 'SET_SELECTED_CACHE_ID':
      return {
        ...state,
        selectedId: action.selectedId,
      };
    case 'SET_CACHES_BY_BOUNDS':
      return {
        ...state,
        nearby: Object.keys(action.byBounds).reduce((allCaches, item) => {
          if (state.nearby[item] === undefined) {
            allCaches[item] = action.byBounds[item];
          }
          return allCaches;
        }, state.nearby),
        allIds: Object.keys(action.byBounds).reduce((allIds, item) => {
          if (state.allIds.indexOf(item) === -1) {
            allIds.push(item);
          }
          return allIds;
        }, state.allIds),
      };
    case 'SET_CACHE_DETAILS':
      return {
        ...state,
        selectedCacheDetails: action.selectedCacheDetails,
      };
    default:
      return state;
  }
};

export const cachesSelectors = {
  selectCaches: (state: RootState) =>
    state.caches.allIds.map(id => {
      const item = state.caches.nearby[id];
      const splitLocation = item.location.split('|');
      const coords: Coordinates = {
        latitude: parseFloat(splitLocation[0]),
        longitude: parseFloat(splitLocation[1]),
      };

      return {...item, location: coords};
    }),
  getSelectedCacheBasicData: (state: RootState) => {
    if (state.caches.selectedId !== null) {
      return state.caches.nearby[state.caches.selectedId];
    }
  },
  isFetching: (state: RootState) => state.caches.fetching,
  cacheDetails: (state: RootState) => state.caches.selectedCacheDetails,
};

export default caches;
