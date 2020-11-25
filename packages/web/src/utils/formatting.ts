export const formatPrice = (price: string): string =>
  (parseInt(price, 10) / 100).toFixed(2);
