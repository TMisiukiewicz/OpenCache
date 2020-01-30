import React from 'react';
import {NavigationInjectedProps, SafeAreaView} from 'react-navigation';
import {CacheTopbar} from 'components';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';

export interface CacheScreenProps extends NavigationInjectedProps {}

export default function CacheScreen(): JSX.Element {
  const selectedCache = useSelector(cachesSelectors.getSelectedCacheBasicData);
  return (
    <SafeAreaView>
      <CacheTopbar cache={selectedCache} />
    </SafeAreaView>
  );
}
