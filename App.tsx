import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {Provider} from 'react-redux';
import {store} from 'store';
import {MapScreen} from 'components';
import {config} from 'util';

const App = () => {
  MapboxGL.setAccessToken(config.mapToken);

  return (
    <Provider store={store}>
      <MapScreen />
    </Provider>
  );
};

export default App;
