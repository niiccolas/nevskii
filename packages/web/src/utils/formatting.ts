export const formatPrice = (price: string): string =>
  (parseInt(price, 10) / 100).toFixed(2);

export const hello = () => console.log('helooooooo');
