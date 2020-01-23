import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {GeolocationService} from 'services';
import CenterPosition from './CenterPosition';
import {consts} from 'util';
import {store} from 'store';
import {cachesActions} from 'store/actions';
import {SearchAndRetreive, SearchParams} from 'types/apiTypes';
import Annotation from './Annotation';
import {CacheList} from 'store/reducers/caches';
import {RootState} from 'store/reducers';

const {DEFAULT_ZOOM_LEVEL} = consts;

export interface MapProps {
  nearbyCaches: CacheList;
}
export interface MapState {
  locationPermissionGranted: boolean;
  userLocation: MapboxGL.Coordinates;
}
class Map extends Component<MapProps, MapState> {
  state: MapState;
  LocationService: GeolocationService;
  _map: any;
  _camera: any;
  dispatch: any;

  constructor(props: MapProps) {
    super(props);
    this.state = {
      locationPermissionGranted: false,
      userLocation: {
        latitude: 0,
        longitude: 0,
      },
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

      const searchParams: SearchParams = {
        center: `${latitude}|${longitude}`,
      };
      const params: SearchAndRetreive = {
        search_method: 'services/caches/search/nearest',
        search_params: searchParams,
        wrap: false,
        retr_method: 'services/caches/geocaches',
        retr_params: {
          fields: 'name|location|type',
        },
      };

      store.dispatch(cachesActions.searchAndRetreiveNearestCaches(params));

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
          logoEnabled={false}>
          <MapboxGL.Camera
            ref={c => {
              this._camera = c;
            }}
            zoomLevel={DEFAULT_ZOOM_LEVEL}
            followUserMode="compass"
          />
          {this.state.locationPermissionGranted && (
            <MapboxGL.UserLocation onUpdate={this.onUserLocationChange} />
          )}
          <Annotation />
        </MapboxGL.MapView>
        <CenterPosition onPress={this.flyToUserLocation} />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    nearbyCaches: state.caches.nearby,
  };
};

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

export default connect(mapStateToProps)(Map);
