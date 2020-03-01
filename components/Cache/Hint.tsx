import React, {useEffect, useState} from 'react';
import {Title, Text, Button} from 'react-native-paper';
import {DictionaryService} from 'services';
import {CacheDetails} from 'store/reducers/caches';
import DataContainer from '../Shared/DataContainer';
import HintTable from './HintTable';
import {StyleSheet} from 'react-native';
import theme from '../../theme';
import {others} from 'util';

const Dictionary = new DictionaryService();
const {lettersPairs} = others;
export interface HintProps {
  cache: CacheDetails;
  lang: string;
}

export default function Hint({cache, lang}: HintProps) {
  const [hidden, setHidden] = useState(true);
  const [hiddenHint, setHiddenHint] = useState('');

  useEffect(() => {
    const encodeHint = () => {
      const splitHint = cache.hints2[lang].split('');
      const lettersKeys = Object.keys(lettersPairs);
      const encode = splitHint.map(letter =>
        lettersKeys.indexOf(letter) !== -1 ? lettersPairs[letter] : letter,
      );
      const hintToString = encode.join('');
      setHiddenHint(hintToString);
    };
    encodeHint();
  }, [cache.hints2, lang]);

  if (cache === null) {
    return null;
  }

  return (
    <DataContainer>
      <Title>{Dictionary.getText('hint')}</Title>
      <Text>{hidden ? hiddenHint : cache.hints2[lang]}</Text>
      <HintTable />
      <Button
        style={styles.hintButton}
        icon={hidden ? 'eye' : 'eye-off'}
        mode="contained"
        onPress={() => setHidden(!hidden)}>
        {Dictionary.getText(hidden ? 'showHint' : 'hideHint')}
      </Button>
    </DataContainer>
  );
}

const styles = StyleSheet.create({
  hintButton: {
    marginTop: 15,
    backgroundColor: theme.secondaryColor,
  },
});
