import React from 'react';
import {CacheDetails} from 'store/reducers/caches';
import {DataTable, Title} from 'react-native-paper';
import {DictionaryService} from 'services';
import DataContainer from '../Shared/DataContainer';

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
    <DataContainer>
      <Title>{Dictionary.getText('cacheStats')}</Title>
      <DataTable>
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
    </DataContainer>
  );
}
