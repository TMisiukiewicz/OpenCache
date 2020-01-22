import {combineReducers} from 'redux';
import caches, {CacheAction, CachesState} from './caches';

export type RootAction = CacheAction;

export interface RootState {
  caches: CachesState;
}

export default combineReducers<RootState, RootAction>({
  caches,
});
