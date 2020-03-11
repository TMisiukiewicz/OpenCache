import {useSelector} from 'react-redux';
import DictionaryService from '../services/DictionaryService';
import {generalSelectors} from '../store/reducers/general';

export default function useDictionary() {
  const Dictionary = new DictionaryService();
  const lang = useSelector(generalSelectors.getLang);

  return (phrase: string) => Dictionary.getByLang(lang, phrase);
}
