import { AnyAction } from 'redux';
import { UserState, UserActionTypes } from './types';

const INITIAL_STATE = {
  profile: undefined,
};

const cart = (state: UserState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case UserActionTypes.SAVE_USER_PROFILE:
      console.log('from USER-Reducer --', { action });
      return { ...state, profile: action.payload };
    case UserActionTypes.LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default cart;
