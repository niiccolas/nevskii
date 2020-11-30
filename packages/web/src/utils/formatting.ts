/**
 * Format price values coming from database and appends currency
 *
 * @param price - price in cents and typed as a string
 * @param currency - default to EUROS
 */
export const formatPrice = (price: string, currency: '€' = '€'): string =>
  (parseInt(price, 10) / 100).toFixed(2) + '\u00a0' + currency;

/**
 * Format comma-separated values from database
 *
 * @param list - A database comma-separated aggregate
 * @param separator - The desired output value separator
 */
export const formatValuesList = (list: string, separator = ', '): string =>
  list
    .split(';')
    .map(value => value[0].toUpperCase() + value.slice(1))
    .join(separator);
