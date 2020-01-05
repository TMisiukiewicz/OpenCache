import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MapScreen} from 'components';
import {config} from 'util';

const App = () => {
  MapboxGL.setAccessToken(config.mapToken);

  return (
    <>
      <MapScreen />
    </>
  );
};

export default App;
