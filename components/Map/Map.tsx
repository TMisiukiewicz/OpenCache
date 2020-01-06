import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {GeolocationService} from 'services';
import {MapProps, MapState} from 'propsTypes';

export default class Map extends Component<MapProps, MapState> {
  state: MapState;
  LocationService: GeolocationService;
  _map: any;
  _camera: any;

  constructor(props: MapProps) {
    super(props);
    this.state = {
      locationPermissionGranted: false,
    };

    this.LocationService = new GeolocationService();
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
    const hasLocationPermission = await this.LocationService.hasLocationPermission();
    this.setState({locationPermissionGranted: hasLocationPermission});
  };

  flyToLocation = () => {
    // console.log(this._map);
    // this._camera.flyTo([23.0879727, 53.1210511], 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          ref={c => {
            this._map = c;
          }}
          style={styles.map}
          zoomEnabled
          onDidFinishLoadingMap={this.flyToLocation}
          rotateEnabled={false}
          userTrackingMode={1}
          logoEnabled={false}>
          <MapboxGL.Camera
            ref={c => {
              console.log(c);
            }}
            zoomLevel={14}
            followUserLocation
            followUserMode="compass"
          />
          {this.state.locationPermissionGranted && <MapboxGL.UserLocation />}
        </MapboxGL.MapView>
      </View>
    );
  }
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
