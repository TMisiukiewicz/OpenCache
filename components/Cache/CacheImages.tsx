import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {DictionaryService} from 'services';
import ImagesContainer from './ImagesContainer';
import ScrollViewContainer from 'components/Shared/ScrollViewContainer';
import Loader from 'components/Shared/Loader';

const Dictionary = new DictionaryService();

export default function CacheImages() {
  const fetching = useSelector(cachesSelectors.isFetching);
  const cache = useSelector(cachesSelectors.cacheDetails);

  if (fetching) {
    return <Loader />;
  }

  return (
    <ScrollViewContainer>
      {!cache.images.length && (
        <Text style={styles.text}>{Dictionary.getText('noImages')}</Text>
      )}
      {cache.images.length > 0 && <ImagesContainer images={cache.images} />}
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
