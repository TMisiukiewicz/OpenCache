import {RootAction, RootState} from '.';
import {Reducer} from 'redux';
import MapboxGL from '@react-native-mapbox-gl/maps';

export interface UserState {
  location: MapboxGL.Coordinates;
}

const initialState = {
  location: {
    latitude: 0,
    longitude: 0,
  },
};

const user: Reducer<UserState, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.location,
      };
    default:
      return state;
  }
};

export const userSelectors = {
  location: (state: RootState) => state.user.location,
};

export default user;
