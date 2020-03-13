import React from 'react';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {Loader} from 'components';
import BasicInformationTable from './BasicInformationTable';
import CacheStatisticsTable from './CacheStatisticsTable';
import {useDictionary} from 'hooks';
import {StyledContainer} from 'components/Shared';

export default function CacheDetails(): JSX.Element {
  const dictionary = useDictionary();
  const fetching = useSelector(cachesSelectors.isFetching);
  const cache = useSelector(cachesSelectors.cacheDetails);

  if (fetching) {
    return <Loader />;
  }

  if (cache !== null) {
    return (
      <StyledContainer>
        <BasicInformationTable cache={cache} />
        <CacheStatisticsTable cache={cache} />
      </StyledContainer>
    );
  }

  return <Text>{dictionary('unableToLoad')}</Text>;
}
