import React from 'react';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {Loader} from 'components';
import uuid from 'uuid';
import SingleLog from './SingleLog';
import {LogInterface} from 'types/generalTypes';
import {useDictionary} from 'hooks';
import {StyledContainer} from 'components/Shared';

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
      <StyledContainer>
        {cache.latest_logs.length === 0 && <Text>{dictionary('noLogs')}</Text>}
        {cache.latest_logs.length > 0 &&
          cache.latest_logs.map((log: LogInterface) => (
            <SingleLog key={uuid.v4()} log={log} />
          ))}
      </StyledContainer>
    );
  }

  return <Text>{dictionary('unableToLoad')}</Text>;
}
