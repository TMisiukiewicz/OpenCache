import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {FeatureCollection} from '@turf/helpers/lib/geojson';

const icons = {
  Traditional: require('../../assets/img/cache-types/Traditional.png'),
  Multi: require('../../assets/img/cache-types/Multi.png'),
  Quiz: require('../../assets/img/cache-types/Quiz.png'),
  Moving: require('../../assets/img/cache-types/Moving.png'),
  Virtual: require('../../assets/img/cache-types/Virtual.png'),
  Webcam: require('../../assets/img/cache-types/Webcam.png'),
  Event: require('../../assets/img/cache-types/Event.png'),
  Other: require('../../assets/img/cache-types/Other.png'),
  Own: require('../../assets/img/cache-types/Own.png'),
};

export interface SingleCollectionProps {
  type: string;
  collection: FeatureCollection;
  onPress: any;
}

export default function SingleCollection({
  type,
  collection,
  onPress,
}: SingleCollectionProps) {
  const handleClick = ({payload}) => {
    onPress(payload.id);
  };

  return (
    <MapboxGL.ShapeSource
      id={type}
      shape={collection}
      hitbox={{width: 44, height: 44}}
      onPress={({nativeEvent}) => handleClick(nativeEvent)}>
      <MapboxGL.SymbolLayer id={type} style={annotationStyle.icon(type)} />
    </MapboxGL.ShapeSource>
  );
}

const annotationStyle = {
  icon: (type: string) => {
    return {
      iconImage: icons[type],
      iconAllowOverlap: true,
      iconIgnorePlacement: true,
      iconSize: 0.3,
    };
  },
};
