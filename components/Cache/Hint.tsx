import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Text} from 'react-native-paper';
import {DictionaryService} from 'services';
import {CacheDetails} from 'store/reducers/caches';

const Dictionary = new DictionaryService();

export interface HintProps {
  cache: CacheDetails;
  lang: string;
}

export default function Hint({cache, lang}: HintProps) {
  if (cache === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Title>{Dictionary.getText('hint')}</Title>
      <Text>{cache.hints2[lang]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
});
