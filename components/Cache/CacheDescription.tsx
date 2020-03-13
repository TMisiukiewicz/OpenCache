import React from 'react';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {generalSelectors} from 'store/reducers/general';
import {Loader} from 'components';
import HTMLView from 'react-native-htmlview';
import {Title, Text} from 'react-native-paper';
import Hint from './Hint';
import DataContainer from '../Shared/DataContainer';
import {useDictionary} from 'hooks';
import {StyledContainer} from 'components/Shared';

export default function CacheDescription() {
  const fetching = useSelector(cachesSelectors.isFetching);
  const cache = useSelector(cachesSelectors.cacheDetails);
  const lang = useSelector(generalSelectors.getLang);
  const dictionary = useDictionary();

  if (fetching) {
    return <Loader />;
  }

  if (cache !== null) {
    return (
      <StyledContainer>
        <DataContainer>
          <Title>{dictionary('description')}</Title>
          <HTMLView
            value={
              cache.descriptions[lang] === undefined
                ? `<html><body><div>${cache.description}</div></body></html>`
                : `<html><body><div>${
                    cache.descriptions[lang]
                  }</div></body></html>`
            }
          />
        </DataContainer>
        <Hint cache={cache} lang={lang} />
      </StyledContainer>
    );
  }

  return <Text>{dictionary('unableToLoad')}</Text>;
}
