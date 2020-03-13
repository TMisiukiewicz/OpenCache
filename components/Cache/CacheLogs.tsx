import React from 'react';
import {ScrollView, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {Loader} from 'components';
import uuid from 'uuid';
import SingleLog from './SingleLog';
import {LogInterface} from 'types/generalTypes';
import {useDictionary} from 'hooks';

export default function CacheLogs() {
  const dictionary = useDictionary();
  const fetching = useSelector(cachesSelectors.isFetching);
  const cache = useSelector(cachesSelectors.cacheDetails);

  if (fetching) {
    return <Loader />;
  }
  console.log(cache);
  if (cache !== null) {
    return (
      <ScrollView>
        {cache.latest_logs.length === 0 && <Text>{dictionary('noLogs')}</Text>}
        {cache.latest_logs.length > 0 &&
          cache.latest_logs.map((log: LogInterface) => (
            <SingleLog key={uuid.v4()} log={log} />
          ))}
      </ScrollView>
    );
  }

  return <Text>{dictionary('unableToLoad')}</Text>;
}
