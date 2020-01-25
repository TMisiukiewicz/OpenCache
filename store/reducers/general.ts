import {RootAction, RootState} from '.';
import {Reducer} from 'redux';

export interface GeneralState {
  lang: string;
}

const initialState = {
  lang: 'pl',
};

const general: Reducer<GeneralState, RootAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        lang: action.lang,
      };
    default:
      return state;
  }
};

export const generalSelectors = {
  getLang: (state: RootState) => state.general.lang,
};

export default general;
