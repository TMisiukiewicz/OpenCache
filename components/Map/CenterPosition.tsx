import React from 'react';
import {Icon, Fab} from 'native-base';
import {CenterPositionProps} from 'propsTypes';

export default function CenterPosition({onPress}: CenterPositionProps) {
  return (
    <Fab position="bottomRight" onPress={() => onPress()}>
      <Icon type="MaterialCommunityIcons" name="crosshairs-gps" />
    </Fab>
  );
}
