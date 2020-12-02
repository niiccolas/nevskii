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

/**
 * Generate uppercase initials for a given name.
 * Preproces input thru String.normalize() to avoid accented characters
 *
 * @param name
 */
export const formatInitials = (name: string): string =>
  (
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .match(/\b\w/g) || []
  )
    .map(letter => letter.toUpperCase())
    .join('');
