import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

export interface DataContainerProps {
  children: Array<JSX.Element> | JSX.Element;
  style?: ViewStyle;
}

export default function DataContainer({style, children}: DataContainerProps) {
  return <View style={{...style, ...styles.container}}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ecf0f1',
  },
});
