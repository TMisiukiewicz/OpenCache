// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {DictionaryService} from 'services';
import {useSelector} from 'react-redux';
import {generalSelectors} from 'store/reducers/general';

const Dictionary = new DictionaryService();

export default function useDictionary() {
  const lang = useSelector(generalSelectors.getLang);

  return (phrase: string) => Dictionary.getTextByLang(lang, phrase);
}
