import {Action} from 'redux';

const SET_LANGUAGE = 'SET_LANGUAGE';

export interface SetLanguageAction extends Action<typeof SET_LANGUAGE> {
  lang: string;
}

export type GeneralAction = SetLanguageAction;

export function setLanguage(lang: string): SetLanguageAction {
  return {
    type: SET_LANGUAGE,
    lang,
  };
}
