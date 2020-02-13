import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {Loader} from 'components';
import {DictionaryService} from 'services';
import BasicInformationTable from './BasicInformationTable';
import CacheStatisticsTable from './CacheStatisticsTable';

const Dictionary = new DictionaryService();

export default function CacheDetails(): JSX.Element {
  const fetching = useSelector(cachesSelectors.isFetching);
  const cache = useSelector(cachesSelectors.cacheDetails);

  if (fetching) {
    return <Loader />;
  }

  if (cache !== null) {
    return (
      <ScrollView style={styles.container}>
        <BasicInformationTable cache={cache} />
        <CacheStatisticsTable cache={cache} />
      </ScrollView>
    );
  }

  return <Text>{Dictionary.getText('unableToLoad')}</Text>;
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    flex: 1,
  },
});
