import React, {memo} from 'react';
import {cachesSelectors} from 'store/reducers/caches';
import {FeatureCollection, Feature} from '@turf/helpers/lib/geojson';
import {useSelector} from 'react-redux';
import MapboxGL from '@react-native-mapbox-gl/maps';

function Annotation() {
  const caches = useSelector(cachesSelectors.selectCaches);

  const collection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  caches.map(cache => {
    const feature: Feature = {
      type: 'Feature',
      id: cache.name,
      geometry: {
        type: 'Point',
        coordinates: [cache.location.longitude, cache.location.latitude],
      },
      properties: null,
    };
    collection.features.push(feature);
  });

  return (
    <MapboxGL.ShapeSource
      id="caches"
      shape={collection}
      hitbox={{width: 44, height: 44}}
      onPress={e => console.log(e)}>
      <MapboxGL.SymbolLayer id="cache" style={annotationStyle.icon} />
    </MapboxGL.ShapeSource>
  );
}

const annotationStyle = {
  icon: {
    iconImage: require('../../assets/img/marker.png'),
    iconIgnorePlacement: true,
    iconSize: 0.08,
  },
};

export default memo(Annotation);
