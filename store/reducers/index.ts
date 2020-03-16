import {combineReducers} from 'redux';
import caches, {CachesState} from './caches';
import {CacheAction} from '../actions/caches';
import {GeneralAction} from '../actions/general';
import general, {GeneralState} from './general';
import {UserAction} from 'store/actions/user';
import user, {UserState} from './user';

export type RootAction = CacheAction | GeneralAction | UserAction;

export interface RootState {
  caches: CachesState;
  general: GeneralState;
  user: UserState;
}

export default combineReducers<RootState, RootAction>({
  caches,
  general,
  user,
});
