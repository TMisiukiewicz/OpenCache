import React from 'react';
import {CacheDetails} from 'store/reducers/caches';
import {DataTable, Title} from 'react-native-paper';
import {DictionaryService} from 'services';
import DataContainer from '../Shared/DataContainer';

const Dictionary = new DictionaryService();

export interface BasicInformationTableProps {
  cache: CacheDetails;
}

export default function BasicInformationTable({
  cache,
}: BasicInformationTableProps) {
  if (cache === null) {
    return null;
  }

  return (
    <DataContainer>
      <Title>{Dictionary.getText('basicInformationAboutCache')}</Title>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('owner')}</DataTable.Cell>
          <DataTable.Cell>{cache.owner.username}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('cacheType')}</DataTable.Cell>
          <DataTable.Cell>{`${Dictionary.getText(
            cache.type,
          )} (${Dictionary.getText(cache.size2)})`}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Status</DataTable.Cell>
          <DataTable.Cell>{Dictionary.getText(cache.status)}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('hideDate')}</DataTable.Cell>
          <DataTable.Cell>
            {new Date(cache.date_hidden).toLocaleDateString()}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('lastFound')}</DataTable.Cell>
          <DataTable.Cell>
            {new Date(cache.last_found).toLocaleDateString()}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('difficulty')}</DataTable.Cell>
          <DataTable.Cell>{cache.difficulty} / 5</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('terrain')}</DataTable.Cell>
          <DataTable.Cell>{cache.terrain} / 5</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>{Dictionary.getText('rating')}</DataTable.Cell>
          <DataTable.Cell>{cache.rating} / 5</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </DataContainer>
  );
}
