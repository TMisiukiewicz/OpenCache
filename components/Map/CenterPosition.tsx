import React from 'react';
// import {Icon, Fab} from 'native-base';
import {FAB} from 'react-native-paper';
import {CenterPositionProps} from 'propsTypes';
import {StyleSheet} from 'react-native';
import theme from '../../theme';

export default function CenterPosition({onPress}: CenterPositionProps) {
  return (
    <FAB onPress={() => onPress()} icon="crosshairs-gps" style={styles.fab} />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginBottom: 90,
    marginRight: 15,
    right: 0,
    bottom: 0,
    backgroundColor: theme.primaryColor,
  },
});
