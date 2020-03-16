import {Action} from 'redux';
import MapboxGL from '@react-native-mapbox-gl/maps';

const SET_LOCATION = 'SET_LOCATION';

export interface SetUserLocationAction extends Action<typeof SET_LOCATION> {
  location: MapboxGL.Coordinates;
}

export type UserAction = SetUserLocationAction;

export function setUserLocation(
  location: MapboxGL.Coordinates,
): SetUserLocationAction {
  return {
    type: SET_LOCATION,
    location,
  };
}
