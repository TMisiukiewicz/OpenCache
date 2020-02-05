import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CacheDetails} from 'store/reducers/caches';
import {DataTable, Title} from 'react-native-paper';
import {DictionaryService} from 'services';

const Dictionary = new DictionaryService();

export interface CacheStatisticsTableProps {
  cache: CacheDetails;
}

export default function CacheStatisticsTable({
  cache,
}: CacheStatisticsTableProps) {
  if (cache === null) {
    return null;
  }

  return (
    <View>
      <Title>{Dictionary.getText('cacheStats')}</Title>
      <DataTable style={styles.table}>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('founds')}</DataTable.Cell>
          <DataTable.Cell>{cache.founds}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('lastFound')}</DataTable.Cell>
          <DataTable.Cell>
            {new Date(cache.last_found).toLocaleDateString()}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('notFounds')}</DataTable.Cell>
          <DataTable.Cell>{cache.notfounds}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            {Dictionary.getText('recommendations')}
          </DataTable.Cell>
          <DataTable.Cell>{cache.recommendations}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ecf0f1',
  },
});
