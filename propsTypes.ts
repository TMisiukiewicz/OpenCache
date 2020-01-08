import MapboxGL from '@react-native-mapbox-gl/maps';
import {Coordinates} from 'types';

export interface MapProps {}

export interface MapState {
  locationPermissionGranted: boolean;
  userLocation: MapboxGL.Coordinates | any;
}

export interface CenterPositionProps {
  onPress: Function;
}
