import {combineReducers} from 'redux';
import caches, {CachesState} from './caches';
import {CacheAction} from '../actions/caches';
import {GeneralAction} from '../actions/general';
import general, {GeneralState} from './general';

export type RootAction = CacheAction | GeneralAction;

export interface RootState {
  caches: CachesState;
  general: GeneralState;
}

export default combineReducers<RootState, RootAction>({
  caches,
  general,
});
