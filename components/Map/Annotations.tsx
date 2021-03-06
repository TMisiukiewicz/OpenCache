import React, {memo} from 'react';
import {cachesSelectors, CacheTypes} from 'store/reducers/caches';
import {FeatureCollection, Feature} from '@turf/helpers/lib/geojson';
import {useSelector, useDispatch} from 'react-redux';
import SingleCollection from './SingleCollection';
import {setSelectedCacheId} from 'store/actions/caches';

function Annotations() {
  const caches = useSelector(cachesSelectors.selectCaches);
  const dispatch = useDispatch();

  const collections = Object.keys(CacheTypes).reduce(
    (allCollections: {[index: string]: FeatureCollection}, item) => {
      allCollections[item] = {
        type: 'FeatureCollection',
        features: [],
      };
      return allCollections;
    },
    {},
  );

  caches.map(cache => {
    const feature: Feature = {
      type: 'Feature',
      id: cache.code,
      geometry: {
        type: 'Point',
        coordinates: [cache.location.longitude, cache.location.latitude],
      },
      properties: null,
    };
    collections[cache.type].features.push(feature);
  });

  return (
    <React.Fragment>
      {Object.keys(collections).map(cacheType => (
        <SingleCollection
          key={cacheType}
          type={cacheType}
          collection={collections[cacheType]}
          onPress={(cache: string) => dispatch(setSelectedCacheId(cache))}
        />
      ))}
    </React.Fragment>
  );
}

export default memo(Annotations);
