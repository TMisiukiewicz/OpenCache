import React from 'react';
import {CacheDetails} from 'store/reducers/caches';
import {DataTable, Title} from 'react-native-paper';
import {DictionaryService} from 'services';
import DataContainer from '../Shared/DataContainer';
import {useDictionary} from 'hooks';

export interface BasicInformationTableProps {
  cache: CacheDetails;
}

export default function BasicInformationTable({
  cache,
}: BasicInformationTableProps) {
  const dictionary = useDictionary();

  if (cache === null) {
    return null;
  }

  return (
    <DataContainer>
      <Title>{dictionary('basicInformationAboutCache')}</Title>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('owner')}</DataTable.Cell>
          <DataTable.Cell>{cache.owner.username}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('cacheType')}</DataTable.Cell>
          <DataTable.Cell>{`${dictionary(cache.type)} (${dictionary(
            cache.size2,
          )})`}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Status</DataTable.Cell>
          <DataTable.Cell>{dictionary(cache.status)}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('hideDate')}</DataTable.Cell>
          <DataTable.Cell>
            {new Date(cache.date_hidden).toLocaleDateString()}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('lastFound')}</DataTable.Cell>
          <DataTable.Cell>
            {new Date(cache.last_found).toLocaleDateString()}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('difficulty')}</DataTable.Cell>
          <DataTable.Cell>{cache.difficulty} / 5</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('terrain')}</DataTable.Cell>
          <DataTable.Cell>{cache.terrain} / 5</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{dictionary('rating')}</DataTable.Cell>
          <DataTable.Cell>{cache.rating} / 5</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </DataContainer>
  );
}
