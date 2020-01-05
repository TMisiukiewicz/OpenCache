import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {GeolocationService} from 'services';

export default function Map() {
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(
    false,
  );
  const LocationService = new GeolocationService();

  useEffect(() => {
    getLocation();
  });

  const getLocation = async () => {
    const hasLocationPermission = await LocationService.hasLocationPermission();
    setLocationPermissionGranted(hasLocationPermission);
  };
  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled
        rotateEnabled={false}
        userTrackingMode={1}
        logoEnabled={false}>
        <MapboxGL.Camera
          zoomLevel={14}
          followUserLocation
          followUserMode="compass"
        />
        {locationPermissionGranted && <MapboxGL.UserLocation />}
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#000',
  },
  map: {
    flex: 1,
  },
});
