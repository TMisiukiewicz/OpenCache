import React from 'react';
import DataContainer from '../Shared/DataContainer';
import {Text, StyleSheet, View} from 'react-native';
import {LogInterface} from 'types/generalTypes';
import HTMLView from 'react-native-htmlview';
import theme from '../../theme';
import moment from 'moment';
import {useDictionary} from 'hooks';
export interface SingleLogProps {
  log: LogInterface;
}

export default function SingleLog({log}: SingleLogProps) {
  moment().locale('pl');
  const dictionary = useDictionary();

  let style = styles.default;
  if (log.type === 'Found it' || log.type === 'Ready to search') {
    style = styles.found;
  } else if (log.type === "Didn't find it") {
    style = styles.notFound;
  } else if (
    log.type === 'Temporarily unavailable' ||
    log.type === 'Needs maintenance' ||
    log.type === 'Maintenance performed'
  ) {
    style = styles.warning;
  }
  return (
    <DataContainer style={style}>
      <Text style={styles.bold}>
        {log.user.username} | {dictionary(log.type)}
      </Text>
      <View style={styles.separator}>
        <Text>{moment(log.date).format('LLL')}</Text>
      </View>
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
  warning: {
    borderBottomColor: theme.warningColor,
    borderBottomWidth: 3,
  },
  bold: {
    fontWeight: 'bold',
  },
  separator: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
});
