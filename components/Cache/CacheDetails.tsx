import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {cachesSelectors} from 'store/reducers/caches';
import {Loader} from 'components';
import {DataTable} from 'react-native-paper';
import {DictionaryService} from 'services';

const Dictionary = new DictionaryService();

export default function CacheDetails() {
  const fetching = useSelector(cachesSelectors.isFetching);
  const cache = useSelector(cachesSelectors.cacheDetails);

  console.log(cache);

  if (fetching) {
    return <Loader />;
  }

  if (cache !== null) {
    return (
      <ScrollView style={styles.container}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>{Dictionary.getText('cacheType')}</DataTable.Cell>
            <DataTable.Cell>{Dictionary.getText(cache.type)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>{Dictionary.getText('cacheSize')}</DataTable.Cell>
            <DataTable.Cell>{Dictionary.getText(cache.size2)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              {Dictionary.getText('creationDate')}
            </DataTable.Cell>
            <DataTable.Cell>
              {new Date(cache.date_created).toLocaleDateString()}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>{Dictionary.getText('hideDate')}</DataTable.Cell>
            <DataTable.Cell>
              {new Date(cache.date_hidden).toLocaleDateString()}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              {Dictionary.getText('lastModified')}
            </DataTable.Cell>
            <DataTable.Cell>
              {new Date(cache.last_modified).toLocaleDateString()}
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>{Dictionary.getText('lastFound')}</DataTable.Cell>
            <DataTable.Cell>
              {new Date(cache.last_found).toLocaleDateString()}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ScrollView>
    );
  }

  return <Text>{Dictionary.getText('unableToLoad')}</Text>;
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    flex: 1,
  },
});
