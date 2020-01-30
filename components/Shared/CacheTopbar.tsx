import React from 'react';
import {Appbar} from 'react-native-paper';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import {CacheRetreivalFields} from 'store/reducers/caches';
import {StyleSheet} from 'react-native';
import theme from '../../theme';

export interface CacheTopbarProps extends NavigationInjectedProps {
  cache: CacheRetreivalFields;
}

function CacheTopbar({navigation, cache}: CacheTopbarProps) {
  return (
    <Appbar.Header style={styles.topbar}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={cache.code} subtitle={cache.name} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: theme.primaryColor,
  },
});

export default withNavigation(CacheTopbar);
