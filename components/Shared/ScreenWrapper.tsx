import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

interface IScreenWrapperProps {
  children: React.ReactNode;
}

export default function ScreenWrapper({children}: IScreenWrapperProps) {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 50,
  },
});
