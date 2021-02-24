import { AnyAction } from 'redux';
import { AuthState, AuthActionTypes } from './types';

const INITIAL_STATE = {
  accessToken: undefined,
  refreshToken: undefined,
};

const cart = (state: AuthState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case AuthActionTypes.SAVE_TOKENS:
      return { ...action.payload };
    case AuthActionTypes.DELETE_TOKENS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default cart;
