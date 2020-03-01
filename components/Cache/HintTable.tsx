import React from 'react';
import {View, Text} from 'react-native';
import {others} from 'util';
import {StyleSheet} from 'react-native';

export default function HintTable() {
  const {uppercasePairs} = others;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {Object.keys(uppercasePairs).map(item => {
          return (
            <View key={item} style={styles.cell}>
              <Text style={styles.text}>{item}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.row}>
        {Object.keys(uppercasePairs).map(item => {
          return (
            <View key={uppercasePairs[item]} style={styles.cell}>
              <Text style={styles.text}>{uppercasePairs[item]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'stretch',
    flexWrap: 'nowrap',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#e3e3e3',
    justifyContent: 'center',
    width: 22,
    padding: 3,
  },
  text: {
    textAlign: 'center',
  },
});
