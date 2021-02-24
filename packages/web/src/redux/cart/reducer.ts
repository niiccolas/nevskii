import { AnyAction } from 'redux';
import { CartActionTypes, CartState } from './types';

import {
  addItemToCart,
  incrementItem,
  decrementItem,
  removeItem,
} from './utils';

const INITIAL_STATE = {
  isVisible: false,
  items: [],
};

const cart = (state: CartState = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART:
      return { ...state, isVisible: !state.isVisible };
    case CartActionTypes.EMPTY_CART:
      return INITIAL_STATE;
    case CartActionTypes.ADD_ITEM:
      return { ...state, items: addItemToCart(state, action.payload) };
    case CartActionTypes.INCREMENT_ITEM:
      return { ...state, items: incrementItem(state, action.payload) };
    case CartActionTypes.DECREMENT_ITEM:
      return { ...state, items: decrementItem(state, action.payload) };
    case CartActionTypes.REMOVE_ITEM:
      return { ...state, items: removeItem(state, action.payload) };
    default:
      return state;
  }
};

export default cart;
