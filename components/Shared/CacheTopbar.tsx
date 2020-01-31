import React from 'react';
import {Appbar} from 'react-native-paper';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import {Cache} from 'store/reducers/caches';
import {StyleSheet} from 'react-native';
import theme from '../../theme';

export interface CacheTopbarProps extends NavigationInjectedProps {
  cache: Cache | undefined;
}

function CacheTopbar({navigation, cache}: CacheTopbarProps) {
  const goBack = (): void => {
    navigation.goBack();
  };

  if (cache !== undefined) {
    return (
      <Appbar.Header style={styles.topbar}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={cache.code} subtitle={cache.name} />
      </Appbar.Header>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  topbar: {
    backgroundColor: theme.primaryColor,
  },
});

export default withNavigation(CacheTopbar);
