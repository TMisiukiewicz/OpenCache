import React from 'react';
import DataContainer from '../Shared/DataContainer';
import {Text, StyleSheet} from 'react-native';
import {LogInterface} from 'types/generalTypes';
import HTMLView from 'react-native-htmlview';
import theme from '../../theme';
import {DictionaryService} from 'services';

const Dictionary = new DictionaryService();

export interface SingleLogProps {
  log: LogInterface;
}

export default function SingleLog({log}: SingleLogProps) {
  let style = styles.default;
  if (log.type === 'Found it') {
    style = styles.found;
  } else if (log.type === "Didn't find it") {
    style = styles.notFound;
  }
  return (
    <DataContainer style={style}>
      <Text>
        <Text style={styles.username}>{log.user.username}</Text> |{' '}
        {new Date(log.date).toLocaleString()}
      </Text>
      <HTMLView value={`<html><body><div>${log.comment}</div></body></html>`} />
    </DataContainer>
  );
}

const styles = StyleSheet.create({
  found: {
    borderBottomColor: theme.successColor,
    borderBottomWidth: 3,
  },
  notFound: {
    borderBottomColor: theme.dangerColor,
    borderBottomWidth: 3,
  },
  default: {
    borderBottomColor: theme.defaultColor,
    borderBottomWidth: 3,
  },
  username: {
    fontWeight: 'bold',
  },
});
