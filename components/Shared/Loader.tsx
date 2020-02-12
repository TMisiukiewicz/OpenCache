import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import theme from '../../theme';
import {StyleSheet} from 'react-native';

export default function Loader() {
  return (
    <ActivityIndicator
      animating
      color={theme.primaryColor}
      style={styles.loader}
      size="large"
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    padding: 15,
  },
});
