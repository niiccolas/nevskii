import { AnyAction } from 'redux';
import { CartActionTypes } from './types';

import {
  addItemToCart,
  incrementItem,
  decrementItem,
  removeItem,
} from './utils';

const INITIAL_STATE = {
  hidden: true,
  items: [],
};

const cartReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART:
      return { ...state, hidden: !state.hidden };
    case CartActionTypes.ADD_ITEM:
      return { ...state, cartItems: addItemToCart(state, payload) };
    case CartActionTypes.INCREMENT_ITEM:
      return { ...state, cartItems: incrementItem(state, payload) };
    case CartActionTypes.DECREMENT_ITEM:
      return { ...state, cartItems: decrementItem(state, payload) };
    case CartActionTypes.REMOVE_ITEM:
      return { ...state, cartItems: removeItem(state, payload) };
    default:
      return state;
  }
};

export default cartReducer;
