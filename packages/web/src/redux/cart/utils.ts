import { CartItem } from './types';

export const addItemToCart = (
  { items }: { items: CartItem[] },
  itemToAdd: CartItem,
) => {
  const existingCartItem = items.find(
    item => item.id === itemToAdd.id && item.name === itemToAdd.name,
  );

  if (existingCartItem) {
    return items.map((item: CartItem) =>
      item.id === itemToAdd.id && item.name === itemToAdd.name
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
    item.id === itemIncrement.id && item.name === itemIncrement.name
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
    item.id === itemIncrement.id && item.name === itemIncrement.name
      ? {
          ...item,
          quantity: item.quantity - 1,
        }
      : item,
  );

export const removeItem = (
  { items }: { items: CartItem[] },
  itemToRemove: CartItem,
) => items.filter((item: CartItem) => item.name !== itemToRemove.name);
