import {RootAction, RootState} from '.';
import {Reducer} from 'redux';
import {Coordinates} from 'types/generalTypes';

export interface CachesState {
  nearby: CacheList;
  allIds: string[];
  selectedId: string | null;
  fetching: boolean;
  selectedCacheDetails: CacheDetails;
}

export type CacheList = {[id: string]: Cache};
export type CacheDetails = FullDetailsResponse;

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

export interface FullDetailsParams {
  cache_code: string;
  langpref?: string;
  fields?: string;
  attribution_append?: string;
  oc_team_annotation?: string;
  owner_fields?: string;
  lpc?: number;
  log_fields?: string;
  user_logs_only?: boolean;
  my_location?: string;
  user_uuid?: string;
  format?: string;
  callback?: string;
}

export interface FullDetailsResponse {
  alt_wpts: Array<any>;
  attribution_note: string;
  code: string;
  country2: string;
  date_created: string;
  date_hidden: string;
  description: string;
  descriptions: {[lang: string]: string};
  difficulty: number;
  founds: number;
  hints: {[lang: string]: string};
  hints2: {[lang: string]: string};
  images: Array<any>;
  last_found: string;
  last_modified: string;
  latest_logs: any; //TODO: log interface
  location: string;
  name: string;
  names: {[lang: string]: string};
  needs_maintenance: boolean;
  notfounds: number;
  oc_team_annotation: string;
  owner: any; //TODO: user interface
  protection_areas: Array<any>;
  rating: number;
  rating_votes: number;
  recommendations: number;
  region: string;
  size2: string;
  status: string;
  terrain: number;
  trackables: Array<any>;
  tackables_count: number;
  trip_distance: number | null;
  trip_time: number | null;
  type: string;
  url: string;
  watchers: number;
  willattends: number;
}

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
