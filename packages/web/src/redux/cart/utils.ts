import { CartItem, CartState } from '../types';

export const addItemToCart = (state: CartState, itemToAdd: CartItem) => {
  const { items } = state;

  const existingCartItem = items.find(
    item => item.ean === itemToAdd.ean && item.name === itemToAdd.name,
  );

  if (existingCartItem) {
    return items.map((item: CartItem) =>
      item.ean === itemToAdd.ean && item.name === itemToAdd.name
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );
  }

  return [...items, { ...itemToAdd, quantity: 1 }];
};

export const incrementItem = (
  { items }: { items: CartItem[] },
  itemIncrement: CartItem,
) =>
  items.map((item: CartItem) =>
    item.ean === itemIncrement.ean
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : item,
  );

export const decrementItem = (
  { items }: { items: CartItem[] },
  itemIncrement: CartItem,
) =>
  items.map((item: CartItem) =>
    item.ean === itemIncrement.ean
      ? {
          ...item,
          quantity: item.quantity - 1,
        }
      : item,
  );

export const removeItem = (
  { items }: { items: CartItem[] },
  itemToRemove: CartItem,
) => items.filter((item: CartItem) => item.ean !== itemToRemove.ean);

/**
 * Total number of items in cart
 */
export const totalItemsCount = (items: CartItem[]) =>
  items.reduce((prev, curr) => {
    return prev + curr.quantity;
  }, 0);
