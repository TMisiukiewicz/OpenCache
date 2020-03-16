import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {CachesListTopbar, ListTabs} from 'components/Cache/List';

export default function CachesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CachesListTopbar showBackButton />
      <ListTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
