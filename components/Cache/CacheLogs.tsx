import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {Loader} from 'components';
import {DictionaryService} from 'services';
import uuid from 'uuid';
import SingleLog from './SingleLog';
import {LogInterface} from 'types/generalTypes';

const Dictionary = new DictionaryService();

export default function CacheLogs() {
  const fetching = useSelector(cachesSelectors.isFetching);
  const cache = useSelector(cachesSelectors.cacheDetails);

  if (fetching) {
    return <Loader />;
  }
  console.log(cache);
  if (cache !== null) {
    return (
      <ScrollView style={styles.container}>
        {cache.latest_logs.length === 0 && (
          <Text>{Dictionary.getText('noLogs')}</Text>
        )}
        {cache.latest_logs.length > 0 &&
          cache.latest_logs.map((log: LogInterface) => (
            <SingleLog key={uuid.v4()} log={log} />
          ))}
      </ScrollView>
    );
  }

  return <Text>{Dictionary.getText('unableToLoad')}</Text>;
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
