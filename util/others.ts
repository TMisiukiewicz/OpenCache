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

const uppercaseLetters = Object.keys(lettersPairs).filter(
  letter => letter === letter.toUpperCase(),
);

const uppercaseKeys = uppercaseLetters;

const uppercasePairs = uppercaseKeys.reduce(
  (all: {[key: string]: string}, letter) => {
    if (uppercaseKeys.indexOf(letter) < uppercaseKeys.length / 2) {
      all[letter] = lettersPairs[letter];
    }
    return all;
  },
  {},
);
const others = {lettersPairs, uppercaseLetters, uppercaseKeys, uppercasePairs};

export default others;
