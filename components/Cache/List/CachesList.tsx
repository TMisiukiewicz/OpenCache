import React from 'react';
import {StyledContainer, Loader} from 'components/Shared';
import {useSelector} from 'react-redux';
import {cachesSelectors, CacheRetreivalFields} from 'store/reducers/caches';
import SingleCache from './SingleCache';
import uuid from 'uuid';

export default function CachesList() {
  const caches = useSelector(cachesSelectors.selectCaches);
  const fetching = useSelector(cachesSelectors.isFetching);

  if (fetching) {
    return <Loader />;
  }

  return (
    <StyledContainer>
      {caches.map((cache: CacheRetreivalFields) => {
        return <SingleCache cache={cache} key={uuid.v4()} />;
      })}
    </StyledContainer>
  );
}
