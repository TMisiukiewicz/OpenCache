import MapboxGL from '@react-native-mapbox-gl/maps';
export interface MapState {
  locationPermissionGranted: boolean;
  userLocation: MapboxGL.Coordinates | any;
}

export interface CenterPositionProps {
  onPress: Function;
}
