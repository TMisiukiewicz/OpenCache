import {dictionary} from '../dictionary';
import {store} from '../store';

export default class DictionaryService {
  getText(property: string) {
    const {lang} = store.getState().general;
    return dictionary[property][lang];
  }

  getTextByLang(lang: string, property: string) {
    return dictionary[property][lang];
  }
}
