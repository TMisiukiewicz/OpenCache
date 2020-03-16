import React from 'react';
import {CacheRetreivalFields} from 'store/reducers/caches';
import {List} from 'react-native-paper';
import {StyleSheet} from 'react-native';

interface SingleCacheProps {
  cache: CacheRetreivalFields;
}

export default function SingleCache({cache}: SingleCacheProps) {
  return (
    <List.Item
      title={cache.code}
      description={cache.name}
      style={styles.item}
      left={props => <List.Icon {...props} icon="folder" />}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
