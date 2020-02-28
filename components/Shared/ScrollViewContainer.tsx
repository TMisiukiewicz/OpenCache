import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface IScrollViewContainer {
  children: React.ReactNode;
}

export default function ScrollViewContainer({children}: IScrollViewContainer) {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
  },
});
