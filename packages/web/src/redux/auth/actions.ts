import { AuthActionTypes, AuthTokensDuoPayload } from './types';

export const saveTokens = (tokens: AuthTokensDuoPayload) => ({
  type: AuthActionTypes.SAVE_TOKENS,
  payload: tokens,
});

export const deleteTokens = () => ({
  type: AuthActionTypes.DELETE_TOKENS,
});

// export const addItem = (item: CartItem) => ({
//   type: CartActionTypes.ADD_ITEM,
//   payload: item,
// });

// export const emptyCart = () => ({
//   type: CartActionTypes.EMPTY_CART,
// });

// export const addItem = (item: CartItem) => ({
//   type: CartActionTypes.ADD_ITEM,
//   payload: item,
// });

// export const incrementItem = (item: CartItem) => ({
//   type: CartActionTypes.INCREMENT_ITEM,
//   payload: item,
// });

// export const decrementItem = (item: CartItem) => ({
//   type: CartActionTypes.DECREMENT_ITEM,
//   payload: item,
// });

// export const removeItem = (item: CartItem) => ({
//   type: CartActionTypes.REMOVE_ITEM,
//   payload: item,
// });
