import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {generalSelectors} from 'store/reducers/general';
import {Loader} from 'components';
import HTMLView from 'react-native-htmlview';
import {Title} from 'react-native-paper';
import {dictionary} from '../../dictionary';
import Hint from './Hint';
import DataContainer from '../Shared/DataContainer';
import {DictionaryService} from 'services';

const Dictionary = new DictionaryService();

export default function CacheDescription() {
  const fetching = useSelector(cachesSelectors.isFetching);
  const cache = useSelector(cachesSelectors.cacheDetails);
  const lang = useSelector(generalSelectors.getLang);

  if (fetching) {
    return <Loader />;
  }

  if (cache !== null) {
    return (
      <ScrollView style={styles.container}>
        <DataContainer>
          <Title>{Dictionary.getText('description')}</Title>
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
      </ScrollView>
    );
  }

  return <Text>{dictionary.unableToLoad[lang]}</Text>;
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    flex: 1,
  },
});
