export enum CartActionTypes {
  TOGGLE_CART = 'TOGGLE_CART',
  EMPTY_CART = 'EMPTY_CART',
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  INCREMENT_ITEM = 'INCREMENT_ITEM',
  DECREMENT_ITEM = 'DECREMENT_ITEM',
}

export type CartItem = {
  name?: string;
  quantity: number;
  ean?: string;
  src?: string;
  price?: string;
  linkUrl?: number;
};

export type CartState = {
  isVisible: boolean;
  items: CartItem[];
};
