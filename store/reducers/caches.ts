import {RootAction, RootState} from '.';
import {RetreivalFields} from 'types/apiTypes';
import {Reducer} from 'redux';

export interface CachesState {
  nearby: CacheList;
  allIds: string[];
}

export interface Cache extends RetreivalFields {}

export type CacheList = {[id: string]: Cache};

const initialState = {
  nearby: {},
  allIds: [],
};

const caches: Reducer<CachesState, RootAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'SET_NEARBY_CACHES':
      return {
        ...state,
        nearby: action.nearby,
        allIds: Object.keys(action.nearby),
      };
    default:
      return state;
  }
};

export const cachesSelectors = {
  selectCaches: (state: RootState) =>
    state.caches.allIds.map(id => state.caches.nearby[id]),
};

export default caches;
