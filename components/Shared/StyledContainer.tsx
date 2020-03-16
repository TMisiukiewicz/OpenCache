import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

interface StyledContainerProps {
  children: React.ReactNode;
}

export default function StyledContainer({children}: StyledContainerProps) {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
});
