import React from 'react';
import {Cache, cachesSelectors} from 'store/reducers/caches';
import {FeatureCollection} from '@turf/helpers/lib/geojson';
import {useSelector} from 'react-redux';

export interface AnnotationProps {
  caches: {[id: string]: Cache};
}

export default function Annotation() {
  const cacheList = useSelector(cachesSelectors.selectCaches);
  console.log(cacheList);

  const collection: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  return null;
}
