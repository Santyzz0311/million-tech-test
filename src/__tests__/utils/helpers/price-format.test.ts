import { formatPriceToCurrency } from '@/utils/helpers/price-format'

describe('formatPriceToCurrency', () => {
  test('formats price correctly in default USD currency', () => {
    expect(formatPriceToCurrency(1000)).toBe('$1,000.00')
  })

  test('formats price correctly in EUR currency', () => {
    expect(formatPriceToCurrency(1000, { currency: 'EUR' })).toBe('€1,000.00')
  })

  test('formats price correctly in German locale with EUR', () => {
    expect(
      formatPriceToCurrency(1000, { currency: 'EUR', locales: 'de-DE' }),
    ).toBe('1.000,00 €')
  })

  test('formats decimal values correctly', () => {
    expect(formatPriceToCurrency(1234.56)).toBe('$1,234.56')
  })

  test('formats negative values correctly', () => {
    expect(formatPriceToCurrency(-500)).toBe('-$500.00')
  })
})
