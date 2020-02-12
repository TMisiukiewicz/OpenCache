import React, {useEffect} from 'react';
import {NavigationInjectedProps, SafeAreaView} from 'react-navigation';
import {CacheTopbar} from 'components';
import {useSelector, useDispatch} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {cachesActions} from 'store/actions';
import {StyleSheet} from 'react-native';
import {CacheMenu} from 'components';

export interface CacheScreenProps extends NavigationInjectedProps {}

export default function CacheScreen(): JSX.Element {
  const selectedCache = useSelector(cachesSelectors.getSelectedCacheBasicData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cachesActions.getCacheFullDetails());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <CacheTopbar cache={selectedCache} />
      <CacheMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
