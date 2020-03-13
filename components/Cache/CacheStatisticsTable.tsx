import React from 'react';
import {CacheDetails} from 'store/reducers/caches';
import {DataTable, Title} from 'react-native-paper';
import DataContainer from '../Shared/DataContainer';
import {useDictionary} from 'hooks';

export interface CacheStatisticsTableProps {
  cache: CacheDetails;
}

export default function CacheStatisticsTable({
  cache,
}: CacheStatisticsTableProps) {
  const dictionary = useDictionary();

  if (cache === null) {
    return null;
  }

  return (
    <DataContainer>
      <Title>{dictionary('cacheStats')}</Title>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('founds')}</DataTable.Cell>
          <DataTable.Cell>{cache.founds}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('lastFound')}</DataTable.Cell>
          <DataTable.Cell>
            {new Date(cache.last_found).toLocaleDateString()}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('notFounds')}</DataTable.Cell>
          <DataTable.Cell>{cache.notfounds}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('recommendations')}</DataTable.Cell>
          <DataTable.Cell>{cache.recommendations}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </DataContainer>
  );
}
