interface FormatPriceOptionalsParams {
  /**
   * The currency to be used
   */
  currency?: string
  /**
   * Local to be used
   */
  locales?: string
}

/**
 * Formats a price to a string with a currency symbol.
 * @param price - The price to be formatted
 * @param currency - The currency to be used
 */
export const formatPriceToCurrency = (
  price: number,
  { currency = 'USD', locales = 'en-US' }: FormatPriceOptionalsParams = {},
) => {
  return Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
  }).format(price)
}
