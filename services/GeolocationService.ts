import {PermissionsAndroid, Platform} from 'react-native';
import {Coordinates} from 'types/generalTypes';
import MapboxGL from '@react-native-mapbox-gl/maps';

export default class GeolocationService {
  async hasLocationPermission(): Promise<void | boolean> {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  }

  async getUserLocation() {
    const hasGeolocationPermission = await this.hasLocationPermission();
    if (!hasGeolocationPermission) {
      return;
    }
  }

  createCoords(coordsString: string): MapboxGL.Coordinates {
    const split = coordsString.split('|');
    return {
      latitude: parseFloat(split[0]),
      longitude: parseFloat(split[1]),
    };
  }
}
