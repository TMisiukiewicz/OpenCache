import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {GeolocationService} from 'services';
import {MapProps, MapState} from 'propsTypes';
import CenterPosition from './CenterPosition';
import {consts, api} from 'util';

const {nearestCaches} = api;
const {DEFAULT_ZOOM_LEVEL} = consts;

export default class Map extends Component<MapProps, MapState> {
  state: MapState;
  LocationService: GeolocationService;
  _map: any;
  _camera: any;

  constructor(props: MapProps) {
    super(props);
    this.state = {
      locationPermissionGranted: false,
      userLocation: {},
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

  flyToUserLocation = async () => {
    if (this.state.locationPermissionGranted) {
      const {latitude, longitude} = this.state.userLocation;
      const params = {
        center: `${latitude}|${longitude}`,
      };
      const nearest = await fetch(nearestCaches(params));
      console.log(nearest);
      this._camera.setCamera({
        centerCoordinate: [longitude, latitude],
        zoomLevel: DEFAULT_ZOOM_LEVEL,
        animationDuration: 1000,
        animationMode: 'flyTo',
      });
    }
  };

  onUserLocationChange = (location: MapboxGL.Location) => {
    this.setState({
      userLocation: location.coords,
    });
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
          onDidFinishLoadingMap={this.flyToUserLocation}
          rotateEnabled={false}
          //   userTrackingMode={1}
          logoEnabled={false}>
          <MapboxGL.Camera
            ref={c => {
              this._camera = c;
            }}
            zoomLevel={DEFAULT_ZOOM_LEVEL}
            // followUserLocation
            followUserMode="compass"
          />
          {this.state.locationPermissionGranted && (
            <MapboxGL.UserLocation onUpdate={this.onUserLocationChange} />
          )}
        </MapboxGL.MapView>
        <CenterPosition onPress={this.flyToUserLocation} />
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
