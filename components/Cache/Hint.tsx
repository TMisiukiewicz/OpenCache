import React, {useEffect, useState} from 'react';
import {Title, Text, Button} from 'react-native-paper';
import {DictionaryService} from 'services';
import {CacheDetails} from 'store/reducers/caches';
import DataContainer from '../Shared/DataContainer';
import {StyleSheet} from 'react-native';
import theme from '../../theme';

const Dictionary = new DictionaryService();

export interface HintProps {
  cache: CacheDetails;
  lang: string;
}

interface LettersPairsInterface {
  [key: string]: string;
}

const lettersPairs: LettersPairsInterface = {
  A: 'N',
  a: 'n',
  B: 'O',
  b: 'o',
  C: 'P',
  c: 'p',
  D: 'Q',
  d: 'q',
  E: 'R',
  e: 'r',
  F: 'S',
  f: 's',
  G: 'T',
  g: 't',
  H: 'U',
  h: 'u',
  I: 'V',
  i: 'v',
  J: 'W',
  j: 'w',
  K: 'X',
  k: 'x',
  L: 'Y',
  l: 'y',
  M: 'Z',
  m: 'z',
  N: 'A',
  n: 'a',
  O: 'B',
  o: 'b',
  P: 'C',
  p: 'c',
  Q: 'D',
  q: 'd',
  R: 'E',
  r: 'e',
  S: 'F',
  s: 'f',
  T: 'G',
  t: 'g',
  U: 'H',
  u: 'h',
  V: 'I',
  v: 'i',
  W: 'J',
  w: 'j',
  X: 'K',
  x: 'k',
  Y: 'L',
  y: 'l',
  Z: 'M',
  z: 'm',
};

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
