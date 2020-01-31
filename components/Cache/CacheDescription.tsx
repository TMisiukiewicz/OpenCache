import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {generalSelectors} from 'store/reducers/general';
import {Loader} from 'components';
import HTMLView from 'react-native-htmlview';
import {dictionary} from '../../dictionary';

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
        <HTMLView
          value={
            cache.descriptions[lang] === undefined
              ? `<html><body><div>${cache.description}</div></body></html>`
              : `<html><body><div>${
                  cache.descriptions[lang]
                }</div></body></html>`
          }
        />
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
