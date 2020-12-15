export type CartItem = {
  name: string;
  quantity: number;
  ean: string;
  src?: string;
};

export type CartState = {
  isVisible: boolean;
  items: CartItem[];
};

export type State = {
  cart: CartState;
};
